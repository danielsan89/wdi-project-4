import React from 'react';
import { Route } from 'react-router-dom';

import ArtistsIndex from '../artists/ArtistsIndex';


const Routes = () => {
  return (

    <Route exact path="/" component={ArtistsIndex} />

  );
};

export default Routes;
