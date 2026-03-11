//  import "./styles.css";
import { useEffect } from "react";
import { expensesactions, expensesreducer, expensesstate, getdaywiseExpensesThunk } from "../../redux/expensesSlice";
import { useReducer, useDispatch, useSelector } from "react-redux";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { max } from "lodash";

export default function AreaChartComp() {
  const dispatch = useDispatch();
  let { categories, tags, fromdate, todate, daywiseexpenses = [] } = useSelector(expensesstate);
  //console.log(daywiseexpenses);
  /*useEffect(()=>{
    console.log('^^^^^^^^^^^^^^^^^^^^^^^');
    dispatch(getdaywiseExpensesThunk({categories,tags,fromdate,todate}));
  },[]);*/
  let allexp = daywiseexpenses.map((item, index) => (Number(item['expense'])));
  let maxexp = max(allexp);
  return (
    <div className="w-full h-[250px] pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={daywiseexpenses}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="fdate"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            domain={[0, maxexp * 1.1]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            dx={-10}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value) => [`₹${value}`, 'Expense']}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorExpense)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
