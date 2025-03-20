import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, XCircle, ClipboardList } from 'lucide-react';
import axios from 'axios';

interface todo {
  id: number;
  text: string;
  completed: boolean;
}


function Todo() {  
  const [todos, setTodos] = useState<todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {  
      const response = await fetch("http://localhost:5000/get_tasks");
      if (response.status) {
          const data = await response.json();
          setTodos(data); 
      }
  };

const addTodo = async (e: React.FormEvent) => {
    

    e.preventDefault();

    if (newTodo.trim()) {

        try {
      const response = await axios.get("http://localhost:5000/add_task")
          if ((await response).status===200) {
              setNewTodo('');
              fetchTodos(); 
          }
          else{
            console.log("nooo");
          }
        } 
        catch (err) {
          console.error(err);
        }
      }
      else 
      {
        alert("Please enter a task");
      }
  };

  const toggleTodo = (id: number) => {  
      setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
  };

  const removeTodo = async (id: number) => {  
      const response = await axios.post("http://localhost:5000/remove_task") 

         
      if (response.status===200) {
          fetchTodos(); 
      }
  };

  return (  
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-8">
          <div className="max-w-md mx-auto px-4">
              <div className="bg-white rounded-lg shadow-xl p-6">
                  <div className="flex items-center justify-center mb-8">
                      <ClipboardList className="h-8 w-8 text-indigo-600 mr-2" />
                      <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>  
                  </div>

                  <form onSubmit={addTodo} className="mb-6">
                      <div className="flex gap-2">
                          <input
                              type="text"
                              value={newTodo}
                              onChange={(e) => setNewTodo(e.target.value)}
                              placeholder="Add a new todo..."
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <button
                              type="submit"
                              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center"
                          >
                              <PlusCircle className="h-5 w-5" />
                          </button>
                      </div>
                  </form>

                  <div className="space-y-3">
                  {todos.map(todo => (  
                          <div
                              key={todo.id}
                              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg group hover:bg-gray-100 transition-colors duration-200"
                          >
                              <div className="flex items-center gap-3">
                                  <button
                                      onClick={() => toggleTodo(todo.id)}
                                      className={`${
                                          todo.completed ? 'text-green-500' : 'text-gray-400'
                                      } hover:text-green-600 transition-colors duration-200`}
                                  >
                                      <CheckCircle2 className="h-5 w-5" />
                                  </button>
                                  <span
                                      className={`${
                                          todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                                      }`}
                                  >
                                      {todo.text}
                                  </span>
                              </div>
                              <button
                                  onClick={() => removeTodo(todo.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                              >
                                  <XCircle className="h-5 w-5" />
                              </button>
                          </div>
                      ))} 
                  </div>

                  {todos.length === 0 && (  
                      <div className="text-center text-gray-500 mt-8">
                          <p>No todos yet. Add one to get started!</p>
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
}

export default Todo;
