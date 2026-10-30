import React, { useState } from 'react'
// import SearchFilter from './SearchFilter'

const TodoTable = ({ todos, setTodos, setUpdateTodo }) => {
  const [text, setText] = useState("")
  const handleDelete = (id) => {
    const afterDeltedTodos = todos.filter((elem) => elem.id != id)
    localStorage.setItem('todos', JSON.stringify(afterDeltedTodos))
    setTodos(afterDeltedTodos)
  }
  const handleEdit = (todo) => {
    setUpdateTodo(todo)
  }

  const filteredTodos = todos.filter((elem) => {
    const searchText = text.trim().toLowerCase();

    return (
      elem.title?.toLowerCase().includes(searchText) ||
      elem.status?.toLowerCase().includes(searchText) ||
      elem.priority?.toLowerCase().includes(searchText)
    );
  });
  return (
    <div className='w-full max-w-6xl bg-white text-black px-3 py-4 border border-slate-200 flex flex-col gap-2 rounded-xl shadow-sm sm:p-6'>
      <h3 className='mb-5 text-xl font-bold text-slate-800'>Manage Your Daily Task Here</h3>
      <div className='bg-white w-full sm:w-2/3 lg:w-1/2 flex gap-2'>
        <input
          type="text"
          placeholder='Search here By Title or Filter By Status or Priority'
          className='w-full outline-none text-gray-700 px-3 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-blue-400  rounded-lg '
          onChange={(e) => { setText(e.target.value) }} />
        {/* <button className='text-lg font-bold text-white bg-blue-400 px-3 py-2 rounded hover:-translate-0.5 cursor-pointer' onClick={() => { handleSearch() }}>Search</button> */}
      </div>
      {/* <SearchFilter todo={todos} setTodos={setTodos} /> */}
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <div className='w-full overflow-x-auto'>
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className='bg-slate-100 text-slate-600'>
            <tr>
              <th className="px-4 py-3 font-semibold">
                Title
              </th>

              <th className="px-4 py-3 font-semibold">
                Description
              </th>
              <th className="px-4 py-3 font-semibold">
                Priority
              </th>
              <th className="px-4 py-3 font-semibold">
                Status
              </th>
              <th className="px-4 py-3 font-semibold">
                Due Date
              </th>
              <th className="px-4 py-3 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((elem => (
                <tr key={elem.id} className='transition hover:bg-slate-50'>
                  <td className="px-4 py-4 font-medium text-slate-800">
                    {elem.title}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {elem.description}
                  </td>
                  <td className={`rounded-full text-xs text-center font-semibold ${elem.priority === 'High'
                      ? 'bg-red-100 text-red-700 '
                      : elem.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                    {elem.priority}
                  </td>
                  <td className={`rounded-full  text-xs text-center font-semibold ${elem.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : elem.status === 'InProgress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                    {elem.status}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                    {elem.duedate}
                  </td>
                  <td>
                    <div className='flex gap-2'>
                      <button className="rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600" onClick={() => handleDelete(elem.id)}>Delete</button>
                      <button className="rounded-lg bg-green-500 px-3 py-2 text-white transition hover:bg-green-600" onClick={() => handleEdit(elem)}>Edit</button>
                    </div>
                  </td>
                </tr>
              )))) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-slate-500"
                >
                  No tasks found. Add your first task!
                </td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TodoTable
