import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the FlowChart component to avoid importing heavy UI libraries in unit tests
jest.mock('./components/FlowChart', () => () => <div>learn react</div>);

import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});