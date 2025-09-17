import React from 'react';
import Box from '@mui/material/Box';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import CustomNode from './CustomNode';
import EmailNode from './EmailNode';
import WaitNode from './WaitNode';
import DecisionNode from './DecisionNode';
import UpdateProfileNode from './UpdateProfileNode';

const FlowCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onNodeClick, onNodesDelete }) => {
  return (
    <Box sx={{ flex: 1, height: '100vh' }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodesDelete={onNodesDelete}
        nodeTypes={{
          customNode: CustomNode,
          emailNode: EmailNode,
          waitNode: WaitNode,
          decisionNode: DecisionNode,
          updateProfileNode: UpdateProfileNode,
        }}
        fitView
        style={{ width: '100%', height: '100%' }}
        elementsSelectable
      >
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};

export default FlowCanvas;
