# Technical decisions — Visual Workflow Orchestration Builder

Summary
- UI: React + MUI for components and layout. The visual editor is implemented with `@xyflow/react` (a React Flow variant) using its `useNodesState`/`useEdgesState` helpers for local node/edge state and drag/drop behaviors.
- Validation & engine: Project contains `src/components/WorkflowValidator.js` (pure validator) and `src/utils/workflowEngine.js` (graph utilities, traversal, execution simulation). Both have unit tests.

Why these choices
- React Flow (`@xyflow/react`): mature visual graph editor with drag/drop, connect, and layout primitives. It keeps UI complexity low and lets us focus on node types and business rules.
- MUI: fast, accessible components and consistent design language for the builder controls and drawers.
- Local state via React Flow helpers: easy and integrated for node/edge editing inside the canvas. For small-to-medium builders this reduces boilerplate.

When to move to global state or state machines
- Use Redux/Zustand when the app needs cross-screen persistence, time-travel/undo-redo, or many components need synchronized workflow state.
- Use XState for orchestrating workflow execution, long-running processes (wait timers), or complex decision logic that benefits from a deterministic state machine.

What is implemented and coverage
- Validation: cycle detection, orphaned nodes, decision node outgoing checks, node-specific config checks (email template, wait duration), unreachable node detection when a start node exists. Exported pure function `validateWorkflow(nodes, edges)` covered by tests.
- Engine: adjacency builders, cycle detection, traversal (all paths), simulation executor with pluggable nodeHandlers and decisionResolver. Covered by tests in `src/utils/workflowEngine.test.js`.

Edge cases handled
- Circular dependencies: detected and reported as errors.
- Orphaned nodes and unreachable nodes: reported as warnings.
- Invalid node configuration: reported with clear messages per node type.

Small gaps and recommended next steps
- Persisting workflows (localStorage / backend API) and load/save UI.
- Undo/redo support (use Redux or a dedicated undo stack) for better editing UX.
- Formalize state management: adopt Zustand for a compact global store or Redux Toolkit if more structure is needed.
- Use XState for runtime execution orchestration if you plan to execute workflows beyond simulation (timers, retries, long-running jobs).
- Add integration/E2E tests for drag/drop and connection flows (Cypress / Playwright).
- Add TypeScript or stronger PropTypes to improve maintainability.

How to run tests
- Install dependencies: `npm install`
- Run tests: `npm test` or `npx jest --runInBand`

Contact
- If you want, I can: add persistence, wire a minimal Redux/Zustand store, or convert the executor to XState and add more tests. Tell me which next step you'd like.
