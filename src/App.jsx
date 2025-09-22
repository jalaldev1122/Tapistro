import React, { useEffect } from 'react';
import { FlowChart } from './components/Flow/FlowChart'
import '@xyflow/react/dist/style.css';
import { useDispatch } from 'react-redux';
import { setEdges, setNodes } from './store/slices/workflowSlice';

function App() {
  const dispatch = useDispatch();

useEffect(() => {
  try {
    const saved = localStorage.getItem('savedFlow');
    if (!saved) return;
    const parsed = JSON.parse(saved);
    dispatch(setNodes(parsed.nodes || []));
    dispatch(setEdges(parsed.edges || []));
  } catch (error) {
    console.error('Failed to load saved flow from localStorage:', error);
  }
}, [dispatch]);

  return (
    <FlowChart />
  )
}

export default App
