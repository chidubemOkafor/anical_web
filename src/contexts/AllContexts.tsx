import { createContext } from "react";
import { 
        IisToggleSignupContext,
        IisToggleLoginContext,
        IisVerificationCodeContext,
        IisLoggedInContext,
        IisSearchContext
         } from "../components/Interfaces/Interface";

export const isToggleSignupContext = createContext<IisToggleSignupContext>(undefined)
export const isToggleLoginContext = createContext<IisToggleLoginContext>(undefined)
export const isVerificationCodeContext = createContext<IisVerificationCodeContext>(undefined)
export const isChangePasswordContext = createContext<IisLoggedInContext>(undefined)
export const isLoggedInContext = createContext<IisLoggedInContext>(undefined)
export const isSearchContext = createContext<IisSearchContext>(undefined)