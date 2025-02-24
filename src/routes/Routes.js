import {
  SolutionOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import Jobs from "../pages/Jobs";
import Settings from "../pages/Transaction";
import Transactions from '../pages/Transaction';


const STATIC_ROUTES = [
  {
    path: '/',
    label: 'Jobs',
    icon: <SolutionOutlined />,
    component: <Jobs />,
  },
  {
    path: 'detail',
    label: 'Transactions',
    icon: <FileTextOutlined />,
    component: <Transactions />,
  },
  {
    path: 'settings',
    label: 'Settings',
    icon: <SettingOutlined />,
    component: <Settings />,
  },
];

export default STATIC_ROUTES;
