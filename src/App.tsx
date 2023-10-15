import type { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import routes, { flattenRoutes } from '@/router';

import { CommonLayout } from '@/components/layouts';

import './styles/global.css';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />
      {flattenRoutes(routes).map(({ key, path, component, label }) => (
        <Route
          key={key}
          path={path}
          element={<CommonLayout title={label}>{component}</CommonLayout>}
        />
      ))}
    </Routes>
  );
};

export default App;
