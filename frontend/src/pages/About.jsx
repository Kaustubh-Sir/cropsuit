// pages/About.jsx
import React from "react";
import "../App.css";

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About CropSuit</h1>
          <p className="about-tagline">
            Empowering Indian farmers with smart, data-driven agricultural solutions
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At CropSuit, we believe that every farmer deserves access to modern agricultural 
                technology and data-driven insights. Our mission is to bridge the gap between 
                traditional farming wisdom and cutting-edge agricultural science.
              </p>
              <p>
                We aim to help farmers make informed decisions about crop selection, fertilizer 
                usage, and seasonal planning, ultimately leading to increased yields, reduced 
                costs, and sustainable farming practices.
              </p>
            </div>
            <div className="mission-visual">
              <div className="mission-icon">🎯</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="problem-solution">
        <div className="container">
          <h2 className="section-title">The Challenge We're Solving</h2>
          
          <div className="ps-grid">
            <div className="ps-card problem">
              <h3>The Problem</h3>
              <ul>
                <li>Farmers lack localized guidance for crop selection</li>
                <li>Fertilizers are often overused or misapplied</li>
                <li>Climate uncertainty makes planning difficult</li>
                <li>Fragmented information across multiple sources</li>
                <li>Limited access to agricultural expertise</li>
              </ul>
            </div>

            <div className="ps-card solution">
              <h3>Our Solution</h3>
              <ul>
                <li>AI-powered crop recommendations by region</li>
                <li>Scientific fertilizer guidance with cost optimization</li>
                <li>Real-time weather integration for better planning</li>
                <li>All-in-one platform with comprehensive data</li>
                <li>24/7 access to expert agricultural knowledge</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How CropSuit Works</h2>
          
          <div className="workflow-steps">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Input Your Data</h3>
                <p>Enter your location, soil type, and farming preferences</p>
              </div>
            </div>

            <div className="workflow-arrow">→</div>

            <div className="workflow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>AI Analysis</h3>
                <p>Our system analyzes weather, soil, and seasonal data</p>
              </div>
            </div>

            <div className="workflow-arrow">→</div>

            <div className="workflow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Get Recommendations</h3>
                <p>Receive personalized crop and fertilizer suggestions</p>
              </div>
            </div>

            <div className="workflow-arrow">→</div>

            <div className="workflow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Implement & Track</h3>
                <p>Follow guidance and monitor your farm's progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="impact-stats">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-number">10,000+</div>
              <div className="impact-label">Farmers Served</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">35%</div>
              <div className="impact-label">Average Yield Increase</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">₹15Cr+</div>
              <div className="impact-label">Total Savings Generated</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">500+</div>
              <div className="impact-label">Villages Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="technology-section">
        <div className="container">
          <h2 className="section-title">Powered by Modern Technology</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon">🤖</div>
              <h3>Artificial Intelligence</h3>
              <p>Machine learning algorithms analyze millions of data points</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">☁️</div>
              <h3>Cloud Computing</h3>
              <p>Scalable infrastructure for real-time data processing</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">📡</div>
              <h3>API Integration</h3>
              <p>Connected to weather services and government databases</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">📊</div>
              <h3>Big Data Analytics</h3>
              <p>Historical and real-time data for accurate predictions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Built by Experts</h2>
          <p className="team-subtitle">
            Our team combines expertise in agriculture, technology, and data science
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍🌾</div>
              <h3>Agricultural Scientists</h3>
              <p>PhDs in agronomy and soil science</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Software Engineers</h3>
              <p>Experts in AI and web development</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🔬</div>
              <h3>Data Scientists</h3>
              <p>Specialists in predictive modeling</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🏫</div>
              <h3>Field Experts</h3>
              <p>Farmers with decades of experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🌱 Sustainability</h3>
              <p>Promoting eco-friendly farming practices that protect our environment for future generations</p>
            </div>
            <div className="value-card">
              <h3>🎯 Accuracy</h3>
              <p>Providing data-backed recommendations based on scientific research and real-world results</p>
            </div>
            <div className="value-card">
              <h3>💡 Innovation</h3>
              <p>Continuously improving our platform with the latest agricultural technology</p>
            </div>
            <div className="value-card">
              <h3>🤝 Accessibility</h3>
              <p>Making advanced farming tools available to farmers regardless of technical literacy</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Join the Smart Farming Revolution?</h2>
          <p>Start making data-driven decisions for your farm today</p>
          <div className="cta-buttons">
            <a href="/register" className="btn-primary">Create Free Account</a>
            <a href="/features" className="btn-secondary">Explore Features</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;