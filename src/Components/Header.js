import {Link} from 'react-router-dom';
import { useState } from 'react';
import {MenuBtn,CartBtn} from './Icons.js';
import ScrollToTop from './ScrollToTop';
import SearchBar from './SearchBar.js';
import GoBack from './GoBack';
import GetLocation from './GetLocation';
import { useSelector,useDispatch } from "react-redux";
import {updateQuantity} from '../Assets/Store/cartSlice';
import {updateSession} from '../Assets/Store/sessionSlice.js';

const imageFolderPath = 'https://express-sameer.000webhostapp.com/EXPRESS/';

export default function Header() {
  const Products = useSelector(state => state.data.productData);
  const [expand, setExpand] = useState(false);
  const [expandCart, setExpandCart] = useState(false);
  const cart = useSelector(state => state.cart.cartData);
  const dispatch = useDispatch();
  const session = useSelector(state => state.session.isSessionActive);

  let cartTotal = 0;
  if(cart.length > 0){
    cart.forEach(item => cartTotal += item.Quantity*item.ProductPrice);
  }

  const handleLogout = async () => {
    dispatch(updateSession(false));
  }

  const options = ['FAQ','Support','About',`${session ? 'logout' : 'login'}`];

  const menuOptions = options.map((option,index) => {
    if(option === 'logout'){
      return(
        <li key={index} onClick={handleLogout} className=' transition-all duration-500 text-gray-600 hover:text-white px-5 hover:px-8 hover:bg-gray-600 text-xl font-bold uppercase cursor-pointer tracking-[0.2rem] leading-8'>
          <Link to={`/`}>Logout</Link>
        </li>
      );
    }else{
      return(
        <li key={index} className=' transition-all duration-500 text-gray-600 hover:text-white px-5 hover:px-8 hover:bg-gray-600 text-xl font-bold uppercase cursor-pointer tracking-[0.2rem] leading-8'>
          <Link to={`/${option.toLowerCase()}`}>{option}</Link>
        </li>
      )
    }
  });

  function getCartItems(p){
    const product = Products.find(item => parseInt(item.ProductID) === parseInt(p.ProductID));
    
    if(p.Quantity > 0){
      return (
        <li key={p.ProductID} className="flex justify-between py-1">
          <div className="flex items-center">
            <img src={imageFolderPath+product.ProductImage} alt="product_image" className="w-16 h-16 mr-5"/>
            <div className="text-gray-600">
              <div className="mb-2">
                <p>{product.ProductName}</p>
              </div>
              <div className="text-xl flex justify-between w-[8rem] gap-5 items-center">
                <button className="bg-gray-800 text-white rounded px-2" onClick={(p) => dispatch(updateQuantity({updateType: 'decrement',ProductID: product.ProductID}))}>-</button>
                <p className="">{p.Quantity}</p>
                <button className="bg-gray-800 text-white rounded px-1" onClick={(p) => dispatch(updateQuantity({updateType: 'increment',ProductID: product.ProductID}))}>+</button>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-xl text-gray-800">₹{product.ProductPrice*p.Quantity}</p>
          </div>
        </li>
      )
    }
  }

  return (
    <>
      <header id="header" className='relative z-50 border shadow-2xl'>
        <div className='flex justify-between items-center bg-transparent px-2 py-3'>
          <div className='flex gap-2 items-center'>
            <GoBack cName={`${GetLocation() === '/' || GetLocation() === '/logout'? 'hidden':'block'}`}/>
            <Link to="/">
              <p onClick={ScrollToTop} className='text-3xl text-gray-600 font-bold'>E X P R E S S</p>
            </Link>
          </div>
          <div className='flex justify-between gap-5 items-center p-4'>
            <div className='hidden sm:block'>
              <SearchBar/>
            </div>
            <button className="flex justify-center items-center" onClick={()=>setExpandCart(true)}>
              <CartBtn/>
              <span className="relative -top-3 -left-1 text-gray-800 font-bold rounded-full">{cart.length}</span>
            </button>
            <button className={`text-gray-600 transition-transform duration-500 ${expand?'rotate-90':'rotate-0'}`} onClick={()=>setExpand(!expand)}>
              <MenuBtn/>
            </button>
          </div>
        </div>
        <div className='sm:hidden mb-3'>
          <SearchBar/>
        </div>
        <nav className={`absolute top-20 right-[-1px] transition-all duration-500 ease-in-out flex justify-center items-center bg-white shadow-2xl overflow-hidden ${expand? 'show':'hide'}`}>
          <ul className="w-[15rem]">{menuOptions}</ul>
        </nav>
      </header>
      <section className={`fixed top-0 right-0 z-[60] flex flex-col justify-between bg-white shadow-2xl transition-all duration-500 ease-in-out w-screen sm:w-[50vw] lg:w-[30vw] h-screen overflow-x-hidden ${expandCart? 'showCart' : 'hideCart'}`}>
        
        <div className="h-[10vh] mb-10 lg:mb-5">
          <div className="flex justify-between items-center mb-5 px-5 pt-5 text-gray-600 font-bold">
            <h2 className="text-3xl tracking-widest">Your Cart</h2>
            <button onClick={()=>setExpandCart(false)} className="px-2 py-[0.1rem] transition-all duration-500 ease-in-out active:scale-90 rounded-full border-2 border-gray-600">X</button>
          </div>
          <hr className=""/>
        </div>

        <div className="mb-5 overflow-y-auto h-[70vh]">
          {cart.length > 0 ?<ul className="flex flex-col gap-4 px-5 text-gray-800">{cart.map((p) => getCartItems(p))}</ul> : <p className="text-center text-xl tracking-widest">No items in your cart</p>}
        </div>

        <div className={`h-[20vh] ${cart.length > 0 ? '':'hidden'}`}>
          <div className="flex justify-between items-center mb-5 font-bold px-5 text-gray-600">
            <p className="text-2xl tracking-widest">Total</p>
            <p className="text-xl">₹{cartTotal}</p>
          </div>
          <hr className="mb-5"/>
          <div className="mx-auto mb-10 py-3 text-xl transition-all duration-500 active:scale-95 rounded text-center w-[80%] bg-gray-800 text-white">
            <button className="tracking-widest" onClick={()=> console.log(cartTotal)}>Checkout</button>
          </div>
        </div>

      </section>
    </>
  )
}