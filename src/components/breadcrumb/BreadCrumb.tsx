import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { FC } from 'react';

/**
 * @name Props for BreadCrumb component
 *
 * @param selectedEntry value of the current menu entry
 * @function setSelectedEntry setter function for current menu entry
 */
export interface Props {
  selectedEntry: string;
  setSelectedEntry: (value: string) => void;
}

/**
 * @name BreadCrumb Function Component extends {@link FC}
 * @summary Function component that will display a sider with a menu list containing filters to apply on the {@link DocumentTable} component.
 *
 * @param props {@link Props} to include. All mandatory.
 *
 * @returns Fragment {@link React.Fragment} containing the composition of elements to display the {@link Layout.Sider} with the filters.
 */
export const BreadCrumb: FC<Props> = ({ selectedEntry, setSelectedEntry }) => {
  const location = useLocation();

  /**
   * handleLinkClick - helper function to set current menu entry on click.
   *
   * @param e event
   */
  const handleLinkClick = (e: any) => {
    setSelectedEntry(e.target.innerText.toLowerCase());
  };

  /**
   * @name renderBreadCrumb
   * @summary Helper function to render BreadCrumb component
   * @returns Fragment {@link React.Fragment} containing the current path breadcrumb
   */
  const renderBreadCrumb = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item: string) => item);
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
      <>
        <Breadcrumb data-testid='breadcrumb-component' style={{ margin: '16px 0' }}>
          {pathnames.length > 0 ?
            <Breadcrumb.Item key="/"><Link to="/" onClick={handleLinkClick} >Home</Link></Breadcrumb.Item>
            : <Breadcrumb.Item key="home" >Home</Breadcrumb.Item>}

          {pathnames.map((name: string, index: number) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? <Breadcrumb.Item key={name}>{capitalize(name)}</Breadcrumb.Item>
              : <Breadcrumb.Item key={name}><Link to={`${routeTo}`} onClick={handleLinkClick} >{capitalize(name)}</Link></Breadcrumb.Item>;
          })}
        </Breadcrumb>
      </>
    );
  };

  return <>{renderBreadCrumb()}</>;
};
