import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { humanize, findNodeForMessage as findNodeForMessageHelper } from '../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { setNodes, setEdges, addNode, addEdge, updateNode, removeNode, removeEdge } from '../store/flowSlice';
import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import useWorkflowValidator from './WorkflowValidator';
import Sidebar from './Sidebar';
import FlowCanvas from './FlowCanvas';
import ValidationDialog from './ValidationDialog';

let id = 1;
const getId = () => `node_${id++}`;

const FlowChart = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((s) => s.flow.nodes);
  const edges = useSelector((s) => s.flow.edges);

  const onNodesChange = useCallback((changes) => {
    if (!Array.isArray(changes)) return;

    const first = changes[0];
    const looksLikeChange = first && typeof first.type === 'string';

    if (looksLikeChange) {
      const next = applyNodeChanges(changes, nodes || []);
      dispatch(setNodes(next));
    } else {
      // assume full nodes array
      dispatch(setNodes(changes));
    }
  }, [dispatch, nodes]);

  const onEdgesChange = useCallback((changes) => {
    if (!Array.isArray(changes)) return;

    const first = changes[0];
    const looksLikeChange = first && typeof first.type === 'string';

    if (looksLikeChange) {
      const next = applyEdgeChanges(changes, edges || []);
      dispatch(setEdges(next));
    } else {
      dispatch(setEdges(changes));
    }
  }, [dispatch, edges]);
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

      const newNode = {
        id: nodeId,
        type,
        position,
        data: {
          label: labelMap[type] || humanize(type) || `Node ${nodeId}`,
          ...(type === 'emailNode' && { emailTemplateId: '' }),
          ...(type === 'waitNode' && { duration: 1 }),
        },
      };

      dispatch(addNode(newNode));
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

    dispatch(addEdge(newEdge));
  }, [dispatch]);

  const onEdgeDoubleClick = useCallback((event, edge) => {
    const current = edge.label || edge.data?.condition || '';
    const next = window.prompt('Edit condition label for this branch', current);
    if (next !== null) {
      dispatch(setEdges(edges.map((e) => (e.id === edge.id ? { ...e, label: next, data: { ...e.data, condition: next } } : e))));
    }
  }, [dispatch, edges]);

  const handleNodesDelete = useCallback((deleted) => {
    const ids = new Set(deleted.map((d) => d.id));
    deleted.forEach((d) => dispatch(removeNode(d.id)));
  }, [dispatch]);


  const handleValidate = () => {
    const result = validateWorkflow(nodes, edges);
    setValidationResult(result);
    setValidationOpen(true);
  };

  const closeValidation = () => {
    setValidationOpen(false);
  };

  const reactFlowRef = React.useRef(null);

  const setReactFlowInstance = (rfi) => {
    reactFlowRef.current = rfi;
  };

  const highlightNode = (nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || !reactFlowRef.current) return;
    const pos = node.position || { x: 0, y: 0 };
    try {
      if (typeof reactFlowRef.current.setCenter === 'function') {
        reactFlowRef.current.setCenter(pos.x, pos.y, { duration: 400 });
      } else if (typeof reactFlowRef.current.setViewport === 'function') {
        reactFlowRef.current.setViewport({ x: pos.x, y: pos.y }, { duration: 400 });
      } else if (typeof reactFlowRef.current.fitView === 'function') {
        reactFlowRef.current.fitView({ padding: 0.2, includeNodes: [node] });
      }
    } catch (err) {
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
        findNodeForMessage={(msg) => findNodeForMessageHelper(nodes, msg)}
        highlightNode={highlightNode}
      />
    </Box>
  );
};

export default FlowChart;
