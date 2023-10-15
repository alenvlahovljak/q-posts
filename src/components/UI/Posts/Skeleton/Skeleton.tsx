import type { FC } from 'react';

import css from './Skeleton.module.css';

export interface SkeletonProps {
  username: string;
  clear: () => void;
}

const Skeleton: FC<SkeletonProps> = ({ username, clear }) => {
  return (
    <div data-testid="posts-skeleton" className={css.container}>
      <span className={css['container__title']}>
        No posts found made by <i>{username}</i>
      </span>
      <button className={css['container__button']} onClick={clear}>
        Clear search!
      </button>
    </div>
  );
};

export default Skeleton;
