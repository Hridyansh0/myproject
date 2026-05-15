import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLang } from '../LanguageContext';
import './Navbar.css';

const navItems = {
  hi: [
    { label: 'होम', path: '/' },
    { label: 'हमारे बारे में', dropdown: ['परिचय', 'महापौर संदेश', 'संगठनात्मक ढांचा'] },
    { label: 'कानपुर शहर', dropdown: ['इतिहास', 'भूगोल', 'जनसांख्यिकी'] },
    { label: 'विभाग', dropdown: ['स्वास्थ्य विभाग', 'सड़क विभाग', 'जल विभाग', 'सफाई विभाग'] },
    { label: 'योजनाएं', dropdown: ['स्मार्ट सिटी', 'अमृत योजना', 'प्रधानमंत्री आवास'] },
    { label: 'सेवाएं', dropdown: ['शिकायत', 'प्रमाण पत्र', 'लाइसेंस', 'संपत्ति कर'] },
    { label: 'निविदाएं', path: '/tenders' },
    { label: 'बजट', path: '/budget' },
    { label: 'ई-गवर्नेंस', path: '/egov' },
    { label: 'डाउनलोड', path: '/downloads' },
  ],
  en: [
    { label: 'Home', path: '/' },
    { label: 'About Us', dropdown: ['Introduction', "Mayor's Message", 'Organizational Structure'] },
    { label: 'Kanpur City', dropdown: ['History', 'Geography', 'Demographics'] },
    { label: 'Departments', dropdown: ['Health Dept', 'Roads Dept', 'Water Dept', 'Sanitation Dept'] },
    { label: 'Schemes', dropdown: ['Smart City', 'Amrit Yojana', 'PM Awas'] },
    { label: 'Services', dropdown: ['Complaint', 'Certificates', 'License', 'Property Tax'] },
    { label: 'Tenders', path: '/tenders' },
    { label: 'Budget', path: '/budget' },
    { label: 'e-Governance', path: '/egov' },
    { label: 'Downloads', path: '/downloads' },
  ],
};

const t = {
  hi: {
    complaint: ['नागरिकों हेतु', 'शिकायत निवारण प्रणाली'],
    egov: 'ई-गवर्नेंस',
    property: ['ऑनलाइन', 'संपत्ति कर'],
    login: 'लॉगिन',
    logoHindi: 'कानपुर नगर निगम',
    logoEn: 'Kanpur Municipal Corporation',
  },
  en: {
    complaint: ['For Citizens', 'Complaint Redressal'],
    egov: 'e-Governance',
    property: ['Online', 'Property Tax'],
    login: 'Login',
    logoHindi: 'Kanpur Nagar Nigam',
    logoEn: 'Kanpur Municipal Corporation',
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, toggle } = useLang();
  const tx = t[lang];
  const items = navItems[lang];

  return (
    <>
      {/* Top header */}
      <div className="top-header">
        <div className="top-header-left">
          <div className="logo-area" onClick={() => navigate('/')}>
            <div className="logo-emblem">
              <svg viewBox="0 0 60 60" width="52" height="52">
                <circle cx="30" cy="30" r="28" fill="#ffd700" stroke="#e87722" strokeWidth="2"/>
                <circle cx="30" cy="30" r="22" fill="none" stroke="#003580" strokeWidth="1.5"/>
                <text x="30" y="28" textAnchor="middle" fontSize="9" fill="#003580" fontWeight="bold">KNN</text>
                <text x="30" y="38" textAnchor="middle" fontSize="6" fill="#003580">1861</text>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-hindi">{tx.logoHindi}</span>
              <span className="logo-english">{tx.logoEn}</span>
            </div>
          </div>
        </div>
        <div className="top-header-right">
          <button className="top-btn complaint-btn" onClick={() => navigate('/complaint')}>
            <span>{tx.complaint[0]}</span>
            <span>{tx.complaint[1]}</span>
          </button>
          <button className="top-btn egov-btn" onClick={() => navigate('/egov')}>
            {tx.egov}
          </button>
          <button className="top-btn property-btn" onClick={() => navigate('/property')}>
            <span>{tx.property[0]}</span>
            <span>{tx.property[1]}</span>
          </button>
          <button className="top-btn login-btn" onClick={() => navigate('/login')}>
            {tx.login}
          </button>
          {/* Language Toggle Button */}
          <button className="top-btn lang-toggle-btn" onClick={toggle} title="Switch Language">
            {lang === 'hi' ? 'EN' : 'हि'}
          </button>
        </div>
      </div>

      {/* Main nav */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-links">
            {items.map((item) => (
              <div
                key={item.label}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="nav-link"
                  onClick={() => item.path && navigate(item.path)}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown size={12} />}
                </button>
                {item.dropdown && activeDropdown === item.label && (
                  <div className="dropdown-menu">
                    {item.dropdown.map((d) => (
                      <button key={d} className="dropdown-item">{d}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {items.map((item) => (
            <button
              key={item.label}
              className="mobile-nav-item"
              onClick={() => { item.path && navigate(item.path); setMenuOpen(false); }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
