import React from 'react';
//component
import Header from './components/Header';
import Footer from './components/Footer';
//pages 
import Market from './pages/Market';

const App = () => {
    return (
        <div>
            <Header/>
            <Market/>
            <Footer/>
        </div>
    );
};

export default App;