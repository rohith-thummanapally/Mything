import { useEffect } from "react";
import AreaChartComp from "./Charts/AreaChart.js";
import CategoryPieChart from "./Charts/CategoryPieChart.js";
import TagsPieChart from "./Charts/TagsPieChart.js";
import { useSelector, useDispatch } from "react-redux";
import { expensesstate, getcategorywiseexpensesThunk, gettagwiseexpensesThunk } from "../redux/expensesSlice.js";
import { callapi } from "../Utils/apiCalls.js";

export default function ExpenseGraphs(props) {
    const { allCategories, allTags, fromdate, todate, categorywiseexpenses, tagwiseexpenses } = useSelector(expensesstate);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getcategorywiseexpensesThunk());
        dispatch(gettagwiseexpensesThunk());
        // dispatch(getdaywiseexpensesThunk());
    }, [fromdate, todate]);

    return (
        <div className="w-full h-full p-6 overflow-y-scroll bg-gray-50/50 rounded-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Expense Analytics</h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 col-span-1 xl:col-span-2 flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-gray-700 self-start mb-2">Trend Over Time</h3>
                    <AreaChartComp />
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 col-span-1 xl:col-span-2 flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-gray-700 self-start mb-2">By Category</h3>
                    <CategoryPieChart categorywiseexpenses={categorywiseexpenses} />
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 col-span-1 xl:col-span-2 flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-gray-700 self-start mb-2">By Tags</h3>
                    <TagsPieChart tagwiseexpenses={tagwiseexpenses} />
                </div>
            </div>
        </div>
    );
}