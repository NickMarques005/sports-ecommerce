import React, {useEffect, createContext, useContext, useReducer} from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type)
    {
        case "ADD":
            const cartIncremented = [...state, action.item];
            console.log(cartIncremented);
            return cartIncremented;
        case "SET":
            const setCart = action.cart;
            console.log(setCart);
            return setCart;
        case "REMOVE":
            const newCart = [...state];
            newCart.splice(action.index, 1);
            console.log(newCart);
            return newCart;
        default:
            console.log("Error Reducer");
            return state;
        }
}

export const CartProvider =(({children}) => {
    const [state,dispatch] = useReducer(reducer,[]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        dispatch({type:'SET', cart: savedCart});
        console.log("CART: ", savedCart);
    }, []);

    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
});

export const useCart = () => useContext(CartStateContext);

export const useDispatchCart = () => useContext(CartDispatchContext);