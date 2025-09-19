import React from 'react';
import Box from '@mui/material/Box';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import EmailNode from './nodes/EmailNode';
import WaitNode from './nodes/WaitNode';
import DecisionNode from './nodes/DecisionNode';
import UpdateProfileNode from './nodes/UpdateProfileNode';
import MessageNode from './nodes/MessageNode';
import AddVarient from './nodes/AddVarient';
import EntryRules from './nodes/EntryRules';
import CustomNode from './nodes/CustomNode';

const FlowCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onNodeClick, onNodesDelete, onEdgeDoubleClick, onInit }) => {
  return (
    <Box sx={{ flex: 1, height: '100vh' }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onNodeClick={onNodeClick}
        onNodesDelete={onNodesDelete}
        onInit={onInit}
        nodeTypes={{
          customNode: CustomNode,
          emailNode: EmailNode,
          waitNode: WaitNode,
          decisionNode: DecisionNode,
          updateProfileNode: UpdateProfileNode,
          messageNode: MessageNode,
          addVarient: AddVarient,
          entryRules:EntryRules
        }}
        fitView
        style={{ width: '100%', height: '100%' }}
        defaultEdgeOptions={{
          style: {
            stroke: '#7d22d8',
            strokeWidth: 2.5,
            strokeLinecap: 'round',
          },
          animated: false,
          labelBgStyle: { fill: '#fff', fillOpacity: 0.95 },
          labelStyle: { fontWeight: 600, fontSize: 12, color: '#111827' },
        }}
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
