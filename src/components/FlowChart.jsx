import React, { useCallback, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { addEdge, useNodesState, useEdgesState } from '@xyflow/react';
import useWorkflowValidator from './WorkflowValidator';
import Sidebar from './Sidebar';
import FlowCanvas from './FlowCanvas';

// ID generator
let id = 1;
const getId = () => `node_${id++}`;

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { validateWorkflow } = useWorkflowValidator();
  // Nodes manage their own UI now; no drawer state needed
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });
  const [clipboard, setClipboard] = useState(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      // get bounding rect of the canvas container
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const nodeId = getId();
      const updateNode = (nid, patch) => {
        setNodes((nds) => nds.map((n) => (n.id === nid ? { ...n, data: { ...n.data, ...patch } } : n)));
      };

      const newNode = {
        id: nodeId,
        type,
        position,
        data: {
          label: `New ${type}`,
          ...(type === 'emailNode' && { emailTemplateId: '' }),
          ...(type === 'waitNode' && { duration: 1 }),
          updateNode,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  // Add node at approximate center of current viewport
  const handleAddNode = useCallback((type) => {
    // simple centered position; consumers can refine using react-flow viewport
    const position = { x: 300 - viewport.x, y: 200 - viewport.y };
    const base = { id: getId(), type, position };
    let data = { label: `New ${type}` };

    switch (type) {
      case 'emailNode':
        data = { ...data, emailTemplateId: '' };
        break;
      case 'waitNode':
        data = { ...data, duration: 60 };
        break;
      case 'decisionNode':
        data = { ...data };
        break;
      case 'updateProfileNode':
        data = { ...data, profile: { name: '', role: '', avatarUrl: '' } };
        break;
      default:
        break;
    }

    const nodeId = getId();
    const updateNode = (nid, patch) => {
      setNodes((nds) => nds.map((n) => (n.id === nid ? { ...n, data: { ...n.data, ...patch } } : n)));
    };

    const newNode = { ...base, id: nodeId, data: { ...data, updateNode } };
    setNodes((nds) => [...nds, newNode]);
  }, [viewport, setNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, id: getId() }, eds)),
    [setEdges]
  );

  // Delete nodes and any edges connected to them
  const handleNodesDelete = useCallback((deleted) => {
    // `deleted` is an array of node objects provided by React Flow's onNodesDelete
    const ids = new Set(deleted.map((d) => d.id));
    setNodes((nds) => nds.filter((n) => !ids.has(n.id)));
    setEdges((eds) => eds.filter((e) => !ids.has(e.source) && !ids.has(e.target)));
  }, [setNodes, setEdges]);

  const getSelectedNodes = useCallback(() => nodes.filter((n) => n.selected), [nodes]);

  const handleDeleteSelected = useCallback(() => {
    const selected = getSelectedNodes();
    if (!selected.length) return;
    const ids = new Set(selected.map((n) => n.id));
    setNodes((nds) => nds.filter((n) => !ids.has(n.id)));
    setEdges((eds) => eds.filter((e) => !ids.has(e.source) && !ids.has(e.target)));
    // selection state cleared by React Flow selection update
  }, [getSelectedNodes, setNodes, setEdges]);


  const handleDuplicateSelected = useCallback(() => {
    const selected = getSelectedNodes();
    if (!selected.length) return;
    const selectedIds = new Set(selected.map((n) => n.id));
    const idMap = {};
    const offset = 20;
    const newNodes = selected.map((n) => {
      const newId = getId();
      idMap[n.id] = newId;
      const updateNode = (nid, patch) => {
        setNodes((nds) => nds.map((node) => (node.id === nid ? { ...node, data: { ...node.data, ...patch } } : node)));
      };
      return { id: newId, type: n.type, position: { x: n.position.x + offset, y: n.position.y + offset }, data: { ...n.data, updateNode } };
    });

    const newEdges = edges
      .filter((e) => selectedIds.has(e.source) && selectedIds.has(e.target))
      .map((e) => ({ ...e, id: getId(), source: idMap[e.source], target: idMap[e.target] }));

    setNodes((nds) => [...nds, ...newNodes]);
    setEdges((eds) => [...eds, ...newEdges]);
  }, [getSelectedNodes, edges, setNodes, setEdges]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const cmd = e.ctrlKey || e.metaKey;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        handleDeleteSelected();
      }
      if (cmd && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleCopySelected();
      }
      if (cmd && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        handlePasteClipboard();
      }
      if (cmd && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        handleDuplicateSelected();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleDeleteSelected,  handleDuplicateSelected]);

  // Ensure existing nodes have an updateNode function so node components can call data.updateNode
  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.data && typeof n.data.updateNode === 'function') return n;
        const updateNode = (nid, patch) => {
          setNodes((inner) => inner.map((node) => (node.id === nid ? { ...node, data: { ...node.data, ...patch } } : node)));
        };
        return { ...n, data: { ...n.data, updateNode } };
      })
    );
  }, [setNodes]);

  const handleValidate = () => {
    const result = validateWorkflow(nodes, edges);
    if (result.isValid) {
      // keep simple for now — consumer can replace with snackbar/modal
      alert('Workflow is valid!');
    } else {
      alert(`Errors:\n${result.errors.join('\n')}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar onValidate={handleValidate} onAdd={handleAddNode} />
      <Box sx={{ position: 'absolute', left: 300, top: 12, zIndex: 50 }}>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" onClick={handleDeleteSelected}>
            Delete
          </Button>
          <Button variant="outlined" size="small" onClick={handleDuplicateSelected}>
            Duplicate
          </Button>
        </Stack>
      </Box>
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={(evt, node) => {
          // selecting node handled by react-flow; node components handle their own editing
        }}
        onNodesDelete={handleNodesDelete}
      />
    </Box>
  );
};

export default FlowChart;
