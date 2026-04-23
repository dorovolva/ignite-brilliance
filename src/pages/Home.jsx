import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, GraduationCap, Building, Star, Award, BookOpen, Brain, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import LatestUpdates from '../components/LatestUpdates';
import SEO from '../components/SEO';
import { api } from '../services/api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

const Home = () => {
  const [settings, setSettings] = useState(null);
  const mascotRef = useRef(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.getSettings();
        setSettings(data);
      } catch (e) {}
    };
    fetchSettings();

    // Subtle Mascot Parallax
    if (mascotRef.current) {
      gsap.to(mascotRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }, []);

  const waLink = settings?.whatsapp 
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}` 
    : "https://wa.me/919456241625";

  return (
    <div className="home-page">
      <SEO 
        title="Ignite Brilliance – Career Guidance & Single Window Services in Kannur"
        description="AI-powered skill assessments, expert career counselling, and government services under one roof. Trusted by parents & students in Payyavoor, Kannur. Book free consultation."
        keywords="career guidance Kerala, skill assessment test for students, best career counsellor in Kannur, AI career assessment India, Ekajalaka Kendra Payyavoor, single window service centre Kannur, online career counselling Kerala"
      />
      {/* SECTION 1 - HERO */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content fade-in-up">
            <Badge variant="primary" className="hero-badge">Kannur's First Single Window Career Centre</Badge>
            <h1>Ignite Brilliance Ekajalaka Kendra – Your Single Window to a Bright Future</h1>
            <p className="hero-subline">
              {settings?.heroTagline || "Kerala's most trusted destination for AI-powered career counselling, college admissions, and government services — all in one place. Serving students from Grade 5 to postgraduate."}
            </p>
            <div className="hero-ctas">
              <Button to="/contact" variant="purple">Book a Free Counselling Session &rarr;</Button>
              <Button href={waLink} variant="outline-purple" icon={
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}>
                   <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              }>WhatsApp Us &rarr;</Button>
            </div>
          </div>
          
          <div className="hero-visual fade-in-up hide-on-mobile">
             <div className="hero-image-wrapper" ref={mascotRef}>
                <img src={settings?.heroImageUrl || "/mascot.webp"} alt="Ignite Brilliance Mascot" className="mascot-img" />
             </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS PARTNER RIBBON */}
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

      {/* SECTION 3 - WHAT WE DO */}
      <section className="section pillars-section" style={{paddingTop: '60px'}}>
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <h2>Everything You Need. Under One Roof.</h2>
          </div>
          
          <div className="pillars-grid">
            {/* Pillar 1 */}
            <div className="pillar-card hover-shadow fade-in-up">
              <div className="pillar-icon red"><GraduationCap size={32} /></div>
              <h3>Career Guidance & Education</h3>
              <p>From school subject selection to overseas university admissions — guided by AI assessments and certified career counsellors.</p>
              
              <div className="tags-container">
                <span className="pill-tag">AI Skill Scan</span>
                <span className="pill-tag">Career Counselling</span>
                <span className="pill-tag">Stream Selection</span>
                <span className="pill-tag">College Admissions</span>
                <span className="pill-tag">Abroad Study</span>
                <span className="pill-tag">Scholarships</span>
                <span className="pill-tag">Certification Courses</span>
              </div>
              
              <Button to="/career-services" variant="text" className="mt-auto">Explore Education Services &rarr;</Button>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-card hover-shadow fade-in-up">
              <div className="pillar-icon orange"><Building size={32} /></div>
              <h3>Government & Utility Services</h3>
              <p>Passport, PAN card, Aadhaar updates, utility payments, ticket booking and more — handled by authorised experts at our centre.</p>
              
              <div className="tags-container">
                <span className="pill-tag">Passport</span>
                <span className="pill-tag">PAN Card</span>
                <span className="pill-tag">e-Aadhaar</span>
                <span className="pill-tag">Water Bill</span>
                <span className="pill-tag">Electricity Bill</span>
                <span className="pill-tag">Ticket Booking</span>
              </div>
              
              <Button to="/government-services" variant="text" className="orange mt-auto">See All Services &rarr;</Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - HOW IT WORKS */}
      <section className="section process-section alt-bg">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <Badge variant="outline" className="mb-4">Our Process</Badge>
            <h2>Scientific Guidance. Step by Step.</h2>
          </div>
          
          <div className="process-steps">
            <div className="process-step fade-in-up delay-1">
              <div className="step-number slide-up-anim">01</div>
              <div className="step-card">
                <div className="step-icon"><Brain size={32} /></div>
                <h3>Take the AI Skill Scan</h3>
                <p>Answer our validated psychometric assessment online or walk in to our centre. Available for students from Grade 8 to working professionals.</p>
              </div>
            </div>
            
            <div className="process-step fade-in-up delay-2">
              <div className="step-number slide-up-anim">02</div>
              <div className="step-card">
                <div className="step-icon"><BookOpen size={32} /></div>
                <h3>Receive Your Report</h3>
                <p>Get a detailed, personalised report identifying your top career matches, strengths, and the best subject or course options for you.</p>
              </div>
            </div>

            <div className="process-step fade-in-up delay-3">
              <div className="step-number slide-up-anim">03</div>
              <div className="step-card">
                <div className="step-icon"><Users size={32} /></div>
                <h3>Meet Your Counsellor</h3>
                <p>A certified career expert interprets your report and builds a step-by-step roadmap — college selection, entrance exams, and more.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - WHO WE HELP */}
      <section className="section audience-section">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <h2>We Guide Every Stage of Life.</h2>
          </div>
          
          <div className="audience-grid">
            <div className="audience-card fade-in-up hover-shadow">
              <div className="audience-icon"><ChevronRight size={24} color="var(--primary-red)" /></div>
              <h4>School Students (Grade 5–10)</h4>
              <p>Discover natural talents, choose the right subjects, and build confidence early.</p>
              <Button to="/career-services" variant="text" className="small-link">Learn more &rarr;</Button>
            </div>
            <div className="audience-card fade-in-up hover-shadow delay-1">
               <div className="audience-icon"><ChevronRight size={24} color="var(--primary-red)" /></div>
              <h4>Higher Secondary Students (+1/+2)</h4>
              <p>Pick the right stream and plan your future with clarity before it's too late.</p>
              <Button to="/career-services" variant="text" className="small-link">Learn more &rarr;</Button>
            </div>
            <div className="audience-card fade-in-up hover-shadow delay-2">
               <div className="audience-icon"><ChevronRight size={24} color="var(--primary-red)" /></div>
              <h4>Graduates & Professionals</h4>
              <p>Career transitions, higher education planning, and skill certifications tailored to your goals.</p>
              <Button to="/career-services" variant="text" className="small-link">Learn more &rarr;</Button>
            </div>
            <div className="audience-card fade-in-up hover-shadow delay-3">
               <div className="audience-icon"><ChevronRight size={24} color="var(--primary-red)" /></div>
              <h4>Parents & Families</h4>
              <p>Peace of mind through scientific, expert guidance for your child's future — not guesswork.</p>
              <Button to="/contact" variant="text" className="small-link">Learn more &rarr;</Button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION - LATEST UPDATES */}
      <LatestUpdates />

      {/* SECTION 6 - TESTIMONIALS */}
      <section className="section testimonials-section alt-bg">
        <div className="container">
          <div className="section-header fade-in-up">
            <Badge variant="outline" className="mb-4">What Our Students Say</Badge>
            <h2>Real Guidance. Real Results.</h2>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card fade-in-up hover-shadow">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--flame-gold)" color="var(--flame-gold)" />)}
              </div>
              <p className="quote">"e-Learn Ekajalaka Kendra gave me the clarity I needed to decide my future. The counsellors are amazing!"</p>
              <div className="author">
                <strong>Aarav K.</strong>
                <span>Student</span>
              </div>
            </div>
            
            <div className="testimonial-card fade-in-up hover-shadow delay-1">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--flame-gold)" color="var(--flame-gold)" />)}
              </div>
              <p className="quote">"The Skill Scan Assessment showed me a career path I hadn't even considered before. Highly recommend it!"</p>
              <div className="author">
                <strong>Ananya R.</strong>
                <span>Graduate</span>
              </div>
            </div>
            
            <div className="testimonial-card fade-in-up hover-shadow delay-2">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--flame-gold)" color="var(--flame-gold)" />)}
              </div>
              <p className="quote">"Finally, a place that understands what a student in Kerala actually needs. Professional, caring, and results-focused."</p>
              <div className="author">
                <strong>Rahul M.</strong>
                <span>Parent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 - CTA BANNER */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content fade-in-up">
            <h2>Ready to Make<br/>the Right Choice?</h2>
            <p>Book a free counselling session or reach us directly on WhatsApp. Our team responds within hours.</p>
            <div className="cta-buttons">
              <Button to="/contact" variant="white">Book a Session &rarr;</Button>
              <Button href={waLink} variant="outline-white" icon={
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white" style={{marginRight: '4px'}}>
                  <path d="M12.01 2.01A10.02 10.02 0 0 0 2.02 12.02c0 1.63.4 3.2 1.15 4.61L2.01 22.01l5.51-1.14a9.98 9.98 0 0 0 4.49 1.07h.01a10.02 10.02 0 0 0 10.01-10.01A10.03 10.03 0 0 0 22.02 2.01h-10.01zm0 18.23h-.01a8.3 8.3 0 0 1-4.22-1.15l-.3-.18-3.13.65.66-3.08-.2-.3A8.34 8.34 0 0 1 3.66 12a8.3 8.3 0 0 1 8.34-8.31V3.7A8.37 8.37 0 0 1 20.35 12a8.33 8.33 0 0 1-8.34 8.24zm4.57-6.2c-.25-.13-1.48-.74-1.71-.82-.23-.08-.4-.13-.56.12-.17.25-.65.82-.8.98-.15.17-.3.19-.55.07-.25-.13-1.06-.39-2.02-1.25-.74-.66-1.25-1.48-1.39-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.43.12-.15.16-.25.24-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.72 4.29 3.82.6.25 1.07.41 1.44.52.6.19 1.15.16 1.58.1.48-.06 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.17-.48-.3z"/>
                </svg>
              }>WhatsApp Us &rarr;</Button>
            </div>
            <a
              href="https://chat.whatsapp.com/"
              target="_blank"
              rel="noreferrer"
              className="wa-group-btn"
            >
              <svg viewBox="0 0 24 24" width="26" height="26" fill="#25D366">
                <path d="M12.01 2.01A10.02 10.02 0 0 0 2.02 12.02c0 1.63.4 3.2 1.15 4.61L2.01 22.01l5.51-1.14a9.98 9.98 0 0 0 4.49 1.07h.01a10.02 10.02 0 0 0 10.01-10.01A10.03 10.03 0 0 0 22.02 2.01h-10.01zm0 18.23h-.01a8.3 8.3 0 0 1-4.22-1.15l-.3-.18-3.13.65.66-3.08-.2-.3A8.34 8.34 0 0 1 3.66 12a8.3 8.3 0 0 1 8.34-8.31V3.7A8.37 8.37 0 0 1 20.35 12a8.33 8.33 0 0 1-8.34 8.24zm4.57-6.2c-.25-.13-1.48-.74-1.71-.82-.23-.08-.4-.13-.56.12-.17.25-.65.82-.8.98-.15.17-.3.19-.55.07-.25-.13-1.06-.39-2.02-1.25-.74-.66-1.25-1.48-1.39-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.43.12-.15.16-.25.24-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.72 4.29 3.82.6.25 1.07.41 1.44.52.6.19 1.15.16 1.58.1.48-.06 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.17-.48-.3z"/>
              </svg>
              Join our WhatsApp Group — Get Educational News Fast!
            </a>
          </div>
        </div>
        <div className="cta-decor"></div>
      </section>
    </div>
  );
};

export default Home;
