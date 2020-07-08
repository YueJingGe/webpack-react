import React, { lazy, Suspense } from "react";

const Loading = () => <div>loading...</div>;

export default function LazyLoad(handle) {
  const OtherComponent = lazy(handle);
  return function MyComponent() {
    return (
      <Suspense fallback={<Loading />}>
        <OtherComponent />
      </Suspense>
    );
  };
}
