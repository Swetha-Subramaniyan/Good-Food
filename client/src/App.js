import React from 'react'
import {Routes, Route, BrowserRouter, Outlet} from "react-router-dom"
// import Login from './pages/User/Login'
// import Subscription from './pages/User/Subscription'
// import Home from './pages/User/Home'
// import Navbar from './pages/User/Navbar'
import IndividualPack from './components/User/Subscription/IndividualPack'
import AddDetails from './components/User/Subscription/AddDetails'
import Payment from './components/User/Subscription/Payment'
import Order from './components/User/Home/Order'
import Account from './components/User/Home/Account'
import SubscriptionCalender from './components/User/Home/SubscriptionCalender'
import Navbar from './Pages/User/Navbar'
import Login from './Pages/User/Login'
import Home from './Pages/User/Home'
import Subscription from './Pages/User/Subscription'
import AddSubscription from './Pages/Admin/AddSubscription'
import AddMenuItems from './Pages/Admin/AddMenuItems'


const App = () => {
  return (
   <> 
   <BrowserRouter> 
   <Routes> 
   <Route index element={<Login />}/>
    <Route path='user' element={<Outlet/> }> 
    <Route path='subscription' element={<Subscription/>}/>
    <Route path='IndividualPack' element={<IndividualPack />}/>
    <Route path='AddDetails' element={< AddDetails/>}/>
    <Route path='Payment' element={< Payment/>}/>
    <Route path='Home' element={< Home/>}/>
    <Route path='Navbar' element={< Navbar/>}/>
    <Route path='Order' element={<Order/>} />
    <Route path='Account' element={< Account/>} />
    <Route path='SubscriptionCalender' element={< SubscriptionCalender/>}/>
    </Route>
   </Routes>

   <Routes> 
    <Route path='admin' element={<Outlet/>}>
      <Route path='addsubscription' element={<AddSubscription/>}/> 
      <Route path='addmenuitems' element={< AddMenuItems/>}/>
      
    </Route>


   </Routes>
   </BrowserRouter>
  
   </>
  )
}

export default App
