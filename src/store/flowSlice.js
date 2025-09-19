import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveFlow = createAsyncThunk('flow/save', async (flow) => {
  localStorage.setItem('savedFlow', JSON.stringify(flow));
  return { savedAt: Date.now() };
});

const initialState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  lastChangeAt: null,
  savedAt: null,
};

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setFlow(state, action) {
      const { nodes, edges } = action.payload;
      state.nodes = nodes;
      state.edges = edges;
      state.lastChangeAt = Date.now();
    },
    setNodes(state, action) {
      state.nodes = action.payload;
      state.lastChangeAt = Date.now();
    },
    setEdges(state, action) {
      state.edges = action.payload;
      state.lastChangeAt = Date.now();
    },
    addNode(state, action) {
      state.nodes.push(action.payload);
      state.lastChangeAt = Date.now();
    },
    updateNode(state, action) {
      const idx = state.nodes.findIndex((n) => n.id === action.payload.id);
      if (idx !== -1) {
        const node = state.nodes[idx];
        const patch = { ...action.payload };
        delete patch.id;
        node.data = { ...(node.data || {}), ...(patch.data || patch) };
        state.nodes[idx] = { ...node };
      }
      state.lastChangeAt = Date.now();
    },
    removeNode(state, action) {
      state.nodes = state.nodes.filter((n) => n.id !== action.payload);
      state.edges = state.edges.filter((e) => e.source !== action.payload && e.target !== action.payload);
      state.lastChangeAt = Date.now();
    },
    addEdge(state, action) {
      state.edges.push(action.payload);
      state.lastChangeAt = Date.now();
    },
    updateEdge(state, action) {
      const idx = state.edges.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) state.edges[idx] = { ...state.edges[idx], ...action.payload };
      state.lastChangeAt = Date.now();
    },
    removeEdge(state, action) {
      state.edges = state.edges.filter((e) => e.id !== action.payload);
      state.lastChangeAt = Date.now();
    },
    selectNode(state, action) {
      state.selectedNodeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveFlow.fulfilled, (state, action) => {
      state.savedAt = action.payload.savedAt;
    });
  },
});

export const {
  setFlow,
  setNodes,
  setEdges,
  addNode,
  updateNode,
  removeNode,
  addEdge,
  updateEdge,
  removeEdge,
  selectNode,
} = flowSlice.actions;

export default flowSlice.reducer;
