import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Works from './pages/Works';
import WorkDetail from './pages/WorkDetail';
import About from './pages/About';
import ClickSpark from './components/ClickSpark';

function SparkWrapper() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const sparkColor = isHome ? '#fff' : '#aaaaaa';

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Layout />
    </ClickSpark>
  );
}

function Layout() {
  const location = useLocation();

  return (
    <div className="page-layout">
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:id" element={<WorkDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SparkWrapper />
    </BrowserRouter>
  );
}
