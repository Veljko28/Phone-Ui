
// import { Grid } from '@material-ui/core'; 
import Link from 'next/link';

const NavBar = () => {
    return (
        <div className="navbar">
            <Link href="/">
                <button className="navbtn">Home</button>
            </Link>
            <Link href="/about">
                <button className="navbtn">About</button>
            </Link>
            <Link href="/phones">
                <button className="navbtn">Phones</button>
            </Link>
            <Link href="/contact">
                <button className="navbtn">Contact Us</button>
            </Link>
            <Link href="/managment">
                <button className="navbtn">Manage Listings</button>
            </Link>
        </div>
    );   
}

export default NavBar;