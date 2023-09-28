import './header.scss'
import Input from './input/Input';
function Header() {
  return (
    <div className="header">
        <div className="header__logo">to do</div>

        <div className="header__search-bar">
            <form action="#">
              <Input />
            </form>
        </div>
    </div>

  );
}

export default Header