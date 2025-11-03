// src/App.jsx
import { ResumeProvider } from './context/ResumeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder';
import Navbar from './components/Navbar';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<ResumeBuilder />} />
          </Routes>
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;