import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const imageFolderPath = 'https://express-sameer.000webhostapp.com/EXPRESS/';

export default function SearchBar() {
    const Products = useSelector(state => state.data.productData);
    let searchedProducts = [],searchResults = [];
    const [searchInput,setSearchInput] = useState('');
    
    if(searchInput && searchInput.length > 2) {
      searchedProducts = Products.filter(p => {
        const productName = p.ProductName.toLowerCase();
        const productInfo = p.ProductInfo.toLowerCase();
        const productCategory = p.ProductCategory;
        
        if(productName.includes(searchInput.toLowerCase()) || searchInput.includes(productCategory) || productInfo.includes(searchInput.toLowerCase())){
          return p;
        }else{
          return false;
        }
      });
      searchResults = searchedProducts.map(p => 
        <li onClick={()=> {searchResults = [];setSearchInput('')}} key={p.ProductID} className="py-1 px-5 hover:bg-blue-50">
          <Link to={`/productPage/${p.ProductID}`}>
            <div className='flex justify-start items-center'>
              <img src={imageFolderPath+p.ProductImage} alt="product_image" className="w-16 h-16 mr-5"/>
              <div className="text-gray-600 mb-2">
                <p>{p.ProductName}</p>
              </div>
            </div>
          </Link>
        </li>
      );
    }
    
    return (
        <div className="w-[90vw] mx-auto sm:mx-0 sm:w-[30vw] xl:w-96">
        <div className="relative flex w-full flex-wrap items-stretch rounded border border-solid border-neutral-300">
            <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="search"
                className="relative m-0 block flex-auto bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-gray-800 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-gray-800 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-gray-400 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2" />
    
            {/* <!--Search icon--> */}
            <button onClick={() => setSearchInput('')} className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-800 cursor-pointer" id="basic-addon2">
                <Link to={`/searchResultsPage/${searchedProducts.length > 0 ? searchedProducts.map(p=> p.ProductID) : [0]}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
                </Link>
            </button>
        </div>
        <div className={`absolute top-40 sm:top-20 bg-white text-sm tracking-widest p-2 w-[inherit] rounded border border-solid border-neutral-300 ${searchResults.length > 0? '':'hidden'}`}>
            <ul className='w-[100%] max-h-[23rem] overflow-hidden'>
            {searchResults}
            </ul>
        </div>
        </div>
    );
  }