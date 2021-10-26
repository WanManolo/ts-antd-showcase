import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { DocumentDashboard } from "./dashboard/DocumentDashboard";
import { HomeContainer } from "./HomeContainer";

/**
 * Routes class to manage rendering of different sections of the app.
 *
 * @summary Contains currently 2 routes to '/' and '/documents', where '/' corresponds to the homepage and '/documents' to the document browser.
 */
export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <HomeContainer />;
          }}
        />

        <Route
          exact
          path="/documents"
          render={(props) => {
            return <DocumentDashboard {...props} {...this.props} />;
          }}
        />
      </Switch>
    );
  }
}
