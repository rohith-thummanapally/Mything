import e from "express";
import cors from 'cors';
import expenseRouter from "./src/features/expenses/expenses.router.js";
import loginRouter from "./src/features/login/login.router.js";
const app = e();
//app.use(cors());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(e.json());
app.use('/api/expenses', expenseRouter);
app.use('/api/login', loginRouter);


export default app; 
