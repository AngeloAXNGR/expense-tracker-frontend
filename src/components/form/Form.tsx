import "./Form.css";
import {useContext} from 'react'
import { ExpenseContext } from "../../contexts/ExpenseContext";

const Form = () => {
	const {expenseForm, toggleShowForm, handleFormInputs, addExpense} = useContext(ExpenseContext);
	console.log(expenseForm);
	return (
		<div className="form">
			<div className="filler" onClick={toggleShowForm}></div>
			<div className="modal">
				<div className="form-inputs">
					<input
						className="expense-inputs"
						type="text"
						name="title"
						value={expenseForm.title}
						onChange={(e) => handleFormInputs(e)}
						placeholder="Title"
					/>
					<input
						className="expense-inputs"
						type="text"
						name="recipient"
						value={expenseForm.recipient}
						onChange={(e) => handleFormInputs(e)}
						placeholder="Recipient Name"
					/>
					<input
						className="expense-inputs"
						type="number"
						name="allowance"
						onChange={(e) => handleFormInputs(e)}
						placeholder="Allowance"
					/>
					<textarea
						className="expense-inputs"
						name="description"
						cols={30}
						rows={10}
						value={expenseForm.description}
						onChange={(e) => handleFormInputs(e)}
						placeholder="Description"
					/>
				</div>
				<div className="form-buttons">
					<button onClick={addExpense}>Add</button>
					<button onClick={toggleShowForm}>Cancel</button>
				</div>
			</div>
		</div>
	)
}

export default Form