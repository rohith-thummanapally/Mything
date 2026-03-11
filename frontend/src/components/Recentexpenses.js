import { useSelector, useDispatch } from "react-redux";
import { expensesactions, expensesstate } from "../redux/expensesSlice.js";

export default function Recentexpenses(props) {
    let { expenses } = useSelector(expensesstate);
    return (
        <div className="w-full bg-white rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="py-4 px-6 font-semibold" style={{ width: '5%' }}>Sno</th>
                        <th className="py-4 px-6 font-semibold">Note</th>
                        <th className="py-4 px-6 font-semibold">Category</th>
                        <th className="py-4 px-6 font-semibold">Price</th>
                        <th className="py-4 px-6 font-semibold">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {expenses && expenses.map((item, index) => {
                        return (
                            <tr key={index} className="hover:bg-gray-50/80 transition-colors duration-200">
                                <td className="py-4 px-6 text-sm text-gray-500">{index + 1}</td>
                                <td className="py-4 px-6 text-sm text-gray-800 font-medium">{item['name']}</td>
                                <td className="py-4 px-6 text-sm">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                                        {item['category_name']}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-sm font-semibold text-gray-700">₹{item['amount']}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{item['date'].split(' ')[0]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}