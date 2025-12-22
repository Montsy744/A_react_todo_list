import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

type Priority = "Urgente" | "Moyenne" | "Basse"

type Todo = {
  id : number;
  text : string;
  priority : Priority;
}


function App() {
  
  const [input, setInput] = useState<string>("") //permet d'initialiser la valeur par défaut
  const [priority, setPriority] = useState<Priority>("Moyenne")

  const savedTodos = localStorage.getItem("todos")
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []

  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const [filter, steFilter] = useState<Priority | "Tous">("Tous")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    if(input.trim() === "") {
      return
    }

    const newTodo: Todo = {
      id : Date.now(), // l'id est la date d'ajout de la tache
      text : input.trim(),
      priority : priority,
    }

    const newTodos = [newTodo, ...todos]
    setTodos(newTodos);

    setInput("")
    setPriority("Moyenne")
  }

  let filteredTodos: Todo[] = [];

  if(filter === "Tous") {
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter)
  }

  const urgentCount = todos.filter((t)=> t.priority === "Urgente").length
  const mediumCount = todos.filter((t)=> t.priority === "Moyenne").length
  const lowCount = todos.filter((t)=> t.priority === "Basse").length
  const totalCount = todos.length

  function deleteTodo (id : number) {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
          <div className="flex gap-4">

            <input 
              type="text" 
              className="input w-full bg-base-100"
              placeholder="Ajouter une tache ..."
              value={input} //const input au dessu de la fonction
              onChange={(e) => setInput(e.target.value)}
            />

            <select 
              className="select w-full"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="Urgente">Urgente</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>

            <button 
              className="btn btn-primary"
              onClick={addTodo}
            >
              Ajouter
            </button>

          </div>
          <div className="space-y-2 flex-1 h-fit">
            <div className="flex flex-wrap gap-4">
              <button
                className={`btn btn-soft ${filter === "Tous" ? "btn-primary" : ""}`}
                onClick={() => steFilter("Tous")}
              >
                Tous ({totalCount})
              </button>
              <button
                className={`btn btn-soft ${filter === "Urgente" ? "btn-primary" : ""}`}
                onClick={() => steFilter("Urgente")}
              >
                Urgent ({urgentCount})
              </button>
              <button
                className={`btn btn-soft ${filter === "Moyenne" ? "btn-primary" : ""}`}
                onClick={() => steFilter("Moyenne")}
              >
                Moyenne ({mediumCount})
              </button>
              <button
                className={`btn btn-soft ${filter === "Basse" ? "btn-primary" : ""}`}
                onClick={() => steFilter("Basse")}
              >
                Basse ({lowCount})
              </button>
            </div>

            {filteredTodos.length > 0 ? (
              <ul className="divide-y divide-primary/20">
                {filteredTodos.map((todo) => (
                  <li key={todo.id}>
                    <TodoItem todo={todo} onDelete={() => deleteTodo(todo.id)}/>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
