import React, { lazy, Suspense } from 'react';

const LazyActivity = lazy(() => import('./Activity'));

const Activity = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyActivity {...props} />
  </Suspense>
);

export default Activity;
