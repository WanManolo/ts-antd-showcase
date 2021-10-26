import { Layout, Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Props } from "./breadcrumb/BreadCrumb";

/**
 * @name Header Function Component extends {@link FC}
 * @summary Function component that will display a navbar header
 *
 * @param props {@link Props} to include. All mandatory.
 *
 * @returns Fragment {@link React.Fragment} containing the composition of elements to display the {@link Menu}
 */
export const Header: FC<Props> = ({ selectedEntry, setSelectedEntry }) => {
  const [currentEntry, setCurrentEntry] = useState<string>("");

  /**
   * Handler to set current entry
   * @param e event
   */
  const handleMenuClick = (e: any) => {
    setCurrentEntry(e.key);
  };

  // Effect for current entry
  useEffect(() => {
    setCurrentEntry(selectedEntry);
  }, [selectedEntry]);

  /**
   * @name renderNavbar
   * @summary Helper function to render the navbar component
   * @returns Fragment {@link React.Fragment} containing the elements of the navbar
   */
  const renderNavbar = () => {
    return (
      <>
        <Layout className="header">
          <Menu
            data-testid="header-component"
            theme="dark"
            mode="horizontal"
            onClick={handleMenuClick}
            selectedKeys={[currentEntry]}
          >
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
          </Menu>
        </Layout>
      </>
    );
  };

  return <>{renderNavbar()}</>;
};
