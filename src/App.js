import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Products";
import Forums from "./Forums";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/products' element={<Products />} />
        <Route path='/forums' element={<Forums />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
