import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../views/Login'
import { Chat } from '../views/Chat'

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}/>

            <Route path='/chat' element={<Chat/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter