import {useReducer} from 'react'
import CartContext from './cart-context'

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id) 

        const existingCartItem =  state.items[existingCartItemIndex]
        
        let updatedItems
        // Check to see if meal type has already been ordered. If so add to amount for type of meal
        if (existingCartItem){
            
             const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
        // If this is the first time item of meal type is being ordered add meal type to list
             updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE') {
        
        // Find the type of meal in the array
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems
        // If only one item of the meal type is in the cart remove the meal type from list
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id)
        }
        // If there is more than one item of the meal type, remove the item but keep meal type
        else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1}
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }


    }

    return defaultCartState 
}

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item})
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: "REMOVE", id:id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider