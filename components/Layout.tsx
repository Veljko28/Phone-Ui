import {Header} from './Header';
import Footer from './Footer';

export default function Layout({children} : any) {
  return (
    <div className="page-container">
      <Header/>
      <div className="content-wrap">
        {children}
      </div>
      <Footer/>
    </div>
  )
}