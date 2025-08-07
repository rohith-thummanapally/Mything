import { max } from "lodash";
export default function BarChartcomp(props)
{
    let disdata=[];
    disdata=props.displaydata;
    let ymax=max(disdata.map((item,index)=>{item['yval']}));
    return (
        <BarChart width={730} height={250} data={disdata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="xname" />
            <YAxis domain={[0,ymax*1.1]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="yval" fill="#8884d8" />
            </BarChart>
    )
}