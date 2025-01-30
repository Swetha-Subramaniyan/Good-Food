// import React from 'react';
// import './MenuAddon.css';
// import Typography from '@mui/material/Typography';
// import MainNavbar from '../Navbar/MainNavbar';
// import Footer from './Footer';
// import FoodCard from './FoodCard';
// import idlyImage from '../../../assets/idly.jpg';
// import dosaImage from '../../../assets/dosa.webp';

// const MenuAddon = () => {
//   return (
//     <>
//       <MainNavbar />
//       <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px', marginTop: '2rem', fontWeight:'bold' }}>
   
//         List of Items for Add-Ons
//       </Typography>

// <div className="foodcard-column">
//   <FoodCard
//     image={idlyImage}
//     name="Idly+Chutney+Sambar"
//     description="(40 grams) contains 120, 3.7 grams of total fat, 1.3 grams of saturated fat."
//     localStorageKey="idlyQuantity"
//   />
//   <FoodCard
//     image={dosaImage}
//     name="Dosa+Chutney+Sambar+Dosa"
//     description="(80 grams) contains 200, 8 grams of total fat, 2 grams of saturated fat."
//     localStorageKey="dosaQuantity"
//   />
//   <FoodCard
//     image={idlyImage}
//     name="Idly+Chutney+Sambar"
//     description="(40 grams) contains 120, 3.7 grams of total fat, 1.3 grams of saturated fat."
//     localStorageKey="idlyQuantity"
//   />
//   <FoodCard
//     image={dosaImage}
//     name="Dosa+Chutney+Sambar"
//     description="(80 grams) contains 200, 8 grams of total fat, 2 grams of saturated fat."
//     localStorageKey="dosaQuantity"
//   />

// <FoodCard
//     image={idlyImage}
//     name="Idly+Chutney+Sambar"
//     description="(40 grams) contains 120, 3.7 grams of total fat, 1.3 grams of saturated fat."
//     localStorageKey="idlyQuantity"
//   />
//   <FoodCard
//     image={dosaImage}
//     name="Dosa+Chutney+Sambar"
//     description="(80 grams) contains 200, 8 grams of total fat, 2 grams of saturated fat."
//     localStorageKey="dosaQuantity"
//   />
// </div>
//       <Footer />
//     </>
//   );
// };

// export default MenuAddon;


// import React, { useState, useEffect } from 'react';
// import './MenuAddon.css';
// import Typography from '@mui/material/Typography';
// import MainNavbar from '../Navbar/MainNavbar';
// import Footer from './Footer';
// import FoodCard from './FoodCard';
// import idlyImage from '../../../assets/idly.jpg';
// import dosaImage from '../../../assets/dosa.webp';

// const MenuAddon = () => {
//   const [addedItems, setAddedItems] = useState({});

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const initialState = {};
//     storedItems.forEach(item => {
//       initialState[item.name] = item.quantity;
//     });
//     setAddedItems(initialState);
//   }, []);

//   const handleQuantityChange = (item, operation) => {
//     setAddedItems(prevState => {
//       const newQuantity =
//         operation === 'increment'
//           ? (prevState[item] || 0) + 1
//           : Math.max((prevState[item] || 0) - 1, 0);

//       let storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//       let updatedItems = storedItems.map(cartItem =>
//         cartItem.name === item
//           ? { ...cartItem, quantity: newQuantity, totalPrice: newQuantity * cartItem.price }
//           : cartItem
//       ).filter(cartItem => cartItem.quantity > 0);

//       localStorage.setItem('cartItems', JSON.stringify(updatedItems));

//       return { ...prevState, [item]: newQuantity };
//     });
//   };

//   const handleAddToCart = (item) => {
//     const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const existingItem = storedItems.find(cartItem => cartItem.name === item.name);

//     if (existingItem) {
//       existingItem.quantity += 1;
//       existingItem.totalPrice = existingItem.quantity * existingItem.price;
//     } else {
//       storedItems.push({ ...item, quantity: 1, totalPrice: item.price });
//     }

//     localStorage.setItem('cartItems', JSON.stringify(storedItems));

//     setAddedItems(prevState => ({
//       ...prevState,
//       [item.name]: (prevState[item.name] || 0) + 1,
//     }));
//   };

//   const items = [
//     { name: 'Idly', image: idlyImage, description: 'Idly+Chutney+Sambar', price: 30 },
//     { name: 'Dosa', image: dosaImage, description: 'Dosa+Chutney+Sambar', price: 40 },
//     { name: 'Idly Combo', image: idlyImage, description: 'Idly+Chutney+Sambar', price: 30 },
//     { name: 'Dosa Special', image: dosaImage, description: 'Dosa+Chutney+Sambar', price: 40 }
//   ];

//   return (
//     <>
//       <MainNavbar />
//       <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px', marginTop: '2rem', fontWeight: 'bold' }}>
//         List of Items for Add-Ons
//       </Typography>

//       <div className="foodcard-column">
        // {items.map(item => (
        //   <div key={item.name} className="food-card">
        //     <img src={item.image} alt={item.name} />
        //     <h4>{item.description}</h4>
        //     <p>₹{item.price}</p>

            

        //     <div className='add'>
        //       {addedItems[item.name] > 0 ? (
        //         <div className="quantity-container">
        //           <button onClick={() => handleQuantityChange(item.name, 'decrement')}>-</button>
        //           <span>{addedItems[item.name]}</span>
        //           <button onClick={() => handleQuantityChange(item.name, 'increment')}>+</button>
        //         </div>
        //       ) : (
        //         <button onClick={() => handleAddToCart(item)}>Add</button>
        //       )}
        //     </div>
        //   </div>
        // ))}
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default MenuAddon;






// import React, { useState, useEffect } from 'react';
// import './MenuAddon.css';
// import Typography from '@mui/material/Typography';
// import MainNavbar from '../Navbar/MainNavbar';
// import Footer from './Footer';
// import FoodCard from './FoodCard';
// import idlyImage from '../../../assets/idly.jpg';
// import dosaImage from '../../../assets/dosa.webp';

// const MenuAddon = () => {
//   const [addedItems, setAddedItems] = useState({});

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const initialState = {};
//     storedItems.forEach(item => {
//       initialState[item.name] = item.quantity;
//     });
//     setAddedItems(initialState);
//   }, []);

//   const handleQuantityChange = (itemName, operation) => {
//     setAddedItems(prevState => {
//       const newQuantity =
//         operation === 'increment'
//           ? (prevState[itemName] || 0) + 1
//           : Math.max((prevState[itemName] || 0) - 1, 0);

//       let storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//       let updatedItems = storedItems.map(cartItem =>
//         cartItem.name === itemName
//           ? { ...cartItem, quantity: newQuantity, totalPrice: newQuantity * cartItem.price }
//           : cartItem
//       ).filter(cartItem => cartItem.quantity > 0);

//       localStorage.setItem('cartItems', JSON.stringify(updatedItems));

//       return { ...prevState, [itemName]: newQuantity };
//     });
//   };

//   const handleAddToCart = (item) => {
//     const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const existingItem = storedItems.find(cartItem => cartItem.name === item.name);

//     if (existingItem) {
//       existingItem.quantity += 1;
//       existingItem.totalPrice = existingItem.quantity * existingItem.price;
//     } else {
//       storedItems.push({ ...item, quantity: 1, totalPrice: item.price });
//     }

//     localStorage.setItem('cartItems', JSON.stringify(storedItems));

//     setAddedItems(prevState => ({
//       ...prevState,
//       [item.name]: (prevState[item.name] || 0) + 1,
//     }));
//   };

//   const menuItems = [
//     { name: 'Idly+Chutney+Sambar', image: idlyImage, description: '(40 grams) contains 120, 3.7 grams of total fat, 1.3 grams of saturated fat.', price: 30 },
//     { name: 'Dosa+Chutney+Sambar+Dosa', image: dosaImage, description: '(80 grams) contains 200, 8 grams of total fat, 2 grams of saturated fat.', price: 40 }
//   ];

//   return (
//     <>
//       <MainNavbar />
//       <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px', marginTop: '2rem', fontWeight: 'bold' }}>
//         List of Items for Add-Ons
//       </Typography>

//       <div className="foodcard-column">
//         {menuItems.map(item => (
//           <FoodCard
//             key={item.name}
//             image={item.image}
//             name={item.name}
//             description={item.description}
//             quantity={addedItems[item.name] || 0}
//             onQuantityChange={handleQuantityChange}
//             onAddToCart={() => handleAddToCart(item)}
//           />
//         ))}
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default MenuAddon;








import React, { useState, useEffect } from 'react';
import './MenuAddon.css';
import Typography from '@mui/material/Typography';
import MainNavbar from '../Navbar/MainNavbar';
import Footer from './Footer';
import FoodCard from './FoodCard';
import idlyImage from '../../../assets/idly.jpg';
import dosaImage from '../../../assets/dosa.webp';
const MenuAddon = () => {
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const initialState = {};
    storedItems.forEach(item => {
      initialState[item.name] = item.quantity;
    });
    setAddedItems(initialState);
  }, []);

  const handleQuantityChange = (itemName, operation) => {
    setAddedItems(prevState => {
      const newQuantity =
        operation === 'increment'
          ? (prevState[itemName] || 0) + 1
          : Math.max((prevState[itemName] || 0) - 1, 0);

      let storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      let updatedItems = storedItems.map(cartItem =>
        cartItem.name === itemName
          ? { ...cartItem, quantity: newQuantity, totalPrice: newQuantity * cartItem.price }
          : cartItem
      ).filter(cartItem => cartItem.quantity > 0);

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));

      return { ...prevState, [itemName]: newQuantity };
    });
  };

  const handleAddToCart = (item) => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = storedItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
      storedItems.push({ ...item, quantity: 1, totalPrice: item.price });
    }

    localStorage.setItem('cartItems', JSON.stringify(storedItems));

    setAddedItems(prevState => ({
      ...prevState,
      [item.name]: (prevState[item.name] || 0) + 1,
    }));
  };

  const items = [
    { name: 'Idly+Chutney+Sambar', image: idlyImage, description: '(40 grams) contains 120, 3.7 grams of total fat, 1.3 grams of saturated fat.', price: 30 },
    { name: 'Dosa+Chutney+Sambar+Dosa', image: dosaImage, description: '(80 grams) contains 200, 8 grams of total fat, 2 grams of saturated fat.', price: 40 }
  ];

  return (
    <>
      <MainNavbar />
      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px', marginTop: '2rem', fontWeight: 'bold' }}>
        List of Items for Add-Ons
      </Typography>

      <div className="foodcard-column">
        {items.map(item => (
          <React.Fragment key={item.name}>
            <FoodCard
              image={item.image}
              name={item.name}
              description={item.description}
              quantity={addedItems[item.name] || 0}
              onQuantityChange={handleQuantityChange}
              onAddToCart={() => handleAddToCart(item)}
            />
          </React.Fragment>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default MenuAddon;