import { render, screen } from '@testing-library/react';
import Footer from './components/footer';


test('renders learn react link', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/Copyright © 2023-2024 Gaming-Cafe/i);
  expect(linkElement).toBeInTheDocument();
});