import { Link } from 'react-router-dom';
import YourAnime from './YourAnime';
import animeImage from '../../assets/jema_lh_081_05.jpg'
// import axios from 'axios'
// import { useEffect, useState } from 'react';

const Dashboard = ({section}:any) => {
    // const [profile, setProfile] = useState( )
    // useEffect(() => {
    //     const getProfile =async() => {
    //         const response = await axios.get('')
    //     }
    //     getProfile()
    // },[])
    return (
    <div>
        <div className="w-[100%] items-center justify-center flex font-Caveat_Brush">
            <div className="w-[20em] h-full bg-gray-100 z-10 shadow-md shadow-gray-300 flex flex-col items-center justify-center fixed left-0 top-0 p-5">
                <div className="background h-[6em] rounded-lg flex items-center justify-center absolute w-[17.5em] top-5">
                    <p className='text-5xl text-white'><Link to ='/'>Anical</Link></p>
                </div>
                <div className='w-full text-xl bg-gray-100 rounded-md text-center'>
                    <p className={`hover:bg-blue-100 hover:text-black py-5 rounded-md cursor-pointer border-b-2 border-white ${section === "tracking" && 'bg-blue-500 text-white hover:bg-blue-500 hover:text-white'}`}><Link to={"/dashboard/tracking"}>Tracking</Link></p>
                    <p className ={`hover:bg-blue-100 hover:text-black py-5 rounded-md cursor-pointer border-t-2 border-white ${section === "profile" && 'bg-blue-500 text-white hover:bg-blue-500 hover:text-white'}`}><Link to={"/dashboard/profile"}>Profile</Link></p>
                </div>
                <div className='flex-col h-[10em] w-[17.5em] rounded-md absolute bottom-5 flex items-center justify-center'>
                    <img src={animeImage} className='h-20 w-20 rounded-full border-[10px]'/>
                    <p>Okaforchidubem7</p>
                    <p>okaforchidubem7@gmail.com</p>
                </div>
            </div>
            <div className='w-full h-full ml-[20em] p-10 cursor-pointer'>
                {section === "tracking" && <YourAnime/>}
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
