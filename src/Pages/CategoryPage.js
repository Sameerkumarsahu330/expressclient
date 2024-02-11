import { useParams } from "react-router-dom";
import { useState } from "react";
import {Link} from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import {useSelector} from 'react-redux';
import ScrollToTop from '../Components/ScrollToTop';

const imageFolderPath = 'https://express-sameer.000webhostapp.com/EXPRESS/';

export default function CategoryPage(){
    const Products = useSelector(state => state.data.productData);
    const {categoryName} = useParams();
    const products = Products.filter(p => p.Category === categoryName);
    
    return(
        <>
            <Header/>
            <h1 className='mx-auto w-[85%] mt-5 text-[6vw] text-gray-600 font-bold uppercase text-center tracking-widest'>
                {categoryName}
            </h1>
            <section className="mt-20">
                <ShowFilters Products={products}/>
            </section>
            <Footer/>
        </>
    )
}

function ShowFilters({Products}){
    const optionsArr = ['select','Price--High To Low','Price--Low To High'];
    const [sortOption,setSortOption] = useState(optionsArr[0]);

    const options = optionsArr.map((option,index) => (
        <option key={index} value={option} className='uppercase'>{option}</option>
    ));
    let sortedProducts = null;

    if(sortOption === optionsArr[0]){
        sortedProducts = [...Products];
    }else if(sortOption === optionsArr[1]){
        sortedProducts = [...Products].sort((a,b) => b.ProductPrice - a.ProductPrice);
    }else if(sortOption === optionsArr[2]){
        sortedProducts = [...Products].sort((a,b) => a.ProductPrice - b.ProductPrice);
    }
    

    return(
        <>
            <div className='flex justify-end px-5 mb-10'>
                <label htmlFor="filter-select" className='pr-3 text-xl font-semibold tracking-widest'>Sort <small>by</small> :</label>
                <select className='uppercase border-2 rounded text-sm' value={sortOption} onChange={(e)=> setSortOption(e.target.value)}>
                    {options}
                </select>
            </div>
            <div className=""><ShowProducts productsArr={sortedProducts}/></div>
        </>
    )
}

function ShowProducts({productsArr}){
    const displayProducts = productsArr.map(p => (
        <li key={p.ProductID} className="mb-10 flex flex-col tracking-widest text-gray-800 cursor-pointer">
              <div className="w-[45vw] h-[45vw] sm:w-[30vw] sm:h-[30vw] lg:w-[22vw] lg:h-[22vw] mb-5 border-2 rounded flex justify-center items-center transition-all duration-500 shadow-lg hover:shadow-2xl hover:border-none">
                  <Link to={`/productPage/${p.ProductID}`}><img onClick={ScrollToTop} className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80" src={imageFolderPath+p.ProductImage} alt='demo_product_image'/></Link>
              </div>
              <p className="text-[1rem] w-[13rem] h-[5rem] cursor-text">{p.ProductName}</p>
              <p className="text-[1rem] font-bold cursor-text">₹{p.ProductPrice}</p>
          </li>
      ));
      return (
          <div className="mt-10 overflow-hidden">
              <ul className="flex flex-row mx-auto flex-wrap justify-center gap-[5vw] sm:gap-[2vw] lg:gap-[2vw] w-[100vw]">{displayProducts}</ul>
          </div>
      )
}