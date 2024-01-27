// import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    // const [userName,setUserName] = useSatate(null);
    const handleClick = (e) => {
        console.log(e.target.value);
    }
    const submit = (event) => {
        event.preventDefault();
        // console.log(event.target.uname.value);
        // console.log(event.target.pass.value);
        // console.log(event.target.gender.value);
    }
    
    return(
        <div className='w-screen h-screen'>
            <div className='bg-blue-50 w-[90vw] sm:w-[50vw] lg:w-[30vw] h-[40rem] shadow-2xl mx-auto rounded translate-y-[15%]'>
                <h1 className='text-center p-5 text-xl text-gray-600 tracking-widest font-semibold shadow-lg mb-10'>Hello Again</h1>
                <div onClick={(e)=> handleClick(e)} className='w-3/4 text-center mx-auto tracking-widest p-3 my-5 transition-all duration-500 bg-white hover:bg-blue-100 border-2 rounded'>
                    Continue with
                    <span className="font-semibold">
                        <span className="text-[rgb(66,133,244)] ml-1">G</span>
                        <span className="text-[rgb(219,68,55)]">o</span>
                        <span className="text-[rgb(244,180,0)]">o</span>
                        <span className="text-[rgb(66,133,244)]">g</span>
                        <span className="text-[rgb(15,157,88)]">l</span>
                        <span className="text-[rgb(219,68,55)]">e</span>
                    </span>
                </div>
                <div className='flex mx-auto justify-center'>
                    <div>-----------------</div>
                    <div className='px-2 font-bold text-gray-600'>OR</div>
                    <div>-----------------</div>
                </div>
                <div className='w-3/4 my-5 mx-auto'>
                    <form onSubmit={submit}>
                        <input className='w-[100%] mb-2 p-2 border-2' type='text' name='uname' placeholder='Username' required/>
                        <input className='w-[100%] mb-2 p-2 border-2' type='password' name='pass' placeholder='Password' required/>
                        <div className='w-[100%] flex justify-center mt-5'>
                            <button className='w-[20%] mb-2 bg-blue-300 rounded p-1' type='submit'>Login</button>
                        </div>
                    </form>
                </div>
                <div className='w-3/4 mx-auto flex justify-center'>
                    <h2>Don't have an account?</h2>
                    <p className='underline text-blue-500'>
                        <Link to='/signup'>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
