import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/products.tsx';
import Clients from './pages/clients.tsx';
import Suppliers from './pages/suppliers.tsx';
import Categories from './pages/categories.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/clients' element={<Clients />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Products />} />
        </Routes>
        <Routes>
          <Route path='/categories' element={<Categories />} />
        </Routes>
        <Routes>
          <Route path='/suppliers' element={<Suppliers />} />
        </Routes>
        <Routes>
          <Route path='/products' element={<Products />} />
        </Routes>

      </main>
    </BrowserRouter>
  </React.StrictMode>,
)
