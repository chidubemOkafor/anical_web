import { useEffect, useState } from 'react'
import './AllAnime.css'
import ShowsList from './ShowsList/ShowsList'

const AllAnimes = () => {
    const [genres, setGenres] = useState<string[]>([])

    const handleValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name , checked } = e.target

        if(checked) {
            setGenres((prev) => [...prev, name])
        } else {
            setGenres((prev) => prev.filter((genre) => genre !== name));
        }

    }

    useEffect(() => {
        console.log(genres)
    },[genres])
  
  return (
    <div className='bg-white w-[100%] flex justify-center items-center'>
        <div className='flex w-[70%] flex-col items-center py-20 gap-3'>
                <p className='font-Caveat_Brush text-5xl w-full text-left flex'>All ongoing shows</p>
                <div className='font-Caveat_Brush w-full text-left '>
                    filter by genre
                    <form className='flex gap-5 flex-wrap'>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Romance
                            <input type='checkbox' name = 'Romance' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Comedy
                            <input type='checkbox' name = 'Comedy' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Drama
                            <input type='checkbox' name = 'Drama' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Ecchi
                            <input type='checkbox' name = 'Drama' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Adventure
                            <input type='checkbox' name = 'Drama' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Fantacy
                            <input type='checkbox' name = 'Drama' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Isekai
                            <input type='checkbox' name = 'Drama' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            School
                            <input type='checkbox' name = 'Drama' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Sci-Fi
                            <input type='checkbox' name = 'Sci-Fi' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Game
                            <input type='checkbox' name = 'Game' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Superpower
                            <input type='checkbox' name = 'Superpower' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Shounen
                            <input type='checkbox' name = 'Shounen' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Harem
                            <input type='checkbox' name = 'Harem' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Mecha
                            <input type='checkbox' name = 'Mecha' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Supernatural
                            <input type='checkbox' name = 'Supernatural' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Action
                            <input type='checkbox' name = 'Action' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Slice of Life
                            <input type='checkbox' name = 'Slice of Life' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Seinen
                            <input type='checkbox' name = 'Seinen' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Magic
                            <input type='checkbox' name = 'Magic' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Music
                            <input type='checkbox' name = 'Music' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Music
                            <input type='checkbox' name = 'Music' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Shoujo
                            <input type='checkbox' name = 'Shoujo' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Psychological
                            <input type='checkbox' name = 'Shoujo' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Sports
                            <input type='checkbox' name = 'Sports' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Police
                            <input type='checkbox' name = 'Police' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Josei
                            <input type='checkbox' name = 'Josei' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Magical Girl
                            <input type='checkbox' name = 'Magical Girl' onChange = {handleValue}/>
                        </label>
                        <label className='flex items-baseline gap-2 justify-center text-gray-600'>
                            Thriller
                            <input type='checkbox' name = 'Thriller' onChange = {handleValue}/>
                        </label>
                    </form>
                </div>
                <ShowsList limit={8}/>
        </div>
    </div>
  )
}

export default AllAnimes
