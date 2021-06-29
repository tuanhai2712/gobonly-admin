import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { parentMenu } from 'routeConfig';

export const Breadcrumbs = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState({});
  const currentPath = location.pathname;
  useEffect(() => {
    const data = [];
    parentMenu.map((menu) => {
      if (menu.path === currentPath) {
        data.push({
          path: menu.path,
          title: menu.title,
        });
      } else {
        menu.subItems &&
          menu.subItems.map((subItem) => {
            if (subItem.path === currentPath) {
              data.push(
                {
                  path: menu.path,
                  title: menu.title,
                },
                {
                  path: subItem.path,
                  title: subItem.title,
                }
              );
            }
          });
      }
    });
    setBreadcrumbs(data);
  }, [currentPath]);
  return (
    <BreadcrumbStyled>
      {currentPath === '/home' || currentPath === '/' ? null : (
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/home">Trang chủ</a>
          </Breadcrumb.Item>
          {breadcrumbs.length
            ? breadcrumbs.map((item, idx) => {
                if (!item.path) {
                  return (
                    <Breadcrumb.Item key={idx}>{item.title}</Breadcrumb.Item>
                  );
                }
                return (
                  <Breadcrumb.Item key={idx}>{item.title}</Breadcrumb.Item>
                );
              })
            : null}
        </Breadcrumb>
      )}
    </BreadcrumbStyled>
  );
};

const BreadcrumbStyled = styled.div`
  * {
    color: #fff;
  }
  .ant-breadcrumb-link {
    > a {
      color: #fff !important;
    }
  }
`;
