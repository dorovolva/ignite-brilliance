import React from 'react';
import { ShieldCheck, FileText, Droplets, CreditCard, Ticket, Clock, CheckCircle2, FileCheck, PhoneCall } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SEO from '../components/SEO';
import './GovernmentServices.css';

const GovernmentServices = () => {
  return (
    <div className="gov-page">
      <SEO 
        title="Government & Utility Services Centre in Payyavoor | Ignite Brilliance"
        description="Authorised Republic of India service partner in Payyavoor. Fast assistance with Passport, PAN card, Aadhaar updates, and utility bill payments."
        keywords="government services payyavoor, passport assistance kannur, pan card service kannur, aadhaar update kerala, e-aadhaar centre"
      />
      {/* HERO */}
      <section className="gov-hero hero-section">
        <div className="container hero-container text-center" style={{gridTemplateColumns: '1fr', paddingBottom: '40px'}}>
          <div className="hero-content fade-in-up" style={{alignItems: 'center'}}>
            <Badge variant="accent">Government Services</Badge>
            <h1>Government & Utility Services – Verified Centre in Kannur</h1>
            <p className="hero-subline" style={{textAlign: 'center', maxWidth: '700px'}}>
              Passport, PAN, Aadhaar, utility payments, ticket booking and more — handled by authorised government service partners. No queues. No confusion.
            </p>
            
            <div className="authorised-badge mb-4">
              <ShieldCheck size={20} color="var(--primary-red)" />
              <span>Republic of India Authorised Service Partner</span>
            </div>
            
            <Button href="https://wa.me/919456241625" variant="secondary" className="mt-4">Enquire Now &rarr;</Button>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="section gov-services-section alt-bg">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <h2>Services Available at Our Centre.</h2>
          </div>
          
          <div className="category-blocks">
            {/* Category 1 */}
            <div className="category-block fade-in-up hover-shadow">
              <div className="cat-header">
                <div className="cat-icon" style={{backgroundColor: '#e0f2fe', color: '#0369a1'}}><FileText size={28} /></div>
                <h3>Citizen Identity Services</h3>
              </div>
              <ul className="cat-list">
                <li><CheckCircle2 size={18} /> Passport application assistance</li>
                <li><CheckCircle2 size={18} /> PAN Card processing</li>
                <li><CheckCircle2 size={18} /> e-Aadhaar updates and corrections</li>
                <li><CheckCircle2 size={18} /> Food Safety registration</li>
                <li><CheckCircle2 size={18} /> Village & Panchayat services</li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="category-block fade-in-up hover-shadow">
              <div className="cat-header">
                <div className="cat-icon" style={{backgroundColor: '#fef08a', color: '#a16207'}}><FileCheck size={28} /></div>
                <h3>Licensing</h3>
              </div>
              <ul className="cat-list">
                <li><CheckCircle2 size={18} /> Liquor licence (കുടിക്കടം) assistance</li>
                <li><CheckCircle2 size={18} /> Authorised documentation support</li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="category-block fade-in-up hover-shadow">
              <div className="cat-header">
                <div className="cat-icon" style={{backgroundColor: '#bbf7d0', color: '#15803d'}}><Droplets size={28} /></div>
                <h3>Utility Payments</h3>
              </div>
              <ul className="cat-list">
                <li><CheckCircle2 size={18} /> Water bill payment</li>
                <li><CheckCircle2 size={18} /> Electricity bill payment</li>
                <li><CheckCircle2 size={18} /> Traffic fine payment</li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="category-block fade-in-up hover-shadow">
              <div className="cat-header">
                <div className="cat-icon" style={{backgroundColor: '#ddd6fe', color: '#6d28d9'}}><Ticket size={28} /></div>
                <h3>Transport & Travel</h3>
              </div>
              <ul className="cat-list">
                <li><CheckCircle2 size={18} /> Bus ticket booking</li>
                <li><CheckCircle2 size={18} /> Train ticket booking</li>
                <li><CheckCircle2 size={18} /> Flight ticket booking</li>
              </ul>
            </div>

            {/* Category 5 */}
            <div className="category-block fade-in-up hover-shadow">
              <div className="cat-header">
                <div className="cat-icon" style={{backgroundColor: '#ffedd5', color: '#c2410c'}}><CreditCard size={28} /></div>
                <h3>Other Documentation</h3>
              </div>
              <ul className="cat-list">
                <li><CheckCircle2 size={18} /> Government DTP works</li>
                <li><CheckCircle2 size={18} /> All general government forms</li>
                <li><CheckCircle2 size={18} /> Document preparation & submission</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section gov-process-section">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <h2>Simple. Fast. Trustworthy.</h2>
          </div>
          
          <div className="horizontal-steps fade-in-up">
            <div className="h-step">
              <div className="h-icon"><PhoneCall size={32} /></div>
              <h4>1. Contact Us</h4>
              <p>Tell us what you need. Walk in or reach via WhatsApp.</p>
            </div>
            
            <div className="h-step">
              <div className="h-icon"><FileText size={32} /></div>
              <h4>2. Submit Documents</h4>
              <p>Our verified team reviews and prepares your application accurately.</p>
            </div>
            
            <div className="h-step">
              <div className="h-icon"><Clock size={32} /></div>
              <h4>3. We Process It</h4>
              <p>We handle submission safely and send you progress updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section why-gov-section alt-bg">
        <div className="container">
          <div className="why-gov-grid">
            <div className="why-card hover-shadow fade-in-up">
              <ShieldCheck size={36} color="var(--primary-red)" className="mb-4" />
              <h3>Authorised Centre</h3>
              <p>We are a registered Republic of India service partner. All services are official and legitimate.</p>
            </div>
            <div className="why-card hover-shadow fade-in-up">
              <Clock size={36} color="var(--accent-orange)" className="mb-4" />
              <h3>Save Time</h3>
              <p>No more long queues or confusing government portals. We handle it all quickly and correctly.</p>
            </div>
            <div className="why-card hover-shadow fade-in-up">
              <FileCheck size={36} color="var(--primary-dark)" className="mb-4" />
              <h3>Expert Handling</h3>
              <p>Our team is trained to process each service correctly — minimising errors and rejection delays.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section text-center">
        <div className="container fade-in-up">
          <h2>Need a service done? Reach us now.</h2>
          <p className="mb-4 text-secondary">No queues. No delays. WhatsApp us your requirement.</p>
          <div className="contact-display">
            <span className="big-number">+91 9456 241 625</span>
            <p>Payyavoor Angadi Complex , Block D , Third Floor, Payyavoor-Sreekandapuram Road, 670633</p>
          </div>
          <div className="hero-ctas" style={{justifyContent: 'center', marginTop: '32px'}}>
            <Button href="https://wa.me/919456241625" variant="secondary" icon={<span style={{color: '#fff'}}>❖</span>}>WhatsApp Us Now</Button>
            <Button to="/contact" variant="outline-purple">Find on Map &rarr;</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GovernmentServices;
