import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Home } from '@/pages/Home';
import { ProductoDetalle } from '@/pages/ProductoDetalle';
import { Categoria } from '@/pages/Categoria';
import { Login } from '@/pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#fff',
              color: '#1f2937',
              border: '1px solid #e5e7eb',
            },
          }}
        />
        
        <Routes>
          {/* Login page without header/footer */}
          <Route path="/login" element={<Login />} />
          
          {/* All other pages with header/footer */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <main className="pt-[140px] md:pt-[160px]">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/producto/:id" element={<ProductoDetalle />} />
                    <Route path="/categoria/:id" element={<Categoria />} />
                    <Route path="/productos" element={<Categoria />} />
                    <Route path="/ofertas" element={<Categoria />} />
                    <Route path="/categorias" element={<Categoria />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
