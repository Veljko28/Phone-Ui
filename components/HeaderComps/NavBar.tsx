import { v4 } from 'uuid';
// import { Grid } from '@material-ui/core'; 
import Link from 'next/link';
import links from '../../constants/Links';

const NavItem = ({href, name} : {href: string, name: string}) => {
    return (
    <Link href={href} key={v4()}>
        <button className="navbtn">{name}</button>
   </Link>
   );
}

const NavBar = () => {
    return (
        <div className="navbar-main">
           {links.map(x => NavItem(x))}
        </div>
    );   
}

export default NavBar;