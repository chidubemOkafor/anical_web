import { Link } from 'react-router-dom';
import YourAnime from './YourAnime';
import animeImage from '../../assets/jema_lh_081_05.jpg'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown,IoMdArrowDropup } from "react-icons/io";
import { motion } from 'framer-motion';
// import axios from 'axios'
// import { useEffect, useState } from 'react';


const Dashboard = ({section}:any) => {
    const apiUrl: string = import.meta.env.VITE_SERVER_URL;
    const [open, setOpen] = useState(false)
    const [closeProfile, setCloseProfile] = useState(false)
    const [profile, setProfile] = useState<{username: string, email: string}>({username: "", email: ""})

    const credentials = {
        withCredentials: true
    }

    useEffect(() => {
        const checkScreen = () => {
            const width = window.innerWidth;
            if(width < 770) {
                setOpen(false)
            } else {
                setOpen(true)
            }
            
        }

        checkScreen()

        window.addEventListener('resize', checkScreen);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkScreen);
        };
    },[])

    useEffect(() => {
        const getProfile =async() => {
            try {
                const response = await axios.get(`${apiUrl}/api/v1/profile`,credentials)
                setProfile(response.data.message)
                console.log(profile)
            } catch(error) {
                console.error(error)
            }
        }
        getProfile()
    },[])

    const handleCloseOpen = (prof: boolean) => {
        setCloseProfile(prof)
        console.log("working")
    }

    return (
    <div>
        <div className="w-[100%] items-center justify-center flex md:flex-row flex-col font-Caveat_Brush bg-black">
            {open && <div className="w-[20em] h-full bg-slate-900 z-10 shadow-black text-white flex flex-col items-center justify-center fixed left-0 top-0 p-5">
                <div className="background h-[6em] rounded-lg flex items-center justify-center absolute w-[17.5em] top-5">
                    <p className='text-5xl text-white'><Link to ='/'>Anical</Link></p>
                </div>
                <div className='w-full text-xl bg-gray-800 rounded-md text-center'>
                    <p className={`py-5 rounded-md cursor-pointer`}> Tracking </p>
                </div>
                <div className='flex-col h-[10em] w-[17.5em] rounded-md absolute bottom-5 flex items-center justify-center'>
                    <img src={animeImage} className='h-20 w-20 rounded-full border-[10px] border-gray-400'/>
                    <p>{profile.username}</p>
                    <p>{profile.email}</p>
                </div>
            </div>}
            {!open && <div className='bg-black w-full text-white p-5 flex justify-center items-center flex-col sticky z-30 top-0 shadow-md'>
                <div className="background h-[6em] rounded-lg flex items-center justify-center w-full top-5 mb-2">
                    <p className='text-5xl text-white'><Link to ='/'>Anical</Link></p>
                </div>
                
                <div className='bg-gray-300 text-gray-500 w-full py-2 rounded-md flex items-center justify-center mb-2'>
                    <Link to={"/dashboard/tracking"}>Tracking</Link>
                </div>
                {closeProfile && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className='bg-gray-300 text-gray-500 rounded-md flex flex-col w-full items-center justify-center py-5'
                    >
                        <img src={animeImage} className='h-20 w-20 rounded-full border-[10px]' />
                        <p>{profile.username}</p>
                        <p>{profile.email}</p>
                    </motion.div>
                )}
                {closeProfile ? <IoMdArrowDropup className='text-gray-800' onClick={() => handleCloseOpen(false)} /> : <IoMdArrowDropdown className='text-gray-800' onClick={() => handleCloseOpen(true)} />}
            </div>}

           
            <div className={`w-full h-full p-10 ${open && 'ml-[20em]'}`}>
                {section === "tracking" && <YourAnime/>}
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
