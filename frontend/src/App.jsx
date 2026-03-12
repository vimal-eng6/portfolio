import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
        <Navbar />
        <main className="flex-grow pt-16">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
