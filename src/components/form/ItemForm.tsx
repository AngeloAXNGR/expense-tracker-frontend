import { useContext } from 'react'
import { ExpenseContext } from '../../contexts/ExpenseContext'
type expenseIdProp = {
	expenseId:number
}
const ItemForm = ({expenseId}:expenseIdProp) => {
	const {itemsForm, toggleShowForm, handleItemFormInputs, addItem} = useContext(ExpenseContext)
	console.log(itemsForm);
	return (
		<div className="form">
			<div className="filler" id="toggle-items-form" onClick={(e) => toggleShowForm(e)}></div>
			<div className="modal">
				<div className="form-inputs">
					<input 
						type="text" 
						name="name"
						value={itemsForm.name}
						onChange={e => {handleItemFormInputs(e)}}
						placeholder="Name"
					/>
					<input 
						type="number" 
						name="price"
						onChange={e => {handleItemFormInputs(e)}}
						placeholder="Price"
					/>
					<input 
						type="number" 
						name="quantity"
						onChange={e => {handleItemFormInputs(e)}}
						placeholder="Quantity"
					/>
				</div>
				<div className="form-buttons">
					<button onClick={(e) => {addItem(e,expenseId)}}>Add</button>
					<button id="toggle-items-form" onClick={(e) => toggleShowForm(e)}>Cancel</button>
				</div>
			</div>
		</div>
	)
}

export default ItemForm