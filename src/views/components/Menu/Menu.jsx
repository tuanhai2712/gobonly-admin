import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { parentMenu } from 'routeConfig';
const { SubMenu } = Menu;

export default function MenuBar() {
  const history = useHistory();
  const goTo = (route) => {
    history.push(route);
  };

  return (
    <Menu theme="light" mode="inline">
      {parentMenu.map((item, itemIdx) => {
        if (item.single) {
          return (
            <Menu.Item
              key={itemIdx}
              icon={item.icon}
              onClick={() => goTo(item.path)}
            >
              {item.title}
            </Menu.Item>
          );
        } else {
          return (
            <SubMenu key={itemIdx} icon={item.icon} title={item.title}>
              {item.subItems.map((subItem, subItemIdx) => {
                if (!subItem.hide) {
                  return (
                    <Menu.Item
                      key={subItem.path + subItemIdx}
                      onClick={() => goTo(subItem.path)}
                    >
                      {subItem.title}
                    </Menu.Item>
                  );
                }
                return
              })}
            </SubMenu>
          );
        }

      })}

    </Menu>
  );
}
