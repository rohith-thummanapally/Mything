import './Sidebar.css';
import { NavLink } from 'react-router-dom';
export default function Sidebar()
{
    let sidebaritems=[{name:'Home',img:"http://testsfc.winnou.in/ai.png",path:'/'},
        {name:'Expenses',img:"http://testsfc.winnou.in/ai.png",path:'/expenses'},
        {name:'Notes',img:"http://testsfc.winnou.in/ai.png",path:'/notes'},
        {name:'Lendings',img:"http://testsfc.winnou.in/ai.png",path:'/lendings'},
        {name:'Journals',img:"http://testsfc.winnou.in/ai.png",path:'/journals'}
    ]
    return (
        <div className="Sidebar">
            <div className='Sidebarsub'>
                <div className='Sidebarheader'>
                    <div className='SidebarItem'>
                        <img src="http://testsfc.winnou.in/aig.png" className='Sidebaritemimg' />
                        <div className='Sidebaritemtext' style={{fontWeight:600}}>Dashbaord</div>
                    </div>
                </div>
                <div className='Sidebaritems'>
                    {
                        sidebaritems.map((item,index)=>(
                            <NavLink to={item['path']} className='Sidebarlink' end>
                            <div className='SidebarItem'>
                                <img src={item['img']} className='Sidebaritemimg'/>
                                <div className='Sidebaritemtext'>
                                    {item['name']}
                                </div>
                            </div>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
            <div className='Sidebarsub'>
                <p>Settings</p>
            </div>
        </div>
    );
}