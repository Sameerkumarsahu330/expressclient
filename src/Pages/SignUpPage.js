import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const url = "https://express-sameer.000webhostapp.com/EXPRESS/api/signup.php";

export default function RegistrationPage(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [userName,setUserName] = useState('');
    const [passWord,setPassWord] = useState('');
    const [passWord2,setPassWord2] = useState('');
    const [age,setAge] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [message,setMessage] = useState(null);
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
        if(email.includes('@') && email.includes('.')){
            if(passWord !== passWord2){
                setMessage("Passwords doesn't match");
            }else if(passWord === passWord2){
                const userData = {
                    name: name,
                    email : email,
                    uname : userName,
                    pass : passWord,
                    age : age,
                    phone : phone,
                    address : address,
                    gender : event.target.gender.value
                };
                setName('');
                setEmail('');
                setUserName('');
                setPassWord('');
                setPassWord2('');
                setAge('');
                setPhone('');
                setAddress('');
                try{
                    const response = await axios.post(url,JSON.stringify(userData));
        
                    setMessage(response.data);
                }catch(err){
                    console.log('Error:',err);
                }
            }
        }else{
            setMessage("Invalid Email. Must include (@ .)");
        }
    }
    
    return(
        <div className='w-screen h-screen'>
            <div className='bg-blue-50 w-[90vw] sm:w-[50vw] lg:w-[30vw] h-[45rem] shadow-2xl mx-auto rounded translate-y-[5%]'>
                <h1 className='text-center p-5 text-xl text-gray-600 tracking-widest font-semibold shadow-lg mb-3'>Get Started</h1>
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
                <div className='w-3/4 mt-5 mx-auto'>
                    <form onSubmit={submit}>
                        <Input type={'text'} value={name} setter={(e) => setName(e.target.value)} namePlaceholder={'Name'}/>
                        <div className='w-[100%] flex gap-2'>
                            <Input type={'text'} value={userName} setter={(e) => setUserName(e.target.value)} namePlaceholder={'Username'}/>
                            <Input type={'text'} value={email} setter={(e) => setEmail(e.target.value)} namePlaceholder={'Email'}/>
                        </div>
                        <div className='w-[100%] flex gap-2'>
                            <Input type={'password'} value={passWord} setter={(e) => setPassWord(e.target.value)} namePlaceholder={'Password'}/>
                            <Input type={'password'} value={passWord2} setter={(e) => setPassWord2(e.target.value)} namePlaceholder={'Re-type password'}/>
                        </div>
                        <div className='w-[100%] flex gap-2'>
                            <Input type={'number'} value={age} setter={(e) => setAge(e.target.value)} namePlaceholder={'Age'}/>
                            <Input type={'tel'} value={phone} setter={(e) => setPhone(e.target.value)} namePlaceholder={'Phone'}/>
                        </div>
                        <textarea className='w-[100%] mb-2 p-2 border-2' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} required/>
                        <div className='w-[100%] flex justify-between items-center px-1 py-5'>
                            <label htmlFor='gender'>Gender :</label>
                            <Radio labelName='Male' />
                            <Radio labelName='Female'/>
                            <Radio labelName='Others'/>
                        </div>
                        <div className='w-[100%] flex justify-center mt-5'>
                            <button className='w-[20%] mb-2 bg-blue-300 rounded p-1' type='submit'>SignUp</button>
                        </div>
                    </form>
                </div>
                <div className='w-3/4 mx-auto flex justify-center'>
                    <h2>Already have an account?</h2>
                    <p className='text-green-800 font-semibold ml-1'>
                        <Link to='/login'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

function Radio({labelName}){
    
    return (
        <div className='flex justify-center items-center gap-2'>
            <input type='radio' value={labelName} name='gender' id={labelName} required/><label htmlFor={labelName}>{labelName}</label>
        </div>
    )
}

function Input({value,setter,type,namePlaceholder}){
    return(
        <input value={value} onChange={setter} className='w-[100%] mb-2 p-2 border-2' type={type} name={namePlaceholder} placeholder={namePlaceholder} required/>
    )
}

export {Input,Radio};