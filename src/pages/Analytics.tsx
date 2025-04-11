
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { categoryBreakdown } from '@/data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Vibrant color palette for analytics
const COLORS = ['#9b87f5', '#7E69AB', '#F97316', '#0EA5E9', '#D946EF'];
const RADIAL_COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#10B981'];

const Analytics = () => {
  const [activeView, setActiveView] = useState("breakdown");
  const total = categoryBreakdown.reduce((sum, item) => sum + item.amount, 0);

  // Create data for time series chart
  const timeSeriesData = categoryBreakdown.map((category) => ({
    name: category.name,
    value: category.amount,
    dailyAvg: (category.amount / 30).toFixed(2),
    weeklyAvg: (category.amount / 4).toFixed(2),
  }));

  return (
    <AppLayout>
      <div className="pt-4 font-chakra">
        <h1 className="text-2xl font-medium text-bank-primary mb-6">Analytics</h1>
        
        <Tabs defaultValue="breakdown" className="w-full mb-6" onValueChange={setActiveView}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="breakdown">Expense Breakdown</TabsTrigger>
            <TabsTrigger value="time">Time Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="breakdown" className="space-y-6">
            {/* Pie Chart Card with Glass Morphism */}
            <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-50">
              <h2 className="text-lg font-medium text-bank-primary mb-3">Category Breakdown</h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="amount"
                      paddingAngle={5}
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                          stroke="white"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Amount']}
                      labelFormatter={(name) => `Category: ${name}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Category List */}
            <div className="space-y-3">
              {categoryBreakdown.map((category, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-bank-primary font-medium">{category.name}</span>
                    </div>
                    <span className="text-bank-primary">${category.amount}</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(category.amount / total) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-right text-bank-secondary">
                    {((category.amount / total) * 100).toFixed(1)}% of total
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="time">
            <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-50">
              <h2 className="text-lg font-medium text-bank-primary mb-3">Time Analysis</h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeSeriesData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Amount']}
                      labelFormatter={(name) => `Category: ${name}`}
                    />
                    <Bar 
                      dataKey="value" 
                      name="Monthly"
                      radius={[4, 4, 0, 0]}
                    >
                      {timeSeriesData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={RADIAL_COLORS[index % RADIAL_COLORS.length]} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Daily/Weekly Averages */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {timeSeriesData.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-50"
                >
                  <div className="text-sm font-medium mb-1" style={{ color: RADIAL_COLORS[index % RADIAL_COLORS.length] }}>
                    {item.name}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-bank-tertiary">Daily</div>
                      <div className="text-bank-primary font-medium">${item.dailyAvg}</div>
                    </div>
                    <div>
                      <div className="text-xs text-bank-tertiary">Weekly</div>
                      <div className="text-bank-primary font-medium">${item.weeklyAvg}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Analytics;
