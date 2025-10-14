"use client";
import { Product } from "@/app/lib/Api";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#c60ca4ff", "#158CFF", "#00C49F", "#FFBB28", "#845EC2"];

interface DashboardSummaryProps {
  products: Product[];
}

export default function DashboardSummary({
  products = [],
}: DashboardSummaryProps) {
  if (!products.length) {
    return (
      <p className="text-gray-400 text-center py-10">
        No product data available
      </p>
    );
  }

  // Products by Month
  const productsByMonth = products.reduce(
  (acc: Record<string, number>, _: Product) => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  },
  {}
);

  const totalChartData = Object.entries(productsByMonth).map(
    ([month, count]) => ({
      month,
      count,
    })
  );

  // Products by Category
  const categoryCounts = products.reduce<Record<string, number>>(
    (acc, product) => {
      const category = product.category || "Unknown";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {}
  );

  const categoryChartData = Object.entries(categoryCounts).map(
    ([category, value]) => ({
      category,
      value,
    })
  );

  // Revenue by Category
  const revenueByCategory = products.reduce<Record<string, number>>(
    (acc, product) => {
      const category = product.category || "Unknown";
      acc[category] = (acc[category] || 0) + (product.price || 0);
      return acc;
    },
    {}
  );

  const revenueChartData = Object.entries(revenueByCategory).map(
    ([category, total]) => ({
      category,
      total,
    })
  );

  const totalProducts = products.length;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {/* Total Products (Line Chart) */}
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(12,109,198,0.4)" }}
        transition={{ duration: 0.3 }}
        className="bg-[#0B1535] text-white rounded-xl p-5 border border-[#1B2B4D]/40 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-3">📈 Total Products</h3>
        <div className="h-40 relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#0C6DC6]">
            <span className="text-5xl font-bold">{totalProducts}</span>
            <span className="text-sm text-gray-400">Products</span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={totalChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1B2B4D" />
              <XAxis dataKey="month" stroke="#B0B0B0" />
              <YAxis stroke="#B0B0B0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B1535",
                  border: "1px solid #1B2B4D",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#0C6DC6"
                strokeWidth={3}
                dot={{ fill: "#158CFF" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Products by Category (Pie Chart + Legend with Counts) */}
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(12,109,198,0.4)" }}
        transition={{ duration: 0.3 }}
        className="bg-[#0B1535] text-white rounded-xl p-5 border border-[#1B2B4D]/40 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-3">📦 Products by Category</h3>
        <div className="h-40 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryChartData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                labelLine={false} 
              >
                {categoryChartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B1535",
                  border: "1px solid #1B2B4D",
                  borderRadius:"10px"
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Revenue by Category (Bar Chart) */}
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(12,109,198,0.4)" }}
        transition={{ duration: 0.3 }}
        className="bg-[#0B1535] text-white rounded-xl p-5 border border-[#1B2B4D]/40 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-3">💰 Revenue by Category</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1B2B4D" />
              <XAxis dataKey="category" stroke="#B0B0B0" />
              <YAxis stroke="#B0B0B0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B1535",
                  border: "1px solid #1B2B4D",
                  color: "#fff",
                }}
              />
              <Bar dataKey="total" fill="#0C6DC6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
