import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { MediaDetail } from './pages/MediaDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Movies } from './pages/Movies';
import { TVShows } from './pages/TVShows';
import { Search } from './pages/Search';
import { AvisoLegal } from './pages/legal/AvisoLegal';
import { Privacidad } from './pages/legal/Privacidad';
import { Cookies } from './pages/legal/Cookies';
import { Contratacion } from './pages/legal/Contratacion';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:type/:id" element={<MediaDetail />} />
            <Route path="/legal/aviso-legal" element={<AvisoLegal />} />
            <Route path="/legal/privacidad" element={<Privacidad />} />
            <Route path="/legal/cookies" element={<Cookies />} />
            <Route path="/legal/contratacion" element={<Contratacion />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;