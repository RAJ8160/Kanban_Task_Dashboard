import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
const AddTodo = ({ todos, setTodos, updateTodo , setUpdateTodo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: '',
      priority: '',
      duedate: ''
    }
  });

  useEffect(() => {
    if (updateTodo) {
      reset(updateTodo);
    } else {
      reset({
        title: '',
        description: '',
        status: '',
        priority: '',
        duedate: ''
      });
    }
  }, [updateTodo, reset]);

  const submitHandler = (data) => {
     let newToDos;

    if (updateTodo) {
      newToDos = todos.map((todo) =>
        todo.id === updateTodo.id
          ? { ...todo, ...data }
          : todo
      );
    } else {
      newToDos = [
        ...todos,
        { ...data, id: Date.now() }
      ];
    }

    localStorage.setItem('todos', JSON.stringify(newToDos));
    setTodos(newToDos);
    setUpdateTodo(null)

    reset();
  };
  return (
    <div className='max-auto w-full max-w-6xl bg-white p-4 rounded-xl  border border-slate-700 text-black shadow-lg sm:p-6 md:p-8'>
      <h3 className='text-xl font-semibold sm:text-2xl mb-6'>Add Your Task Here...</h3>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className='grid grid-cols-1  gap-5 md:grid-cols-2'>
        <div>
          <input
            type="text"
            name='title'
            placeholder='Eneter task title here'
            className='w-full rounded-lg border border-slate-600 bg-slate-500 p-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
            {
            ...register('title', {
              required: "Title is required..."
            })
            }
          />
          {
            errors.title && <p className="mt-1 text-md font-semibold text-red-400">{errors.title.message}</p>
          }

        </div>
        <div>
          <textarea
            name="description"
            placeholder="Enter Description here..."
            className='w-full rounded-lg border border-slate-600 bg-slate-500 p-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
            {
            ...register('description', {
              required: "Description is required...."
            })
            }
          ></textarea>
          {
            errors.description && <p className="mt-1  text-md font-semibold text-red-400">{errors.description.message}</p>
          }
        </div>
        <div>
          <select
            name="status"
            className='w-full rounded-lg border border-slate-600 bg-slate-500 p-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
            {
            ...register('status', {
              required: "status is required...."
            })
            }
          >
            <option value="">Select status from here</option>
            <option value="ToDo">ToDo</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
          </select>
          {
            errors.status && <p className="mt-1  text-md font-semibold text-red-400">{errors.status.message}</p>
          }
        </div>
        <div>
          <select
            name="priority"
            className='w-full rounded-lg border border-slate-600 bg-slate-500 p-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
            {
            ...register('priority', {
              required: "Priority is required...."
            })
            }
          >
            <option value="">Select Priority Fron here</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {
            errors.priority && <p className="mt-1  text-md font-semibold text-red-400">{errors.priority.message}</p>
          }
        </div>
        <div>
          <input
            type="date"
            name='duedate'
            placeholder='Eneter Date Here'
            className='w-full rounded-lg border border-slate-600 bg-slate-500 p-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
            {
            ...register('duedate', {
              required: "Date is required..."
            })
            }
          />
          {
            errors.duedate && <p className="mt-1 text-md font-semibold text-red-400">{errors.duedate.message}</p>
          }

        </div>
        <button className='rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'>{updateTodo ? "Update" : "Submit"}</button>
      </form>
    </div>
  )
}

export default AddTodo
