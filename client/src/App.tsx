import React, {useState, useEffect, FormEvent} from "react";
import axios from "axios";
import "./App.css";

interface Expense {
  id: number
  description: string
  amount: number
  date: string
}

function App() {
  // useState to manage expenses and form inputs
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("") // amount is a string to handle input easily

  const API_URL = "http://localhost:5000/expenses"; //backend API URL
  // Fetch expenses from the server with useEffect
  useEffect(() => {
    // defines async function to fetch data from the API
    const fetchExpenses = async () => {
      try {
        // make a API GET request to fetch backend
        const response = await axios.get<Expense[]>(API_URL);
        //update component state with fetched expenses
        setExpenses(response.data);
      } catch (error) {
        // err handling
        console.error("Error fetching expenses:", error);
      }
    };
    // call the fetch function immediately
    fetchExpenses();
  }, []); // empty dependency array means this effect runs once after the initial render

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // prevent default form submission behavior
    if (!description || !amount) {
      alert("Please fill in both fields.");
      return;
    }
    const newAmount = parseFloat(amount); // convert amount to a number
    if (isNaN(newAmount) || newAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    try {
      const response = await axios.post<Expense>(API_URL, {
        description,
        amount: newAmount,
      });
      // update the state to show the new expense on the page
      setExpenses([response.data, ...expenses]);
      setDescription(""); // clear the description input
      setAmount(""); // clear the amount input
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Expense Tracker</h1>
      </header>
      <main>
        <section className="expense-form">
          <h2>Add New Expense</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01" // Allow decimal values
                required
              />
            </div>
            <button type="submit">Add Expense</button>
          </form>
        </section>

        <section className="expense-list">
          <h2>Your Expenses</h2>
          {expenses.length === 0 ? (
            <p>No expenses recorded yet.</p>
          ) : (
            <ul>
              {expenses.map((expense) => (
                <li key={expense.id}>
                  <strong>{expense.description}</strong>: ${expense.amount.toFixed(2)} (on {new Date(expense.date).toLocaleDateString()})
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
export default App; 

