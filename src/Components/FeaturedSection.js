import {useEffect,useState} from 'react';
import ShowThreeProducts from './ShowThreeProducts';
import axios from 'axios';

const url = 'https://express-sameer.000webhostapp.com/EXPRESS/api/getProducts.php';
const url2 = 'https://express-sameer.000webhostapp.com/EXPRESS/api/validate.php';

export default function FeaturedSection() {
  
  const [Products, setProducts] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setProducts(response.data);
                console.log('data fetched');
            } catch (err) {
                console.error(err);
            }
        };

        const checkLogin = async () => {
          const response = await axios.post(url2);
          console.log(response.data);
        }

        fetchData();
        checkLogin();

    }, []);
    
    if(Products !== null) {
        localStorage.setItem('expressCachedData',JSON.stringify(Products));
    }

  return (
    <section className="mb-10">
      <h1 id="featured" className="text-gray-600 text-5xl font-bold uppercase tracking-widest text-center mt-24">Featured</h1>
      {Products ? 
        (<>
          <ShowThreeProducts Products={Products.slice(8,11)}/>
          <ShowThreeProducts Products={Products.slice(48,51)}/>
        </>) : (
        <div className='h-[40vh] flex justify-center items-center text-gray-600 text-xl font-bold tracking-widest'>
          Loading...
        </div>)}
    </section>
  )
}