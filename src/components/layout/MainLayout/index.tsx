import type { ReactNode } from 'react';
import { useState } from 'react';
import { Sidebar } from '@components/layout/Sidebar';
import './index.css';

export interface MainLayoutProps {
  children: ReactNode;
  activeStep: number;
  showSidebar?: boolean;
}

export function MainLayout({
  children,
  activeStep,
  showSidebar = true
}: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="main-content">
      {showSidebar && (
        <Sidebar
          activeStep={activeStep}
          collapsed={sidebarCollapsed}
          onToggle={handleToggleSidebar}
        />
      )}
      <main className={`content ${sidebarCollapsed && showSidebar ? 'expanded' : ''}`}>
        {children}
      </main>
    </div>
  );
}
