import { render, screen } from '@testing-library/react';
import App from '../../App';

it('should have "Hello World!" text', () => {
  render(<App />);

  expect(screen.getByText('Hello World!')).toBeInTheDocument();
});
