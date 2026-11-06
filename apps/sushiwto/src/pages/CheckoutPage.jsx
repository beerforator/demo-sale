import { CheckoutPage as SharedCheckout } from '../../../../packages/customer/index.jsx'
import { useCart } from '../context/CartContext.jsx'
import products from '../data/products.json'
import store from '../data/store.json'

export default function CheckoutPage() {
  return <SharedCheckout cart={useCart()} products={products} store={store} variant="sushiwto" />
}
