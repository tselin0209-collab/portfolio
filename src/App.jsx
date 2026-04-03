import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Works from './pages/Works';
import WorkDetail from './pages/WorkDetail';
import About from './pages/About';
import ClickSpark from './components/ClickSpark';

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const isWorkDetail = /^\/works\/.+/.test(location.pathname);

  return (
    <div className="page-layout">
      {isWorkDetail && <Nav />}
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:id" element={<WorkDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      {!isHome && !isAbout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Layout />
      </ClickSpark>
    </BrowserRouter>
  );
}
