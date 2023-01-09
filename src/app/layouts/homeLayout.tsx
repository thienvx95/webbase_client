import { HomePage } from 'app/pages/HomePage';
import React from 'react';
import { Route, useOutlet } from 'react-router-dom';

export const HomeLayout = () => {
  const outlet = useOutlet();

  return <>{outlet}</>;
};

export const HomeRoute = () => {
  return (
    <Route element={<HomeLayout />}>
      <Route path="/" element={<HomePage />} />
    </Route>
  );
};
