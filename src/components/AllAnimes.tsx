import { useEffect, useState } from 'react'
import './AllAnime.css'
import ShowsList from './ShowsList/ShowsList'
import { animeGenres } from './ShowsList/animeGenres'

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
        console.log(genres.join(', '))
    },[genres])
  
  return (
    <div className='bg-black text-white w-[100%] flex justify-center items-center'>
        <div className='flex md:w-[70%] w-[90%] flex-col items-center py-20 gap-3'>
                <p className='font-Caveat_Brush md:text-5xl text-3xl w-full text-left flex'>All ongoing shows</p>
                <div className='font-Caveat_Brush w-full text-left '>
                    filter by genre
                    <form className='flex gap-5 flex-wrap'>
                        {animeGenres.map((genre: {name: string}, index) => (
                        <label className='flex items-baseline gap-2 justify-center text-gray-200' key={index}>
                            {genre.name}
                            <input type='checkbox' name = {genre.name} onChange = {handleValue}/>
                        </label>
                    ))}
                    </form>
                </div>
                <ShowsList limit={8} genre={genres.join(', ')}/>
        </div>
    </div>
  )
}

export default AllAnimes
