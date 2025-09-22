import { addEdge } from '@xyflow/react';

describe('edge labeling mapping', () => {
  test('yes handle maps to Yes label', () => {
    const params = { source: 'n1', target: 'n2', sourceHandle: 'yes' };
    const handleLabelMap = { yes: 'Yes', no: 'No' };
    const defaultLabel = handleLabelMap[params.sourceHandle] || '';
    const newEdge = { ...params, id: 'edge1', label: defaultLabel };
    expect(newEdge.label).toBe('Yes');
  });

  test('no handle maps to No label', () => {
    const params = { source: 'n1', target: 'n2', sourceHandle: 'no' };
    const handleLabelMap = { yes: 'Yes', no: 'No' };
    const defaultLabel = handleLabelMap[params.sourceHandle] || '';
    const newEdge = { ...params, id: 'edge2', label: defaultLabel };
    expect(newEdge.label).toBe('No');
  });
});
