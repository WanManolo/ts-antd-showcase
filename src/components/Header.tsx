import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { FC, useState } from 'react';

interface Props {

}

export const Header: FC<Props> = () => {
  const [current, setCurrent] = useState<string>('');

  const handleClickMenu = (e: any) => {
    setCurrent(e.key);
  }

  const renderNavbar = () => {

    return (
      <>
        <Layout className="header">
          <Menu theme="dark" mode="horizontal" onClick={handleClickMenu} selectedKeys={[current]}>
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
  return (
    <>
      {renderNavbar()}
    </>
  );
};
