import { MdAdd, MdOutlineRemove } from "react-icons/md";
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { IAnimeContent } from '../Interfaces/Interface';
import { truncateText } from '../../utils/Truncate';
import { Link } from 'react-router-dom';
import { isSearchContext } from "../../contexts/AllContexts";
import { motion } from 'framer-motion';

const YourAnime = () => {
    const [animes, setAnimes] = useState<IAnimeContent[]>([])
    const [isRemovedAnime, setIsRemovedAnime] = useState<boolean>()
    const apiUrl: string = import.meta.env.VITE_SERVER_URL;

    const credentials = {
        withCredentials: true
    }
    const {setShowSearch} = useContext(isSearchContext)

        const getAnime = async() => {
            console.log("hello")
            try {
                const response = await axios.get(`${apiUrl}/api/v1/getAllTrackingAnimes`,credentials)
                setAnimes(response.data.anime)
                console.log(animes)
            } catch (error:any) {
                console.error(error.response)
            } 
        }
   

    const handleRemove = async(removeName:string) => {
        console.log(removeName)
        try {
            const response = await axios.delete(`${apiUrl}/api/v1/removeAnime/${removeName}`,credentials)
            if (response.status === 200) {
                setIsRemovedAnime(true)
            }
        } catch (error:any) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAnime()
    },[])

    //1011

    return (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className='flex gap-9 flex-wrap justify-center bg-black text-white'>
        {animes.map((anime, index) => (
            <div className='relative animePlaceHolder h-[25em] w-[18em] rounded-md' key={index} style={{ backgroundImage: `url(${anime?.thumbnail})` }}>
                <Link to= {`/show/${anime?.name}`}>
                <div
                    className="absolute inset-0 flex flex-col justify-end rounded-md p-5 text-white transition-opacity duration-300 opacity-100"
                    style={{
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
                    }}
                >
                    <div onClick={() => handleRemove(anime?.name)} className='z-20 absolute translate-x-[13.65em] translate-y-[-21.82em] cursor-pointer hover:bg-black w-[50px] h-[30px] flex justify-center items-center rounded-bl-md rounded-tr-md'>
                    <MdOutlineRemove className='size-10' />
                    </div>
                    <div className='absolute bg-red-600 px-8 translate-x-[-20px] translate-y-[-22.25em] rounded-tl-md rounded-br-md'>{anime?.rating}</div>
                    <p>{anime?.name}</p>
                <p className='text-sm text-gray-200 leading-tight'>{truncateText(anime?.description, 240)}</p>
                </div>
                </Link>
            </div>
        ))}
        <div className='h-[25em] w-[18em] rounded-md bg-gray-900 flex items-center justify-center'>
            <MdAdd className='size-[10em] text-gray-500' onClick = {() => setShowSearch(true)}/>
        </div>
    </motion.div>
    )
}

export default YourAnime
