
"use client";
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
      });
    }
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          navLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });
    window.addEventListener('scroll', function() {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    });
    // Chart functionality
    // ... puedes migrar la lógica de chart.js aquí si es necesario ...
  }, []);

  return (
    <main className="text-gray-800 font-inter">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center h-16">
            <a href="#" className="text-2xl font-bold text-blue-600">GastoÁgil</a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="nav-link active">Inicio</a>
              <a href="#problema" className="nav-link">El Problema</a>
              <a href="#solucion" className="nav-link">Solución</a>
              <a href="#beneficios" className="nav-link">Beneficios</a>
              <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Iniciar Sesión</a>
            </div>
            <button id="mobile-menu-button" className="md:hidden text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </nav>
        </div>
        <div id="mobile-menu" className="hidden md:hidden bg-white border-t">
          <a href="#inicio" className="block py-2 px-4 text-sm nav-link active">Inicio</a>
          <a href="#problema" className="block py-2 px-4 text-sm nav-link">El Problema</a>
          <a href="#solucion" className="block py-2 px-4 text-sm nav-link">Solución</a>
          <a href="#beneficios" className="block py-2 px-4 text-sm nav-link">Beneficios</a>
          <a href="/login" className="block py-2 px-4 text-sm bg-blue-50 text-blue-600 font-medium">Iniciar Sesión</a>
        </div>
      </header>
      {/* ...migrar aquí el resto del contenido de index.html, secciones, footer, etc... */}
    </main>
  );
}
