import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { container } = render(<App />);
  console.log(container.innerHTML); // Logs the HTML structure
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});