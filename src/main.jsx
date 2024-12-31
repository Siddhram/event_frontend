import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import { store } from './redux/store.js'
import Signin from './components/Signin.jsx'
import { Provider } from 'react-redux'
import Sigleevent from './components/Sigleevent.jsx'
import ForCharity from './pagesnav/ForCharity.jsx'
import ForChildevent from './pagesnav/ForChildevent.jsx'
import ForEducation from './pagesnav/ForEducation.jsx'
import ForFriends from './pagesnav/ForFriends.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<App />}></Route>

      <Route path='/sign-up' element={<Signup></Signup>}></Route>
            <Route path='/charity' element={<ForCharity></ForCharity>}></Route>
            <Route path='/children' element={<ForChildevent></ForChildevent>}></Route>
            <Route path='/education' element={<ForEducation></ForEducation>}></Route>
            <Route path='/friends' element={<ForFriends></ForFriends>}></Route>

      <Route path='/sign-in' element={<Signin></Signin>}></Route>
      <Route path='/:id' element={<Sigleevent></Sigleevent>}></Route>

     </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)