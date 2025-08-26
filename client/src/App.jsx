import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home";
import Register from './pages/Register';
import Login from './pages/Login';
import Clothes from './pages/Clothes';
import Shoes from './components/Shoes';
import Accessories from './pages/Accessories';
import Purchase from './pages/Purchase';
import Brand from './pages/Brand';
import Dashboard from './pages/Dashboard';
import DetailProduct from './pages/DetailProduct';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/" element={<Homepage/>}/>
        <Route path="/clothes" element={<Clothes/>}/>
        <Route path="/shoes" element={<Shoes/>}/>
        <Route path="/accessories" element={<Accessories/>}/>
        <Route path="/cart" element={<Purchase/>}/>
        <Route path="/brand" element={<Brand/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/detailproduct/:id" element={<DetailProduct/>}/>
      </Routes>
    </Router>
  )
}

export default App