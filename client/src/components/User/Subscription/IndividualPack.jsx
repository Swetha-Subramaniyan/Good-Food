// import React from 'react'
// import '../Subscription/IndividualPack.css'
// import { IoSunnyOutline } from "react-icons/io5";
// import { IoPartlySunnyOutline } from "react-icons/io5";
// import { MdOutlineModeNight } from "react-icons/md";
// import idly from '../../assets/idly.jpg'
// import dosa from '../../assets/dosa.webp'
// import rice from '../../assets/Rice.jpg'
// import biriyani from '../../assets/biriya.jpg'
// import chappathi from '../../assets/chappathi.jpg'
// import pongal from '../../assets/pongal.jpg'


// const IndividualPack = () => {
//   return (
//     <>

//     <div className='breakfast'> 
//             <div> <IoPartlySunnyOutline /> Breakfast <br/> 8:00 AM - 11:00AM </div>
//             <div> <IoSunnyOutline /> Lunch <br/> 11:00 AM - 3:00AM  </div>
//             <div>  <MdOutlineModeNight /> Dinner <br/> 3:00 AM - 7:00AM </div> 
//     </div>
//     <div className='photo'> 
//     <div> 
//     <img src={idly} alt='idly'/><br/> 
//     <h3> Idly+chutney+sambar <br/> Star Ratings</h3>
//     <div className='add'> 
//     <button> Rs.80</button><button style={{marginLeft:'7rem'}} > Add </button> </div> 
//     </div>
//     <div> 
//     <img src={pongal} alt='dosa'/><br/> 
//     <h3> Pongal+sambar+vada <br/> Star Ratings</h3>
//     <div className='add'> 
//     <button> Rs.80</button><button style={{marginLeft:'7rem'}}> Add</button>  </div> 
//     </div>


//     <div> 
//     <img src={rice} alt='idly'/><br/> 
//     <h3> White Rice + Chicken gravy <br/> Star Ratings</h3>
//     <div className='add'> 
//     <button> Rs.80</button><button style={{marginLeft:'7rem'}} > Add </button> </div> 
//     </div>
//     <div> 
//     <img src={biriyani} alt='dosa'/><br/> 
//     <h3> Chicken Biriyani <br/> Star Ratings</h3>
//     <div className='add'> 
//     <button> Rs.80</button><button style={{marginLeft:'7rem'}}> Add</button>  </div> 
//     </div>



//     <div> 
//     <img src={chappathi} alt='idly'/><br/> 
//     <h3> Chappathi + chicken gravy <br/> Star Ratings</h3>
//     <div className='add'> 
//     <button> Rs.80</button><button style={{marginLeft:'7rem'}} > Add </button> </div> 
//     </div>
//     <div> 
//     <img src={dosa} alt='dosa'/><br/> 
//     <h3> Dosa+chutney+sambar <br/> Star Ratings</h3>
//     <div className='add'> 
//     <button> Rs.80</button><button style={{marginLeft:'7rem'}}> Add</button>  </div> 
//     </div>




//     </div>
//     </>
    
//   )
// }

// export default IndividualPack





import React from 'react';
import './IndividualPack.css';
import { IoSunnyOutline } from "react-icons/io5";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { MdOutlineModeNight } from "react-icons/md";
import idly from '../../../assets/idly.jpg'
import rice from '../../../assets/Rice.jpg'
import biriyani from '../../../assets/biriya.jpg'
import chappathi from '../../../assets/chappathi.jpg'
import pongal from '../../../assets/pongal.jpg'
import StarRatings from '../Home/StarRatings';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const IndividualPack = () => {

  const [addedItems, setAddedItems] = useState({
    idly: false,
    pongal: false,
    rice: false,
    biriyani: false,
    chappathi: false,
  });


  const handleAddClick = (item) => {
    setAddedItems(prevState => ({
      ...prevState,
      [item]: !prevState[item], 
    }));
  };

  return (
    <> 
    <div className='backgrd'> 
    <Link to={'/user/Payment'}> 
  <div className='sub-add'> <button> SUBSCRIBE</button></div></Link>
    <div className='listt'>Choose your Subscription Plans </div>
    <br/><br/>
  
  <div className='days'> 
    <div> 1 Day - ₹250</div> 
    <div> 15 Days - ₹3375 </div>
    <div> 30 Days - ₹6000 </div>

  </div>

  <div className='break'> 
            <div className='breakfast-outt'> <IoPartlySunnyOutline/><span className='fastt'> Breakfast </span>Order before 11:00AM </div>         
  </div>

  <div className='photo'> 
  <div> 
    <img src={idly} alt='idly'/><br/> 
    <h4> Idly+chutney+sambar <br/> <StarRatings/></h4>
    <div className='add'> 
    <button > Add </button> </div> 
  </div>
  <div> 
    <img src={pongal} alt='dosa'/><br/> 
    <h4> Pongal+sambar+vada <br/>  <StarRatings/></h4>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={rice} alt='idly'/><br/> 
    <h4> Rice + Chicken gravy <br/>  <StarRatings/></h4>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>
  <div> 
    <img src={biriyani} alt='dosa'/><br/> 
    <h4> Chicken Biriyani <br/>  <StarRatings/></h4>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={pongal} alt='dosa'/><br/> 
    <h4> Pongal+sambar+vada <br/>  <StarRatings/></h4>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={rice} alt='idly'/><br/> 
    <h4>Rice + Chicken gravy <br/>  <StarRatings/></h4>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>

  <div> 
    <img src={chappathi} alt='idly'/><br/> 
    <h4> Chappathi  <br/>  <StarRatings /></h4>
    <div className='add'> 
    <button onClick={() => handleAddClick('chappathi')}> 
              {addedItems.chappathi ? 'Added' : 'Add'} 
              {addedItems.chappathi && '+'} 
            </button>
     </div> 
    </div>
    </div>


    <div className='break'> 
            
            <div className='breakfast-outt'> <IoSunnyOutline /><span className='fastt'> Lunch </span>   Order before 3:00AM  </div>
            
  </div>

  <div className='photo'> 
  <div> 
    <img src={idly} alt='idly'/><br/> 
    <h4> Idly+chutney+sambar <br/> <StarRatings/></h4>
    <div className='add'> 
    <button > Add </button> </div> 
  </div>
  <div> 
    <img src={pongal} alt='dosa'/><br/> 
    <h4> Pongal+sambar+vada <br/>  <StarRatings/></h4>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={rice} alt='idly'/><br/> 
    <h4> Rice + Chicken gravy <br/>  <StarRatings/></h4>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>
  <div> 
    <img src={biriyani} alt='dosa'/><br/> 
    <h4> Chicken Biriyani <br/>  <StarRatings/></h4>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={pongal} alt='dosa'/><br/> 
    <h4> Pongal+sambar+vada <br/>  <StarRatings/></h4>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={rice} alt='idly'/><br/> 
    <h4>Rice + Chicken gravy <br/>  <StarRatings/></h4>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>

  <div> 
    <img src={chappathi} alt='idly'/><br/> 
    <h4> Chappathi  <br/>  <StarRatings /></h4>
    <div className='add'> 
    <button onClick={() => handleAddClick('chappathi')}> 
              {addedItems.chappathi ? 'Added' : 'Add'} 
              {addedItems.chappathi && '+'} 
            </button>
     </div> 
    </div>
    </div>




    <div className='break'> 
      
            <div className='breakfast-outt'>  <MdOutlineModeNight /> <span className='fastt'> Dinner </span> Order before 7:00PM </div> 
  </div>

  <div className='photo'> 
  <div> 
    <img src={idly} alt='idly'/><br/> 
    <h4> Idly+chutney+sambar <br/> <StarRatings/></h4>
    <div className='add'> 
    <button > Add </button> </div> 
  </div>
  <div> 
    <img src={pongal} alt='dosa'/><br/> 
    <h4> Pongal+sambar+vada <br/>  <StarRatings/></h4>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={rice} alt='idly'/><br/> 
    <h4> Rice + Chicken gravy <br/>  <StarRatings/></h4>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>
  <div> 
    <img src={biriyani} alt='dosa'/><br/> 
    <h4> Chicken Biriyani <br/>  <StarRatings/></h4>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={pongal} alt='dosa'/><br/> 
    <h4> Pongal+sambar+vada <br/>  <StarRatings/></h4>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={rice} alt='idly'/><br/> 
    <h4>Rice + Chicken gravy <br/>  <StarRatings/></h4>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>

  <div> 
    <img src={chappathi} alt='idly'/><br/> 
    <h4> Chappathi  <br/>  <StarRatings /></h4>
    <div className='add'> 
    <button onClick={() => handleAddClick('chappathi')}> 
              {addedItems.chappathi ? 'Added' : 'Add'} 
              {addedItems.chappathi && '+'} 
            </button>
     </div> 
    </div>
    </div>









    </div>
  

    </>
  )
}

export default IndividualPack
