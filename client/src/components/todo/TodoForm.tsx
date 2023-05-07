import React from "react";
import axios from "axios";
import {TodoProps} from "../../pages/Dashboard";

const TodoForm = ({todos, setTodos}: TodoProps) => { // To-do input box
  const [title, setTitle] = React.useState("");
  const onSubmit = () => {
    if (title.length > 0) {
      axios.post('/todo', {title: title}, {headers: { token: localStorage.getItem('token')}})
        .then(res => {
          if (res.status === 200) {
            let todo = res.data.todo;
            setTodos([...todos, todo]);
            // console.log(todo)
            //setTodos([])
            setTitle("");
          }
        })
        .catch(err=>{alert(err)})
    }
  }

  return(
    <div className="flex justify-between mb-8">
      <input className="w-full px-3 py-2 border border-green-400 rounded-md mr-4" type="text" 
      onChange={e => setTitle(e.target.value)} value={title}/>
      <input type="button" className="py-2 px-5 bg-green-400 text-white rounded-md cursor-pointer" value="Add" 
      onClick={() => onSubmit()}/>
    </div>
  )
}
export default TodoForm;