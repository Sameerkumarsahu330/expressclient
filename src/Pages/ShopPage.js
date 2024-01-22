import {Link} from 'react-router-dom';
import {useState} from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ShowThreeProducts from '../Components/ShowThreeProducts';
import { useSelector } from "react-redux";
import ScrollToTop from '../Components/ScrollToTop';
import {ChevronRightIcon} from '@heroicons/react/20/solid';

export default function ShopPage(){
    const Products = useSelector(state => state.data.productData);
    const filteredCategories = new Set(Products.map(p=> p.Category));
    let categories = ['all'];

    for(const category of filteredCategories){
        categories.push(category);
    }
    
    return(
        <>
            <Header options={['FAQ','Support','About','Login']}/>
            <h1 className='mx-auto w-[85%] text-[8vw] text-gray-600 font-bold uppercase text-center tracking-widest'>Shop</h1>
            <div className=''><ShowFilters categories={categories} Products={Products}/></div>
            <Footer/>
        </>
    )
}

function ShowFilters({categories,Products}){
    const [filter, setFilter] = useState(['all']);

    const options = categories.map((category,index) => (
        <option key={index} value={category} className='uppercase'>{category}</option>
    ));
    
    return(
        <>
            <div className='flex justify-end px-5 mb-10'>
                <label htmlFor="filter-select" className='pr-3 text-xl font-semibold tracking-widest'>Filter :</label>
                <select className='uppercase border-2 rounded text-sm' value={filter[0]} onChange={(e)=> setFilter([e.target.value])}>
                    {options}
                </select>
            </div>
            <div className="">{filter[0] === 'all'?<ShowCategories Category={categories} Products={Products}/>:<ShowCategories Category={filter} Products={Products}/>}</div>
        </>
    )
}

function ShowCategories({Category,Products}){
    
    if(Category.length > 1){
        
        return Category.slice(1,Category.length).map((c) => {
            const threeProducts = Products.filter(p => p.Category === c).slice(2,5);
    
            return(
                <div key={c}>
                    <div className="flex justify-between items-center mx-auto w-[90vw] py-3 px-1">
                        <h2 className="text-2xl font-bold text-gray-600">Category : {c}</h2>
                        <Link to={`/categoryPage/${c}`}>
                            <button onClick={ScrollToTop} className="bg-transparent transition-all duration-1000 hover:bg-orange-600 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded">
                                See all <ChevronRightIcon className="h-5 w-5 inline"/>
                            </button>
                        </Link>
                    </div>
                    <ShowThreeProducts Products={threeProducts}/>
                </div>
            )
        });
    }else if(Category.length === 1){
        const threeProducts = Products.filter(p => p.Category === Category[0]).slice(0,3);

        return(
            <>
                <div className="flex justify-between items-center mx-auto w-[90vw] py-3 px-1">
                    <h2 className="text-2xl font-bold text-gray-600">Category : {Category[0]}</h2>
                    <Link to={`/categoryPage/${Category[0]}`}>
                        <button onClick={ScrollToTop} className="bg-transparent transition-all duration-1000 hover:bg-orange-600 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded">
                            See all <ChevronRightIcon className="h-5 w-5 inline"/>
                        </button>
                    </Link>
                </div>
                <ShowThreeProducts Products={threeProducts}/>
            </>
        );
    }else{
        return <p>No categories available</p>;
    }
}