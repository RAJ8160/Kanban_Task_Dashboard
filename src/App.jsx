import React,{useState} from 'react'
import TodoTable from "./components/TodoTable.jsx"
import AddTodo from './components/AddTodo.jsx'
const App = () => {
  const [todos,setTodos] = useState(JSON.parse(localStorage.getItem('todos'))||[]);
  const [updateTodo,setUpdateTodo] = useState(null);
  return (
    <div className='min-h-screen  bg-gradient-to-br from-slate-300 via-indigo-300 to-blue-300  flex flex-col items-center gap-6 p-4 sm:p-6'>
      <h1  className='text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'><i className="ri-todo-fill text-5xl"></i> Kanban Dashboard</h1>
      <AddTodo todos={todos} setTodos={setTodos} updateTodo={updateTodo} setUpdateTodo={setUpdateTodo} />
      <TodoTable todos={todos} setTodos={setTodos} setUpdateTodo={setUpdateTodo} />
    </div>
  )
}

export default App
