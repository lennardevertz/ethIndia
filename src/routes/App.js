import { Outlet, BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Home from '../components/home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
