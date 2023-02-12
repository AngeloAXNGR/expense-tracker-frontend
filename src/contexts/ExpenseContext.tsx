import { createContext, useState, useEffect } from "react";
import axios from 'axios';

type ExpenseForm = {
	title:string,
	recipient:string,
	allowance:number,
	description:string
}

type ItemsForm = {
	name:string,
	price:number,
	quantity:number
}

export type ExpenseObject = {
	id:number,
	title:string,
	recipient:string,
	allowance:number,
	description: string
}

export type ItemsObject = {
	id:number
	name:string,
	price:number,
	quantity:number
}

type ExpenseContextType = {
	expenses: ExpenseObject[],
	expenseForm: ExpenseForm,
	showForm:boolean,
	toggleShowForm: (event:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
	handleFormInputs: (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	addExpense: (event:React.MouseEvent<HTMLButtonElement>) => void
	deleteExpense: (event:React.MouseEvent<HTMLImageElement>, id:number) => void,

	items: ItemsObject[],
	loadItemsByExpense:any,
	showItemForm:boolean,
	itemsForm: ItemsForm,
	handleItemFormInputs: (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	addItem:(event:React.MouseEvent<HTMLButtonElement>, expenseId:number) => void
	deleteItem:(event:React.MouseEvent<HTMLImageElement>, id:number, expenseId:number) => void,



}

type ExpenseContextProviderProps = {
	children: React.ReactNode
}

export const ExpenseContext = createContext({} as ExpenseContextType);

export const ExpenseContextProvider = ({children}:ExpenseContextProviderProps) => {
	const [expenses, setExpenses] = useState([])
	const [items, setItems] = useState([])

	const [showForm, setShowForm] = useState(false);
	const [showItemForm, setShowItemForm] = useState(false);
	const [expenseForm, setExpenseForm] = useState<ExpenseForm>({title:'', recipient:'', allowance:0, description:''})
	const [itemsForm, setItemsForm] = useState<ItemsForm>({name:'', price:0, quantity:0})


	useEffect(() =>{
		loadAllExpenses();
	},[])

	const toggleShowForm = (event:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
		if(event.currentTarget.id === "toggle-expense-form"){
			setShowForm(prevForm => {return !prevForm});
		}else if(event.currentTarget.id === "toggle-items-form"){
			console.log("Items Form Opened")
			setShowItemForm(prevForm => {return !prevForm})
		}

	}

	const handleFormInputs = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const {name, value} = event.target;
		setExpenseForm(prevExpenseForm => {
			return {...prevExpenseForm,
				[name] : value
			}
		})
	}

	const handleItemFormInputs = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const {name, value} = event.target;
		setItemsForm(prevExpenseForm => {
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
		event.stopPropagation();
		await axios.delete(`http://localhost:8080/api/expenses/${id}`)
		loadAllExpenses();
	}

	const loadItemsByExpense = async (id:number) => {
		setItems([]);
		const result = await axios.get(`http://localhost:8080/api/expenses/${id}/items`)
		setItems(result.data);
	}

	const addItem = async(event:React.MouseEvent<HTMLButtonElement>,expenseId:number) => {
		await axios.post(`http://localhost:8080/api/expenses/${expenseId}/items`, itemsForm)
		loadItemsByExpense(expenseId)
		setItemsForm({name:'', price:0, quantity:0})
		setShowItemForm(false);
	}

	const deleteItem = async(event:React.MouseEvent<HTMLImageElement>,id:number, expenseId:number) => {
		await axios.delete(`http://localhost:8080/api/items/${id}`)
		loadItemsByExpense(expenseId)
	}

	return(
		<ExpenseContext.Provider value={{expenses, expenseForm,showForm, toggleShowForm, handleFormInputs,addExpense, deleteExpense, items, loadItemsByExpense, showItemForm, itemsForm,handleItemFormInputs,addItem,deleteItem}} >
			{children}
		</ExpenseContext.Provider>
	)
}