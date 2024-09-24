import { useEffect, useState } from 'react';
import axios from 'axios';
import placeholder from '../../assets/jema_lh_081_05.jpg';
import '../AllAnime.css';
import { FaYoutube, FaGlobe } from "react-icons/fa";
import crunchyrooll from '../../assets/crunchyroll.svg';
import AuthButton from '../AuthButton/AuthButton';
import { useParams } from 'react-router-dom';
import { IAnimeContent, Message } from '../Interfaces/Interface';
import ShowsList from '../ShowsList/ShowsList';
import Notification from '../Notification/Notification';

const Show = () => {
  const [anime, setAnime] = useState<IAnimeContent[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const { name } = useParams();
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<Message>({
    message: ""
  })

  enum MessageType {
    error,
    success
  }

  useEffect(() => {
    const searchAnime = async () => {
      console.log("name: ", name);
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/searchAnime/${name}`);
        console.log(response.data);
        setAnime(response.data);
        // genres
        setGenre(response.data[0].genre)
        console.log(genre.join(', '))
      } catch (error) {
        console.error(error);
      }
    };
    searchAnime();
  }, [name]);

 

  const handleAdd = async(name: string) => {
    console.log("show name: ",name)
    setLoading(true)
   
   try {
      const response = await axios.post(`http://localhost:8000/api/v1/addAnime/${name}`,{},{
        withCredentials: true
      })
      console.log(response)
      if(response.status === 200) {
        setNotification({
          message: `you are now tracking ${anime[0].name}`,
          messageType: MessageType.success
        })
      }
    } catch (error:any) {
        if (error.response.status === 401) {
          // i should redirect the person to login
        } else if (error.response.status === 409) {
          setNotification({
            message: `you are already tracking ${anime[0].name}`,
            messageType: MessageType.error
          })
        } else {
          console.error(error.response)
        }
        console.error(error)
    } finally {
      setLoading(false)
    }
  }

  setTimeout(() => {
    if(notification.message != "") {
      setNotification({
        message: ""
      })
    }
  },3000)

  if (anime.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-[100%] flex flex-col justify-center items-center font-Caveat_Brush '>
      <div className='w-[100%] absolute top-0 bg-black h-[30em] z-10 bg-opacity-[80%]'>
      
      </div>
      <div className='animePlaceHolder w-[100%] h-[30em] absolute z-0 top-0' style={{ backgroundImage: `url(${anime[0]?.thumbnail || placeholder})` }}></div>
     
      <div className='flex justify-between w-[70%] flex-row items-center mt-10'>
        <div className='h-[30em] w-full flex justify-center text-white z-10'>
          <div 
            className='w-[20em] h-[30em] animePlaceHolder rounded-md p-10'
            style={{ backgroundImage: `url(${anime[0]?.thumbnail || placeholder})` }}
          >
            <a href={`${anime[0].official_website}`}><FaGlobe className='text-white size-10 cursor-pointer hover:text-gray-100' /></a>
          </div>
          <div className='p-10 w-[60%]'>
            <p className='text-3xl font-bold'>{anime[0]?.name || 'Unknown Title'}</p>
            <p>{anime[0]?.description || 'No description available'}</p>
            <div className='flex gap-5'>
              <div>
                <FaYoutube className='text-red-500 size-10' />
              </div>
              <div>
                <img src={crunchyrooll} className='size-10' />
              </div>
            </div>
            <div className='grid grid-cols-3'>
              <p><span className='font-bold text-red-600'>Rating:</span> {anime[0]?.rating || 'N/A'}</p>
              <p><span className='font-bold text-red-600'>Duration:</span> {anime[0]?.duration || 'N/A'}</p>
              <p><span className='font-bold text-red-600'>Episodes:</span> {anime[0]?.episodes || 'N/A'}</p>
              <p><span className='font-bold text-red-600'>Release date:</span> {anime[0]?.['release_time(sub)'] || 'N/A'}</p>
              <p><span className='font-bold text-red-600'>Source:</span> {anime[0]?.source || 'N/A'}</p>
              <p><span className='font-bold text-red-600'>Type:</span> {anime[0]?.type || 'N/A'}</p>
            </div>
              <AuthButton loading={loading} text={"Add to tracking"} onClick={() => handleAdd(anime[0]?.name || 'N/A')}/> 
          </div>
        </div>
      </div>
      <div className='w-[70%] my-10'>
        <p className='font-Caveat_Brush text-5xl w-full text-left flex mb-5'>Similar Animes</p>
        <ShowsList limit={4} genre={genre.join(', ')}/>
      </div>
      <div className='z-20 bg-red-400 top-4 w-[100%] flex items-center justify-center shadow-lg fixed'>
      {notification.messageType === MessageType.success && <Notification type={"success"} content = {notification.message}/>}
      {notification.messageType === MessageType.error && <Notification type={"error"} content = {notification.message}/>}
      </div>
     
    </div>
  );
};

export default Show;
