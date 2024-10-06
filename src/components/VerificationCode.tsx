import { IoIosClose } from "react-icons/io";
import './Signin.css'
import { FcGoogle } from "react-icons/fc";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import React, { useContext, useState } from 'react';
import {isVerificationCodeContext, isToggleLoginContext} from '../contexts/AllContexts';
import AuthButton from "./AuthButton/AuthButton";

const VerificationCode = () => {
  const apiUrl: string = import.meta.env.VITE_SERVER_URL;
  const {setShowVerification} = useContext(isVerificationCodeContext)
  const {setShowLogin} = useContext(isToggleLoginContext);
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
        setLoading(true)
        const response = await axios.post(`${apiUrl}/api/v1/verify/${code}`)
        if(response.status != 200) {
            throw new Error("status is not 200")
        }
        setShowVerification(false)
        setShowLogin(true)
    } catch (error: any) {
        if(error.response) {
            if(error.response.status == 404) {
                setError("Invalid code")
            } else if (error.response.status == 401) {
                setError("Token has expired")
            }
        } else {
            console.error('error:', error.response)
        }
        console.error('error:', error)
    } finally {
        setLoading(false)
    }
}

const handleResend = async() => {
    try {
        const email = localStorage.getItem("email")
        if (!email) {
            throw new Error('Email does not exist');
        }
        const response = await axios.post(`${apiUrl}/api/v1/generateNewToken/${email}`)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}

  return (
    <div className='bg-black w-[100%] h-[100vh] fixed top-0 z-30 bg-opacity-70 flex justify-center items-center font-Caveat_Brush'>
    <div className='bg-white w-[25em] rounded-md'>
      <div className='image w-[100%] h-[20%] rounded-t-md p-5'>
        <p className='text-2xl text-white'>OTP Verification</p>
        <IoIosClose onClick={() => setShowVerification(false)} className="size-10 text-white absolute translate-x-[21em] translate-y-[-3em] cursor-pointer"/>
      </div>  
      <form className='p-5 flex flex-col gap-2' onSubmit={handleSubmit}>
        <label className='flex flex-col '>
            enter the 6 digit code sent to your email
            <input type='number' value={code} onChange={(e) => setCode(e.target.value)} className='bg-gray-100 rounded-md border-black border-b-[2px] h-[30px] pl-3 outline-none w-1/2' placeholder='0000' required/>
            {error != "" && <p className="text-red-400">{error}</p>}
            <p className="text-gray-500 cursor-pointer"><span className="text-black-200 cursor-pointer" onClick={handleResend}>RESEND</span></p>
        </label>
        <AuthButton loading={loading} text={"continue"}/>
      </form>     
      </div>
    </div>
     
  )
}

export default VerificationCode

