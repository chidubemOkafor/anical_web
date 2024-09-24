import './Hero.css'
import { isToggleSignupContext } from '../contexts/AllContexts'
import { useContext } from 'react'

const Hero = () => {
    const {setShowSignin} = useContext(isToggleSignupContext)
    return (
    <div className='background w-[100%] flex justify-center items-center'>
        <div className='flex justify-between w-[70%] flex-row items-center'>
            <div className='w-1/2'>
                <p className='text-6xl font-Caveat_Brush text-white'>Track your anime </p>
                <p className='font-Caveat_Brush text-xl text-gray-300'>follow your best and favourite show and get a notification exactly when the episodes are dropped in real time.</p>
                <button onClick={() => setShowSignin(true)} className='font-Caveat_Brush text-2xl text-white px-[19px] py-[2px] bg-blue-600 rounded-md mt-5'>signup</button>
            </div>
            <div className='luffy z-20 relative'/>
        </div>
    </div>
  )
}

export default Hero
