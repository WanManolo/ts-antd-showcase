import { Component } from 'react';
import { Layout } from 'antd';
import { Router } from "react-router-dom";
import { Header } from './components/Header';
import { createBrowserHistory } from 'history';
import './App.css';
import { BreadCrumb } from './components/breadcrumb/BreadCrumb';
import { Routes } from './components/Routes';

class App extends Component {
  history: any;

  constructor(props: any) {
    super(props);
    this.history = createBrowserHistory();
  }

  render() {
    return (<div className="App">
      <Router history={this.history}>
        <Layout>
          <Header />
          <Layout.Content style={{ padding: '0 50px' }}>
            <BreadCrumb />
            <Routes {...this.props} />
          </Layout.Content>
        </Layout>
      </Router>
    </div>)
  }
}

export default App;
