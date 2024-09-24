import { Dispatch, SetStateAction } from "react";

enum MessageType {
    error,
    success
}

interface MessageTypes {
    messageType: MessageType
}



interface IBody {
    username?: string
    password: string
    email: string
}

interface IAnimeContent {
    name: string
    alt_name: string
    description: string
    thumbnail: string
    genre: Array<string>
    rating: string
    episodes: string
    duration: string
    launch_date: string
    type: string
    season: string
    source: string
    ['release_time(sub)']: string
    streaming_sites: Array<string>
    official_website: string
}

interface Message {
    messageType?: MessageType,
    message: string
}

interface IisLoggedInContext {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

interface IisToggleSignupContext {
    showSignin: boolean;
    setShowSignin: Dispatch<SetStateAction<boolean>>;
}

interface IisToggleLoginContext {
    showLogin: boolean;
    setShowLogin: Dispatch<SetStateAction<boolean>>;
}

interface IisVerificationCodeContext {
    showVerification: boolean;
    setShowVerification: Dispatch<SetStateAction<boolean>>;
}

interface IisVerificationCodeContext {
    showVerification: boolean;
    setShowVerification: Dispatch<SetStateAction<boolean>>;
}

interface IisSearchContext {
    showSearch: boolean;
    setShowSearch: Dispatch<SetStateAction<boolean>>;
}

export type {
    Message, 
    IBody, 
    IisLoggedInContext,
    IisToggleSignupContext,
    IisToggleLoginContext,
    IisVerificationCodeContext,
    IAnimeContent,
    IisSearchContext,
    MessageTypes
}