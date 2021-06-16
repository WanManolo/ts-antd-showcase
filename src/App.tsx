import { Component } from 'react';
import { Layout } from 'antd';
import { Router } from "react-router-dom";
import { Header } from './components/Header';
import { createBrowserHistory } from 'history';
import './App.css';
import { BreadCrumb } from './components/breadcrumb/BreadCrumb';
import { Routes } from './components/Routes';

type Props = {

};

type State = {
  selectedMenuEntry: string;
};
class App extends Component<Props, State> {
  history: any;
  state: State = {
    selectedMenuEntry: window.location.pathname.split("/").pop() || ''
  }

  constructor(props: any) {
    super(props);
    this.history = createBrowserHistory();
  }

  setSelectedMenuEntry = (value: string) => {
    this.setState((state) => ({ selectedMenuEntry: value }));
  };

  render() {
    return (
      <div className="App">
        <Router history={this.history}>
          <Layout>
            <Header selectedEntry={this.state.selectedMenuEntry} setSelectedEntry={this.setSelectedMenuEntry} />
            <Layout.Content style={{ padding: '0 50px' }}>
              <BreadCrumb selectedEntry={this.state.selectedMenuEntry} setSelectedEntry={this.setSelectedMenuEntry} />
              <Routes {...this.props} />
            </Layout.Content>
          </Layout>
        </Router>
      </div>)
  }
}

export default App;
