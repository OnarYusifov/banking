
import React from 'react';
import NavBar from './NavBar';

interface AppLayoutProps {
  children: React.ReactNode;
  showNavBar?: boolean;
}

const AppLayout = ({ children, showNavBar = true }: AppLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-bank-background font-chakra">
      {/* Google Fonts link - ensuring it uses HTTPS for GitHub Pages */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&display=swap" />
      <main className="flex-1 pt-8 pb-24 px-4 max-w-md mx-auto w-full">
        {children}
      </main>
      {showNavBar && <NavBar />}
    </div>
  );
};

export default AppLayout;
