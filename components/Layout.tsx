import {Header} from './Header';
import Footer from './Footer';
import { State } from '../redux/reduxTypes';
import { useSelector } from 'react-redux';

export default function Layout({children} : any) {

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  return (
    <div className={darkMode ? "page-container-dark" : "page-container" }>
      <Header/>
      <div className="content-wrap"> 
       {/* <BreadCrums others={paths}/> */} 
        {children}
      </div>
      <Footer/> 
    </div>
  )
}