import { render, screen } from '@testing-library/react';
import App from './App';

test('renders check SEEDS title', () => {
  render(<App />);
  const linkElement = screen.getByText(/SEEDS/i);
  expect(linkElement).toBeInTheDocument();
});
