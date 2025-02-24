import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Oops404 from './pages/Oops404';
import logo from './images/ant.svg';
import './App.less';
import STATIC_ROUTES from './routes/Routes';

function App() {
  const [curPath, setCurPath] = useState('/');
  const navigate = useNavigate();

  // Kullanıcı menüsü için öğeler
  const userMenu = (
    <Menu
      items={[
        { key: '1', label: 'Profile' },
        { key: '2', label: 'Settings' },
        { key: '3', label: 'Logout' },
      ]}
    />
  );


  return (
    <div className="d-flex flex-column vh-100">
    {/* Üst bilgi alanı */}
    <header className="d-flex align-items-center justify-content-between px-4 shadow-sm border pt-3">
      {/* Logo Sol Tarafta */}
      <div className="d-flex align-items-center me-2  mb-3">
        <Avatar src={logo} size={50} />
      </div>
  
      {/* Menü Ortada */}
      <div className="d-flex flex-grow-1 justify-content-space-beetwen  mb-3">
        <Menu
          mode="horizontal"
          className="border-0"
          items={STATIC_ROUTES.map(item => ({
            key: item.path,
            label: (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '16px',
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: '500',
                  color: '#333',
                }}
              >
                {item.icon}
                {item.label}
              </span>
            ),
          }))}
          selectedKeys={[curPath]}
          onClick={(value) => {
            setCurPath(value.key);
            navigate(value.key);
          }}
        />
      </div>
  
      {/* Kullanıcı Avatar Sağda */}
      <div className="d-flex align-items-center ms-2  mb-3">
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Avatar
            size={50}
            icon={<UserOutlined />}
            className="cursor-pointer"
            style={{
              backgroundColor: "#1890ff",
            }}
          />
        </Dropdown>
      </div>
    </header>
  
    {/* İçerik alanı */}
    <main className="flex-grow-1 p-3 bg-white">
      <Routes>
        {STATIC_ROUTES.map(item => (
          <Route key={item.path} path={item.path} element={item.component} />
        ))}
        <Route path="*" element={<Oops404 />} />
      </Routes>
    </main>
  </div>
  
  
  );
};

export default App;
