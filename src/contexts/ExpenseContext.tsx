import { createContext, useState, useEffect } from "react";
import axios from 'axios';

type ExpenseForm = {
	title:string,
	recipient:string,
	allowance:number,
	description:string
}

export type ExpenseObject = {
	id:number,
	title:string,
	recipient:string,
	allowance:number,
	description: string
}

type ExpenseContextType = {
	expenses: ExpenseObject[],
	expenseForm: ExpenseForm,
	showForm:boolean,
	toggleShowForm: (event:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
	handleFormInputs: (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	addExpense: (event:React.MouseEvent<HTMLButtonElement>) => void
	deleteExpense: (event:React.MouseEvent<HTMLImageElement>, id:number) => void,
}

type ExpenseContextProviderProps = {
	children: React.ReactNode
}

export const ExpenseContext = createContext({} as ExpenseContextType);

export const ExpenseContextProvider = ({children}:ExpenseContextProviderProps) => {
	const [expenses, setExpenses] = useState([])

	const [showForm, setShowForm] = useState(false);
	const [expenseForm, setExpenseForm] = useState<ExpenseForm>({title:'', recipient:'', allowance:0, description:''})


	useEffect(() =>{
		loadAllExpenses();
	},[])

	const toggleShowForm = () => {
		setShowForm(prevForm => {return !prevForm});
	}

	const handleFormInputs = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const {name, value} = event.target;
		setExpenseForm(prevExpenseForm => {
			return {...prevExpenseForm,
				[name] : value
			}
		})
	}

	const loadAllExpenses = async () => {
		const result = await axios.get("http://localhost:8080/api/expenses");
		if(result.data === ''){
			setExpenses([])
		}else{
			setExpenses(result.data);
		}
	}

	const addExpense = async () => {
		await axios.post("http://localhost:8080/api/expenses", expenseForm)
		loadAllExpenses();
		setExpenseForm(
			{
				title:'', 
				recipient:'', 
				allowance:0, 
				description:''
			})
		setShowForm(false);
	}

	const deleteExpense =  async (event:React.MouseEvent<HTMLImageElement>, id:number) => {
		await axios.delete(`http://localhost:8080/api/expenses/${id}`)
		loadAllExpenses();
	}

	return(
		<ExpenseContext.Provider value={{expenses, expenseForm, showForm, toggleShowForm, handleFormInputs,addExpense, deleteExpense}} >
			{children}
		</ExpenseContext.Provider>
	)
}