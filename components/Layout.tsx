import {Header} from './Header';
import {Footer} from './Footer';

export default function Layout({children} : any) {
  return (
    <div>
      <Header/>
      <main style={{minHeight: 'calc(100vh - 350px - 85px)'}}>{children}</main>
      <Footer/>
    </div>
  )
}