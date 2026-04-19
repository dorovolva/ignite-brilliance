import React from 'react';
import { Target, CheckCircle2, ChevronRight, Award, Flame, Globe, BookOpen, Brain } from 'lucide-react';
import Badge from '../components/ui/Badge';
import SEO from '../components/SEO';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <SEO 
        title="About Ignite Brilliance – AI Career Hub in Kerala"
        description="Founded to bring scientific clarity to career choices. We combine AI psychometrics with expert human guidance for students across Kannur and Kerala."
        keywords="ai career assessment kerala, expert career counsellor kannur, student service centre payyavoor"
      />
      {/* HERO */}
      <section className="about-hero hero-section">
        <div className="container hero-container">
          <div className="hero-content fade-in-up">
            <Badge variant="primary" className="hero-badge">About Us</Badge>
            <h1>Ignite Brilliance – Kerala's First AI-Powered Career Hub</h1>
            <p className="hero-subline">
              The Ekajalaka (single window) model means you never have to visit multiple offices or consultants again. Education, career, and government services — handled in one trusted place.
            </p>
          </div>
          <div className="hero-visual fade-in-up">
             <div className="hero-image-wrapper">
               <img src="/exterior.jpg" alt="Ignite Brilliance Office Exterior" className="mascot-img" style={{borderRadius: '20px', objectFit: 'cover', maxHeight: '75vh'}} />
             </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section story-section alt-bg">
        <div className="container story-container">
          <div className="story-content fade-in-up">
            <h2>Why We Built This.</h2>
            <div className="story-text">
              <p>
                Students in Kerala are intelligent, ambitious, and hardworking. But too many of them choose the wrong subjects, the wrong courses, or the wrong colleges — not because of a lack of effort, but because of a lack of scientific guidance.
              </p>
              <p>
                <strong>Ignite Brilliance</strong> was founded to change that. By combining AI-powered psychometric assessments with real human expertise from trained career counsellors and psychologists, we bring clarity to one of life's most important decisions.
              </p>
              <p>
                Based in Payyavoor, Kannur, we serve students, graduates, professionals, and families — not just from Kannur, but across Kerala and beyond. And because we also handle government and utility services, we truly are the single-window solution our community needed.
              </p>
            </div>
          </div>
          {/* Office Interior Photo */}
          <div className="office-photo-wrapper fade-in-up">
            <img src="/office.jpg" alt="Ignite Brilliance Office Interior" style={{width: '100%', borderRadius: '16px', objectFit: 'cover', maxHeight: '320px', marginTop: '36px'}} />
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="section vision-mission-section">
        <div className="container vision-mission-container">
          <div className="vision-box hover-shadow fade-in-up">
            <div className="box-icon"><Flame size={32} color="var(--primary-red)" /></div>
            <h3>Our Vision</h3>
            <p className="large-quote">"To become Kerala's most trusted single-window destination for education, career development, and essential government services — empowering individuals to make informed decisions with clarity and confidence."</p>
          </div>
          
          <div className="mission-box fade-in-up">
            <h3>Our Mission</h3>
            <ul className="mission-list">
              <li>
                <CheckCircle2 color="var(--primary-red)" size={24} className="shrink-0" />
                <span>Provide scientific, AI-driven career assessments for students from Grade 5 to postgraduate level.</span>
              </li>
              <li>
                <CheckCircle2 color="var(--primary-red)" size={24} className="shrink-0" />
                <span>Offer personalised counselling by trained psychologists and certified career experts.</span>
              </li>
              <li>
                <CheckCircle2 color="var(--primary-red)" size={24} className="shrink-0" />
                <span>Simplify college admissions, scholarship applications, and overseas education access.</span>
              </li>
              <li>
                <CheckCircle2 color="var(--primary-red)" size={24} className="shrink-0" />
                <span>Act as a one-stop shop for government services, utility payments, and official documentation.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* USP GRID */}
      <section className="section usp-section alt-bg">
        <div className="container">
          <div className="section-header text-center fade-in-up mb-auto">
            <h2>What Makes Us Different.</h2>
          </div>
          
          <div className="usp-grid">
            <div className="usp-card fade-in-up hover-shadow">
              <div className="usp-icon"><Target color="var(--accent-orange)" size={28} /></div>
              <h4>Single Window Model</h4>
              <p>Education counselling and government services in one authorised centre. No more running between offices.</p>
            </div>
            
            <div className="usp-card fade-in-up hover-shadow">
              <div className="usp-icon"><Brain color="var(--primary-red)" size={28} /></div>
              <h4>AI + Human Expertise</h4>
              <p>Validated psychometric assessments combined with the empathy of trained counsellors — not just a quiz, a roadmap.</p>
            </div>
            
            <div className="usp-card fade-in-up hover-shadow">
              <div className="usp-icon"><Award color="var(--flame-gold)" size={28} /></div>
              <h4>Government Authorised</h4>
              <p>Republic of India authorised service partner. Official, trustworthy, and accountable operations.</p>
            </div>

            <div className="usp-card fade-in-up hover-shadow">
              <div className="usp-icon"><ChevronRight color="var(--primary-red)" size={28} /></div>
              <h4>End-to-End Support</h4>
              <p>From skill assessment to admission to visa guidance — we manage the entire journey with you.</p>
            </div>

            <div className="usp-card fade-in-up hover-shadow">
              <div className="usp-icon"><Globe color="var(--accent-orange)" size={28} /></div>
              <h4>Local Presence, Global Reach</h4>
              <p>Based in Kannur, but supporting students to colleges across India and prestigious institutions abroad.</p>
            </div>

            <div className="usp-card fade-in-up hover-shadow">
              <div className="usp-icon"><BookOpen color="var(--primary-dark)" size={28} /></div>
              <h4>Holistic Development</h4>
              <p>Career transitions, entrepreneurship guidance, skill certifications — not just academic counselling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER RIBBON — replaces static placeholder */}
      <section className="partner-ribbon-wrapper">
        <div className="partner-ribbon">
          {[1, 2].map((set) => (
            <div key={set} className="partner-ribbon-track">
              <img src="/partner-logo/Incorporation.png" alt="Government of India" />
              <img src="/partner-logo/egac.png" alt="EGAC" />
              <img src="/partner-logo/iaf.jfif" alt="IAF" />
              <img src="/partner-logo/iso.jpg" alt="ISO" />
              <img src="/partner-logo/k-sum.png" alt="Kerala Startup Mission" />
              <img src="/partner-logo/msme.jfif" alt="MSME" />
              <img src="/partner-logo/qors.png" alt="QRO" />
              <img src="/partner-logo/startupindia.png" alt="Startup India" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
