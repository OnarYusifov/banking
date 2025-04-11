
import React from 'react';
import AppLayout from '@/components/AppLayout';
import ExpenseSummary from '@/components/ExpenseSummary';
import { expenseSummary } from '@/data/mockData';

const Index = () => {
  return (
    <AppLayout>
      <div className="flex flex-col justify-center min-h-[80vh] font-chakra">
        <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-50">
          <h1 className="text-xl font-medium text-bank-primary mb-6">Expense Summary</h1>
          <ExpenseSummary
            monthly={expenseSummary.monthly}
            weekly={expenseSummary.weekly}
            daily={expenseSummary.daily}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
