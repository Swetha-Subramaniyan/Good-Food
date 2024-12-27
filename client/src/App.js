import React from 'react'
import {Routes, Route, BrowserRouter, Outlet} from "react-router-dom"
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
import AdminSidebar from './Pages/Admin/AdminSidebar'
import ListItem from './Pages/Admin/ListItem'
import OrderList from './Pages/Admin/OrderList'
import Cart from './components/User/Home/Cart'
import MenuAddon from './components/User/Home/MenuAddon'
import DailyMenu from './Pages/Admin/DailyMenu'
import SubscriptionMenuList from './Pages/Admin/SubscriptionMenuList'
import SubscribedUsers from './Pages/Admin/SubscribedUsers'
import LoginPopup from './components/User/Login/LoginPopup'



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
    <Route path='Cart' element={<Cart/>}/>
    <Route path='SubscriptionCalender' element={< SubscriptionCalender/>}/>
    <Route path='MenuAddon' element={<MenuAddon/>}/>
    <Route path='LoginPopup' element={< LoginPopup/>}/>
  
    
    </Route>
   </Routes>

   <Routes> 
    <Route path='admin' element={<Outlet/>}>
      <Route path='addsubscription' element={<AddSubscription/>}/> 
      <Route path='addmenuitems' element={< AddMenuItems/>}/>
      <Route path='adminsidebar' element={<AdminSidebar />}/>
      <Route path='listitem' element={<ListItem/>}/>
      <Route path='orderlist' element={<OrderList/>}/>
      <Route path='dailymenu' element={<DailyMenu/>}/>
      <Route path='subscriptionmenulist' element={<SubscriptionMenuList />}/>
      <Route path='subscribedusers' element={<SubscribedUsers/>}/>
 
      
    </Route>
   </Routes>
   </BrowserRouter>
  
   </>
  )
}

export default App
