import { useHistory } from "react-router";
import React from "react";

const EditProfile = () => {
  const history=useHistory()
  return(
    <input type="button" className="px-3 py-3 text-black rounded-md cursor-pointer" 
    style={{backgroundColor:'lightgray'}} value="Edit profile" 
      onClick={() => {history.push('/edit_profile')}}
    />
  )
}

export default EditProfile;