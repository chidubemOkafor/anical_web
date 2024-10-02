import './Hero.css'
import { isLoggedInContext, isSearchContext, isToggleSignupContext } from '../contexts/AllContexts'
import { useContext } from 'react'
import { motion } from 'framer-motion';




// height: 80vh;
// width: 40%;
const Hero = () => {
    const {isLoggedIn} = useContext(isLoggedInContext)
    const {setShowSearch} = useContext(isSearchContext)
    const {setShowSignin} = useContext(isToggleSignupContext)
    return (
  
    <div className='background bg-black w-[100%] h-[40em]'>
        <div
        className="h-[40em] flex justify-center items-center absolute inset-0 flex-col rounded-md p-5 text-white transition-opacity duration-300 opacity-100"
        style={{
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
        }}>
        <motion.div 
            initial={{ opacity: 0, y: -90 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -90 }}
            transition={{ duration: 1, ease: 'easeInOut' }} 
            className='flex md:justify-center justify-center md:w-[70%] w-[90%] md:flex-row flex-col-reverse items-center md:py-0 py-10'>
            <div className='md:w-1/2 w-[100%] md:text-left text-center'>
                <p className='md:text-6xl text-4xl font-Caveat_Brush text-white'>Track your anime </p>
                <p className='font-Caveat_Brush text-xl text-gray-200'>follow your best and favourite shows and get a notification exactly when the episodes are dropped in real time.</p>
            {!isLoggedIn ?  <button onClick={() => setShowSignin(true)} className='font-Caveat_Brush text-2xl text-white px-[19px] py-[2px] bg-blue-600 rounded-md mt-5'>signup</button> : <button onClick={() => setShowSearch(true)} className='font-Caveat_Brush text-2xl text-white px-[19px] py-[2px] bg-blue-600 rounded-md mt-5'>search</button>}
            </div>
            <div className='luffy md:h-[80vh] h-[15em] w-[15em] md:w-[40%] z-20 relative'/> 
        </motion.div >
        </div>
    </div>
    
  )
}

export default Hero
