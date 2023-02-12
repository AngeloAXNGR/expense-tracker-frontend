import './Expenses.css'
import { useContext, useState } from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'
import { ExpenseObject } from '../contexts/ExpenseContext'
import DeleteIcon from '../assets/delete.svg';
import Form from '../components/form/Form';


const ExpenseData = ({id, title, recipient, allowance, description}: ExpenseObject) => {
	const {deleteExpense} = useContext(ExpenseContext);

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
			className="expense" 
			style={isHover === id ? hoverStyle : {}}
			onMouseEnter={() => handleMouseEnter(id)} 
			onMouseLeave={() => handleMouseLeave(id)}
		>
			<div className="expense-left-section">
				<h2>{title}</h2>
				<h3 id="recipient-name">From: {recipient}</h3>
			</div>
			<div className="expense-right-section">
				<h1>{allowance}</h1>
				<img src={DeleteIcon} alt="" onClick={(e) => deleteExpense(e, id)} style={isHover === id ? IconHoverStyle : {opacity:0}}/>
			</div>
		</div>
	)
}

const Expenses = () => {
	const {expenses, showForm, toggleShowForm} = useContext(ExpenseContext);


	const expenseItems = expenses.map((expense) => {
		return(
			<ExpenseData
				key={expense.id}
				id={expense.id}
				title={expense.title}
				recipient={expense.recipient}
				allowance={expense.allowance}
				description={expense.description}
			/>
		)
	})

	return (
		<div className="expense-container">
			<button className="button" onClick={toggleShowForm}>Add Expense</button>
			{showForm && <Form/>}
			<div className="expenses">
				{expenseItems}

			</div>
		</div>
	)
}

export default Expenses