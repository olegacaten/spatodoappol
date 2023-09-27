import './header.scss'
function Header() {
  return (
    <div className="header">
        <div className="header__logo"> to do</div>

        <div className="header__search-bar">
            <form action="#">
                <input type="text" placeholder='Search'/>
            </form>
        </div>
    </div>

  );
}

export default Header