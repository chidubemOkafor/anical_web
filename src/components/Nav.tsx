import { useContext } from "react"
import { isToggleLoginContext, isToggleSignupContext, isLoggedInContext, isSearchContext } from "../contexts/AllContexts"
import { Link } from "react-router-dom"
import { MdSearch } from "react-icons/md";
import axios from "axios";

const Nav = () => {
    const apiUrl: string = import.meta.env.VITE_SERVER_URL;
    const {setShowLogin} = useContext(isToggleLoginContext)
    const {setShowSignin} = useContext(isToggleSignupContext)
    const {setShowSearch} = useContext(isSearchContext)
    const {isLoggedIn, setIsLoggedIn} = useContext(isLoggedInContext)

    const handleLogout = async() => {
        try {
            const response = await axios.post(`${apiUrl}/api/v1/logout`)
            console.log(response)
            if(response.status === 200) {
                setIsLoggedIn(false)
            }
        } catch (error) {
            console.error(error)
        }
    }


  return (
    <div className='w-[100%] flex items-center justify-center absolute text-white  font-Caveat_Brush z-30'>
        <div className='md:w-[70%] w-[90%] flex items-center justify-between'>
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
                    <MdSearch  className='cursor-pointer size-6' onClick = {() => setShowSearch(true)}/>
                    <li className='cursor-pointer'><Link to={"/dashboard/tracking"}>Dashboard</Link></li>
                    <li className='cursor-pointer' onClick={handleLogout}>Logout</li>
                </ul>
            )
            }
        </div>
    </div>
  )
}

export default Nav
