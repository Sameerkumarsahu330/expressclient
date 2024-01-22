import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { RightArrow } from './Icons';

const url = 'https://express-sameer.000webhostapp.com/Images/';

export default function LandingPage() {
    const [featuredHeight,setFeaturedHeight] = useState({height:0});

    useEffect(()=>{
        window.scrollTo({left:0,top:featuredHeight.height,behavior:'smooth'});
        featuredHeight.height = 0;
    },[featuredHeight]);

  return (
        <section className='relative z-40'>
            <img src={url+'bgSmall.jpg'} alt='background_image' className='sm:hidden w-screen h-[90vh]'/>
            <img src={url+'bg.jpg'} alt='background_image' className='hidden sm:block w-screen h-[90vh]'/>
            <div className='absolute top-1/2 left-1/4 transform -translate-x-1/4 -translate-y-1/3 text-left text-white leading-8'>
                <h1 className='text-2xl sm:text-6xl mb-5 font-bold tracking-wider'>Find best hardware for your next gaming pc.</h1>
                <div className='text-xl sm:text-2xl mb-5 tracking-wider'>
                    <p>Elevate your gaming and computing experience here.</p>
                    <p>Unleash the power of cutting-edge hardware,</p>
                    <p>meticulously curated for peak performance.</p>
                </div>
                <Link to="/shop"><button className="bg-white text-gray-600 transition-all duration-1000 hover:bg-gray-600 hover:text-white active:scale-90 font-bold px-8 py-2 rounded tracking-wider">Shop</button></Link>
            </div>
            <div className='fixed bottom-5 right-8 transition-transform duration-500 active:scale-90 rotate-90 cursor-pointer bg-gray-600 text-white border-white border-2 rounded-full p-1'
            onClick={()=>{
                const h = document.getElementById('featured').offsetTop + document.getElementById('header').offsetTop;
                setFeaturedHeight({height:h});
            }}>
                <RightArrow cName={'w-10 h-10'}/>
            </div>
        </section>
  )
}
