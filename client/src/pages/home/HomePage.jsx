import MainLayout from "../../components/MainLayout"
import Hero from "../../components/Hero"
import Articles from "../../components/Articles"

const HomePage = () => {
  return (
    <MainLayout> 
      <Hero/>
      <Articles/>
    </MainLayout>
  )
}

export default HomePage