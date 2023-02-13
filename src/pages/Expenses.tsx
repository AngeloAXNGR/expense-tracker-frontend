import './Expenses.css'
import { useContext, useState } from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'
import { ExpenseObject } from '../contexts/ExpenseContext'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../assets/delete.svg';
import EditIcon from '../assets/edit.svg';
import ExpenseForm from '../components/form/ExpenseForm';
import EditExpenseForm from '../components/form/EditExpenseForm';


const ExpenseData = ({id, title, recipient, allowance, description}: ExpenseObject) => {
	const {deleteExpense, openEditForm, currentExpenseId} = useContext(ExpenseContext);

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

	const navigate = useNavigate();

	const navigateTo = (id:number) => {
		navigate(`/${id}/items`)
	}

	return(
		<div 
			className="expense" 
			style={isHover === id ? hoverStyle : {}}
			onMouseEnter={() => handleMouseEnter(id)} 
			onMouseLeave={() => handleMouseLeave(id)}
			onClick={() => navigateTo(id)}
		>
			<div className="expense-left-section">
				<h2>{title}</h2>
				<h3 id="recipient-name">From: {recipient}</h3>
			</div>
			<div className="expense-right-section">
				<p>&#8369;{allowance}</p>
				<div className="icons">
					<img src={EditIcon} id="edit-expense-form" style={isHover === id ? IconHoverStyle : {opacity:0}} onClick={(e) => openEditForm(e, Number(id), 0)}/>
					<img src={DeleteIcon} alt="" onClick={(e) => deleteExpense(e, id)} style={isHover === id ? IconHoverStyle : {opacity:0}}/>
				</div>
			</div>
		</div>
	)
}

const Expenses = () => {
	const {expenses, showForm, toggleShowForm, showEditExpenseForm} = useContext(ExpenseContext);


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
			<button className="button" id="toggle-expense-form" onClick={(e) => toggleShowForm(e)}>Add Expense</button>
			{showForm && <ExpenseForm/>}
			{showEditExpenseForm && <EditExpenseForm/>}
			<div className="expenses">
				{expenseItems}
			</div>
		</div>
	)
}

export default Expenses