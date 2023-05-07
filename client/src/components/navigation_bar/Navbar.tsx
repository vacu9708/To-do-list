import React from "react";
import Logout from "./Logout";
import EditProfile from "./EditProfile";

function Navbar(params: any) {

  return(
    <div className="flex justify-between p-8 text-white" style={{background:'#263747'}}>
      <p style={{fontSize: '33px', color: '#b2c0cc'}} className="font-bold text-lg">To-do list</p>
      <div className="flex justify-between" style={{width:'15%'}}>
        <p style={{fontSize: '33px', color: '#b2c0cc'}} className="font-bold">Name:</p> 
        <p style={{fontSize: '33px', color:'white'}} className='fond-bold ml-3'>{params.name}</p>
      </div>
      <div className="flex justify-between " style={{width:'13%'}}>
        <EditProfile/>
        <Logout />
      </div>
    </div>
  )
}

export default React.memo(Navbar);