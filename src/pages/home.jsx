import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import HealthArticles from '@/components/HealthArticles';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import MedicalStore from '@/components/Medstore';
import Link from 'next/link';
 // Your medical store component

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home'); // Track current page

  // Render different pages based on currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'store':
        return <MedicalStore />;
      case 'home':
      default:
        return (
          <>
            <main>
              <Hero />
              <Services />
              <HealthArticles />
              <FAQ />
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header is always visible */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Render current page */}
      {renderPage()}
    </div>
  );
};

export default Index;
