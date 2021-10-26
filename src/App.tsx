import { Layout } from "antd";
import { createBrowserHistory } from "history";
import { Component } from "react";
import { Router } from "react-router-dom";
import "./App.css";
import { BreadCrumb } from "./components/breadcrumb/BreadCrumb";
import { Header } from "./components/Header";
import { Routes } from "./components/Routes";

type Props = {
  // No props
};

type State = {
  selectedMenuEntry: string;
};

/**
 * Main Component Class
 *
 * @extends {React.Component} {@link Component}
 * @summary Renders the application example to display a navbar with 3 pages. Includes the document browser.
 * @property {any} history - BrowserHistory {@link createBrowserHistory} holds the visited pathnames.
 *
 * @author Juan Manuel Rodríguez
 *
 */
class App extends Component<Props, State> {
  // History for Router and links - type is any because type History is not generic
  history: any;

  state: State = {
    // Active navbar entry
    selectedMenuEntry: window.location.pathname.split("/").pop() || "",
  };

  constructor(props: any) {
    super(props);
    // Initialize history
    this.history = createBrowserHistory();
  }

  setSelectedMenuEntry = (value: string) => {
    this.setState(() => ({ selectedMenuEntry: value }));
  };

  render() {
    return (
      <div className="App">
        <Router history={this.history}>
          <Layout>
            <Header
              selectedEntry={this.state.selectedMenuEntry}
              setSelectedEntry={this.setSelectedMenuEntry}
            />
            <Layout.Content style={{ padding: "0 50px" }}>
              <BreadCrumb
                selectedEntry={this.state.selectedMenuEntry}
                setSelectedEntry={this.setSelectedMenuEntry}
              />
              <Routes {...this.props} />
            </Layout.Content>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
