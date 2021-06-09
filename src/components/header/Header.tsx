import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';

export const Header = () => {
    const { Header } = Layout;
  return (
    <>
      <Header className="header">
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1"><Link to="/">
          <p>Home</p>
        </Link></Menu.Item>
        <Menu.Item key="2"><Link to="/documents">
          <p>Documents</p>
        </Link></Menu.Item>
        <Menu.Item key="3"><Link to="/contact">
          <p>Contact</p>
        </Link></Menu.Item>
        <Menu.Item key="4">
          <Link to="/news">
            <p>News</p>
          </Link>
          </Menu.Item>
        </Menu>
      </Header>
    </>
  );
};
