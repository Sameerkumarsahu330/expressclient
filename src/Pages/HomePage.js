import FeaturedSection from '../Components/FeaturedSection';
import Header from '../Components/Header';
import LandingPage from '../Components/LandingPage';
import Footer from '../Components/Footer';


export default function HomePage() {
  return (
    <>
      <Header options={['FAQ','Support','About','Login']}/>
      <LandingPage/>
      <FeaturedSection/>
      <Footer/>
    </>
  )
}
