import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeCartItem} = value
      const showEmptyView = cartList.length === 0

      const clickTORemoveAll = () => {
        removeCartItem()
      }

      const calculateCartTotal = () => {
        console.log(cartList)
        const cartMultiply = cartList.map(
          eachItem => eachItem.quantity * eachItem.price,
        )
        const reduceCartPricing = cartMultiply.reduce((a, b) => a + b)
        return (
          <div className="main-container-for-cart-total">
            <h1 className="cart-route-total-price-heading">
              Order Total:{' '}
              <span className="cart-route-total-price">
                Rs {reduceCartPricing}/-{' '}
              </span>
            </h1>
            <p className="cart-route-total-price-paragraph">
              {cartList.length} items in cart
            </p>
            <button className="cart-route-total-price-button" type="button">
              Checkout
            </button>
          </div>
        )
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  onClick={clickTORemoveAll}
                  type="button"
                  className="cart-route-remove-all-heading"
                >
                  Remove All
                </button>
                <CartListView />
                {calculateCartTotal()}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
