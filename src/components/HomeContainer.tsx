import { Button, Layout } from "antd";
import { FC } from "react";
import logo from "../logo.svg";

export const HomeContainer: FC = () => {
  return (
    <>
      <Layout>
        <Layout.Content>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Button
            type="primary"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </Button>
        </Layout.Content>
      </Layout>
    </>
  );
};
