import {Header} from './Header';
import Footer from './Footer';
// import BreadCrums from './BreadCrums';

export default function Layout({children} : any) {

  // const paths = window.location.pathname.split('/');
  // console.log(paths);
  return (
    <div className="page-container">
      <Header/>
      <div className="content-wrap">
       {/* <BreadCrums others={paths}/> */}
        {children}
      </div>
      <Footer/>
    </div>
  )
}