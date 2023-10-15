import { useState, FC } from 'react';
import { useFetch } from '@/hooks';

import client, { IUser } from '@/api';

import { Posts, Search } from '@/components/UI';

const PostsView: FC = () => {
  const [search, setSearch] = useState<string>('');

  const { data: users } = useFetch<IUser[]>(
    client.getUsers(),
    {
      search: `username=${search}`
    },
    !search
  );

  const renderPosts = () => {
    if (!search) {
      return <Posts />;
    }

    if (!users) {
      return null;
    }

    if (users.length == 0) {
      return <Posts.Skeleton username={search} clear={() => setSearch('')} />;
    }

    return (
      <>
        {users.map(({ id, name, username, address }) => (
          <Posts key={id} userId={id} fullName={name} username={username} city={address.city} />
        ))}
      </>
    );
  };

  return (
    <>
      <Search onSearch={(value) => setSearch(value)} />
      {renderPosts()}
    </>
  );
};

export default PostsView;
