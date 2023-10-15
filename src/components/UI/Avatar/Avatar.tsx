import type { FC } from 'react';
import { withLogger } from '@/hoc';

import css from './Avatar.module.css';

interface AvatarProps {
  name?: string;
  username?: string;
  city?: string;
}

const Avatar: FC<AvatarProps> = ({ name = 'Invisible', username = 'Hidden', city = 'Hidden' }) => {
  return (
    <div data-testid="avatar" className={css.container}>
      <img
        data-testid="avatar-img"
        width="50"
        height="50"
        loading="lazy"
        className={css['container__avatar']}
        src="https://source.unsplash.com/random"
        alt=""
      />
      <div className={css['container__info']}>
        <span className={css['info__name']}>
          {name}{' '}
          <span className={css.name}>
            {'<'}
            {username}
            {'>'}
          </span>
        </span>
        <span className={css.name}>{city}</span>
      </div>
    </div>
  );
};

export default withLogger(Avatar);
