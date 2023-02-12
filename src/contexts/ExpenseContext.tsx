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
	expenses: ExpenseObject[]
}

type ExpenseContextProviderProps = {
	children: React.ReactNode
}

export const ExpenseContext = createContext({} as ExpenseContextType);

export const ExpenseContextProvider = ({children}:ExpenseContextProviderProps) => {
	const [expenses, setExpenses] = useState([])
	const [expenseForm, setExpenseForm] = useState<ExpenseForm>({title:'', recipient:'', allowance:0, description:''})


	useEffect(() =>{
		loadAllExpenses();
	},[])

	const loadAllExpenses = async () => {
		const result = await axios.get("http://localhost:8080/api/expenses");
		setExpenses(result.data);
	}
	return(
		<ExpenseContext.Provider value={{expenses}} >
			{children}
		</ExpenseContext.Provider>
	)
}