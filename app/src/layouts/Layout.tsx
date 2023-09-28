import { Outlet } from "react-router-dom"
import "./layout.scss"
import Header from "./header/Header"
function Layout() {
  return (
    <>
      <Header />
      <div className="wrapper">
          <div className="wrapper_sidebar">
            <button className="wrapper-sidebar__button">
              <span></span>
            </button>
            <p>Menu</p>
          </div>
          <div className="pages">
              <Outlet/>
          </div>
      </div>
    </>
  );
}

export default Layout