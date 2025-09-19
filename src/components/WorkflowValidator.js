
import { useCallback } from 'react';


export function validateWorkflow(nodes = [], edges = []) {
  const errors = [];
  const warnings = [];

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const adjacencyList = new Map();

  nodes.forEach((node) => {
    adjacencyList.set(node.id, []);
  });

  edges.forEach((edge) => {
    if (adjacencyList.has(edge.source)) {
      adjacencyList.get(edge.source).push(edge.target);
    }
  });

  const visited = new Set();
  const recStack = new Set();

  const hasCycle = (nodeId) => {
    if (!visited.has(nodeId)) {
      visited.add(nodeId);
      recStack.add(nodeId);

      const neighbors = adjacencyList.get(nodeId) || [];
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor) && hasCycle(neighbor)) {
          return true;
        } else if (recStack.has(neighbor)) {
          return true;
        }
      }
    }
    recStack.delete(nodeId);
    return false;
  };

  for (let nodeId of adjacencyList.keys()) {
    if (hasCycle(nodeId)) {
      errors.push(`Cycle detected starting at node ${nodeId}`);
      break;
    }
  }

  const connectedNodeIds = new Set();
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  nodes.forEach((node) => {
    if (!connectedNodeIds.has(node.id)) {
      warnings.push(`Node "${node.data?.label || node.id}" is not connected.`);
    }
  });

  nodes.forEach((node) => {
    const type = node.type;
    const data = node.data || {};

    switch (type) {
      case 'emailNode':
        if (!data.emailTemplateId) {
          errors.push(`Email node "${node.id}" is missing a template.`);
        }
        break;
      case 'waitNode':
        if (!data.duration || isNaN(data.duration)) {
          errors.push(`Wait node "${node.id}" has invalid duration.`);
        }
        break;
      case 'decisionNode': {
        const outgoing = edges.filter((e) => e.source === node.id);
        if (outgoing.length < 2) {
          errors.push(`Decision node "${node.id}" must have at least two outgoing paths.`);
        }
        break;
      }
      default:
        break;
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

const useWorkflowValidator = () => {
  const wrapped = useCallback((nodes, edges) => validateWorkflow(nodes, edges), []);
  return { validateWorkflow: wrapped };
};

export default useWorkflowValidator;
