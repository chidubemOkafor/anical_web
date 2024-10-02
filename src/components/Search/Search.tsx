import { IoIosClose } from 'react-icons/io';
import { useContext, useEffect, useState } from 'react';
import { isSearchContext } from '../../contexts/AllContexts';
// import animeImage from '../../assets/jema_lh_081_05.jpg'
import { MdAdd } from "react-icons/md";
import { truncateText } from '../../utils/Truncate';
import axios from 'axios';
import { IAnimeContent } from '../Interfaces/Interface'
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
    const {setShowSearch} = useContext(isSearchContext)
    const [value, setValue] = useState<string>("")
    const [searchDetail, setSearchDetail] = useState<IAnimeContent[]>([])
    const navigate = useNavigate() 

    useEffect(() => {
        const getSearch = async() => {
                try{
                    const response = await axios.get(`http://localhost:8000/api/v1/searchAnime/${value}`)
                    console.log(response)
                    setSearchDetail(response.data)
                } catch (error:any) {
                    console.error(error)
                }
        }
        getSearch()
    },[value])

    const handleNavigate = (prop:string) => {
        navigate(`/show/${prop}`)
        setShowSearch(false)
    }

    return (
    <div className='bg-black w-[100%] h-[100vh] fixed top-0 z-30 bg-opacity-70 flex justify-center items-center font-Caveat_Brush'>
        <div className='flex flex-col gap-5 w-[35em]'>
            <div className='bg-white rounded-md p-5'>
                <IoIosClose className='size-10 cursor-pointer absolute translate-x-[32em] translate-y-[-60px] text-white' onClick={() => setShowSearch(false)}/>
                <div className='gap-3 flex'>
                    <input type='search' value={value} onChange={(e) => setValue(e.target.value)} className='w-full bg-gray-200 outline-none rounded-md pl-3' placeholder='Naruto'/>
                </div>
            </div>
            <div className='bg-white flex flex-col rounded-md p-5 gap-5 overflow-scroll max-h-[30em]'>
            {searchDetail.length === 0 ?(
             <div className='flex items-center justify-center text-gray-500'>
                no anime to find
             </div>
             ) : 
            (searchDetail.map((detail, index) => (
                <div className='bg-white flex items-center hover:bg-gray-100 rounded-md' key={index}>
                    <div className='flex gap-5 cursor-pointer rounded-md w-full' onClick={() => handleNavigate(detail.name)}>
                        <div className='animePlaceHolder h-[5em] w-[4em] rounded-md' style={{backgroundImage: `url(${detail.thumbnail})`}}/>
                        <div className='w-full flex flex-col items-start justify-center '>
                            <p>{truncateText(detail.name, 50)}</p>
                            <p className='text-gray-700 text-sm leading-tight'>{truncateText(detail.description, 120)}</p>
                        </div>
                        <div className='flex justify-center items-center'></div>
                    </div>
                    <MdAdd className='size-5 cursor-pointer'/>
                </div>)))}
            </div>
        </div>
    </div>
  )
}

export default Search
