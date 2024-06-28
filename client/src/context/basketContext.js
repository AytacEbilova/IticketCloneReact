import { useState } from "react";
import { createContext } from "react";


export const BasketContext=createContext(null);

 const BasketProvider=({children})=>{
    let localBasket=JSON.parse(localStorage.getItem('basket'));
    if(!localBasket){
        localStorage.setItem("basket",JSON.stringify([]))
    }
    let[basket,setBasket]=useState(localBasket || []);
    return (
        <BasketContext.Provider value={{basket,setBasket}}>
            {children}
        </BasketContext.Provider>
    )
}

export default BasketProvider