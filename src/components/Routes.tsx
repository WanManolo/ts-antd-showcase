import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { HomeContainer } from "./HomeContainer";


export class Routes extends Component {

    render() {
          return (
            <Switch>
              <Route
                exact
                path="/"
                render={() => {return(<HomeContainer />)}}
              />

              <Route
                exact
                path="/documents"
                //render={(props) => <DocumentsContainer {...props} {...this.props} />}
              />

              <Route
                exact
                path="/contacts"
                //render={(props) => (<ContactsContainer {...props} {...this.props} />)}
              />

              <Route
                exact
                path="/news"
                //render={(props) => (<NewsContainer {...props} {...this.props} />)}
              />

            </Switch>
          );
      }
};
