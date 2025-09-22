import React from 'react';
import Box from '@mui/material/Box';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import { EmailNode } from '../DragableNodes/EmailNode';
import { WaitNode } from '../DragableNodes/WaitNode';
import { DecisionNode } from '../DragableNodes/DecisionNode';
import { UpdateProfileNode } from '../DragableNodes/UpdateProfileNode';
import { MessageNode } from '../DragableNodes/MessageNode';
import { AddVarient } from '../DragableNodes/AddVarient';
import { EntryRules } from '../DragableNodes/EntryRules';
import colors from '../../theme/colors';

const FlowCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onNodeClick, onNodesDelete, onEdgeDoubleClick, onInit }) => {
  const safeNodes = Array.isArray(nodes) ? nodes : (console.warn('[FlowCanvas] nodes is not an array, falling back to []'), []);
  const safeEdges = Array.isArray(edges) ? edges : (console.warn('[FlowCanvas] edges is not an array, falling back to []'), []);

  return (
    <Box sx={{ flex: 1, height: '100vh' }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        autoPanOnNodeFocus
        nodes={safeNodes}
        edges={safeEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onNodeClick={onNodeClick}
        onNodesDelete={onNodesDelete}
        deleteKeyCode={['Backspace', 'Delete']}
        onInit={onInit}
        nodeTypes={{
          emailNode: EmailNode,
          waitNode: WaitNode,
          decisionNode: DecisionNode,
          updateProfileNode: UpdateProfileNode,
          messageNode: MessageNode,
          addVarient: AddVarient,
          entryRules: EntryRules
        }}
        fitView
        style={{ width: '100%', height: '100%' }}
        defaultEdgeOptions={{
          style: {
            stroke: colors.primary.main,
            strokeWidth: 2.5,
            strokeLinecap: 'round',
          },
          animated: false,
          focusable: true,
          labelBgStyle: { fill: colors.grey[100], fillOpacity: 0.95, border: '1px solid red' },
          labelStyle: { fontWeight: 600, fontSize: 14, color: 'red' },
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
