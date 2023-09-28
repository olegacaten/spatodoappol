import { Outlet } from "react-router-dom"
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
            <div className="wrapper-sidebar__burger-menu">

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