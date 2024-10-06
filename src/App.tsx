import './App.css'
import HomeApp from '../src/app/HomeApp'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { isLoggedInContext, isSearchContext } from './contexts/AllContexts'
import axios from 'axios'
import Show from './components/Show/Show';
import Dashboard from './components/Dashboard/Dashboard';
import Search from './components/Search/Search';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const  [showSearch, setShowSearch] = useState<boolean>(false)

  const apiUrl: string = import.meta.env.VITE_SERVER_URL;


  useEffect(() => {
   (async() => {
     try {
      const response = await axios.get(`${apiUrl}/api/v1/checkAuth`,{
        withCredentials: true,
      })
      if(response.status === 200) {
        setIsLoggedIn(true)
        console.log(response)
      }
     } catch (error: any) {
      if(error.status === 401) {
        setIsLoggedIn(false)
      } else {
        console.error(error)
      }
     }
   })()
  },[])

  return (
    <div className='font-Caveat_Brush'>
      <isSearchContext.Provider value={{showSearch, setShowSearch}}>
      <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomeApp />} />
            <Route path="/show/:name" element={<Show />} />
            {isLoggedIn && <Route path="/dashboard/tracking"  element={<Dashboard section={"tracking"}/>}/>}
            {isLoggedIn && <Route path="/dashboard/profile"  element={<Dashboard section={"profile"}/>}/>}
          </Routes>
          {showSearch && <Search/>}
        </Router>
      </isLoggedInContext.Provider>
      </isSearchContext.Provider>
    </div>
  )
}

export default App
