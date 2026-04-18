import React from 'react';
import { Card } from 'antd';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';
import type { MonthlySale } from '../../types/dashboard';
import './SalesChart.scss';

interface SalesChartProps {
  data: MonthlySale[];
}

export const SalesChart: React.FC<SalesChartProps> = ({ data }) => (
  <Card title="Ventas por mes" className="sales-chart" variant="borderless">
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: '#6b7280' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickFormatter={(v) => `₡${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(v) => [`₡${Number(v ?? 0).toLocaleString('es-CR')}`, 'Ventas']}
          contentStyle={{
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            fontSize: 13,
          }}
        />
        <Bar dataKey="total" fill="#1677ff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);