import React from "react";
import axios from "axios";

interface User{
    userID: string;
    name: string;
}

function Users_inquiry(){
    const [user_list, set_user_list] = React.useState<User[]>([]);

    React.useEffect(() => {
        axios.get('/all_users')
            .then(res=>{
                if (res.status === 200)
                    set_user_list(res.data.users)
                })
    }, [])

    function user_list_drawer(){
        const elements=[]
        for(let i=0; i<user_list.length; i++){
            elements.push(
                <div className="flex border border-black-400 p-3 rounded-md mb-4 items-center" key={user_list[i].userID}
                    style={{borderWidth:'medium', justifyContent:'space-evenly'}}>
                    <label>Index: {i+1}</label>
                    <label>ID: {user_list[i].userID}</label>
                    <label>Name: {user_list[i].name}</label>
                </div>
            )
        }
        return <div>{elements}</div>
    }

    return(
        user_list_drawer()
    )
}

export default Users_inquiry;