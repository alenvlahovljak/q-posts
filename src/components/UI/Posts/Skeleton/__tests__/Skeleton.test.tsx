import { screen, render } from '@testing-library/react';

import Skeleton from '../Skeleton';

describe('Posts.Skeleton Component', () => {
  it('should render with username', () => {
    const username = 'Test Username';
    const clearMock = jest.fn();

    render(<Skeleton username={username} clear={clearMock} />);

    const postsSkeleton = screen.getByTestId('posts-skeleton');
    const clearButton = screen.getByText('Clear search!');

    expect(postsSkeleton).toBeInTheDocument();
    expect(postsSkeleton).toHaveTextContent(username);
    expect(clearMock).not.toHaveBeenCalled();

    clearButton.click();

    expect(clearMock).toHaveBeenCalled();
  });
});
