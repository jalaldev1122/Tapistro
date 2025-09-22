import { validateWorkflow } from "../WorkflowValidator";


describe('validateWorkflow', () => {
  test('detects cycle', () => {
    const nodes = [
      { id: 'a', data: {} },
      { id: 'b', data: {} },
    ];
    const edges = [
      { source: 'a', target: 'b' },
      { source: 'b', target: 'a' },
    ];

    const res = validateWorkflow(nodes, edges);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.includes('Cycle detected'))).toBe(true);
  });

  test('email node missing template', () => {
    const nodes = [{ id: 'email1', type: 'emailNode', data: {} }];
    const edges = [];
    const res = validateWorkflow(nodes, edges);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.includes('missing a template'))).toBe(true);
  });

  test('wait node invalid duration', () => {
    const nodes = [{ id: 'wait1', type: 'waitNode', data: { duration: 'not-a-number' } }];
    const edges = [];
    const res = validateWorkflow(nodes, edges);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.includes('invalid duration'))).toBe(true);
  });

  test('orphan node produces warning', () => {
    const nodes = [{ id: 'n1', type: 'emailNode', data: { emailTemplateId: 't1' } }];
    const edges = [];
    const res = validateWorkflow(nodes, edges);
    expect(res.warnings.length).toBeGreaterThanOrEqual(1);
  });
});
