type Priority = "Urgente" | "Moyenne" | "Basse"

type Todo = {
  id : number;
  text : string;
  priority : Priority;
}

type Props = {
    todo : Todo
}

const TodoItem = ({todo}: Props) => {
    return (
        <li>
            {todo.text}
        </li>
    )
}
export default TodoItem