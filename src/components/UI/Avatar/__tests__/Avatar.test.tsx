import { screen, render } from '@testing-library/react';

import Avatar from '../Avatar';

describe('Avatar Component', () => {
  it('should render with name, username and city', () => {
    const name = 'Test Name';
    const username = 'Test Username';
    const city = 'Test City';

    render(<Avatar name={name} username={username} city={city} />);

    const avatar = screen.getByTestId('avatar');

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent(name);
    expect(avatar).toHaveTextContent(username);
    expect(avatar).toHaveTextContent(city);
  });

  it("should render user's avatar", () => {
    const name = 'Test Name';
    const username = 'Test Username';
    const city = 'Test City';

    render(<Avatar name={name} username={username} city={city} />);

    const avatarImg = screen.getByTestId('avatar-img');

    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src');
  });
});
