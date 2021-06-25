import React, {useContext, useEffect, useState} from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css' 

const HeaderCartButton = (props) => {
    const [buttonIsHighlighted, setButtonIsHighLighted] = useState(false)
    const cartCtx = useContext(CartContext)

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
        }, 0)

        const { items } = cartCtx

        const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`

        // Use Effect to make the button bump after item is added
        useEffect(() => {
            // Make sure at least one item is ordered or quit
            if (items.length === 0) {
                return
            } 
            // Add the highlighted state then remove it after time runs out
            setButtonIsHighLighted(true)
            const timer = setTimeout(() => {
                setButtonIsHighLighted(false)
            }, 300)
            // Clean up function to clear timer
            return () => {
                clearTimeout(timer)
            }
        }, [items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
