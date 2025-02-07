import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Routes, Route, BrowserRouter, Outlet} from "react-router-dom"
import AddDetails from './components/User/Subscription/AddDetails'
import Payment from './components/User/Subscription/Payment'
import Order from './components/User/Home/Order'
import Account from './components/User/Home/Account'
import SubscriptionCalender from './components/User/Home/SubscriptionCalender'
import Navbar from './Pages/User/Navbar'
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
import OverallHome from './Pages/User/OverallHome'
import ChefOrderList from './Pages/Admin/ChefOrderList';
import AdminOrderList from './Pages/Admin/AdminOrderList';
import PaymentCart from './components/User/Home/PaymentCart';
import EliteCombo from './components/User/Subscription/EliteCombo';
import FeedItems from './Pages/Admin/FeedItems';
import SubscriptionPlan from './components/User/OverallHome/SubscriptionPlan';
import ContactUs from './components/User/OverallHome/ContactUs';
import LicenseContent from './components/User/OverallHome/LicenseContent';
import IdeasToImprove from './components/User/OverallHome/IdeasToImprove';
import Vision from './components/User/OverallHome/Vision';
import SignIn from './components/User/OverallHome/SignIn';
import MoneyTransfer from './components/User/Subscription/MoneyTransfer';
import BudgetCombo from './components/User/Subscription/BudgetCombo';
import FeedItemsOption from './components/Admin/FeedItems/FeedItemsOption';
import IndividualPackBreakfastBudget from './components/User/Subscription/IndividualPackBreakfastBudget';
import IndividualPackLunchBudget from './components/User/Subscription/IndividualPackLunchBudget';
import IndividualPackDinnerBudget from './components/User/Subscription/IndividualPackDinnerBudget';
import IndividualPackBreakfastElite from './components/User/Subscription/IndividualPackBreakfastElite';
import IndividualPackLunchElite from './components/User/Subscription/IndividualPackLunchElite';
import IndividualPackDinnerElite from './components/User/Subscription/IndividualPackDinnerElite';
import UserSidebar from './Pages/User/UserSidebar';
import Wallet from './components/User/Home/Wallet';
import Notification from './components/User/Home/Notification';


const App = () => {
  return (
   <> 
   <BrowserRouter> 
   <Routes> 
   <Route index element={< OverallHome/>}/>
    <Route path='user' element={<Outlet/> }> 
    <Route path='subscription' element={<Subscription/>}/>
    <Route path='AddDetails' element={< AddDetails/>}/>
    <Route path='Payment' element={< Payment/>}/>
    <Route path='Home' element={< Home/>}/>
    <Route path='Navbar' element={< Navbar/>}/>
    <Route path='Order' element={<Order/>} />
    <Route path='Account' element={< Account/>} />
    <Route path='Cart' element={<Cart/>}/>
    <Route path='SubscriptionCalender' element={< SubscriptionCalender/>}/>
    <Route path='MenuAddon' element={<MenuAddon/>}/>
    <Route path='LoginPopup' element={< LoginPopup />}/>
    <Route path='IndividualPackBreakfastBudget' element={<IndividualPackBreakfastBudget />}/>
    <Route path='IndividualPackLunchBudget' element={<IndividualPackLunchBudget />} />
    <Route path='IndividualPackDinnerBudget' element={<IndividualPackDinnerBudget />} />
    <Route path='IndividualPackBreakfastElite' element={<IndividualPackBreakfastElite />} />
    <Route path='IndividualPackLunchElite' element={<IndividualPackLunchElite  />}/>
    <Route path='IndividualPackDinnerElite' element={<IndividualPackDinnerElite  />} />
    <Route path='PaymentCart'  element={< PaymentCart />}   />
    <Route path='EliteCombo'  element={<EliteCombo />} /> 
    <Route path='BudgetCombo' element={< BudgetCombo/>}/> 
    <Route path='SubscriptionPlan' element={< SubscriptionPlan />}/>
    <Route path='ContactUs'  element={< ContactUs />} />
    <Route path='LicenseContent' element={< LicenseContent />} />
    <Route path='IdeasToImprove' element= {< IdeasToImprove/> } />     
    <Route path='Vision' element={<Vision/>} />
    <Route path='SignIn'  element={<SignIn />} />
    <Route path='MoneyTransfer' element={< MoneyTransfer />} />
    <Route path='UserSidebar' element={< UserSidebar  />} />
    <Route path='Wallet' element={< Wallet  />}/>
    <Route path='Notification' element={< Notification />} /> 
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
      <Route path='cheforderlist' element={<ChefOrderList/>}/>
      <Route path='adminorderlist' element={< AdminOrderList/>}/>  
      <Route path='feeditem' element={<FeedItems  />}/>   
      <Route path='feeditemoption' element={< FeedItemsOption/>}/> 
    </Route>
   </Routes>
   </BrowserRouter>  
   
   </>
  )
}

export default App

