import React, { useContext } from 'react'
import { BasketContext } from '../../context/basketContext';

const Basket = () => {
  const{basket,setBasket}=useContext(BasketContext);
  return (
    <div>Basket</div>
  )
}

export default Basket