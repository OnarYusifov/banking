
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, CreditCard, PieChart, User } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ to, icon, active }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center justify-center p-4 transition-all font-chakra",
          isActive
            ? "text-bank-primary relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-bank-primary after:rounded-full"
            : "text-bank-tertiary hover:text-bank-secondary"
        )
      }
    >
      {icon}
    </NavLink>
  );
};

const NavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t border-gray-100 py-1 font-chakra shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      <NavItem to="/" icon={<Home size={22} />} />
      <NavItem to="/transactions" icon={<CreditCard size={22} />} />
      <NavItem to="/analytics" icon={<PieChart size={22} />} />
      <NavItem to="/profile" icon={<User size={22} />} />
    </div>
  );
};

export default NavBar;
