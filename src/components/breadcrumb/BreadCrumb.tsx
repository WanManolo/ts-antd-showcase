import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

export const BreadCrumb = () => {
  const location = useLocation();

  const renderBreadCrumb = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item: any) => item);
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          )}
          {pathnames.map((name: string, index: number) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item>{capitalize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item>
                <Link to={`${routeTo}`}>{capitalize(name)}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };

  return <>{renderBreadCrumb()}</>;
};
