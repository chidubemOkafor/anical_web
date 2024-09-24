import { IoIosClose } from 'react-icons/io';
import './Signin.css'
import { FcGoogle } from 'react-icons/fc';
import { FaArrowRightLong } from "react-icons/fa6";
import { useContext, useEffect, useState } from 'react';
import { isToggleLoginContext, isToggleSignupContext, isVerificationCodeContext } from '../contexts/AllContexts';
import axios from 'axios'
import Notification from './Notification/Notification';
import AuthButton from './AuthButton/AuthButton';
import { IBody, Message } from './Interfaces/Interface';
// import { IisToggleSignupContext } from './Interfaces/Interface';

const Signin = () => {

  enum MessageType {
    error,
    success
  }

  // const {setShowLogin} = useContext(isToggleLoginContext)
  const {setShowSignin} = useContext(isToggleSignupContext)
  const {setShowVerification} = useContext(isVerificationCodeContext)

  const [message, setMessage] = useState<Message>({
    message: ""
  })

  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState<IBody>({
    username: "",
    password: "",
    email: ""
  });

  const verificationRedirect = async() => {
    try {
      setLoading(true)
  
      localStorage.setItem("email", credentials.email) //used for resending verification token

      const response = await axios.post('http://localhost:8000/api/v1/createAccount', credentials)
      console.log(response.data.message)
      setMessage({
        messageType: MessageType.success,
        message: response.data.message
      })
    } catch (error: any) {
      if(error.response) {
        setMessage({
          messageType: MessageType.error,
          message: error.response.data.message
        })
      } else {
        console.error("error: ", error.message)
        setMessage({
          messageType: MessageType.error,
          message: error.message
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void =>{
    e.preventDefault()
    // code to send the email will be here
    verificationRedirect()
  }

  setTimeout(() => {
      if(message.message != "") {
        setMessage({
          message: ""
        })
      }
  },3000)

  useEffect(() => {
    if (message.messageType === MessageType.success) {
      setTimeout(() => {
        setShowSignin(false)
        setShowVerification(true)
      },4000)
    }
  },[message])

  return (
    <div className='bg-black w-[100%] h-[100vh] fixed top-0 z-30 bg-opacity-70 flex justify-center items-center font-Caveat_Brush'>
    {message.message != "" && <Notification content={message.message} type={message.messageType === MessageType.success ? "success" : "error"}/>}
    <div className='bg-white w-[25em] rounded-md'>
      <div className='image w-[100%] h-[20%] rounded-t-md p-5'>
        <p className='text-2xl text-white'>Create an Account</p>
        <IoIosClose onClick={() => setShowSignin(false)} className="size-10 text-white absolute translate-x-[21em] translate-y-[-3em] cursor-pointer"/>
      </div>  
      <form className='p-5 flex flex-col gap-2' onSubmit={handleSubmit}>
          <label className='flex flex-col'>
            username
            <input type='text' name ='username' value={credentials.username} onChange={handleChange} className='bg-gray-100 rounded-md border-black border-b-[2px] h-[30px] pl-3 outline-none' placeholder='monkey d luffy' required/>
          </label>
          <label className='flex flex-col'>
            email
            <input type='email' name='email' value={credentials.email} onChange={handleChange} className='bg-gray-100 rounded-md border-black border-b-[2px] h-[30px] pl-3 outline-none' placeholder='monkeyDluffy@gmail.com' required/>
          </label>
          <label className='flex flex-col'>
            password
            <input type='password' name='password' value={credentials.password} onChange={handleChange} className='bg-gray-100 rounded-md border-black border-b-[2px] h-[30px] pl-3 outline-none' placeholder='onepiece' required/>
          </label>
          <AuthButton loading={loading} text={"Sign up"}/>
      </form> 
      <div className='p-5 bg-gray-100 rounded-b-md'>
          <button className='flex justify-between items-center font-Roboto font-medium bg-gray-50 shadow-md rounded-full w-full h-10 px-5'>
            <FcGoogle className='size-8'/>
            Continue with Google
            <FaArrowRightLong/>
          </button>
      </div>
    
      </div>
    </div>
     
  )
}

export default Signin

