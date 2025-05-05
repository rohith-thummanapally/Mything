import e from "express";
import cors from 'cors';
import expenseRouter from "./src/features/expenses/expenses.router.js";
const app=e();
app.use(cors());

app.use(e.json());
app.use('/api/expenses',expenseRouter);


export default app; 
