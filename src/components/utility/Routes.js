import React from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../utility/ProtectedRoute';

import ArtistsIndex from '../artists/ArtistsIndex';
import ArtistsShow from '../artists/ArtistsShow';
import GigsIndex from '../gigs/GigsIndex';


const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/artists" component={ArtistsIndex} />
      <ProtectedRoute exact path="/artists/:name" component={ArtistsShow} />

      <ProtectedRoute exact path="/profile/gigs" component={GigsIndex} />
    </Switch>
  );
};

export default Routes;
