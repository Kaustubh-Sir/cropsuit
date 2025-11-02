// pages/Home.jsx
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "../App.css";

function Home() {
  const { isAuthenticated } = useAuth();

  // Same animations/effects
  useEffect(() => {
    const handleScroll = () => {
      const statNumbers = document.querySelectorAll(".stats .number");
      statNumbers.forEach((stat) => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const finalNumber = stat.textContent;
          const isPercentage = finalNumber.includes("%");
          const number = parseInt(finalNumber);

          if (!stat.animated) {
            stat.animated = true;
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= number) {
                current = number;
                clearInterval(timer);
              }
              stat.textContent =
                Math.floor(current) +
                (isPercentage ? "%" : finalNumber.replace(number, ""));
            }, 50);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    document.querySelectorAll(".feature-card, .season-card").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "all 0.6s ease";
      observer.observe(card);
    });

    const createFloatingIcon = () => {
      const icons = ["🌾", "🌽", "🍅", "🥕", "🥬", "🌱", "🍃"];
      const icon = icons[Math.floor(Math.random() * icons.length)];

      const element = document.createElement("div");
      element.innerHTML = icon;
      element.style.position = "fixed";
      element.style.fontSize = "2rem";
      element.style.opacity = "0.2";
      element.style.left = Math.random() * window.innerWidth + "px";
      element.style.top = window.innerHeight + "px";
      element.style.pointerEvents = "none";
      element.style.zIndex = "-1";
      element.style.animation = "floatUp 12s linear forwards";

      document.body.appendChild(element);

      setTimeout(() => {
        element.remove();
      }, 12000);
    };

    const floatingInterval = setInterval(createFloatingIcon, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(floatingInterval);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="Home" style={{ 
      width: '100%', 
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      background: '#fff'
    }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero" id="home" style={{
        width: '100%',
        minHeight: 'calc(100vh - 70px)',
        background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '40px 20px'
      }}>
        <div className="hero-container" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div className="hero-content">
            <h1>Smart Farming for Modern India</h1>
            <p>
              Get personalized crop recommendations based on your region,
              season, weather, and soil conditions. Maximize your yield with
              data-driven farming solutions.
            </p>

            <div className="cta-buttons">
              {isAuthenticated && (
                <a href="/dashboard" className="btn-primary" style={{ background: '#ffffffff' }}>
                  🌾 Go to Dashboard
                </a>
              )}
              <a href="/Features" className="btn-primary">
                Start Farming Smart
              </a>
              <a href="#features" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-visual">🌾</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features" style={{
        width: '100%',
        padding: '80px 20px',
        background: '#f5f5f5'
      }}>
        <div className="container" style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div className="section-header">
            <h2 className="section-title">Why Choose CropSuit?</h2>
            <p className="section-subtitle">
              Comprehensive farming solutions backed by real-time data and
              government agricultural insights
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🌾</span>
              <h3 className="feature-title">Crop Recommendations</h3>
              <p>
                Get personalized suggestions for Kharif, Rabi, and Zaid seasons
                based on your location and soil conditions.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">🌡️</span>
              <h3 className="feature-title">Weather Integration</h3>
              <p>
                Real-time weather data and forecasts to help you make informed
                planting and harvesting decisions.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">🧪</span>
              <h3 className="feature-title">Fertilizer Guidance</h3>
              <p>
                Optimize your fertilizer usage with scientific recommendations
                tailored to your crops and soil type.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">🌱</span>
              <h3 className="feature-title">Biochar Solutions</h3>
              <p>
                Sustainable farming practices with biochar recommendations to
                improve soil health and carbon sequestration.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h3 className="feature-title">Government Data</h3>
              <p>
                Access official agricultural data and schemes to maximize
                government benefits and subsidies.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">📱</span>
              <h3 className="feature-title">Easy to Use</h3>
              <p>
                Simple, intuitive interface designed for farmers of all
                technical backgrounds and literacy levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seasons Section */}
      <section className="seasons" id="seasons" style={{
        width: '100%',
        padding: '80px 20px',
        background: '#fff'
      }}>
        <div className="container" style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div className="section-header">
            <h2 className="section-title">Seasonal Crop Planning</h2>
            <p className="section-subtitle">
              Plan your farming activities across all three major Indian
              cropping seasons
            </p>
          </div>

          <div className="seasons-grid">
            <div className="season-card">
              <div className="season-name">🌧️ Kharif Season</div>
              <div className="season-period">June - October</div>
              <div className="season-crops">
                <span className="crop-tag">Rice</span>
                <span className="crop-tag">Cotton</span>
                <span className="crop-tag">Sugarcane</span>
                <span className="crop-tag">Maize</span>
                <span className="crop-tag">Millets</span>
              </div>
            </div>

            <div className="season-card">
              <div className="season-name">❄️ Rabi Season</div>
              <div className="season-period">November - April</div>
              <div className="season-crops">
                <span className="crop-tag">Wheat</span>
                <span className="crop-tag">Barley</span>
                <span className="crop-tag">Peas</span>
                <span className="crop-tag">Gram</span>
                <span className="crop-tag">Mustard</span>
              </div>
            </div>

            <div className="season-card">
              <div className="season-name">☀️ Zaid Season</div>
              <div className="season-period">April - June</div>
              <div className="season-crops">
                <span className="crop-tag">Watermelon</span>
                <span className="crop-tag">Muskmelon</span>
                <span className="crop-tag">Cucumber</span>
                <span className="crop-tag">Fodder</span>
                <span className="crop-tag">Vegetables</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" style={{
        width: '100%',
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
        color: 'white'
      }}>
        <div className="container" style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="number">95%</span>
              <span className="label">Accuracy Rate</span>
            </div>
            <div className="stat-card">
              <span className="number">30%</span>
              <span className="label">Yield Increase</span>
            </div>
            <div className="stat-card">
              <span className="number">40%</span>
              <span className="label">Cost Reduction</span>
            </div>
            <div className="stat-card">
              <span className="number">24/7</span>
              <span className="label">Support Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{
        width: '100%',
        padding: '80px 20px',
        background: '#f5f5f5'
      }}>
        <div className="container" style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div className="cta-content">
            <h2>Ready to Transform Your Farming?</h2>
            <p>
              Join thousands of Indian farmers who are already using CropSuit
              to maximize their harvest
            </p>
            <a href="/Features" className="btn-primary">
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{
        width: '100%',
        background: '#2e7d32',
        color: 'white',
        padding: '60px 20px 20px'
      }}>
        <div className="container" style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div className="footer-content">
            <div className="footer-section">
              <h3>CropSuit</h3>
              <p>
                Empowering Indian farmers with smart, data-driven agricultural
                solutions for sustainable and profitable farming.
              </p>
            </div>

            <div className="footer-section">
              <h3>Features</h3>
              <ul>
                <li><a href="/crop-recommendations">Crop Recommendations</a></li>
                <li><a href="/weather-integration">Weather Integration</a></li>
                <li><a href="/fertilizer-guidance">Fertilizer Guidance</a></li>
                <li><a href="/seasonal-planning">Seasonal Planning</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#tutorials">Video Tutorials</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Company</h3>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; 2025 CropSuit. All rights reserved. Made with ❤️ for Indian
              farmers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;