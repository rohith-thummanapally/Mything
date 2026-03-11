import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import Recentexpenses from "../components/Recentexpenses.js";
export default function Dashbaord() {
    let dashoverviewitems = [{ label: 'Total Expenses', value: '$1950' }, { label: 'Notes Count', value: '5' }, { label: 'Jounal Entries', value: '12' }, { label: 'Lending Summary', value: '$900' }]
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
            <Sidebar />
            <div className="pagestyle">
                <div className="pageheader">
                    Dashboard
                </div>
                <div className="dashoverview">
                    {dashoverviewitems &&
                        dashoverviewitems.map((item, index) => {
                            return (
                                <div className="dashoverviewitem">
                                    <div className="dashoverviewitemlabel">
                                        {item['label']}
                                    </div>
                                    <div className="dashoverviewitemvalue" >
                                        {item['value']}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <Recentexpenses />
                </div>
            </div>
        </div>
    )
}