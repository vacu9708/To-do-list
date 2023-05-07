import React from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Naver_OAuth = () => {
  const history=useHistory()
  React.useEffect(() => {
    axios.get(window.location.href)
    .then(res => {
      if (res.status === 200){
        localStorage.setItem('token', res.data.token)
        history.push("/dashboard")
      }
    })
  }, [])

  return(
    <div className="flex w-full h-screen">
        Naver_OAuth
    </div>
  )
}
export default Naver_OAuth;