import React,{useEffect} from 'react';
import './Navbar.css';
import {NavLink,useHistory} from 'react-router-dom';
import Logo from '../../../UI/Logo/Logo';
import { GoogleLogout } from 'react-google-login';
import AuthServices from '../../../../ApiServices/auth.service';
import Search from '../../Search/search';


const Navbar = ()=>{
    
    const [isLogin,setLogin]=React.useState(false);
    const history = useHistory()

    useEffect (()=>{

      let isMounted=true;
       
      if(isMounted){
        if(localStorage.getItem('user')){
          setLogin(true)
        }
      }
      return ()=>{
        isMounted=false;
      }
    },[])


     const logout=() => {
        setLogin(false)
        AuthServices.logout()
        console.log("logout called")
        history.push('/login')
      }

    let Logout = ( <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <NavLink to="/signup" activeClassName="btnactive" className="nav-link Signupbtn">Signup</NavLink>
              </li>

              <li className="nav-item">
                  <NavLink to="/login" activeClassName="btnactive" className="nav-link Loginbtn">Login</NavLink>
              </li>

          </ul>
          );
    
      let loggedIn = (<ul className="navbar-nav ml-auto">


      <li className="nav-item" data-toggle="tooltip" data-placement="top"
       title="Create Your Course">
        
        <NavLink to="/teacherhome" activeClassName="teacherActive"
         className="nav-link teachLink">Start Tutoring</NavLink>
      </li>
    
     
      <li className="nav-item">
        <NavLink to="/Cart" className="nav-link "> 
        <i data-toggle="tooltip" data-placement="top" title="Bookmarked Courses"
         className="fa fa-book" aria-hidden="true"><span id="bookmarkNav"> Bookmark</span></i></NavLink>       
      </li>
      <li className="nav-item">
          <GoogleLogout
            buttonText="Logout"
            render={renderProps => (
              <NavLink to="/login" onClick={logout} 
              disabled={renderProps.disabled}  className="nav-link logoutlink" > Logout </NavLink>
              )}
            onLogoutSuccess={logout}>
          </GoogleLogout>
      </li>
    </ul>
    ); 
     
  return(

    <nav className=" navbar navbar-expand-lg sticky-top ">

    <NavLink to="/home/all" className="navbar-brand"><Logo/></NavLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" 
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
            <i className="fa fa-bars" aria-hidden="true"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Search/>

          {!isLogin && Logout}
          {isLogin && loggedIn}
          
        </div>
        </nav>
    )
        

}

export default Navbar;