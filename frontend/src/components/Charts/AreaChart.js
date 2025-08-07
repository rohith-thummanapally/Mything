//  import "./styles.css";
import { useEffect } from "react";
import { expensesactions,expensesreducer,expensesstate,getdaywiseExpensesThunk } from "../../redux/expensesSlice";
import { useReducer,useDispatch,useSelector } from "react-redux";
import { AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer } from "recharts";
import { max } from "lodash";

export default function AreaChartComp() {
  const dispatch=useDispatch();
  let {categories,tags,fromdate,todate,daywiseexpenses}=useSelector(expensesstate);
  //console.log(daywiseexpenses);
  /*useEffect(()=>{
    console.log('^^^^^^^^^^^^^^^^^^^^^^^');
    dispatch(getdaywiseExpensesThunk({categories,tags,fromdate,todate}));
  },[]);*/
  let allexp=daywiseexpenses.map((item,index)=>(Number(item['expense'])));
  let maxexp=max(allexp);
  return (
      <div style={{width:'400px',height:'250px',paddingTop:'10px'}}>
      <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={daywiseexpenses}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fdate" />
        <YAxis domain={[0,maxexp*1.1]}/>
        <Tooltip />
        <Area type="monotone" dataKey="expense" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      </ResponsiveContainer>
      </div>
  );
}
