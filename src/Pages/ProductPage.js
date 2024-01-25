import { useParams } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useSelector,useDispatch } from "react-redux";
import {addToCart} from '../Assets/Store/cartSlice';

const imageFolderPath = 'https://express-sameer.000webhostapp.com/EXPRESS/';

export default function ProductPage() {
  const Products = useSelector(state => state.data.productData);
  const {productId} = useParams();
  const p = Products.filter(p=> p.ProductID === productId)[0];
  const dispatch = useDispatch();

  return (
    <>
      <Header options={['FAQ','Support','About','Login']}/>
        <div className="sm:flex sm:flex-row sm:gap-5 sm:w-[70%] sm:justify-center sm:mt-10 sm:mx-auto sm:rounded">
          <div className="sm:w-[60%]  border-2 rounded flex justify-center items-center">
            <img src={imageFolderPath+p.ProductImage} alt="product_Image" className="w-[98vw] sm:w-[80%] mx-auto sm:m-0 sm:p-5"/>
          </div>
          <div className="sm:w-[40%] text-gray-800 p-5">
            <div className="font-semibold flex justify-between sm:block">
              <p className="sm:text-[1vw] mb-3">{p.ProductName}</p>
              <p className="sm:text-xl">₹{p.ProductPrice}</p>
            </div>
            <div>
              <h2 className="font-bold my-3">Specifications:</h2>
              <div className="p-3">
                {p.ProductInfo}
              </div>
            </div>
            <div className="mt-5">
              <button onClick={() => dispatch(addToCart({ProductID : productId, Quantity: 1,ProductPrice: p.ProductPrice}))} className="transition-all duration-500 w-[100%] text-lg bg-gray-800 text-white font-semibold py-2 active:scale-95 rounded">
                  Add to cart - ₹{p.ProductPrice}
              </button>
            </div>
          </div>
        </div>
      <Footer/>
    </>
  )
}
