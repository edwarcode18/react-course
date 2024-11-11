import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context';
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import NotFound from '../NotFound';
import SingIn from '../SingIn';
import Navbar from '../../Components/Navbar'
import Layout from '../../Components/Layout';
import CheckoutSideMenu from '../../Components/CheckoutSideMenu';
import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/category/:category', element: <Home /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sing-in', element: <SingIn /> },
    { path: '/*', element: <NotFound /> },
  ])

  return routes;
}

const App = () => {

  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <Navbar />
        <Layout>
          <AppRoutes />
        </Layout>
        <CheckoutSideMenu />
      </ShoppingCartProvider>
    </BrowserRouter>
  )
}

export default App
