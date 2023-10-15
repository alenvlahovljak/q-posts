import { FC, PropsWithChildren } from 'react';
import { withLogger } from '@/hoc';
import { useFetch } from '@/hooks';

import client, { IPost } from '@/api';

import { CommonPost, UserPost, CommonPostProps, UserPostProps } from './Post/Post';
import Skeleton, { SkeletonProps } from './Skeleton/Skeleton';

import css from './Posts.module.css';

interface PostsProps {
  userId?: number;
  fullName?: string;
  username?: string;
  city?: string;
}

const Posts: FC<PostsProps> & {
  Skeleton: FC<SkeletonProps>;
  CommonPost: FC<PropsWithChildren<CommonPostProps>>;
  UserPost: FC<PropsWithChildren<UserPostProps>>;
} = ({ userId, username, fullName, city }) => {
  const search = userId ? `userId=${userId}` : undefined;

  const { data: posts } = useFetch<IPost[]>(client.getPosts(), {
    search
  });

  if (!posts) {
    return null;
  }

  const Post = username && fullName && city ? Posts.UserPost : Posts.CommonPost;

  return (
    <div data-testid="posts" className={css.container}>
      {posts.map(({ id, title, body, userId }) => (
        <Post
          key={id}
          id={id}
          title={title}
          description={body}
          userId={userId}
          fullName={fullName}
          username={username}
          city={city}
        />
      ))}
    </div>
  );
};

Posts.Skeleton = withLogger(Skeleton);
Posts.CommonPost = withLogger(CommonPost);
Posts.UserPost = withLogger(UserPost);

export default Posts;
