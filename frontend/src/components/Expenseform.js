import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseThunk, expensesstate } from '../redux/expensesSlice.js';
import CustomDropdown from './commoncomps/CustomDropdown.js';
import CustomMultiSelect from './commoncomps/CustomMultiSelect.js';
import CustomInput from './commoncomps/CustomInput.js';
import '../styles/expenses.css';
function Expenseform(props) {
    const dispatch = useDispatch();
    const [selcategory, setCategory] = useState({});
    const [seltags, settags] = useState([]);
    const [formdata, setformdata] = useState({ date: "", amount: 0, category: '', name: '' });
    const { allcategories, alltags } = useSelector(expensesstate);
    function updateformdata(e) {
        let tname = e.target.id;
        setformdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
    function submitform(e) {
        e.preventDefault();
        /*let seltagslen=e.target[3].selectedOptions.length;
        let seltags=[];
        for(let i=0;i<seltagslen;i++)
        {
            seltags.push(Number(e.target[3].selectedOptions[i].value));
        }*/
        if (seltags.length > 0) {
            console.log('in submit function');

            let categoryId = selcategory?.id;
            let tagsArray = seltags.map((item) => item?.['id']);

            // Create a local payload object because setState is asynchronous!
            let finalFormData = {
                ...formdata,
                tags: tagsArray,
                category: categoryId
            };

            // Update the state for UI if needed
            setformdata(finalFormData);

            console.log('Dispatching Data:', finalFormData);

            // Dispatch the final assembled object, NOT the old formdata state
            dispatch(addExpenseThunk(finalFormData));
            props.closeform(false);
        }
    }
    useEffect(() => {
        console.log("selcategory");
        console.log(selcategory);

    }, [selcategory])
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form className="expenseform" onSubmit={(e) => { submitform(e) }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p>ADD Expense</p>
                        <img src="http://testsfc.winnou.in/aig.png" onClick={() => { props.closeform(false) }} style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
                    </div>
                    <p className="expenseformlabel">Date</p>
                    <CustomInput className="expenseforminpfield" id="date" required onChange={(e) => { updateformdata(e) }} type="date" />

                    <p className="expenseformlabel">Amount</p>
                    <CustomInput className="expenseforminpfield" id="amount" required onChange={(e) => { updateformdata(e) }} type="number" />

                    <p className="expenseformlabel">Category</p>
                    {/*<select className="expenseforminpfield" id="category" required onChange={(e)=>{updateformdata(e)}}>
                                <option value="1">Food</option>
                                <option value="2">Travel</option>
                            </select>*/}
                    <CustomDropdown filter value={selcategory} onChange={(e) => { setCategory(e.target.value) }} id='category' options={allcategories} optionLabel='category_name' placeholder=' Category' className='expenseforminpfield' />
                    <p className="expenseformlabel">Tags</p>
                    {/*<select multiple id="tags" required name="tags">
                                <option value="1">Mandatory</option>
                                <option value="2">Non-Mandatory</option>
                                <option value="3">Waste</option>
                            </select>*/}
                    <CustomMultiSelect filter value={seltags} onChange={(e) => { settags([...e.target.value]) }} options={alltags} optionLabel="tag_name" placeholder=' Select Tags' className="fommultiselect" />
                    <p className="expenseformlabel">Notes</p>
                    <CustomInput className="expenseforminpfield" type="text" id="name" required onChange={(e) => { updateformdata(e) }} />
                    <p className="expenseformlabel"></p>
                    <input className="expenseforminpfield" type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default Expenseform;