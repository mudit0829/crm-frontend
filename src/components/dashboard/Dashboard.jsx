import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Avatar,
  Chip,
  LinearProgress,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import {
  TrendingUp,
  People,
  AttachMoney,
  Phone,
  Email,
  Assignment,
  ChevronRight,
  Refresh
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet-async';
import { format, subDays } from 'date-fns';

// API calls
import { getDashboardStats, getRecentActivities, getSalesData } from '../../api/dashboard';

const StatCard = ({ title, value, change, icon, color, trend }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                {title}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {value}
              </Typography>
              {change && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUp 
                    sx={{ 
                      fontSize: 16, 
                      mr: 0.5, 
                      color: trend === 'up' ? '#4caf50' : '#f44336' 
                    }} 
                  />
                  <Typography variant="caption">
                    {change} from last month
                  </Typography>
                </Box>
              )}
            </Box>
            <Avatar
              sx={{
                bgcolor: alpha('#fff', 0.2),
                width: 56,
                height: 56,
              }}
            >
              {icon}
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const RecentActivityCard = ({ activity }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: '1px solid #eee' }}>
    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
      {activity.type === 'call' ? <Phone /> : 
       activity.type === 'email' ? <Email /> : <Assignment />}
    </Avatar>
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="body2" fontWeight="medium">
        {activity.title}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {activity.customer} • {format(new Date(activity.createdAt), 'MMM dd, HH:mm')}
      </Typography>
    </Box>
    <Chip 
      label={activity.status} 
      size="small" 
      color={activity.status === 'completed' ? 'success' : 'default'}
    />
  </Box>
);

function Dashboard() {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  // Fetch dashboard data
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useQuery(
    'dashboard-stats',
    getDashboardStats,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const { data: activities, isLoading: activitiesLoading, refetch: refetchActivities } = useQuery(
    'recent-activities',
    getRecentActivities,
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );

  const { data: salesData, isLoading: salesLoading, refetch: refetchSales } = useQuery(
    'sales-data',
    getSalesData,
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchStats(),
      refetchActivities(),
      refetchSales()
    ]);
    setRefreshing(false);
  };

  // Sample data for charts (replace with real data)
  const sampleSalesData = [
    { month: 'Jan', sales: 65000, deals: 12 },
    { month: 'Feb', sales: 59000, deals: 15 },
    { month: 'Mar', sales: 80000, deals: 18 },
    { month: 'Apr', sales: 81000, deals: 22 },
    { month: 'May', sales: 56000, deals: 14 },
    { month: 'Jun', sales: 95000, deals: 28 },
  ];

  const dealStageData = [
    { name: 'Prospects', value: 35, color: '#8884d8' },
    { name: 'Qualified', value: 25, color: '#82ca9d' },
    { name: 'Proposal', value: 20, color: '#ffc658' },
    { name: 'Negotiation', value: 15, color: '#ff7300' },
    { name: 'Closed Won', value: 5, color: '#00ff00' },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - CRM System</title>
      </Helmet>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back! Here's what's happening with your business today.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Customers"
              value={stats?.totalCustomers || '1,234'}
              change="+12%"
              icon={<People />}
              color={theme.palette.primary.main}
              trend="up"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Revenue This Month"
              value={`$${stats?.monthlyRevenue || '95,430'}`}
              change="+8%"
              icon={<AttachMoney />}
              color={theme.palette.success.main}
              trend="up"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Deals"
              value={stats?.activeDeals || '45'}
              change="+15%"
              icon={<Assignment />}
              color={theme.palette.warning.main}
              trend="up"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Calls Today"
              value={stats?.callsToday || '23'}
              change="-2%"
              icon={<Phone />}
              color={theme.palette.info.main}
              trend="down"
            />
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3}>
          {/* Sales Chart */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Sales Overview
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={sampleSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'sales' ? `$${value.toLocaleString()}` : value,
                    name === 'sales' ? 'Sales' : 'Deals'
                  ]} />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke={theme.palette.primary.main}
                    fill={alpha(theme.palette.primary.main, 0.3)}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Deal Stages Pie Chart */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Deals by Stage
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={dealStageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {dealStageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ height: 400 }}>
              <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
                <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Recent Activities
                  </Typography>
                  <IconButton size="small">
                    <ChevronRight />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ maxHeight: 320, overflow: 'auto' }}>
                {activities?.map((activity, index) => (
                  <RecentActivityCard key={index} activity={activity} />
                )) || (
                  // Sample activities
                  [
                    {
                      type: 'call',
                      title: 'Follow-up call completed',
                      customer: 'John Smith',
                      status: 'completed',
                      createdAt: new Date()
                    },
                    {
                      type: 'email',
                      title: 'Proposal sent',
                      customer: 'Acme Corp',
                      status: 'pending',
                      createdAt: subDays(new Date(), 1)
                    },
                    {
                      type: 'meeting',
                      title: 'Demo scheduled',
                      customer: 'Tech Solutions',
                      status: 'scheduled',
                      createdAt: subDays(new Date(), 2)
                    }
                  ].map((activity, index) => (
                    <RecentActivityCard key={index} activity={activity} />
                  ))
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Top Performers */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Top Performers
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  { name: 'Sarah Johnson', deals: 15, revenue: 95000, avatar: 'S' },
                  { name: 'Mike Chen', deals: 12, revenue: 78000, avatar: 'M' },
                  { name: 'Emily Davis', deals: 10, revenue: 65000, avatar: 'E' },
                  { name: 'James Wilson', deals: 9, revenue: 55000, avatar: 'J' }
                ].map((performer, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 1 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {performer.avatar}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {performer.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {performer.deals} deals • ${performer.revenue.toLocaleString()}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(performer.deals / 20) * 100}
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      />
                    </Box>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                      #{index + 1}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;