import Footer from "./Footer"
import Header from "./Header"

const MainLayout = ({children}) => {
  return (
    <div>
       <Header logginedUserId="a"/>
      {children}
      <Footer /> 
    </div>
  )
}

export default MainLayout