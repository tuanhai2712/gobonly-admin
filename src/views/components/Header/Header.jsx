import React, { useCallback } from 'react';
import { Modal, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons';
import { signOut, authSelector } from 'state/auth/reducer';
import './style.scss';

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch()
  const { user } = useSelector(authSelector);
  // Confirm and logout
  const handleLogout = useCallback(() => {
    Modal.confirm({
      centered: true,
      title: 'Đăng xuất',
      content: 'Bạn có chắc chắn muốn đăng xuất!',
      onOk() {
        dispatch(signOut())
        history.push('/login');
        localStorage.clear();
        window.location.reload();
      },
      onCancel() { },
      okText: 'Đồng ý',
      cancelText: 'Hủy',
    });
  }, []);

  const showProfile = () => { };

  return (
    <>
      <div className="menu_user text_right" style={{ color: '#fff' }}>
        <span onClick={showProfile} className="mr-1">
          {user.name}
        </span>
        <Tooltip placement="bottom" title="Đăng xuất">
          <span onClick={handleLogout}>
            <LogoutOutlined />
          </span>
        </Tooltip>
      </div>
    </>
  );
}
