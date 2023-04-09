import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = uniqueId => {
    if (uniqueId === undefined) {
      this.setState({cartList: []})
    } else {
      const {cartList} = this.state
      const filterList = cartList.filter(eachItem => eachItem.id !== uniqueId)
      this.setState({cartList: filterList})
    }
  }

  removeZeroQuantityItem = () => {
    const {cartList} = this.state
    if (cartList.length > 0) {
      const cartListFilter = cartList.filter(eachItem => eachItem.quantity > 0)
      this.setState({cartList: cartListFilter})
    }
  }

  decrementCartItemQuantity = uniqueId => {
    const {cartList} = this.state

    if (cartList.length > 0) {
      const decreaseCartQuantity = cartList.map(each => {
        if (each.id === uniqueId) {
          const quantity = each.quantity - 1
          return {...each, quantity}
        }
        return each
      })
      this.setState(
        {cartList: decreaseCartQuantity},
        this.removeZeroQuantityItem,
      )
    }
  }

  incrementCartItemQuantity = uniqueId => {
    const {cartList} = this.state
    if (cartList.length > 0) {
      const increaseCartQuantity = cartList.map(each => {
        if (each.id === uniqueId) {
          const quantity = each.quantity + 1
          return {...each, quantity}
        }
        return each
      })
      this.setState({cartList: increaseCartQuantity})
    }
  }

  addCartItem = product => {
    const {cartList} = this.state

    if (cartList.length === 0) {
      this.setState({cartList: [product]})
    } else {
      const isProductExits = cartList.filter(each => each.id === product.id)
      if (isProductExits.length > 0) {
        const changeInExistingList = cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            const quantity = eachItem.quantity + product.quantity
            return {...eachItem, quantity}
          }
          return eachItem
        })
        this.setState({cartList: changeInExistingList})
      } else {
        const newListWithPrev = [...cartList, product]
        this.setState({cartList: newListWithPrev})
      }
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
