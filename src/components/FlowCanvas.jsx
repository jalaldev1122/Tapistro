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
import FreeNode from './FreeNode';
import MessageNode from './MessageNode';
import AddVarient from './AddVarient';
import EntryRules from './EntryRules';

const FlowCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onNodeClick, onNodesDelete, onEdgeDoubleClick }) => {
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
        nodeTypes={{
          customNode: CustomNode,
          messageNode: EmailNode,
          emailNode: EmailNode,
          waitNode: WaitNode,
          decisionNode: DecisionNode,
          freeNode: FreeNode,
          updateProfileNode: UpdateProfileNode,
          messageNode:MessageNode,
          addVarient: AddVarient,
          entryRules:EntryRules
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
