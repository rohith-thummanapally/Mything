import { useSelector,useDispatch } from "react-redux";
import { expensesactions,expensesstate } from "../redux/expensesSlice.js";

export default function Recentexpenses(props)
{
    let {expenses}=useSelector(expensesstate);
    return (
            <table className="expensestable">
                <thead>
                <tr>
                    <th className="exptableheader" style={{width:'5%'}}>Sno</th>
                    <th className="exptableheader">Note</th>
                    <th className="exptableheader">Category</th>
                    <th className="exptableheader">Cost</th>
                    <th className="exptableheader">Tag</th>
                </tr>
                </thead>
                <tbody>
                {expenses && expenses.map((item,index)=>{
                    return (
                        <tr>
                            <td className="exptabledata">{index+1}</td>
                            <td className="exptabledata">{item['name']}</td>
                            <td className="exptabledata">{item['category_name']}</td>
                            <td className="exptabledata">{item['amount']}</td>
                            <td className="exptabledata">{item['tags']}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
}