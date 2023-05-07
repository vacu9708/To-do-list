import React from "react";
import axios from "axios";

interface SignupProps {
  renderLogin: () => void;
}

const Signup = ({renderLogin}: SignupProps) => {
  //let userID=''
  const [userID, setUserID] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [disabled, setDisabled] = React.useState(false); // For password confirmation
  const [profileImg, setProfileImg] = React.useState('');

  function onSubmit() {
    const formData=new FormData()
    formData.append('userID', userID)
    formData.append('password', password)
    formData.append('name', name)
    formData.append('profileImg', profileImg)

    axios.post('/signup', formData)
    .then(res => { // Go to login page if sign up is successful
      alert(res.data.title)
      renderLogin() // Go to login page
    })
    .catch(error=>{
      // Login failed
      console.log(error.response.data.error)
      alert(error.response.data.error)
    })
  }

  const onImageChange=(e: any)=>{
    setProfileImg(e.target.files[0])
  }

  React.useEffect(() => { // Password confirmation
    if (password === confirmPassword) 
      setDisabled(false);
    else 
      setDisabled(true);
  }, [password, confirmPassword])

  return(
    <div style={{height: '300px'}}>
      <h1 style={{fontSize:'33px'}} className="text-center text-green-400 font-bold">Sign up page</h1>
      <div className="mb-4">
        <label>user ID</label>
        <input onChange={(e) => setUserID(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" 
        type="text" placeholder="user ID" />
      </div>
      <div className="mb-4">
        <label>password</label>
        <input onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" 
        type="password" placeholder="password" />
      </div>
      <div className="mb-4">
        <label>confirm password</label>
        <input onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" 
        type="password" placeholder="password" />
      </div>
      <div className="mb-4">
        <label>name</label>
        <input onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" 
        type="text" placeholder="name" />
      </div>
      <div className="mb-4">
        <label>profile image </label>
        <input onChange={onImageChange} type="file" name="image" id="image" accept='image/*' className="imgInput"/>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p>Already a member? <span className="text-green-400 cursor-pointer" onClick={renderLogin}>Log in</span></p>
        </div>
        <button className={`rounded-lg px-6 py-3 font-bold text-white ${disabled? "bg-gray-400": "bg-green-400"}`} 
        disabled={disabled} onClick={() => onSubmit()}>Sign up</button>
      </div>
    </div>
  )
}

export default Signup;