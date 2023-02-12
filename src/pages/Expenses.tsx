import './Expenses.css'
import { useContext } from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'

import { ExpenseObject } from '../contexts/ExpenseContext'

import DeleteIcon from '../assets/delete.svg';


const ExpenseData = ({id, title, recipient, allowance, description}: ExpenseObject) => {

	return(
		<div className="expense">
			<div className="expense-left-section">
				<h2>{title}</h2>
				<h3 id="recipient-name">From: {recipient}</h3>
			</div>
			<div className="expense-right-section">
				<h1>{allowance}</h1>
				<img src={DeleteIcon} alt="" />
			</div>
		</div>
	)
}

const Expenses = () => {
	const {expenses} = useContext(ExpenseContext);

	return (
		<div className="expense-container">
			<button>Add Expense</button>

			<div className="expenses">
				{
					expenses.map((expense) => {
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
				}
			</div>
		</div>
	)
}

export default Expenses