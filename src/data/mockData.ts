
// Mock data for the bank application

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export const transactions: Transaction[] = [
  {
    id: "t1",
    date: "2025-04-10",
    description: "Grocery Store",
    amount: 56.78,
    category: "Food",
  },
  {
    id: "t2",
    date: "2025-04-10",
    description: "Coffee Shop",
    amount: 4.50,
    category: "Food",
  },
  {
    id: "t3",
    date: "2025-04-09",
    description: "Gas Station",
    amount: 45.23,
    category: "Transportation",
  },
  {
    id: "t4",
    date: "2025-04-08",
    description: "Online Shopping",
    amount: 89.99,
    category: "Shopping",
  },
  {
    id: "t5",
    date: "2025-04-07",
    description: "Electricity Bill",
    amount: 120.50,
    category: "Utilities",
  },
  {
    id: "t6",
    date: "2025-04-05",
    description: "Restaurant",
    amount: 78.45,
    category: "Food",
  },
  {
    id: "t7",
    date: "2025-04-04",
    description: "Movie Tickets",
    amount: 24.00,
    category: "Entertainment",
  },
];

export const expenseSummary = {
  monthly: 9345,
  weekly: 1245,
  daily: 150,
};

export const categoryBreakdown = [
  { name: "Food", amount: 3450 },
  { name: "Transportation", amount: 2100 },
  { name: "Shopping", amount: 1850 },
  { name: "Utilities", amount: 1200 },
  { name: "Entertainment", amount: 745 },
];
