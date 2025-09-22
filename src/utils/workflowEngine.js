/**
 * Workflow engine utilities
 *
 * Exports:
 * - getNextNodes(nodeId, edges)
 * - detectCircularDependencies(nodes, edges)
 * - getOrphanedNodes(nodes, edges)
 * - traverseWorkflow(startNodeId, nodes, edges)
 * - validateWorkflow(nodes, edges)
 * - executeWorkflow(startNodeId, nodes, edges, options)
 *
 * These functions operate on plain arrays of nodes and edges (the shape used in your
 * Zustand store). Nodes are expected to be objects with at least { id, type, data }.
 * Edges are expected to be objects with at least { id, source, target }.
 */

/**
 * Build adjacency and reverse adjacency maps from edges.
 * @param {Array} nodes
 * @param {Array} edges
 * @returns {{ adjacency: Map<string,string[]>, reverseAdj: Map<string,string[]> }}
 */


const buildAdjacency = (nodes = [], edges = []) => {
  const adjacency = new Map();
  const reverseAdj = new Map();

  nodes.forEach((n) => {
    adjacency.set(n.id, []);
    reverseAdj.set(n.id, []);
  });

  edges.forEach((e) => {
    if (!adjacency.has(e.source)) adjacency.set(e.source, []);
    if (!reverseAdj.has(e.target)) reverseAdj.set(e.target, []);
    adjacency.get(e.source).push(e.target);
    reverseAdj.get(e.target).push(e.source);
  });

  return { adjacency, reverseAdj };
}

/**
 * Returns direct next node ids for a given nodeId.
 * @param {string} nodeId
 * @param {Array} edges
 * @returns {string[]}
 */
export const getNextNodes = (nodeId, edges = []) => {
  return edges.filter((e) => e.source === nodeId).map((e) => e.target);
}

/**
 * Detect circular dependencies in the directed graph using DFS.
 * Returns an object with hasCycle boolean and list of cycles (each cycle is array of node ids).
 * @param {Array} nodes
 * @param {Array} edges
 * @returns {{ hasCycle: boolean, cycles: Array<string[]> }}
 */
export const detectCircularDependencies = (nodes = [], edges = []) => {
  const { adjacency } = buildAdjacency(nodes, edges);
  const visited = new Set();
  const onStack = new Set();
  const cycles = [];

  const dfs = (nodeId, path = []) => {
    if (onStack.has(nodeId)) {
      const idx = path.indexOf(nodeId);
      const cycle = idx >= 0 ? path.slice(idx).concat(nodeId) : path.concat(nodeId);
      cycles.push(cycle);
      return true;
    }

    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    onStack.add(nodeId);
    const neighbors = adjacency.get(nodeId) || [];
    for (let nbr of neighbors) {
      if (dfs(nbr, path.concat(nodeId))) {
      }
    }
    onStack.delete(nodeId);
    return false;
  };

  for (let n of nodes) {
    if (!visited.has(n.id)) dfs(n.id, []);
  }

  return { hasCycle: cycles.length > 0, cycles };
}

/**
 * Return nodes that have no incoming and no outgoing edges (completely isolated).
 * @param {Array} nodes
 * @param {Array} edges
 * @returns {Array} 
 */
export const getOrphanedNodes=(nodes = [], edges = [])=> {
  const { adjacency, reverseAdj } = buildAdjacency(nodes, edges);
  return nodes.filter((n) => {
    const out = adjacency.get(n.id) || [];
    const incoming = reverseAdj.get(n.id) || [];
    return out.length === 0 && incoming.length === 0;
  });
}

/**
 * Traverse the workflow and return all possible paths starting from startNodeId to any terminal node
 * (a node with no outgoing edges).
 * This prevents infinite loops by tracking visited nodes per path.
 *
 * Returns an array of paths, each path is an array of node ids in visitation order.
 *
 * @param {string} startNodeId
 * @param {Array} nodes
 * @param {Array} edges
 * @param {Object} [opts]
 * @param {number} [opts.maxDepth] - optional safety cap to avoid huge graphs
 */
export const traverseWorkflow=(startNodeId, nodes = [], edges = [], opts = {})=> {
  const { adjacency } = buildAdjacency(nodes, edges);
  const maxDepth = opts.maxDepth || nodes.length + 10;
  const results = [];

  const dfs = (currentId, path = new Set(), seq = []) => {
    if (seq.length > maxDepth) return;
    if (path.has(currentId)) {
      return;
    }
    path.add(currentId);
    seq.push(currentId);

    const neighbors = adjacency.get(currentId) || [];
    if (!neighbors || neighbors.length === 0) {
      results.push([...seq]);
    } else {
      for (let nbr of neighbors) {
        dfs(nbr, new Set(path), [...seq]);
      }
    }
  };

  if (!startNodeId) return [];
  dfs(startNodeId);
  return results;
}

/**
 * Enhanced workflow validation that wraps basic checks and returns structured errors/warnings.
 * Rules implemented here:
 * - No circular dependencies
 * - Start node exists (type 'start')
 * - At least one terminal node exists (nodes with no outgoing edges)
 * - Decision nodes must have >= 2 outgoing edges
 * - Node-specific config checks (emailNode, waitNode, etc.)
 * - Report orphaned nodes (isolated)
 * - Report nodes unreachable from start (if start exists)
 *
 * @param {Array} nodes
 * @param {Array} edges
 * @returns {{ isValid: boolean, errors: string[], warnings: string[], orphaned: Array }}
 */
export const validateWorkflow=(nodes = [], edges = [])=> {
  const errors = [];
  const warnings = [];
  const orphaned = getOrphanedNodes(nodes, edges);


  const cyclesRes = detectCircularDependencies(nodes, edges);
  if (cyclesRes.hasCycle) {
    errors.push(`Cycle(s) detected: ${cyclesRes.cycles.map((c) => c.join(' -> ')).join(' ; ')}`);
  }


  const starts = nodes.filter((n) => n.type === 'start');
  if (starts.length === 0) {
    warnings.push('No start node found (type: "start"). Add at least one start node.');
  }


  const { adjacency } = buildAdjacency(nodes, edges);
  const terminals = nodes.filter((n) => (adjacency.get(n.id) || []).length === 0);
  if (terminals.length === 0) {
    warnings.push('No terminal (end) node found - ensure there is at least one node with no outgoing edges.');
  }


  nodes.forEach((node) => {
    const type = node.type;
    const data = node.data || {};
    switch (type) {
      case 'emailNode':
      case 'sendEmail':
        if (!data.emailTemplateId) {
          errors.push(`Email node "${node.id}" is missing an emailTemplateId in its data.`);
        }
        break;
      case 'waitNode':
        if (!data.duration || isNaN(Number(data.duration))) {
          errors.push(`Wait node "${node.id}" must have a numeric duration.`);
        }
        break;
      case 'decisionNode':
      case 'decisionSplit': {
        const outgoing = adjacency.get(node.id) || [];
        if (outgoing.length < 2) {
          errors.push(`Decision node "${node.id}" must have at least two outgoing edges.`);
        }
        break;
      }
      default:
        break;
    }
  });

  if (starts.length > 0) {
    const reachable = new Set();
    const queue = [];
    starts.forEach((s) => queue.push(s.id));
    while (queue.length) {
      const id = queue.shift();
      if (reachable.has(id)) continue;
      reachable.add(id);
      const next = adjacency.get(id) || [];
      next.forEach((nId) => {
        if (!reachable.has(nId)) queue.push(nId);
      });
    }

    const unreachable = nodes.filter((n) => !reachable.has(n.id));
    if (unreachable.length > 0) {
      warnings.push(`Unreachable nodes found: ${unreachable.map((n) => n.id).join(', ')}`);
    }
  }


  if (orphaned.length > 0) {
    warnings.push(`Orphaned nodes (no in/out): ${orphaned.map((n) => n.id).join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    orphaned,
  };
}

/**
 * Execute (simulate) the workflow starting from startNodeId.
 *
 * Options:
 * - nodeHandlers: { [nodeType]: async function(node, context) } custom execution logic per node type.
 * - decisionResolver: async function(node, context) that returns the chosen target node id for decision nodes.
 * - mode: 'singlePath' (default) | 'allPaths' - whether to execute a single decision-resolved path or all possible paths.
 * - logger: function to receive progress messages
 *
 * The executor returns a result object { success, paths: Array, errors: Array }
 */
export  const executeWorkflow= async(startNodeId, nodes = [], edges = [], options = {})=> {
  const { adjacency } = buildAdjacency(nodes, edges);
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const nodeHandlers = options.nodeHandlers || {};
  const decisionResolver = options.decisionResolver || (async (node, ctx, outgoing) => outgoing[0]);
  const logger = options.logger || (() => { });
  const mode = options.mode || 'singlePath';

  const errors = [];
  const executedPaths = [];

  const execPath = async (path) => {
    const context = { outputs: {} };
    for (let nodeId of path) {
      const node = nodeMap.get(nodeId);
      if (!node) {
        const err = `Node ${nodeId} not found during execution.`;
        errors.push(err);
        logger(err);
        break;
      }
      const handler = nodeHandlers[node.type];
      try {
        logger(`Executing ${nodeId} (${node.type})`);
        if (handler) {
          const res = await handler(node, context);
          if (res !== undefined) context.outputs[nodeId] = res;
        } else {
          context.outputs[nodeId] = { executed: true };
        }
      } catch (e) {
        const err = `Error executing node ${nodeId}: ${e?.message || e}`;
        errors.push(err);
        logger(err);
        break;
      }
    }
    return { path, context };
  };

  if (mode === 'allPaths') {
    const paths = traverseWorkflow(startNodeId, nodes, edges);
    for (let p of paths) {
      const r = await execPath(p);
      executedPaths.push(r);
    }
  } else {
    const path = [];
    let current = startNodeId;
    const visited = new Set();
    while (current) {
      if (visited.has(current)) {
        errors.push(`Cycle detected during execution at node ${current}. Aborting.`);
        break;
      }
      visited.add(current);
      path.push(current);

      const outgoing = adjacency.get(current) || [];
      if (!outgoing || outgoing.length === 0) {
        break;
      }

      const currentNode = nodeMap.get(current);
      if (currentNode && (currentNode.type === 'decisionNode' || currentNode.type === 'decisionSplit')) {
        try {
          const chosen = await decisionResolver(currentNode, { path, nodes, edges }, outgoing);
          if (!chosen) {
            errors.push(`Decision resolver returned falsy for node ${current}.`);
            break;
          }
          if (!outgoing.includes(chosen)) {
            errors.push(`Decision resolver returned invalid target ${chosen} for node ${current}.`);
            break;
          }
          current = chosen;
        } catch (e) {
          errors.push(`Decision resolver error at node ${current}: ${e?.message || e}`);
          break;
        }
      } else {
        current = outgoing[0];
      }
    }

    const r = await execPath(path);
    executedPaths.push(r);
  }

  return { success: errors.length === 0, paths: executedPaths, errors };
}

export default {
  getNextNodes,
  detectCircularDependencies,
  getOrphanedNodes,
  traverseWorkflow,
  validateWorkflow,
  executeWorkflow,
};
