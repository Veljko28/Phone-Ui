import { v4 } from 'uuid';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'next/link';
import links from '../../constants/Links';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { toggleNavbar } from '../../redux/actions/userInfoActions';
import { white } from '../../constants/CustomColors';

const NavItem = ({href, name, darkMode} : {href: string, name: string, darkMode: boolean}) => {
    return (
    <Link href={href} key={v4()}>
        <button className={darkMode ? "navbtn-dark" : "navbtn"}>{name}</button>
   </Link>
   );
}

const NavBar = () => {

  const displayMenu = useSelector((state : State) => state.userInfo.navbarToggle);
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  const dispatch = useDispatch();


    return (
        <div className={displayMenu ? 
          darkMode ? "navbar-main-display-dark" : "navbar-main-display"
            :
           darkMode ? "navbar-main-dark" : "navbar-main"}>
           {links.map(x => NavItem({...x,darkMode}))}
           <span className="closeMenu" onClick={() => dispatch(toggleNavbar())}>
            <CloseIcon style={{fontSize: '20px', color: white}}/>
          </span>
        </div>
    );   
}

export default NavBar;