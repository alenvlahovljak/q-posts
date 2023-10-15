import { screen, render } from '@testing-library/react';

import Search from '../Search';

describe('Search Component', () => {
  it('should get render component', () => {
    const onSearchMock = jest.fn();

    render(<Search onSearch={onSearchMock} />);

    const input = screen.getByTestId('input');

    expect(input).toBeInTheDocument();
  });
});
