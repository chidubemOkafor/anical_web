import Nav from "../components/Nav"
import Hero from "../components/Hero"
import AllAnimes from "../components/AllAnimes"
import Login from "../components/Login"
import Signin from "../components/Signin"
import VerificationCode from "../components/VerificationCode"
import { useState } from "react"
import { isToggleLoginContext, isToggleSignupContext,isVerificationCodeContext } from "../contexts/AllContexts"

function HomeApp() {
    const [showLogin, setShowLogin] = useState(false)
    const [showSignin, setShowSignin] = useState(false)
    const [showVerification, setShowVerification] = useState(false)
    return (
        <>
            <isToggleLoginContext.Provider value={{showLogin, setShowLogin}}>
                <isToggleSignupContext.Provider value={{showSignin, setShowSignin}}>
                    <isVerificationCodeContext.Provider value={{showVerification, setShowVerification}}>
                    <Nav/>
                    <Hero/>
                    <AllAnimes/>
                    {showLogin && <Login/>}
                    {showSignin && <Signin/>}
                    {showVerification && <VerificationCode/>}
                    </isVerificationCodeContext.Provider>
                </isToggleSignupContext.Provider>
            </isToggleLoginContext.Provider>
        </>
    )
}


export default HomeApp