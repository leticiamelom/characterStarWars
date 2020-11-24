import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Profile from './pages/Profile';
import NewCharacter from './pages/NewCharacter';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Profile} />
        <Route path="/characters/new" component={NewCharacter} />
      </Switch>
    </BrowserRouter>
  );
}