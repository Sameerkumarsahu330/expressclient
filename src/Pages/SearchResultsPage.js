import { useParams,Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useSelector } from 'react-redux';

const imageFolderPath = 'https://express-sameer.000webhostapp.com/EXPRESS/';

export default function SearchResultsPage(){
    const Products = useSelector(state => state.data.productData);
    const {searchedProducts} = useParams();
    let showSearchedProducts = null;
    
    if(parseInt(searchedProducts[0]) !== 0){
        showSearchedProducts = searchedProducts.split(",").map(pID => {
       
            const product = Products.find(p => p.ProductID === pID);
            return(
             <Link key={product.ProductID} to={`/productPage/${product.ProductID}`}>
                 <li className='flex justify-start items-center my-5 px-5 h-[18rem] border-2 rounded'>
                     <div className='w-[50%]'>
                         <img src={imageFolderPath+product.ProductImage} alt="product_image" className='p-1 w-52'/>
                     </div>
                     <div className='w-[50%] text-sm'>
                         <p className='font-bold mb-2'>{product.ProductName}</p>
                         <p className='font-bold mb-2'>{product.ProductPrice}</p>
                         <p>{product.ProductInfo}</p>
                     </div>
                 </li>
             </Link>
            );
         });
    }
    
    return (
        <>
            <Header options={['FAQ','Support','About','Login']}/>
            <div className='py-10'>
                {parseInt(searchedProducts[0]) !== 0 ? (<ul className='mx-auto w-[30rem] sm:w-[60vw]'>
                    {showSearchedProducts}
                </ul>) : (<p className=' w-screen h-screen mt-10 text-xl tracking-widest text-center'>No products found</p>)}
            </div>
            <Footer/>
        </>
    )
}