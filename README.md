# Tapistro: Visual Workflow Builder

A drag-and-drop editor for building marketing and engagement workflows. You place entry rules, emails, messages, waits, decisions and A/B variants on a canvas, connect them with labelled branches, and validate the graph before it runs.

**Stack:** React 19 · Redux Toolkit · @xyflow/react · Material UI 7 · Vite 7 · Jest + React Testing Library

---

## What it does

- **Drag-and-drop canvas.** Seven node types (Entry Rules, Email, Message, Wait, Decision, Update Profile, Add Variant) drag from a sidebar onto an @xyflow/react canvas.
- **Conditional branching.** Edges leaving a Decision node carry condition labels, which you set in a dialog when connecting nodes.
- **Validation before run.** A pure `validateWorkflow(nodes, edges)` sorts problems into errors and warnings. The validation dialog lists them and highlights the nodes involved.
- **Run simulation.** `executeWorkflow` walks the graph from the start node using pluggable node handlers and a decision resolver, so a flow can be dry-run without a backend.
- **Save and load.** Flows are saved to localStorage and restored when the app loads.

## Validation rules

| Check | Severity |
|---|---|
| Circular dependencies (cycle detection) | Error |
| Decision node missing outgoing branches | Error |
| Invalid node config (e.g. email without a template, wait without a duration) | Error |
| Orphaned nodes with no connections | Warning |
| Nodes unreachable from the start node | Warning |

## Architecture

```
src/
  components/
    Flow/            Canvas and flow chart (xyflow), save/load
    DragableNodes/   Sidebar palette items
    nodes/           Rendered node components on the canvas
    Dialog/          Edge-label and validation dialogs
  store/             Redux Toolkit store + workflowSlice
  utils/
    workflowEngine.js     Adjacency, cycle detection, traversal, simulated execution
    WorkflowValidator.js  Pure validation rules
    __test__/             Jest unit tests
```

The graph logic in `utils/` is written as **pure functions with no React or DOM dependencies**. That keeps the rules easy to unit-test and means the same engine could run in a backend worker later. The UI layer only renders nodes and edges and hands them to these functions. More detail on the reasoning is in [TECH_DECISION.md](TECH_DECISION.md).

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm test         # run the Jest suite
npm run build    # production build
```

## Tests

Jest covers the engine (cycle detection, traversal, execution), the validator, and edge labelling.

## Next steps

- Undo/redo with a history stack in the Redux slice
- A backend API for saved workflows in place of localStorage
- An XState-based runtime for real execution with timers and retries
- Playwright end-to-end tests for drag, drop and connect
- A TypeScript migration
