import { FC, PropsWithChildren } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '@/hooks';

import client, { IComment, IUser } from '@/api';

import { Avatar, Comment } from '@/components/UI';

import css from './Post.module.css';

interface PostProps {
  id: number;
  title: string;
  description: string;
}

export interface CommonPostProps extends PostProps {
  userId: number;
}

export interface UserPostProps extends PostProps {
  fullName?: string;
  username?: string;
  city?: string;
}

export interface BaseProps extends UserPostProps {
  userId?: number;
}

const Post: FC<PropsWithChildren<BaseProps>> = ({
  id,
  title,
  description,
  userId,
  fullName,
  username,
  city
}) => {
  const url = client.getUser(userId);

  const navigate = useNavigate();
  const { postId } = useParams();

  const { data: user } = useFetch<IUser>(url, {}, !url);
  const { data: comments } = useFetch<IComment[]>(client.getPostComments(id));

  if (!comments) {
    return null;
  }

  const handleOnClick = () => !postId && navigate(`/post/${id}`);

  return (
    <div data-testid="post" className={css.container}>
      <Avatar
        name={fullName || user?.name}
        username={username || user?.username}
        city={city || user?.address.city}
      />
      <h2 className={css['container__title']} onClick={handleOnClick}>
        {title}
      </h2>
      <p className={css['container__description']}>{description}</p>
      <span className={css['container__count']}>{comments.length} comments</span>
      <div className={css['container__comments']}>
        {comments.map(({ id, name, body }) => (
          <Comment key={id} name={name} comment={body} />
        ))}
      </div>
    </div>
  );
};

const CommonPost: FC<CommonPostProps> = ({ id, title, description, userId }) => (
  <Post id={id} title={title} description={description} userId={userId} />
);

const UserPost: FC<UserPostProps> = ({ id, title, description, fullName, username, city }) => (
  <Post
    id={id}
    title={title}
    description={description}
    fullName={fullName}
    username={username}
    city={city}
  />
);

export { UserPost, CommonPost };
