import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';

export const Header = () => {
  return (
    <>
      <Layout className="header">
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">
              <p>Home</p>
            </Link>
          </Menu.Item>
          <Menu.Item key="documents">
            <Link to="/documents">
              <p>Documents</p>
            </Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to="/contact">
              <p>Contact</p>
            </Link>
          </Menu.Item>
        </Menu>
      </Layout>
    </>
  );
};
