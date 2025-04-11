
import React from 'react';
import { cn } from '@/lib/utils';

interface ExpenseSummaryProps {
  monthly: number;
  weekly: number;
  daily: number;
  className?: string;
}

const ExpenseSummary = ({
  monthly,
  weekly,
  daily,
  className,
}: ExpenseSummaryProps) => {
  // Format the expense values
  const formatExpense = (value: number, suffix: string) => {
    return (
      <>
        <span className="font-light">$</span>
        {value}
        <span className="text-bank-tertiary">{suffix}</span>
      </>
    );
  };

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="text-5xl font-medium text-bank-primary mb-2 animate-fade-in">
        {formatExpense(monthly, "m")}
      </div>
      <div className="text-4xl font-medium text-bank-secondary mb-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {formatExpense(weekly, "w")}
      </div>
      <div className="text-3xl font-medium text-bank-tertiary animate-fade-in" style={{ animationDelay: "0.2s" }}>
        {formatExpense(daily, "d")}
      </div>
    </div>
  );
};

export default ExpenseSummary;
