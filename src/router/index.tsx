import type { ReactNode } from 'react';
import { PostsView, PostView, NotFoundView } from '@/views';

interface Route {
  key: string;
  path: string;
  label: string;
  component: ReactNode;
  children?: Route[];
}

interface FlatRoute extends Route {
  parent: string | undefined;
}

const routes: Route[] = [
  {
    key: 'posts',
    path: '/posts',
    label: 'Posts',
    component: <PostsView />,
    children: [
      {
        key: 'post',
        path: '/post/:postId',
        label: 'Post',
        component: <PostView />
      }
    ]
  },
  {
    key: 'not-found',
    path: '*',
    label: 'Not Found',
    component: <NotFoundView />
  }
];

const flattenRoutes = (routes: Route[], parent: string | undefined = undefined): Route[] => {
  return routes.reduce<Route[]>((acc, { key, children, ...route }) => {
    const flatRoute: FlatRoute = {
      key,
      children,
      ...route,
      parent
    };

    if (children) {
      const flatChildren = flattenRoutes(children, key);
      acc.push(flatRoute, ...flatChildren);
    } else {
      acc.push(flatRoute);
    }

    return acc;
  }, []);
};

export type { Route };
export { flattenRoutes };
export default routes;
