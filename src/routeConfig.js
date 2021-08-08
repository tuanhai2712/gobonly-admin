import React from 'react';
import { HomeOutlined, UserOutlined, SettingOutlined, SoundOutlined, GiftOutlined, FileDoneOutlined, MenuOutlined } from '@ant-design/icons';
import Homepage from './views/pages/HomePage/HomePage';
import UserList from './views/pages/AccountManagement/Users/List'
import TeacherList from './views/pages/AccountManagement/Teacher/List'
import BannerList from './views/pages/BannerManagement/List'
import VoucherList from './views/pages/VoucherManagement/List'
import RequestList from './views/pages/VoucherManagement/RequestList'
import NotificationList from './views/pages/NotificationManagement/List'
import ReviewList from './views/pages/ReviewManagement/List'

import Categories from './views/pages/CategoriesManagement/List'
import ProductData from './views/pages/ProductManagement/List'
import ProductCreate from './views/pages/ProductManagement/Create'
import SizeData from './views/pages/SizeManagement/List'

const userManagement = [
  {
    title: 'Quản lý người dùng',
    path: '/users',
    component: UserList,
  },
];
const systemManagement = [
  {
    title: 'Quản lý sản phẩm',
    path: '/product',
    component: ProductData,
  },
  {
    path: '/product/create',
    hide: true,
    component: ProductCreate,
  },
  {
    title: 'Quản lý size',
    path: '/size',
    component: SizeData,
  },
];
const voucherManagement = [
  {
    title: 'Danh sách voucher',
    path: '/vouchers',
    component: VoucherList,
  },
  {
    title: 'Danh sách yêu cầu',
    path: '/voucher-request',
    component: RequestList,
  },
];

export const routeConfig = [
  {
    title: 'Trang chủ',
    path: '/home',
    component: Homepage,
  },

  {
    title: 'Quản lý thông báo',
    path: '/notification',
    component: NotificationList,
  },
  {
    title: 'Quản lý danh mục',
    path: '/categories',
    component: Categories,
  },
  {
    title: 'Quản lý thông báo',
    path: '/reviews',
    component: ReviewList,
  },
  ...voucherManagement,
  ...userManagement,
  ...systemManagement,
];

export const parentMenu = [
  {
    icon: <HomeOutlined />,
    title: 'Trang chủ',
    path: '/home',
    single: true,
  },
  {
    icon: <MenuOutlined />,
    title: 'Quản lý danh mục',
    path: '/categories',
    single: true,
  },
  {
    icon: <SettingOutlined />,
    title: 'Quản lý hệ thống',
    subItems: systemManagement,
    single: false,
  },
  // {
  //   icon: <SoundOutlined />,
  //   title: 'Quản lý thông báo',
  //   path: '/notification',
  //   single: true,
  // },
  // {
  //   icon: <FileDoneOutlined />,
  //   title: 'Quản lý đánh giá',
  //   path: '/reviews',
  //   single: true,
  // },
  // {
  //   icon: <UserOutlined />,
  //   title: 'Quản lý tài khoản',
  //   path: '/users',
  //   single: true,
  // },
  // {
  //   icon: <GiftOutlined />,
  //   title: 'Quản lý voucher',
  //   subItems: voucherManagement,
  // },


];
