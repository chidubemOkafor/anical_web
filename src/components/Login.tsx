import { IoIosClose } from "react-icons/io";
import './Signin.css'
import { FcGoogle } from "react-icons/fc";
import { FaArrowRightLong } from "react-icons/fa6";
import { useContext, useState } from 'react';
import { isToggleLoginContext, isLoggedInContext } from '../contexts/AllContexts';
import axios from 'axios'
import AuthButton from "./AuthButton/AuthButton";
import { IBody, Message } from "./Interfaces/Interface";
import Notification from "./Notification/Notification";

const Login = () => {
    const apiUrl: string = import.meta.env.VITE_SERVER_URL;
    enum MessageType {
        error,
        success
    }

    const {setIsLoggedIn} = useContext(isLoggedInContext)
    const {setShowLogin} = useContext(isToggleLoginContext)
    // const {setShowSignin} = useContext(isToggleSignupContext)

    const [message, setMessage] = useState<Message>({
        message: ""
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [credentials, setCredentials] = useState<IBody>({
        password: "",
        email: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setCredentials((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`${apiUrl}/api/v1/login`,credentials,{
                withCredentials: true
              })
              setMessage({
                messageType: MessageType.success,
                message: response.data.message
              })
              setShowLogin(false)
              setIsLoggedIn(true)
            console.log(response)
        } catch (error: any) {
            if(error.response) {
                console.error("error: ",error.response.data.message)
                setMessage({
                messageType: MessageType.error,
                message: error.response.data.message
                })
            } else {
                setMessage({
                messageType: MessageType.error,
                message: error.message
                })
            }
     
        } finally {
            setLoading(false)
        }
    }

    setTimeout(() => {
        if(message.message != "") {
          setMessage({
            message: ""
          })
        }
    },3000)

    return (
        <div className='bg-black w-[100%] h-[100vh] fixed top-0 z-30 bg-opacity-70 flex justify-center items-center font-Caveat_Brush'>
            {message.message != "" && <Notification content={message.message} type={message.messageType === MessageType.success ? "success" : "error"}/>}
            <div className='bg-white w-[25em] rounded-md'>
                <div className='image w-[100%] h-[20%] rounded-t-md p-5'>
                    <p className='text-2xl text-white'>Logint</p>
                    <IoIosClose onClick={() => setShowLogin(false)} className="size-10 text-white absolute translate-x-[21em] translate-y-[-3em] cursor-pointer"/>
                </div>  
                <form className='p-5 flex flex-col gap-2' onSubmit={handleLogin}>
                    <label className='flex flex-col'>
                        email
                        <input type='email' name="email" value={credentials.email} onChange={handleChange} className='bg-gray-100 rounded-md border-black border-b-[2px] h-[30px] pl-3 outline-none' placeholder='monkeyDluffy@gmail.com' required/>
                    </label>
                    <label className='flex flex-col'>
                        password
                        <input type='password' name="password" value={credentials.password} onChange={handleChange} className='bg-gray-100 rounded-md border-black border-b-[2px] h-[30px] pl-3 outline-none' placeholder='onepiece' required/>
                        <p className="text-right cursor-pointer">forgot password</p>
                    </label>
                    <AuthButton text={'Login'} loading={loading}/>
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

export default Login

