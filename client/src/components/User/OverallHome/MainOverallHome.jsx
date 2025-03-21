
import React, { useState } from "react";
import LandingPage from './LandingPage'
import Vision from './Vision'
import SubscriptionPlan from './SubscriptionPlan'
import ContactUs from './ContactUs'
import IdeasToImprove from './IdeasToImprove';
 
 
const MainOverallHome = () => {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
 
  const closeFeedbackForm = () => {
    setIsFeedbackVisible(false);
  };
 
  return (
    <>
    <LandingPage/>
    <Vision/>
    <SubscriptionPlan/>
    <ContactUs/>
   
    <IdeasToImprove
          isVisible={isFeedbackVisible}
          onClose={closeFeedbackForm}
        />
 
        <IdeasToImprove/>
    </>
   
  )
}
 
export default MainOverallHome
 