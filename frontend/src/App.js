import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import HomePage from './components/body/HomePage';
import Header from './components/head/Header';
import Login from './components/loginAndRegister/Login';
import Register from './components/loginAndRegister/Register';
import ForgotPassword from './components/loginAndRegister/ForgotPassword';
import ChangePassword from './components/loginAndRegister/ChangePassword';
import Loading from './components/utils/Loading';
import { useSelector } from 'react-redux';
import ActiveMail from './components/utils/ActiveMail';
import ForgotPasswordMail from './components/utils/ForgotPasswordMail';
import ProductCreate from './components/admin/ProductCreate';
import { useRef } from 'react';
import ProductDetail from './components/products/ProductDetail';
import EditProduct from './components/admin/EditProduct';
import Cart from './components/cart/Cart';
import Please from './components/utils/Please';

function App() {
  const auth = useSelector(state => state.auth);
  const cache = useRef({});
  return (
    <Router>
      <div className="App">
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/" exact element={<HomePage cache={cache}/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/cart' element={auth?.infor ? <Cart /> : <Please />}/>
            <Route path='/product/create' element={<ProductCreate />}/>
            <Route path='/forgot_password' element={<ForgotPassword />}/>
            <Route path='/change_password' element={<ChangePassword />}/>
            <Route path='/user/active/:activetoken' element={<ActiveMail />}/>
            <Route path='/product/edit/:slug' element={<EditProduct cache={cache}/>}/>
            <Route path='/forgot/:activetoken' element={<ForgotPasswordMail />}/>
            <Route path='/:slug' element={<ProductDetail cache={cache}/>}/>
          </Routes>
        </main>
        <footer>

        </footer>
        <ToastContainer style={{fontSize:"1.3rem"}} />
        {auth.loading && <Loading />}
      </div>
    </Router>
  );
}

export default App;
