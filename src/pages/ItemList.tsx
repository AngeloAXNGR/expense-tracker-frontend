import "./Expenses.css";
import {useContext, useEffect} from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'
import { useParams } from 'react-router-dom'
import { ItemsObject } from '../contexts/ExpenseContext'
import DeleteIcon from '../assets/delete.svg';
import ItemForm from "../components/form/ItemForm";

const ItemData = ({id, name, price, quantity}:ItemsObject) => {
	const {expenseId} = useParams()
	const {deleteItem} = useContext(ExpenseContext);
	return(
		<div className="item">
		<div className="item-left-section">
			<h3>{name}</h3>
		</div>
			<div className="item-right-section">
				<h3>Price: &#8369;{price}</h3>
				<h3>Qty: {quantity}</h3>
				<img src={DeleteIcon} alt="" onClick={(e) => {deleteItem(e, id, Number(expenseId))}}/>
			</div>
		</div>
	);

}

const ItemList = () => {
	const {items, loadItemsByExpense, toggleShowForm, showItemForm} = useContext(ExpenseContext);
	const {expenseId} = useParams()
	useEffect(() => {
		loadItemsByExpense(Number(expenseId))
	},[])

	const itemElements = items.map((item) => {
		return(
			<ItemData
				key={item.id}
				id={item.id}
				name={item.name}
				price={item.price}
				quantity={item.quantity}
			/>
		)
	})


	console.log(items);
	return (
		<div className="item-container">
			{showItemForm && <ItemForm expenseId={Number(expenseId)}/>}
			<div className="item-component-buttons">
				<button id="toggle-items-form" onClick={(e) => toggleShowForm(e)}>Add</button>
				<button>Back</button>
			</div>
			<div className="items">
				{itemElements}
			</div>
		</div>

	)
}

export default ItemList