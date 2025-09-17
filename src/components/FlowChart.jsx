import React, { useCallback, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { addEdge, useNodesState, useEdgesState } from '@xyflow/react';
import useWorkflowValidator from './WorkflowValidator';
import Sidebar from './Sidebar';
import FlowCanvas from './FlowCanvas';

let id = 1;
const getId = () => `node_${id++}`;

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { validateWorkflow } = useWorkflowValidator();

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


  const handleValidate = () => {
    const result = validateWorkflow(nodes, edges);
    if (result.isValid) {
      alert('Workflow is valid!');
    } else {
      alert(`Errors:\n${result.errors.join('\n')}`);
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
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodesDelete={handleNodesDelete}
      />
    </Box>
  );
};

export default FlowChart;
