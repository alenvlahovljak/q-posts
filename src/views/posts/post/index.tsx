import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks';

import client, { IPost } from '@/api';

import { Posts } from '@/components/UI';

const PostView: FC = () => {
  const { postId } = useParams();

  if (!postId) {
    return null;
  }

  const { data: post } = useFetch<IPost>(client.getPost(postId));

  if (!post) {
    return null;
  }

  return (
    <Posts.CommonPost
      id={post.id}
      title={post.title}
      description={post.body}
      userId={post.userId}
    />
  );
};

export default PostView;
