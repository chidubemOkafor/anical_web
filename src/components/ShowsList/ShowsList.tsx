import { useEffect, useState } from 'react'
import '../AllAnime.css'
import axios, {AxiosResponse} from 'axios'
import defaultImage from '../../assets/jema_lh_081_05.jpg'
import { Link } from 'react-router-dom'
import { IAnimeContent } from '../Interfaces/Interface'
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { motion } from 'framer-motion'

const ShowsList = ({limit, genre = ""}:any) => {   
    enum PageState {
        Prev,
        Next 
    }

    const tag = "bg-green-700 bg-opacity-60 px-3 border-2 border-green-500 rounded-full text-xs text-green-600 font-Caveat_Brush"
    const [animes, setAnimes] = useState<IAnimeContent[]>([])
    const [totalPageNumber, setTotalPageNumber] = useState(0)
    let [currentPage, setCurrentPage] = useState(1)


    const changePage = (type: PageState) => {
        switch (type) {
          case PageState.Next:
            if (currentPage < totalPageNumber) {
              setCurrentPage(currentPage + 1);
            }
            break;
            
          case PageState.Prev:
            if (currentPage > 0) {
              setCurrentPage(currentPage - 1);
              console.log(currentPage)
            }
            break;
            
          default:
            console.log("Invalid type");
            break;
        }
      };

      console.log(`genre="${genre}"`)

    const getAllAnime = async(page:number):Promise<void> => {
        try {
            const response:AxiosResponse<IAnimeContent[]> = await axios.get(`http://localhost:8000/api/v1/getHomeAnime?page=${page}&limit=${limit}&genre="${genre}"`)
            setAnimes(response.data.data.data)
            setTotalPageNumber(Math.floor(response.data.data.animeCount/response.data.data.rowsPerPage))
            console.log(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() =>  {
        getAllAnime(currentPage)
    },[currentPage,genre])

  return (
    <div className='flex flex-col items-center justify-center bg-black text-white'>
        <div className='grid xl:grid-cols-4 md:grid-cols-3 gap-10 sm:grid-cols-2'>
            {animes.map((anime, index) => (
              <motion.div 
                initial={{ y: -90 }}
                animate={{ y: 0 }}
                exit={{y: -90 }}
                transition={{ duration: index, ease: 'easeInOut' }}
                className=' w-[13em] cursor-pointer' 
                key={index}>
                <Link to={`/show/${anime.name}`}><div className='animePlaceHolder h-[15em] w-full rounded-md shadow-xl' style={{backgroundImage: `url(${anime.thumbnail})`}}/></Link>
                <div className='absolute translate-y-[-14.999em] translate-x-[10.5em] shadow-md bg-red-500 rounded-tr-md rounded-bl-md text-white w-10 flex items-center justify-center'>{anime.rating}</div>
                <div className='absolute translate-y-[-1.5em] shadow-md bg-black rounded-tr-md rounded-bl-md text-white px-3'>{anime.episodes}</div>
                <div className='gap-2 flex-wrap flex mt-2'>
                    {anime.genre.map((genre, index2) => (<div key={index2} className={tag}>{genre}</div>))}
                </div>
                <p className='font-Caveat_Brush text-sm text-center'>{anime.name}</p>
              </motion.div>))}
        </div>
        <div className='h-[2.5em] flex items-center font-Caveat_Brush'>
            <button className='h-full w-[3em] text-blue-500 font-bold flex justify-center items-center rounded-l-md border-2' onClick={() => changePage(PageState.Prev)} disabled={currentPage === 0}>
                <FaCaretLeft/>
            </button>
            <div className='h-full w-[6em]  font-bold flex justify-center items-center border-2'>{`${currentPage} of ${totalPageNumber}`}</div>
            <button className='h-full w-[3em] text-blue-500 font-bold flex justify-center items-center rounded-r-md border-2' onClick={() => changePage(PageState.Next)} disabled={currentPage === totalPageNumber} >
                <FaCaretRight/>
            </button>
        </div>
    </div>
  )
}

export default ShowsList
