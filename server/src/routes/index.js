const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const expenseRoutes = require('./expenses');
const budgetRoutes = require('./budgets');
const dashboardRoutes = require('./dashboard');
const reportRoutes = require('./reports');


router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);
router.use('/budgets', budgetRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/reports', reportRoutes);

module.exports = router;