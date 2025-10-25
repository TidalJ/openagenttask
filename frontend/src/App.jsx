import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './page/Home';
import Login from './page/Login';
import Console from './page/Console';
import Contact from './page/Contact';
import ThankYou from './page/ThankYou';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Console' element={<Console />} />
          <Route path='/thank-you' element={<ThankYou />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
