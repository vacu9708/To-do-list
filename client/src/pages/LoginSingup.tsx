import React from "react";
import Login from "../components/user/Login"
import Signup from "../components/user/Signup"
import UsersInquiry from "../components/user/UsersInquiry"

const LoginSingup = () => {
  const [is_sign_up_page, set_sign_up_page] = React.useState(false);
  const [show_user_list, set_show_user_list] = React.useState(false);

  return(
    <div className="flex w-full h-screen">
      <div className="w-1/2 max-w-xs mx-auto relative">
        <div className="absolute inset-0 m-auto" style={{height: '300px'}}>
          {is_sign_up_page
          ?<Signup renderLogin={() => set_sign_up_page(false)}/> 
          :<Login renderSignup={() => set_sign_up_page(true)}/>}
          {/*is_sign_up_page && <Signup renderLogin={() => set_next_page(false)} /> || <Login renderSignup={() => set_next_page(true)} />*/}
        </div>
      </div>
      {/*Green side on the right*/}
      <div className="w-1/2 cursor-pointer" onClick={()=>set_show_user_list(!show_user_list)}
      style={{overflow:'scroll', backgroundColor:'#44e3a9'}}>
        <h1 className="font-bold text-center p-3" style={{fontSize:'55px', color:'white'}}>User list</h1>
        <div className="max-w-md mx-auto">
          {show_user_list && <UsersInquiry/>}
        </div>
      </div>
    </div>
  )
}
export default LoginSingup;