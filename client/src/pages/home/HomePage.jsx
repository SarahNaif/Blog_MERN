import MainLayout from "../../components/navigation/MainLayout"
import Hero from "../../components/Hero"
import Articles from "../../components/Articles/Articles"

const HomePage = () => {
  return (
    <MainLayout> 
      <Hero/>
      <Articles/>
    </MainLayout>
  )
}

export default HomePage