import { screen, render } from '@testing-library/react';

import Comment from '../Comment';

describe('Comment Component', () => {
  it('should render with name and body', () => {
    const name = 'Test Name';
    const body = 'Test Comment';

    render(<Comment name={name} comment={body} />);

    const comment = screen.getByTestId('comment');

    expect(comment).toBeInTheDocument();
    expect(comment).toHaveTextContent(name);
    expect(comment).toHaveTextContent(body);
  });

  it("should render with user's avatar", () => {
    const name = 'Test Name';
    const body = 'Test Comment';

    render(<Comment name={name} comment={body} />);

    const commentImg = screen.getByTestId('comment-img');

    expect(commentImg).toBeInTheDocument();
    expect(commentImg).toHaveAttribute('src');
  });
});
