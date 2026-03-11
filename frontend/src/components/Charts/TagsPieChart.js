import { useMemo } from "react";
import { useSelector } from "react-redux";
import { expensesstate } from "../../redux/expensesSlice";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ['#FF6666', '#FFBB28', '#00C49F', '#0088FE', '#8884D8', '#FF8042'];

export default function TagsPieChart({ tagwiseexpenses }) {
    //let { expenses = [] } = useSelector(expensesstate);

    const tagsData = useMemo(() => {
        // const tagsMap = {};
        // tagwiseexpenses.forEach(exp => {
        //     // Expenses may have multiple tags. Depending on backend response, this could be an array or string.
        //     // Assuming it's an array for robustness, or extracting from a single tag if that's the structure.
        //     const tagNames = exp.tags ? (Array.isArray(exp.tags) ? exp.tags : [exp.tags]) : ['Untagged'];
        //     tagNames.forEach(tagName => {
        //         const name = tagName.name || tagName.tag_name || (typeof tagName === 'string' ? tagName : 'Untagged');
        //         tagsMap[name] = (tagsMap[name] || 0) + Number(exp.amount || 0);
        //     })
        // });

        // return Object.entries(tagsMap)
        //     .map(([name, value]) => ({ name, value }))
        //     .sort((a, b) => b.value - a.value);

        return tagwiseexpenses.map(exp => ({
            name: exp.tag_name,
            value: Number(exp.amount)
        }));
    }, [tagwiseexpenses]);
    console.log('tags data is');
    console.log(tagwiseexpenses);
    console.log(tagsData);

    if (!tagsData.length) {
        return <div className="flex items-center justify-center h-full text-gray-400 text-sm">No tags data</div>;
    }

    return (
        <div className="w-full h-[250px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={tagsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {tagsData.map((entry, index) => (
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
