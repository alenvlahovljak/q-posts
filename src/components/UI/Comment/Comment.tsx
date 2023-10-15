import type { FC } from 'react';
import { withLogger } from '@/hoc';

import css from './Comment.module.css';

interface CommentProps {
  name: string;
  comment: string;
}

const Comment: FC<CommentProps> = ({ name, comment }) => {
  return (
    <div data-testid="comment" className={css.container}>
      <img
        data-testid="comment-img"
        width="30"
        height="30"
        loading="lazy"
        className={css['container__avatar']}
        src="https://source.unsplash.com/random"
        alt=""
      />

      <div className={css['container__comment']}>
        <span className={css['comment__name']}>{name}</span>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default withLogger(Comment);
