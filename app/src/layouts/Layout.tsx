import { Outlet } from "react-router-dom"; 
function Layout() {
  return (
    <>
    <div className="header">
  <p>Header</p>
    </div>
    <div className="wrapper">
        <div className="wrapper_leftmenu">
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