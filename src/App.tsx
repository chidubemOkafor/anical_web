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


  useEffect(() => {
   (async() => {
     try {
      const response = await axios.get('http://localhost:8000/api/v1/checkAuth',{
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
    <>
      <isSearchContext.Provider value={{showSearch, setShowSearch}}>
      <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomeApp />} />
            <Route path="/show/:name" element={<Show />} />
            {isLoggedIn && <Route path="/dashboard/tracking"  element={<Dashboard section={"tracking"}/>}/>}
            {isLoggedIn && <Route path="/dashboard/profile"  element={<Dashboard section={"profile"}/>}/>}
          </Routes>
        </Router>
      </isLoggedInContext.Provider>
      {showSearch && <Search/>}
      </isSearchContext.Provider>
    </>
  )
}

export default App
