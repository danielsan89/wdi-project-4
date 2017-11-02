import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ArtistsIndex from '../artists/ArtistsIndex';
import ArtistsShow from '../artists/ArtistsShow';
import GigsShow from '../gigs/GigsShow';
import GigsIndex from '../gigs/GigsIndex';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/artists" component={ArtistsIndex} />
      <Route exact path="/artists/:name" component={ArtistsShow} />

      <Route exact path="/profile/gigs" component={GigsIndex} />
      <Route exact path="/profile/gigs/:id" component={GigsShow} />
    </Switch>
  );
};

export default Routes;
