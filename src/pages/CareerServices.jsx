import React, { useState } from 'react';
import { Brain, ArrowRight, GraduationCap, Users, BookOpen, Compass, Award, Map, Globe, PenTool, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SEO from '../components/SEO';
import './CareerServices.css';

const CareerServices = () => {
  const [activeTab, setActiveTab] = useState('school');

  const tabData = {
    school: {
      title: "School (Grade 5–10)",
      assessment: "AI Skill Scan — Early & Middle Stage",
      desc: "Identify natural strengths before stream selection decisions become stressful.",
      services: [
        "Talent discovery",
        "Subject selection guidance",
        "Early career awareness",
        "Confidence building"
      ]
    },
    higher: {
      title: "Higher Secondary (+1/+2)",
      assessment: "AI Skill Scan — Higher Secondary",
      desc: "Choose the right stream based on aptitude — not peer pressure.",
      services: [
        "Stream selection (Science/Commerce/Humanities)",
        "Career path clarity",
        "Entrance exam planning",
        "Scholarship guidance"
      ]
    },
    grad: {
      title: "Graduate / Professional",
      assessment: "AI Skill Scan — Graduates & Professionals",
      desc: "Relaunch your career with data-backed clarity.",
      services: [
        "Course-to-career mapping",
        "Skill gap analysis",
        "Higher education roadmap",
        "Career transition planning",
        "All India & overseas admissions"
      ]
    },
    open: {
      title: "Open School",
      assessment: "NIOS / BOSSE Pathway Analysis",
      desc: "Education doesn't have to follow a single path.",
      services: [
        "NIOS and BOSSE guidance",
        "Re-admission support",
        "Flexible learning pathway counselling"
      ]
    }
  };

  const servicesGrid = [
    { icon: <Brain />, title: "AI Skill Scan Career Assessment", desc: "Scientific psychometric testing for accurate career mappings." },
    { icon: <Users />, title: "Personalised Career Counselling", desc: "One-on-one sessions with certified expert psychologists." },
    { icon: <Compass />, title: "Subject / Stream Selection", desc: "Make the right choice avoiding future academic stress." },
    { icon: <Award />, title: "Scholarship Counselling", desc: "Find and apply for merit and need-based scholarships." },
    { icon: <Map />, title: "All India College Admissions", desc: "Guidance and processing for top colleges across India." },
    { icon: <Globe />, title: "Overseas Education & Abroad Study", desc: "Visa, admissions, and university placement worldwide." },
    { icon: <GraduationCap />, title: "Online UG / PG Admissions", desc: "Direct admissions to 20+ recognised online programs." },
    { icon: <BookOpen />, title: "Open School Support", desc: "Legitimate certification routes via NIOS & BOSSE." },
    { icon: <PenTool />, title: "Job-Oriented Certification", desc: "Short term courses to bridge the academic-industry gap." },
    { icon: <Award />, title: "Exam Results & Uni Registration", desc: "Assistance with all university-related documentation." }
  ];

  return (
    <div className="career-page">
      <SEO 
        title="AI Skill Scan Career Assessment for Students | Ignite Brilliance"
        description="Take our AI-powered psychometric test to discover your strengths, aptitudes, and ideal career paths. For grades 5–12 and graduates."
        keywords="ai skill scan, psychometric test, career assessment for students, career guidance kerala, how to choose a career after 12th"
      />
      {/* HERO */}
      <section className="career-hero hero-section">
        <div className="container hero-container text-center" style={{gridTemplateColumns: '1fr', paddingBottom: '40px'}}>
          <div className="hero-content fade-in-up" style={{alignItems: 'center'}}>
            <Badge variant="primary">Education & Career</Badge>
            <h1>AI Skill Scan – Discover Your True Potential</h1>
            <p className="hero-subline" style={{textAlign: 'center'}}>
              From Grade 5 to working professionals — AI-powered assessments and certified counsellors who understand Kerala students.
            </p>
            <Button to="/contact" variant="primary" className="mt-4">Book Your Assessment &rarr;</Button>
          </div>
        </div>
      </section>

      {/* STAGE SELECTOR (TABS) */}
      <section className="section tabs-section alt-bg">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <h2>Find Your Stage.</h2>
          </div>
          
          <div className="tabs-container fade-in-up">
            <div className="tabs-nav">
              <button className={`tab-btn ${activeTab === 'school' ? 'active' : ''}`} onClick={() => setActiveTab('school')}>
                School (Grade 5–10)
              </button>
              <button className={`tab-btn ${activeTab === 'higher' ? 'active' : ''}`} onClick={() => setActiveTab('higher')}>
                Higher Secondary (+1/+2)
              </button>
              <button className={`tab-btn ${activeTab === 'grad' ? 'active' : ''}`} onClick={() => setActiveTab('grad')}>
                Graduate / Professional
              </button>
              <button className={`tab-btn ${activeTab === 'open' ? 'active' : ''}`} onClick={() => setActiveTab('open')}>
                Open School
              </button>
            </div>
            
            <div className="tab-content">
              <h3>{tabData[activeTab].assessment}</h3>
              <p className="tab-desc">"{tabData[activeTab].desc}"</p>
              
              <div className="tab-services">
                <h4>Services Included:</h4>
                <ul>
                  {tabData[activeTab].services.map((service, idx) => (
                    <li key={idx}><ArrowRight size={16} color="var(--primary-red)" /> {service}</li>
                  ))}
                </ul>
              </div>
              
              <Button to="/contact" variant="purple" className="mt-4">Book for This Stage &rarr;</Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI SKILL SCAN SPOTLIGHT */}
      <section className="section ai-spotlight">
        <div className="container ai-container">
          <div className="ai-visual fade-in-up">
            <div className="ai-graphic">
              <Brain size={120} color="var(--primary-red)" strokeWidth={1} />
              <div className="scan-line"></div>
            </div>
          </div>
          
          <div className="ai-content fade-in-up">
            <Badge variant="outline" className="mb-4">Our Flagship Tool</Badge>
            <h2>India's Most Advanced Student Career Assessment</h2>
            <p className="mb-4">
              The AI Skill Scan is a scientifically validated psychometric assessment that evaluates cognitive abilities, personality traits, and vocational interests. It doesn't just tell you what you're good at — it shows you exactly what you should pursue and why.
            </p>
            
            <ul className="feature-list">
              <li>
                <div className="feature-icon"><CheckCircle2 color="var(--primary-red)" /></div>
                <span><strong>Validated psychometric methodology</strong> — not a generic online quiz.</span>
              </li>
              <li>
                <div className="feature-icon"><CheckCircle2 color="var(--primary-red)" /></div>
                <span><strong>Detailed personalised career report</strong> with your top career matches.</span>
              </li>
              <li>
                 <div className="feature-icon"><CheckCircle2 color="var(--primary-red)" /></div>
                <span><strong>Followed by 1-on-1 counselling session</strong> with a certified expert.</span>
              </li>
            </ul>
            
            <Button to="/contact" variant="purple" className="mt-4">Take the AI Skill Scan &rarr;</Button>
          </div>
        </div>
      </section>

      {/* ALL SERVICES GRID */}
      <section className="section services-grid-section alt-bg">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <h2>Everything We Offer.</h2>
          </div>
          
          <div className="service-cards-grid">
            {servicesGrid.map((srv, index) => (
              <div key={index} className="service-card fade-in-up hover-shadow">
                <div className="service-card-icon">{srv.icon}</div>
                <div className="service-card-content">
                  <h4>{srv.title}</h4>
                  <p>{srv.desc}</p>
                </div>
                <Button to="/contact" variant="text" className="small-link mt-auto">Enquire &rarr;</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section text-center">
        <div className="container fade-in-up">
          <h2>Not sure where to start?</h2>
          <p className="mb-4 text-secondary">Let's figure it out together. Reach us on WhatsApp or book a session.</p>
          <div className="hero-ctas" style={{justifyContent: 'center'}}>
            <Button to="/contact" variant="primary">Book a Session &rarr;</Button>
            <Button href="https://wa.me/919456241625" variant="outline-purple">WhatsApp Us &rarr;</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerServices;
