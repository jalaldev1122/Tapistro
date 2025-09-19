import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { addEdge, useNodesState, useEdgesState } from '@xyflow/react';
import useWorkflowValidator from './WorkflowValidator';
import Sidebar from './Sidebar';
import FlowCanvas from './FlowCanvas';
import ValidationDialog from './ValidationDialog';

let id = 1;
const getId = () => `node_${id++}`;

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { validateWorkflow } = useWorkflowValidator();
  const [validationOpen, setValidationOpen] = useState(false);
  const [validationResult, setValidationResult] = useState({ errors: [], warnings: [] });

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const nodeId = getId();
      // friendly labels for node types
      const labelMap = {
        emailNode: 'Email',
        messageNode: 'Message',
        waitNode: 'Delay',
        decisionNode: 'Decision Split',
        updateProfileNode: 'Update Profile',
        actionPath: 'Action Path',
        experimentPath: 'Experiment Path',
        addVarient: 'Add Variant',
        entryRules: 'Entry Rules',
        customNode: 'Custom',
      };

      const humanize = (s) => {
        if (!s) return s;
        // camelCase or snake/kebab -> Title Case
        const words = s
          .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
          .replace(/[-_]/g, ' ')
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
        return words.join(' ');
      };
      const updateNode = (nid, patch) => {
        setNodes((nds) => nds.map((n) => (n.id === nid ? { ...n, data: { ...n.data, ...patch } } : n)));
      };

      const newNode = {
        id: nodeId,
        type,
        position,
        data: {
          label: labelMap[type] || humanize(type) || `Node ${nodeId}`,
          ...(type === 'emailNode' && { emailTemplateId: '' }),
          ...(type === 'waitNode' && { duration: 1 }),
          updateNode,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );


  const onConnect = useCallback((params) => {
    const handleLabelMap = { yes: 'Yes', no: 'No' };
    const defaultLabel = handleLabelMap[params.sourceHandle] || '';

    const newEdge = {
      ...params,
      id: getId(),
      label: defaultLabel,
      animated: false,
      data: { condition: defaultLabel },
      labelBgStyle: { fill: '#fff', fillOpacity: 0.9 },
      labelBgPadding: [6, 2],
      labelStyle: { fontWeight: 600, fontSize: 12 },
    };

    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  const onEdgeDoubleClick = useCallback((event, edge) => {
    const current = edge.label || edge.data?.condition || '';
    const next = window.prompt('Edit condition label for this branch', current);
    if (next !== null) {
      setEdges((eds) => eds.map((e) => (e.id === edge.id ? { ...e, label: next, data: { ...e.data, condition: next } } : e)));
    }
  }, [setEdges]);

  const handleNodesDelete = useCallback((deleted) => {
    const ids = new Set(deleted.map((d) => d.id));
    setNodes((nds) => nds.filter((n) => !ids.has(n.id)));
    setEdges((eds) => eds.filter((e) => !ids.has(e.source) && !ids.has(e.target)));
  }, [setNodes, setEdges]);


  const handleValidate = () => {
    const result = validateWorkflow(nodes, edges);
    setValidationResult(result);
    setValidationOpen(true);
  };

  const closeValidation = () => {
    setValidationOpen(false);
  };


  const findNodeForMessage = (msg) => {
    // try to find a node id mentioned in the message by exact id or label
    for (let n of nodes) {
      if (msg.includes(n.id)) return n.id;
      const label = n.data?.label || '';
      if (label && msg.includes(label)) return n.id;
    }
    return null;
  };

  // react flow instance ref will be populated by FlowCanvas via onInit
  const reactFlowRef = React.useRef(null);

  const setReactFlowInstance = (rfi) => {
    reactFlowRef.current = rfi;
  };

  const highlightNode = (nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || !reactFlowRef.current) return;
    const pos = node.position || { x: 0, y: 0 };
    // try to center the view on the node; some reactflow instances expose setCenter
    try {
      if (typeof reactFlowRef.current.setCenter === 'function') {
        reactFlowRef.current.setCenter(pos.x, pos.y, { duration: 400 });
      } else if (typeof reactFlowRef.current.setViewport === 'function') {
        reactFlowRef.current.setViewport({ x: pos.x, y: pos.y }, { duration: 400 });
      } else if (typeof reactFlowRef.current.fitView === 'function') {
        reactFlowRef.current.fitView({ padding: 0.2, includeNodes: [node] });
      }
    } catch (err) {
      // best effort - ignore errors
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar onValidate={handleValidate} />
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodesDelete={handleNodesDelete}
        onInit={setReactFlowInstance}
      />
      <ValidationDialog
        open={validationOpen}
        onClose={closeValidation}
        validationResult={validationResult}
        findNodeForMessage={findNodeForMessage}
        highlightNode={highlightNode}
      />
    </Box>
  );
};

export default FlowChart;
