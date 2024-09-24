import { useContext } from "react"
import { isToggleLoginContext, isToggleSignupContext, isLoggedInContext } from "../contexts/AllContexts"
import { Link } from "react-router-dom"

const Nav = () => {
    const {setShowLogin} = useContext(isToggleLoginContext)
    const {setShowSignin} = useContext(isToggleSignupContext)
    const {isLoggedIn} = useContext(isLoggedInContext)

    
  return (
    <div className='w-[100%] flex items-center justify-center absolute text-white  font-Caveat_Brush z-30'>
        <div className='w-[70%] flex items-center justify-between'>
            <div className='text-4xl font-bold'>
                    ANICAL
            </div>
            {!isLoggedIn ? (
                <ul className='flex gap-5'>
                <li className='cursor-pointer' onClick={() => setShowLogin(true)}>
                    login
                </li>
                <li className='cursor-pointer' onClick={() => setShowSignin(true)}>
                    signup
                </li>
            </ul>) : (
                <ul className="flex gap-5">
                    <li className='cursor-pointer'>profile</li>
                    <li className='cursor-pointer'><Link to={"/dashboard/tracking"}>Dashboard</Link></li>
                </ul>
            )
            }
        </div>
    </div>
  )
}

export default Nav
