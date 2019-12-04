import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../utility/ProtectedRoute';

import ArtistsIndex from '../artists/ArtistsIndex';
import ArtistsShow from '../artists/ArtistsShow';
import GigsIndex from '../gigs/GigsIndex';
import HomePage from '../utility/HomePage';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <ProtectedRoute exact path="/artists" component={ArtistsIndex} />
      <ProtectedRoute exact path="/artists/:name" component={ArtistsShow} />
      <ProtectedRoute exact path="/profile/gigs" component={GigsIndex} />
    </Switch>
  );
};

export default Routes;
