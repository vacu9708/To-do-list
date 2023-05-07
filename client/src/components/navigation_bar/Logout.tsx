import React from "react";
import {useHistory} from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  return(
    <input type="button" style={{backgroundColor:'lightgrey'}} className="px-3 py-3 text-black rounded-md cursor-pointer" value="Log out" 
          onClick={() => {
            localStorage.removeItem('token');
            history.push("/")
          }}
    />
  )
}

export default Logout;