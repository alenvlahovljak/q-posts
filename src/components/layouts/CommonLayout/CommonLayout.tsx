import type { FC, PropsWithChildren } from 'react';
import { withLogger } from '@/hoc';

import css from './CommonLayout.module.css';

interface CommonLayoutProps {
  title: string;
}

const CommonLayout: FC<PropsWithChildren<CommonLayoutProps>> = ({ children, title }) => {
  return (
    <div className={css.container}>
      <header className={css['container__header']}>
        <h1 className={css['header__title']}>{title}</h1>
      </header>
      <main className={css['container__main']}>{children}</main>
    </div>
  );
};

export default withLogger(CommonLayout);
