import React, { Component, FC } from 'react';
import { Button } from 'antd';
import { Router } from "react-router-dom";
import { Header } from './components/header/Header';
import {createBrowserHistory} from 'history';
import './App.css';
import Layout, { Content } from 'antd/lib/layout/layout';
import { SiderComponent } from './components/sider/SiderComponent';
import { BreadCrumb } from './components/breadcrumb/BreadCrumb';
import { Routes } from './components/Routes';
class App extends Component {
  history: any;

  constructor(props : any) {
    super(props);
    this.history = createBrowserHistory();
  }

  render() {
    return (<div className="App">
      <Router history={this.history}>
        <Layout>
          <Header/>
          <Routes
            {...this.props}
          />
          <Content style={{ padding: '0 50px' }}>
            <BreadCrumb/>
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
              <SiderComponent/>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0
                }}
              >
                Content
                  <Button type="primary">Button</Button>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Router>
    </div>)}
}

export default App;
