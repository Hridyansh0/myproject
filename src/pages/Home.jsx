import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle, Droplets, Zap, Trash2, Dog, Construction,
  TreePine, Phone, ChevronRight, Star, TrendingUp, Users,
  FileText, Award, ArrowRight, CheckCircle, Clock, Shield
} from 'lucide-react';
import { useLang } from '../LanguageContext';
import './Home.css';

const data = {
  hi: {
    services: [
      { icon: <AlertCircle size={28}/>, label: 'शिकायत पंजीकरण', desc: 'समस्या दर्ज करें', color: '#e74c3c', path: '/complaint' },
      { icon: <FileText size={28}/>, label: 'संपत्ति कर', desc: 'ऑनलाइन भुगतान', color: '#2980b9', path: '/' },
      { icon: <Award size={28}/>, label: 'जन्म प्रमाण पत्र', desc: 'ऑनलाइन आवेदन', color: '#27ae60', path: '/' },
      { icon: <FileText size={28}/>, label: 'मृत्यु प्रमाण पत्र', desc: 'ऑनलाइन आवेदन', color: '#8e44ad', path: '/' },
      { icon: <Shield size={28}/>, label: 'ट्रेड लाइसेंस', desc: 'नया/नवीनीकरण', color: '#d35400', path: '/' },
      { icon: <Construction size={28}/>, label: 'भवन निर्माण', desc: 'अनुमति आवेदन', color: '#16a085', path: '/' },
    ],
    departments: [
      { icon: <Construction size={32}/>, name: 'सड़क विभाग', complaints: '2,847', color: '#e74c3c' },
      { icon: <Droplets size={32}/>, name: 'जल आपूर्ति', complaints: '2,103', color: '#2980b9' },
      { icon: <Trash2 size={32}/>, name: 'सफाई विभाग', complaints: '1,856', color: '#27ae60' },
      { icon: <Zap size={32}/>, name: 'प्रकाश विभाग', complaints: '1,542', color: '#f39c12' },
      { icon: <Dog size={32}/>, name: 'पशु नियंत्रण', complaints: '987', color: '#8e44ad' },
      { icon: <TreePine size={32}/>, name: 'उद्यान विभाग', complaints: '743', color: '#16a085' },
    ],
    stats: [
      { num: '12,000+', label: 'शिकायतें हल', icon: <CheckCircle size={22}/> },
      { num: '48 Hrs', label: 'औसत समाधान समय', icon: <Clock size={22}/> },
      { num: '5 Lakh+', label: 'नागरिक सेवाएं', icon: <Users size={22}/> },
      { num: '99.2%', label: 'संतुष्टि दर', icon: <Star size={22}/> },
    ],
    news: [
      { title: 'कानपुर स्मार्ट सिटी योजना के तहत 50 नई सड़कों का निर्माण शुरू', date: '12 मई 2025', cat: 'विकास' },
      { title: 'नगर निगम ने शुरू किया घर-घर कचरा संग्रह का नया अभियान', date: '10 मई 2025', cat: 'सफाई' },
      { title: 'ऑनलाइन संपत्ति कर भुगतान पर 5% की छूट — अंतिम तिथि 31 मई', date: '8 मई 2025', cat: 'कर' },
      { title: 'जल आपूर्ति विभाग: नई पाइपलाइन परियोजना का शुभारंभ', date: '5 मई 2025', cat: 'जल' },
    ],
    slides: [
      { bg: 'linear-gradient(135deg, #003580 0%, #1a4fa0 50%, #0097a7 100%)', title: 'स्वच्छ कानपुर, स्मार्ट कानपुर', subtitle: 'नागरिकों की सेवा में सदैव समर्पित', cta: 'शिकायत दर्ज करें', ctaPath: '/complaint', emoji: '🏙️' },
      { bg: 'linear-gradient(135deg, #1a5276 0%, #154360 50%, #0e6655 100%)', title: 'आपकी समस्या, हमारी जिम्मेदारी', subtitle: '24x7 शिकायत निवारण प्रणाली', cta: 'अभी पंजीकरण करें', ctaPath: '/complaint', emoji: '📋' },
      { bg: 'linear-gradient(135deg, #6c3483 0%, #4a235a 50%, #1a5276 100%)', title: 'ऑनलाइन सेवाएं — घर बैठे', subtitle: 'संपत्ति कर, प्रमाण पत्र, लाइसेंस', cta: 'सेवाएं देखें', ctaPath: '/', emoji: '💻' },
    ],
    badge: '🏛️ कानपुर नगर निगम — स्थापित 1861',
    trackBtn: 'शिकायत ट्रैक करें',
    servicesTitle: 'हमारी सेवाएं',
    servicesSub: 'नागरिकों के लिए ऑनलाइन सुविधाएं',
    deptTitle: 'प्रमुख विभाग — शिकायत आंकड़े',
    deptSub: 'सर्वाधिक शिकायत प्राप्त विभाग (वर्ष 2024-25)',
    complaintsLabel: 'शिकायतें',
    deptCta: 'शिकायत दर्ज करें',
    newsTitle: 'ताजा समाचार',
    newsSub: 'नगर निगम की नवीनतम गतिविधियां',
    helplineNum: 'हेल्पलाइन: ',
    helplineSub: '24×7 नागरिक सहायता केंद्र',
    helplineBtn: 'अभी शिकायत दर्ज करें',
  },
  en: {
    services: [
      { icon: <AlertCircle size={28}/>, label: 'Complaint Registration', desc: 'Register your issue', color: '#e74c3c', path: '/complaint' },
      { icon: <FileText size={28}/>, label: 'Property Tax', desc: 'Online Payment', color: '#2980b9', path: '/' },
      { icon: <Award size={28}/>, label: 'Birth Certificate', desc: 'Apply Online', color: '#27ae60', path: '/' },
      { icon: <FileText size={28}/>, label: 'Death Certificate', desc: 'Apply Online', color: '#8e44ad', path: '/' },
      { icon: <Shield size={28}/>, label: 'Trade License', desc: 'New / Renewal', color: '#d35400', path: '/' },
      { icon: <Construction size={28}/>, label: 'Building Construction', desc: 'Permission Application', color: '#16a085', path: '/' },
    ],
    departments: [
      { icon: <Construction size={32}/>, name: 'Roads Dept', complaints: '2,847', color: '#e74c3c' },
      { icon: <Droplets size={32}/>, name: 'Water Supply', complaints: '2,103', color: '#2980b9' },
      { icon: <Trash2 size={32}/>, name: 'Sanitation Dept', complaints: '1,856', color: '#27ae60' },
      { icon: <Zap size={32}/>, name: 'Lighting Dept', complaints: '1,542', color: '#f39c12' },
      { icon: <Dog size={32}/>, name: 'Animal Control', complaints: '987', color: '#8e44ad' },
      { icon: <TreePine size={32}/>, name: 'Parks Dept', complaints: '743', color: '#16a085' },
    ],
    stats: [
      { num: '12,000+', label: 'Complaints Resolved', icon: <CheckCircle size={22}/> },
      { num: '48 Hrs', label: 'Avg Resolution Time', icon: <Clock size={22}/> },
      { num: '5 Lakh+', label: 'Citizen Services', icon: <Users size={22}/> },
      { num: '99.2%', label: 'Satisfaction Rate', icon: <Star size={22}/> },
    ],
    news: [
      { title: 'Construction of 50 new roads begins under Kanpur Smart City Scheme', date: '12 May 2025', cat: 'Development' },
      { title: 'Nagar Nigam launches new door-to-door garbage collection campaign', date: '10 May 2025', cat: 'Sanitation' },
      { title: '5% discount on online property tax payment — last date 31 May', date: '8 May 2025', cat: 'Tax' },
      { title: 'Water Supply Dept: New pipeline project inaugurated', date: '5 May 2025', cat: 'Water' },
    ],
    slides: [
      { bg: 'linear-gradient(135deg, #003580 0%, #1a4fa0 50%, #0097a7 100%)', title: 'Clean Kanpur, Smart Kanpur', subtitle: 'Always dedicated to serving citizens', cta: 'File a Complaint', ctaPath: '/complaint', emoji: '🏙️' },
      { bg: 'linear-gradient(135deg, #1a5276 0%, #154360 50%, #0e6655 100%)', title: 'Your Problem, Our Responsibility', subtitle: '24x7 Complaint Redressal System', cta: 'Register Now', ctaPath: '/complaint', emoji: '📋' },
      { bg: 'linear-gradient(135deg, #6c3483 0%, #4a235a 50%, #1a5276 100%)', title: 'Online Services — From Home', subtitle: 'Property Tax, Certificates, Licenses', cta: 'View Services', ctaPath: '/', emoji: '💻' },
    ],
    badge: '🏛️ Kanpur Nagar Nigam — Est. 1861',
    trackBtn: 'Track Complaint',
    servicesTitle: 'Our Services',
    servicesSub: 'Online facilities for citizens',
    deptTitle: 'Key Departments — Complaint Stats',
    deptSub: 'Top complaint-receiving departments (FY 2024-25)',
    complaintsLabel: 'complaints',
    deptCta: 'File a Complaint',
    newsTitle: 'Latest News',
    newsSub: 'Latest activities of Nagar Nigam',
    helplineNum: 'Helpline: ',
    helplineSub: '24×7 Citizen Support Center',
    helplineBtn: 'File a Complaint Now',
  },
};

export default function Home() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const { lang } = useLang();
  const tx = data[lang];
  const slides = tx.slides;

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  const s = slides[slide];

  return (
    <div className="home">

      {/* Hero Slider */}
      <div className="hero" style={{ background: s.bg }}>
        <div className="hero-content">
          <div className="hero-badge">{tx.badge}</div>
          <h1 className="hero-title">{s.emoji} {s.title}</h1>
          <p className="hero-sub">{s.subtitle}</p>
          <div className="hero-btns">
            <button className="hero-cta" onClick={() => navigate(s.ctaPath)}>{s.cta}</button>
            <button className="hero-cta-outline" onClick={() => navigate('/complaint')}>{tx.trackBtn}</button>
          </div>
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button key={i} className={`dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-circle">
            <svg viewBox="0 0 160 160" width="160" height="160">
              <circle cx="80" cy="80" r="75" fill="rgba(255,215,0,0.15)" stroke="rgba(255,215,0,0.4)" strokeWidth="2"/>
              <circle cx="80" cy="80" r="60" fill="rgba(255,255,255,0.08)"/>
              <text x="80" y="75" textAnchor="middle" fontSize="18" fill="#ffd700" fontWeight="bold">KNN</text>
              <text x="80" y="95" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.8)">Since 1861</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        {tx.stats.map((st, i) => (
          <div key={i} className="stat-item">
            <div className="stat-icon">{st.icon}</div>
            <div className="stat-num">{st.num}</div>
            <div className="stat-label">{st.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Services */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">{tx.servicesTitle}</h2>
          <p className="section-sub">{tx.servicesSub}</p>
        </div>
        <div className="services-grid">
          {tx.services.map((svc, i) => (
            <button key={i} className="service-card" onClick={() => navigate(svc.path)}>
              <div className="service-icon" style={{ background: svc.color + '18', color: svc.color }}>
                {svc.icon}
              </div>
              <div className="service-label">{svc.label}</div>
              <div className="service-desc">{svc.desc}</div>
              <ChevronRight size={14} className="service-arrow" style={{ color: svc.color }} />
            </button>
          ))}
        </div>
      </section>

      {/* Top Complaint Departments */}
      <section className="section dept-section">
        <div className="section-header">
          <h2 className="section-title">{tx.deptTitle}</h2>
          <p className="section-sub">{tx.deptSub}</p>
        </div>
        <div className="dept-grid">
          {tx.departments.map((d, i) => (
            <button key={i} className="dept-card" onClick={() => navigate('/complaint')}>
              <div className="dept-icon" style={{ background: d.color + '18', color: d.color }}>{d.icon}</div>
              <div className="dept-name">{d.name}</div>
              <div className="dept-count">
                <TrendingUp size={12} />
                <span>{d.complaints} {tx.complaintsLabel}</span>
              </div>
              <div className="dept-bar">
                <div className="dept-bar-fill" style={{ background: d.color, width: `${70 - i * 8}%` }}/>
              </div>
            </button>
          ))}
        </div>
        <div className="dept-cta">
          <button className="btn-primary" onClick={() => navigate('/complaint')}>
            {tx.deptCta} <ArrowRight size={16}/>
          </button>
        </div>
      </section>

      {/* News */}
      <section className="section news-section">
        <div className="section-header">
          <h2 className="section-title">{tx.newsTitle}</h2>
          <p className="section-sub">{tx.newsSub}</p>
        </div>
        <div className="news-grid">
          {tx.news.map((n, i) => (
            <div key={i} className="news-card">
              <div className="news-cat">{n.cat}</div>
              <h3 className="news-title">{n.title}</h3>
              <div className="news-date">📅 {n.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Helpline Banner */}
      <div className="helpline-banner">
        <Phone size={28} className="helpline-icon"/>
        <div className="helpline-text">
          <div className="helpline-num">{tx.helplineNum}<strong>1533</strong></div>
          <div className="helpline-sub">{tx.helplineSub}</div>
        </div>
        <button className="helpline-btn" onClick={() => navigate('/complaint')}>
          {tx.helplineBtn}
        </button>
      </div>

    </div>
  );
}
