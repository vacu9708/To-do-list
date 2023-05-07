import React from "react";
import axios from "axios";
import { Checkbox } from "@material-ui/core";
import {Todo, TodoProps} from "../../pages/Dashboard";

const TodoList = ({todos, setTodos}: TodoProps) => {
  const [render, set_render] = React.useState(false);
  //const [beingEdited, setBeingEdited] = React.useState(new Array(todos.length))
  const [todoBeingEdited, setTodoBeingEdited] = React.useState<number>(-1)
  const [newTitle, setNewTitle] = React.useState("");

  function markCompleted(todo: Todo) {
    axios.patch(`/todoIsCompleted/${todo._id}`, {}, {headers: {token: localStorage.getItem('token')}})
      .then(res => {
        if (res.status === 200){
          todo.isCompleted=!todo.isCompleted
          //todo.isCompleted=res.data.todo.isCompleted // same as above
          set_render(!render)
        }
      })
  }

  function editTodoTitle(todo: Todo){
    axios.patch(`/todoTitle/${todo._id}`, {newTitle: newTitle}, {headers: {token: localStorage.getItem('token')}})
      .then(res => {
        if (res.status === 200){
          todo.title=newTitle
          setTodoBeingEdited(-1)
        }
      })
  }

  function deleteTodo(todo_id: String){
    axios.delete("/todo/"+todo_id, {headers: {token: localStorage.getItem('token')}})
      .then(res=>{
        if(res.status === 200)
          setTodos(todos.filter((todo)=>todo._id!==todo_id))   
          // for(let i=0; i<todos.length; i++) // doesn't work
          //   if(todos[i]._id===todo_id){
          //     todos.splice(i,1)
          //     setTodos(todos)
          //     break
          //   }
    })
  }

  return(
    <>
      {todos.map((todo, i) => (
        i!==todoBeingEdited
        ?
        <div className="flex border border-gray-400 p-4 rounded-md mb-4 justify-between items-center" key={todo._id}>
          <Checkbox checked={todo.isCompleted} onClick={() => markCompleted(todo)}></Checkbox>
          <label style={todo.isCompleted? {textDecoration:'line-through'}: {}}>{(i+1)+'. '+todo.title}</label>
          <div className='flex justify-between' style={{width:'18%'}}>
            <input type="button" className="py-2 px-3 bg-green-400 text-white rounded-md cursor-pointer"
            value="EDIT" onClick={() => setTodoBeingEdited(i)} />
            <input type="button" className="py-2 px-3 bg-green-400 text-white rounded-md cursor-pointer"
            value="DONE" onClick={() => deleteTodo(todo._id)} />
          </div>
        </div>
        :
        <div className="flex border border-gray-400 p-4 rounded-md mb-4 justify-between items-center" key={todo._id}>
          <input className="w-full px-3 py-2 border border-green-400 rounded-md mr-4" type="text" 
          onChange={e => setNewTitle(e.target.value)}/>
          <div className='flex justify-between' style={{width:'29%'}}>
            <input type="button" className="py-2 px-3 bg-green-400 text-white rounded-md cursor-pointer" value="CANCEL" 
            onClick={() => setTodoBeingEdited(-1)} />
            <input type="button" className="py-2 px-3 bg-green-400 text-white rounded-md cursor-pointer" value="APPLY" 
            onClick={() => editTodoTitle(todo)}/>
          </div>
        </div>
      ))}
    </>
  )
}

export default TodoList;