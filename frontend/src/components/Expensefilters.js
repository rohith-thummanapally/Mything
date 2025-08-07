import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import {Calendar} from 'primereact/calendar';
import { useSelector,useDispatch } from 'react-redux';
import { expensesactions, expensesstate,getExpensesThunk,getdaywiseExpensesThunk } from '../redux/expensesSlice';
import '../styles/commonstyles.css';
export default function Expensefilters(props)
{
    const dispatch=useDispatch();
    let [selcategory,setCategory]=useState({});
    let [seltags,settags]=useState([]);
    let [selfromdate,setfromdate]=useState('');
    let [seltodate,settodate]=useState('');
    let {allcategories,alltags}=useSelector(expensesstate);
    console.log(seltags);
    useEffect(()=>{
        seltags=seltags.map((item,index)=>{
            return item['id'];
        });
        console.log('------------------');
        console.log(seltodate);
        dispatch(getExpensesThunk({fromdate:selfromdate,todate:seltodate,categories:selcategory['id'],tags:seltags}));
        dispatch(getdaywiseExpensesThunk({categories:selcategory['id'],tags:seltags,fromdate:selfromdate,todate:seltodate}));
    },[seltags,selcategory,selfromdate,seltodate]);
    function changetags(e)
    {
        settags([...e.target.value]);
        let alltags=e.target.value;
        let alltagids=alltags.map((item,index)=>(item['id']));
        dispatch(expensesactions.changetags({"type":'',"data":alltagids}));
    }
    return(
        <div className="expenseFilters">
            <div style={{marginLeft:'10px',flex:3}}>
                <Dropdown filter value={selcategory} onChange={(e)=>{dispatch(expensesactions.changecategories({"type":'',"data":e.target.value['id']}));setCategory(e.target.value)}} options={allcategories} optionLabel='category_name' placeholder=' Category' className='filterdropdown' />
            </div>
            <div style={{marginLeft:'10px',flex:3}}>
                <MultiSelect filter value={seltags} onChange={(e)=>{changetags(e)}} options={alltags} optionLabel="tag_name" placeholder=' Select Tags' className="filtermultiselect"  />
            </div>
            <div style={{marginLeft:'10px',flex:3}}>
                <Calendar value={selfromdate} onChange={(e)=>{console.log(e.target.value);setfromdate(e.target.value);dispatch(expensesactions.changeFromdate({"type":"changefromdate","data":e.target.value.toLocaleDateString()}))}} className="dateclass" placeholder='From Date' />
            </div>
            <div style={{marginLeft:'10px',flex:3}}>
                <Calendar value={seltodate} onChange={(e)=>{console.log(e.target.value);settodate(e.target.value);dispatch(expensesactions.changeTodate({"type":"changetodate","data":e.target.value.toLocaleDateString()}))}} className="dateclass" placeholder='To Date' />
            </div>
        </div>
    );
}