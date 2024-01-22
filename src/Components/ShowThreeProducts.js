import {Link} from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

const imageFolderPath = 'https://express-sameer.000webhostapp.com/EXPRESS/';

export default function ShowThreeProducts({Products}) {
    const displayProducts = Products.map(p => (
      <li key={p.ProductID} className="mb-20 flex flex-col tracking-widest text-gray-800 cursor-pointer">
            <div className="w-[45vw] h-[45vw] sm:w-[28vw] sm:h-[28vw] mb-5 border-2 rounded flex justify-center items-center transition-all duration-500 shadow-lg hover:shadow-2xl hover:border-none">
                <Link to={`/productPage/${p.ProductID}`}><img onClick={ScrollToTop} className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80" src={imageFolderPath+p.ProductImage} alt='demo_product_image'/></Link>
            </div>
            <p className="text-[1rem] w-[13rem] h-[4rem] cursor-text">{p.ProductName}</p>
            <p className="text-[1rem] font-bold cursor-text">₹{p.ProductPrice}</p>
        </li>
    ));

    return (
        <div className="mt-10 overflow-x-scroll sm:overflow-x-hidden">
            <ul className="flex flex-row mx-auto justify-center gap-[5vw] sm:gap-[3vw] w-[150vw] sm:w-[90vw]">{displayProducts}</ul>
        </div>
    )
  }