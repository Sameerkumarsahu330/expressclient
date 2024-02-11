import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {Input} from './SignUpPage';
import axios from "axios";
import {useDispatch} from 'react-redux';
import { updateSession } from "../Assets/Store/sessionSlice";

const url = 'http://localhost/expressbackend/api/login.php';

export default function LoginPage() {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    if(message){
        setTimeout(()=>{
            setMessage(null);
        },4000);
    }
    const handleClick = (e) => {
        console.log(e.target.value);
    }
    const submit = async (event) => {
        event.preventDefault();
        const userData = {
            uname: userName,
            pass : password
        }

        try{
            const response = await axios.post(url,userData);
            if(parseInt(response.data) === 200){
                setMessage('Successfully Logged In');
                navigate(-1);
                dispatch(updateSession(true));
            }else{
                setMessage(response.data);
            }
        }catch(err){
            console.log('Some error occurred');
        }
        setUserName('');
        setPassword('');
    }
    
    return(
        <div className='w-screen h-screen'>
            <div className='bg-blue-50 w-[90vw] sm:w-[50vw] lg:w-[30vw] h-[40rem] shadow-2xl mx-auto rounded translate-y-[15%]'>
                <h1 className='text-center p-5 text-xl text-gray-600 tracking-widest font-semibold shadow-lg mb-3'>Hello Again</h1>
                <div className={`bg-green-600 p-3 flex justify-between ${message? '':'invisible'}`}>
                    <p>{message}</p>
                    <button onClick={() => setMessage(null)} className='text-white border-2 rounded-full px-2 font-bold'>X</button>
                </div>
                <div onClick={(e)=> handleClick(e)} className='w-3/4 text-center mx-auto tracking-widest p-3 my-3 transition-all duration-500 bg-white hover:bg-blue-100 border-2 rounded'>
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
                        <Input type={'text'} value={userName} setter={(e) => setUserName(e.target.value)} namePlaceholder={'Username'}/>
                        <Input type={'password'} value={password} setter={(e) => setPassword(e.target.value)} namePlaceholder={'Password'}/>
                        <div className='w-[100%] flex justify-center mt-5'>
                            <button className='w-[20%] mb-2 bg-blue-300 rounded p-1' type='submit'>Login</button>
                        </div>
                    </form>
                </div>
                <div className='w-3/4 mx-auto flex justify-center'>
                    <h2>Don't have an account?</h2>
                    <p className='text-green-800 font-semibold ml-1'>
                        <Link to='/signup'>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
