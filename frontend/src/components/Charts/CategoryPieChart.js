import { useMemo } from "react";
import { useSelector } from "react-redux";
import { expensesstate } from "../../redux/expensesSlice";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6666'];

export default function CategoryPieChart({ categorywiseexpenses }) {
    let { expenses = [] } = useSelector(expensesstate);

    const categoryData = useMemo(() => {
        const categoryMap = {};
        categorywiseexpenses.forEach(exp => {
            const catName = exp.category_name || 'Uncategorized';
            categoryMap[catName] = (categoryMap[catName] || 0) + Number(exp.amount || 0);
        });

        return Object.entries(categoryMap)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value); // Sort largest to smallest
    }, [categorywiseexpenses]);

    if (!categoryData.length) {
        return <div className="flex items-center justify-center h-full text-gray-400 text-sm">No category data</div>;
    }

    return (
        <div className="w-full h-[250px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => `₹${value.toFixed(2)}`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
