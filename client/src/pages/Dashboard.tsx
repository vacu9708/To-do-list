import React from "react";
import axios from "axios";
import Navbar from "../components/navigation_bar/Navbar";
import TodoForm from "../components/todo/TodoForm";
import TodoList from "../components/todo/TodoList";

export interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
}

export interface TodoProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

const Dashboard = () => {
  const [todoList, setTodoList] = React.useState<Todo[]>([]);
  const [profileImgPath, setProfileImgPath] = React.useState("");
  let [name, set_name]=React.useState('')
  
  React.useEffect(() => {
    axios.get('/todos', { headers: { token: localStorage.getItem('token')}}) // Get to-do list
      .then(res => {
        if (res.status === 200)
          setTodoList(res.data.todos);
        })

    axios.get('/user', {headers: {token: localStorage.getItem('token')}}) // Get profile image
    .then(res => {
      if (res.status === 200){
        setProfileImgPath(res.data.profileImg)
        set_name(res.data.name)
      }
    })
  }, [])

  return(
    <>
      <Navbar name={name}/>
      <p style={{color:'grey', marginTop:'20px', marginLeft:'100px', fontWeight:'bolder' , fontSize:'30px'}}>Profile</p>
      <div style={{color:'grey', marginLeft:'5px', marginTop:'10px', border:'5px solid', width:'300px', height:'420px'}}>
        <img src={profileImgPath} width='300' height='200' alt="..."></img>
      </div>
      <div className="mx-auto pt-12" style={{position: 'relative', bottom:'500px', width:'50%'}}>
        {/*<h1 className="font-bold text-green-400 text-center text-xl mb-12" style={{fontSize:'33px'}}>To-do list</h1>*/}
        <img src="https://imgs3.fontbrain.com/custom_imgs/7b/68/77c40c714afa3f4964fe446cd989/td-720-60-334f4bdd13a48affc321758acc45bfca.png"></img>
        <TodoForm todos={todoList} setTodos={setTodoList}/>
        <TodoList todos={todoList} setTodos={setTodoList} />
      </div>
    </>
  )
}

export default Dashboard;