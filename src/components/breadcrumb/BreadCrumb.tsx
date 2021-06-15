import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { FC } from 'react';

interface Props {

}

export const BreadCrumb: FC<Props> = () => {
  const location = useLocation();

  const renderBreadCrumb = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item: string) => item);
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {pathnames.length > 0 ?
            <Breadcrumb.Item key="/"><Link to="/" >Home</Link></Breadcrumb.Item>
            : <Breadcrumb.Item key="home" >Home</Breadcrumb.Item>}
          {pathnames.map((name: string, index: number) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? <Breadcrumb.Item key={name}>{capitalize(name)}</Breadcrumb.Item>
              : <Breadcrumb.Item key={name}><Link to={`${routeTo}`} >{capitalize(name)}</Link></Breadcrumb.Item>;
          })
          }
        </Breadcrumb>
      </>
    );
  };

  return <>{renderBreadCrumb()}</>;
};
