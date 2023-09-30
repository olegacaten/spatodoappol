import './header.scss'
import ClearLocalStorageButton from '../btns/clearlocalstorage/ClearLocalStorageButton';
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
        <ClearLocalStorageButton/>
    </div>

  );
}

export default Header