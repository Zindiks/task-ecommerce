import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Overlay from './components/Drawer/Overlay';
const Layout = () => {
  return (
    <>
      <Header />
      <Overlay />
      <Outlet />
    </>
  );
};

export { Layout };
