
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { User, CreditCard, Settings, LogOut } from 'lucide-react';

const ProfileOption = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-50 mb-3">
    <div className="mr-4 text-bank-secondary">{icon}</div>
    <span className="text-bank-primary">{label}</span>
  </div>
);

const Profile = () => {
  return (
    <AppLayout>
      <div className="pt-4 font-chakra">
        <h1 className="text-2xl font-medium text-bank-primary mb-6">Profile</h1>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] rounded-full flex items-center justify-center mb-3">
            <User size={36} className="text-white" />
          </div>
          <h2 className="text-xl font-medium text-bank-primary">John Doe</h2>
          <p className="text-bank-secondary">john.doe@example.com</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm text-bank-secondary mb-2">Account</h3>
            <ProfileOption icon={<User size={20} />} label="Personal Information" />
            <ProfileOption icon={<CreditCard size={20} />} label="Payment Methods" />
          </div>
          
          <div>
            <h3 className="text-sm text-bank-secondary mb-2">Preferences</h3>
            <ProfileOption icon={<Settings size={20} />} label="Settings" />
            <ProfileOption icon={<LogOut size={20} />} label="Log Out" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
