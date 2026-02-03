import './App.css'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './LandingPage.jsx'
import Verification from './Verification.jsx'
import ProfileCreation from './ProfileCreation.jsx'
import MatchingScreen from './MatchingScreen.jsx'
import ChatRoom from './ChatRoom.jsx'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/verification' element={<Verification/>}/>
      <Route path='/create-profile' element={<ProfileCreation/>}/>
      <Route path='/matching' element={<MatchingScreen/>}/>
      <Route path='/chat' element={<ChatRoom/>}/>
    </Routes>
      
    </>
  )
}

export default App
