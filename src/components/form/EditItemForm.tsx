import { useContext , useEffect} from 'react'
import { ExpenseContext } from '../../contexts/ExpenseContext'
import { ItemsObject } from '../../contexts/ExpenseContext'
import "./Form.css";

const EditItemForm = () => {

	const {currentItemId, itemsForm, closeEditForm, handleItemFormInputs, loadOneItem, updateItem} = useContext(ExpenseContext)
	return (
		<div className="form">
			<div className="filler" id="toggle-items-form" 	onClick={(e) => closeEditForm(e)}></div>
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
						value={itemsForm.price}
						onChange={e => {handleItemFormInputs(e)}}
						placeholder="Price"
					/>
					<input 
						type="number" 
						name="quantity"
						value={itemsForm.quantity}
						onChange={e => {handleItemFormInputs(e)}}
						placeholder="Quantity"
					/>
				</div>
				<div className="form-buttons">
					<button onClick={(e) => updateItem(e,currentItemId)}>Update</button>
					<button id="toggle-items-form" onClick={(e) => closeEditForm(e)}>Cancel</button>
				</div>
			</div>
		</div>
	)
}

export default EditItemForm