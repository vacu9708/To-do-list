import {Redirect} from 'react-router-dom'

const RequireAuth = (Component: any) => { // Prevent invaid access
  return (props: any) => {
    if (!localStorage.getItem('token')) { // Not authorized
      alert('Invalid access')
      return <Redirect to='/'></Redirect>
    }
    else
      return <Component />
      // return <Component {...props} /> // Same as above
  }
}

export default RequireAuth;
