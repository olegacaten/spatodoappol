import { Link, NavLink, Outlet } from "react-router-dom"
import { useState } from "react";
import "./layout.scss"
import Header from "./header/Header"
function Layout() {
  const [isActiveBurger, setIsActiveBurger] = useState(false);

  return (
    <>
      <Header />
      <div className="wrapper">
          <div className="wrapper_sidebar">
            <div className={`wrapper-sidebar__burger-menu ${isActiveBurger ? 'wrapper-sidevar__active-burger' : ''}`}>
              <ul className="wrapper-sidebar__burger-container">
                <li><NavLink className={({isActive}) => isActive ? 'wrapper-sidebar-burger-container__active-link' : ''} to={'/projects'}>Projects</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? 'wrapper-sidebar-burger-container__active-link' : ''} to={'/todo'}>Todo list</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? 'wrapper-sidebar-burger-container__active-link' : ''} to={'/jopa'}>F</NavLink></li>
              </ul>
            </div>
            <button onClick={() => setIsActiveBurger(prev => !prev)} className={`wrapper-sidebar__button ${isActiveBurger ? 'wrapper-sidebar__active-button' : ''}`}></button>
          </div>
          <div className="pages">
              <Outlet/>
          </div>
      </div>
    </>
  );
}

export default Layout