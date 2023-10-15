import { screen, render } from '@testing-library/react';

import { CommonPost, UserPost } from '../Post';

describe('Posts.<CommonPost | UserPost> Component', () => {
  it('should render with title and description', () => {
    const id = 1;
    const userId = 1;
    const title = 'Test Title';
    const description = 'Test Description';

    render(<CommonPost id={id} title={title} userId={userId} description={description} />);

    const post = screen.getByTestId('post');

    expect(post).toBeInTheDocument();
    expect(post).toHaveTextContent(title);
    expect(post).toHaveTextContent(description);
  });

  it('should render with title and description', () => {
    const id = 1;
    const title = 'Test Title';
    const description = 'Test Description';
    const username = 'Test Username';
    const fullName = 'Test Full Name';
    const city = 'Test City';

    render(
      <UserPost
        id={id}
        title={title}
        description={description}
        username={username}
        fullName={fullName}
        city={city}
      />
    );

    const post = screen.getByTestId('post');

    expect(post).toBeInTheDocument();
    expect(post).toHaveTextContent(title);
    expect(post).toHaveTextContent(description);
    expect(post).toHaveTextContent(username);
    expect(post).toHaveTextContent(fullName);
    expect(post).toHaveTextContent(city);
  });
});
