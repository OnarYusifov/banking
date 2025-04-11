
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { transactions as initialTransactions } from '@/data/mockData';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Send, ArrowDown, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const Transactions = () => {
  const [balance, setBalance] = useState(4850.75);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState(initialTransactions);

  // Group transactions by date
  const groupedTransactions = transactions.reduce<Record<string, typeof transactions>>(
    (groups, transaction) => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {}
  );

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const handleSendMoney = () => {
    if (!recipient || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid recipient and amount');
      return;
    }
    
    const amountValue = parseFloat(amount);
    
    if (amountValue > balance) {
      toast.error('Insufficient funds');
      return;
    }
    
    // Deduct from balance
    setBalance(prevBalance => prevBalance - amountValue);
    
    // Add new transaction
    const newTransaction = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      description: `Payment to ${recipient}`,
      amount: -amountValue,
      category: 'Transfer'
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    toast.success(`$${amount} sent to ${recipient}`);
    setRecipient('');
    setAmount('');
  };

  return (
    <AppLayout>
      <div className="pt-4 pb-16 font-chakra">
        {/* Balance Card */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-[#333333] to-[#1a1a1a] text-white">
          <p className="text-sm font-medium text-white/70 mb-1">Current Balance</p>
          <h2 className="text-3xl font-semibold mb-3">${balance.toFixed(2)}</h2>
          
          {/* Send Money Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full bg-white text-black hover:bg-white/90 mt-2 font-medium">
                <Send size={16} className="mr-2" /> Send Money
              </Button>
            </SheetTrigger>
            <SheetContent className="font-chakra">
              <SheetHeader>
                <SheetTitle className="text-xl font-chakra">Send Money</SheetTitle>
                <SheetDescription className="font-chakra">
                  Transfer money to someone directly from your account.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="recipient" className="font-chakra">Recipient</Label>
                  <Input 
                    id="recipient" 
                    value={recipient} 
                    onChange={(e) => setRecipient(e.target.value)} 
                    placeholder="Enter name or account number"
                    className="font-chakra"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount" className="font-chakra">Amount</Label>
                  <Input 
                    id="amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="0.00" 
                    type="number" 
                    min="0" 
                    step="0.01"
                    className="font-chakra"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={handleSendMoney} className="font-chakra">Send Payment</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <h1 className="text-xl font-medium text-bank-primary mb-4 font-chakra">Recent Transactions</h1>
        
        {sortedDates.map((date) => (
          <div key={date} className="mb-5">
            <div className="text-sm text-bank-secondary mb-2 font-medium font-chakra">
              {format(new Date(date), 'EEEE, MMMM d')}
            </div>
            <div className="space-y-3.5">
              {groupedTransactions[date].map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex justify-between items-center p-3.5 bg-white rounded-lg font-chakra
                    shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)]
                    transition-all duration-300 border border-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
                      {transaction.amount > 0 ? (
                        <ArrowDown size={18} className="text-green-500" />
                      ) : (
                        <ArrowUpRight size={18} className="text-bank-primary" />
                      )}
                    </div>
                    <div>
                      <div className="text-bank-primary font-medium">{transaction.description}</div>
                      <div className="text-xs text-bank-tertiary">{transaction.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-bank-primary'}`}>
                      {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                    <div className="text-xs text-bank-tertiary">
                      {format(new Date(date), 'h:mm a')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Transactions;
