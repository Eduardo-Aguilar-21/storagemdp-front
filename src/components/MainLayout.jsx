import { Outlet } from 'react-router-dom';
import './MainLayout.css';
import { Sidebar } from './Sidebar';


export function MainLayout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
}
