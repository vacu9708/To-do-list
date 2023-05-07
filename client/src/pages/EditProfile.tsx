import React from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const EditProfile = () => {
    const [nameToChange, setNameToChange] = React.useState("");
    const [profileImg, setProfileImg] = React.useState('');
    const history = useHistory();

    function delete_user(){
        axios.delete(`/user`, {headers: {token: localStorage.getItem('token')}})
        .then(res=>{
        if(res.status === 200){
            alert('Deleted')
            history.push('/')
        }
        })
        .catch(error=>{
            alert(error.response.data.error)
        })
      }

    function edit() {
        const formData=new FormData()
        formData.append('nameToChange', nameToChange)
        formData.append('profileImg', profileImg)

        axios.patch('/user', formData, {headers: {token: localStorage.getItem('token')}})
        .then(res => {
            history.push("/dashboard");
        })
        .catch(error=>{
            alert(error)
        })
    }

    const onImageChange=(e: any)=>{
        setProfileImg(e.target.files[0])
    }

    return(
        <div className="w-full h-screen">
            <div className="w-1/2 max-w-xs mx-auto relative">
                <div className="absolute m-auto" style={{height: '300px'}}>
                    <h1 style={{fontSize:'33px'}} className="text-center text-green-400 font-bold">Edit profile</h1>
                    <div className="mb-4">
                        <label>Name to change</label>
                        <input onChange={(e) => setNameToChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md" 
                        type="text" placeholder="Name to change" />
                    </div>
                    <div className="mb-4">
                        <label>New profile image</label>
                        <input onChange={onImageChange} type="file" name="image" id="image" accept='image/*' className="imgInput"/>
                    </div>

                    <button className={`rounded-lg px-6 py-3 font-bold text-white bg-green-400`} 
                    onClick={() => history.push("/dashboard")}>Cancel</button>
                    <button className={`rounded-lg px-6 py-3 mx-1 mt-1 font-bold text-white bg-green-400`} 
                    onClick={edit}>Edit</button>
                    <button className={`rounded-lg px-6 py-3 mt-1 font-bold text-white bg-green-400`} 
                    onClick={delete_user}>Delete my account</button>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;