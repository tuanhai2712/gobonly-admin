import React, { useState } from 'react';
import { Col, Row, Layout } from 'antd';

import MenuLeft from './components/Menu/Menu';
import HeaderLayout from './components/Header/Header';
import { PrivateRoute } from './components/PrivateRoute';
import { Route } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { NotFound } from './pages/NotFound';
import styled from 'styled-components';

const { Header, Sider, Content } = Layout;
export default function Main({ renderRouteUser, accessToken }) {
  const [collapseMenu, setCollapseMenu] = useState(false);

  const toggleMenu = () => {
    setCollapseMenu(!collapseMenu);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBarStyled onCollapse={toggleMenu} style={{}}>
        <div
          style={{
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <img
            src={
              'https://onthiielts.com.vn/wp-content/uploads/2019/04/tiw-logo.png?fbclid=IwAR3sUph0GsMb4ylqlGYEhzQtlwgHB9V8yeS4vQfZxXuVjW2_7MaWxzgSq3k'
            }
            style={{ width: '30%' }}
            alt="logo"
          />
        </div>
        {renderRouteUser.length > 0 && <MenuLeft />}
      </SideBarStyled>
      <Layout>
        <Header style={{ padding: '0 18px' }}>
          <Row justify="space-between">
            <Col
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Breadcrumbs />
            </Col>
            <Col>
              <HeaderLayout />
            </Col>
          </Row>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 5,
            margin: 0,
            background: '#d6d3d3',
          }}
        >
          <section className="page_content">
            {!renderRouteUser.some(
              (item) => item.path === window.location.pathname
            ) && <Route path="*" component={NotFound} />}

            {renderRouteUser.length > 0 &&
              renderRouteUser.map(
                ({ path, component: Component, isProtected }) => (
                  <CustomRouter
                    key={path}
                    path={path}
                    isProtected={isProtected}
                    accessToken={accessToken}
                    exact
                    component={Component}
                  />
                )
              )}
          </section>
        </Content>
      </Layout>
    </Layout>
  );
}

// ***************************************
// private
function CustomRouter({
  path,
  component: Component,
  isProtected,
  accessToken,
}) {
  // Private route
  if (isProtected) {
    return (
      <PrivateRoute
        key={path}
        accessToken={accessToken}
        path={path}
        exact
        component={Component}
      />
    );
  }

  return (
    <Route
      key={path}
      path={path}
      exact
      render={(routeProps) => <Component {...routeProps} />}
    />
  );
}

const SideBarStyled = styled(Sider)`
  background: #fff;
  min-width: 225px !important;
  max-width: 225px !important;
  width: 225px;
`;
