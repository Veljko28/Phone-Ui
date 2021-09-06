import { v4 } from 'uuid';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'next/link';
import links from '../../constants/Links';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { toggleNavbar } from '../../redux/actions/userInfoActions';
import { white } from '../../constants/CustomColors';
import { useTranslation } from 'react-i18next';

const NavItem = ({href, name, darkMode, t} : {href: string, name: string, darkMode: boolean, t: any}) => {
    name = name.replace(/\s/g, '').toLocaleLowerCase();

    return (
    <Link href={href} key={v4()}>
        <button className={darkMode ? "navbtn-dark" : "navbtn"}>{t("navBar." + name)}</button>
   </Link>
   );
}

const NavBar = () => {

  const displayMenu = useSelector((state : State) => state.userInfo.navbarToggle);
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  const dispatch = useDispatch();
  
  const { t } = useTranslation();

    return (
        <div className={displayMenu ? 
          darkMode ? "navbar-main-display-dark" : "navbar-main-display"
            :
           darkMode ? "navbar-main-dark" : "navbar-main"}>
           {links.map(x => NavItem({...x,darkMode,t}))}
           <span className="closeMenu" onClick={() => dispatch(toggleNavbar())}>
            <CloseIcon style={{fontSize: '20px', color: white}}/>
          </span>
        </div>
    );   
}

export default NavBar;