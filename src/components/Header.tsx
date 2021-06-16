import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { FC, useEffect, useState } from 'react';

interface Props {
  selectedEntry: string;
  setSelectedEntry: (value: string) => void;
}

export const Header: FC<Props> = ({ selectedEntry, setSelectedEntry }) => {
  const location = useLocation();

  const [currentEntry, setCurrentEntry] = useState<string>('');

  const handleMenuClick = (e: any) => {
    setCurrentEntry(e.key);
    setSelectedEntry(e.key);
  }

  useEffect(() => {
    const initialLocation = location.pathname.split("/").pop();
    initialLocation && setCurrentEntry(initialLocation);
  }, [location.pathname]);

  useEffect(() => {
    setCurrentEntry(selectedEntry);
  }, [selectedEntry]);

  const renderNavbar = () => {

    return (
      <>
        <Layout className="header">
          <Menu theme="dark" mode="horizontal" onClick={handleMenuClick} selectedKeys={[currentEntry]}>
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
