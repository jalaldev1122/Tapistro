import {
  getNextNodes,
  detectCircularDependencies,
  getOrphanedNodes,
  traverseWorkflow,
  validateWorkflow,
} from './workflowEngine';

describe('workflowEngine utilities', () => {
  test('getNextNodes returns correct targets', () => {
    const edges = [{ source: 'a', target: 'b' }, { source: 'a', target: 'c' }, { source: 'b', target: 'd' }];
    expect(getNextNodes('a', edges)).toEqual(['b', 'c']);
    expect(getNextNodes('b', edges)).toEqual(['d']);
  });

  test('detectCircularDependencies finds cycles', () => {
    const nodes = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    const edges = [{ source: 'a', target: 'b' }, { source: 'b', target: 'c' }, { source: 'c', target: 'a' }];
    const res = detectCircularDependencies(nodes, edges);
    expect(res.hasCycle).toBe(true);
    expect(res.cycles.length).toBeGreaterThan(0);
  });

  test('getOrphanedNodes returns truly isolated nodes', () => {
    const nodes = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    const edges = [{ source: 'a', target: 'b' }];
    const orphans = getOrphanedNodes(nodes, edges);
    expect(orphans.map((o) => o.id)).toEqual(expect.arrayContaining(['c']));
    expect(orphans.map((o) => o.id)).not.toContain('a');
  });

  test('traverseWorkflow finds all paths', () => {
    const nodes = [{ id: 's' }, { id: 'a' }, { id: 'b' }, { id: 't' }];
    const edges = [{ source: 's', target: 'a' }, { source: 's', target: 'b' }, { source: 'a', target: 't' }, { source: 'b', target: 't' }];
    const paths = traverseWorkflow('s', nodes, edges);
    // expect two paths: s->a->t and s->b->t
    expect(paths.length).toBe(2);
    expect(paths).toEqual(expect.arrayContaining([['s', 'a', 't'], ['s', 'b', 't']]));
  });

  test('validateWorkflow returns errors for bad nodes and warns about missing start', () => {
    const nodes = [
      { id: 'email1', type: 'emailNode', data: {} },
      { id: 'wait1', type: 'waitNode', data: { duration: 'abc' } },
    ];
    const edges = [];
    const res = validateWorkflow(nodes, edges);
    expect(res.isValid).toBe(false);
    expect(res.errors.length).toBeGreaterThan(0);
    expect(res.warnings.some((w) => w.includes('No start node'))).toBe(true);
  });
});
