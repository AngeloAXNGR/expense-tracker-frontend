import "./Expenses.css";
import {useContext, useState, useEffect} from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'
import { useParams, useNavigate } from 'react-router-dom'
import { ItemsObject } from '../contexts/ExpenseContext'
import DeleteIcon from '../assets/delete.svg';
import EditIcon from '../assets/edit.svg';
import ItemForm from "../components/form/ItemForm";
import EditItemForm from "../components/form/EditItemForm";

const ItemData = ({id, name, price, quantity}:ItemsObject) => {
	const {expenseId} = useParams()
	const {deleteItem, openEditForm} = useContext(ExpenseContext);
	const [isHover, setIsHover] = useState(null);

	const handleMouseEnter = (id:any) => {
		setIsHover(id)
	}

	const handleMouseLeave = (id:number) => {
		setIsHover(null)
	}

	const hoverStyle = {
		boxShadow: "0 0 10px rgba(0,0,0,0.7)"
	}

	const IconHoverStyle = {
		opacity:100
	}
	return(
		<div 
			className="item"
			style={isHover === id ? hoverStyle : {}}
			onMouseEnter={() => handleMouseEnter(id)}
			onMouseLeave={() => handleMouseLeave(id)}
		>

		<div className="item-left-section">
			<h3>{name}</h3>
		</div>
			<div className="item-right-section">
				<h3>Price: &#8369;{price}</h3>
				<h3>Qty: {quantity}</h3>
				<div className="icons">
					<img src={EditIcon} id="edit-items-form" style={isHover === id ? IconHoverStyle : {opacity:0}} onClick={(e) => openEditForm(e, Number(expenseId), id)}/>
					<img src={DeleteIcon} alt="" onClick={(e) => {deleteItem(e, id, Number(expenseId))}} style={isHover === id ? IconHoverStyle : {opacity:0}}/>
				</div>
			</div>
		</div>
	);

}

const ItemList = () => {
	const {expense, loadOneExpense, items, loadItemsByExpense, toggleShowForm, showItemForm, showEditItemForm} = useContext(ExpenseContext);
	const {expenseId} = useParams()

	const [totalCost, setTotalCost] = useState(0);
	const [remainingBalance, setRemainingBalance] = useState(0);
	
	useEffect(() => {
		loadOneExpense(Number(expenseId))
		loadItemsByExpense(Number(expenseId))
	},[showEditItemForm])

	useEffect(() =>{
		calculateTotalCost();
		calculateBalance();
	},[items, totalCost])

	const navigate = useNavigate();

	const navigateTo = () => {
		navigate(-1);
	}

	const calculateTotalCost = () => {
		let total = 0
		 for(let i = 0; i < items.length; i++){
			total+=(items[i].price * items[i].quantity)
		 }
		 setTotalCost(total)
	}

	const calculateBalance = () => {
		let balance = expense.allowance - totalCost;
		setRemainingBalance(balance)
	}


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


	return (
		<div className="item-container">
			{showItemForm && <ItemForm expenseId={Number(expenseId)}/>}
			{showEditItemForm && <EditItemForm/>}
			<div className="item-component-buttons">
				<button id="toggle-items-form" onClick={(e) => toggleShowForm(e)}>Add</button>
				<button onClick={navigateTo}>Back</button>
			</div>

			<div className="expense-details">
				<div id="allowance">
					<p>Allowance: &#8369;{expense.allowance}</p>
				</div>
				<div id="cost">
					<p>Total Cost: &#8369;{totalCost}</p>
				</div>
				<div id="remaining-balance">
					<p>Remaining: &#8369;{remainingBalance}</p>
				</div>
			</div>

			<div className="items">
				{itemElements}
			</div>
		</div>

	)
}

export default ItemList