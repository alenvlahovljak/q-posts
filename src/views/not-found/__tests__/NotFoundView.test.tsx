import { render, screen } from '@testing-library/react';

import NotFoundView from '../index';

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<NotFoundView />);

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
