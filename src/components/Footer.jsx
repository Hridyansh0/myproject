import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useLang } from '../LanguageContext';
import './Footer.css';

const t = {
  hi: {
    logoHindi: 'कानपुर नगर निगम',
    logoEn: 'Kanpur Municipal Corporation',
    desc: 'नागरिकों की सेवा में सदैव तत्पर — स्वच्छ, सुंदर और स्मार्ट कानपुर के निर्माण में आपका साझीदार।',
    quickLinks: 'त्वरित लिंक',
    links: ['शिकायत पंजीकरण', 'संपत्ति कर भुगतान', 'जन्म/मृत्यु प्रमाण पत्र', 'ट्रेड लाइसेंस', 'निविदाएं', 'बजट दस्तावेज'],
    departments: 'विभाग',
    depts: ['स्वास्थ्य एवं सफाई विभाग', 'सड़क एवं निर्माण विभाग', 'जल आपूर्ति विभाग', 'प्रकाश व्यवस्था विभाग', 'उद्यान विभाग', 'पशु नियंत्रण विभाग'],
    contact: 'संपर्क करें',
    address: 'नगर निगम भवन, मेस्टन रोड, कानपुर - 208001',
    phone: '0512-2530606 | हेल्पलाइन: 1533',
    fb: 'फेसबुक', tw: 'ट्विटर', yt: 'यूट्यूब',
    copy: '© 2025 कानपुर नगर निगम | सर्वाधिकार सुरक्षित',
    policy: 'वेबसाइट नीति | गोपनीयता नीति | साइटमैप',
  },
  en: {
    logoHindi: 'Kanpur Nagar Nigam',
    logoEn: 'Kanpur Municipal Corporation',
    desc: 'Always committed to serving citizens — your partner in building a clean, beautiful and smart Kanpur.',
    quickLinks: 'Quick Links',
    links: ['Complaint Registration', 'Property Tax Payment', 'Birth/Death Certificate', 'Trade License', 'Tenders', 'Budget Documents'],
    departments: 'Departments',
    depts: ['Health & Sanitation Dept', 'Roads & Construction Dept', 'Water Supply Dept', 'Street Lighting Dept', 'Parks & Gardens Dept', 'Animal Control Dept'],
    contact: 'Contact Us',
    address: 'Nagar Nigam Bhavan, Meston Road, Kanpur - 208001',
    phone: '0512-2530606 | Helpline: 1533',
    fb: 'Facebook', tw: 'Twitter', yt: 'YouTube',
    copy: '© 2025 Kanpur Nagar Nigam | All Rights Reserved',
    policy: 'Website Policy | Privacy Policy | Sitemap',
  },
};

export default function Footer() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <div className="footer-logo">
            <svg viewBox="0 0 60 60" width="48" height="48">
              <circle cx="30" cy="30" r="28" fill="#ffd700" stroke="#e87722" strokeWidth="2"/>
              <circle cx="30" cy="30" r="22" fill="none" stroke="#003580" strokeWidth="1.5"/>
              <text x="30" y="28" textAnchor="middle" fontSize="9" fill="#003580" fontWeight="bold">KNN</text>
              <text x="30" y="38" textAnchor="middle" fontSize="6" fill="#003580">1861</text>
            </svg>
            <div>
              <div className="footer-logo-hindi">{tx.logoHindi}</div>
              <div className="footer-logo-en">{tx.logoEn}</div>
            </div>
          </div>
          <p className="footer-desc">{tx.desc}</p>
        </div>

        <div className="footer-col">
          <h4>{tx.quickLinks}</h4>
          <ul>
            {tx.links.map(l => <li key={l}>{l}</li>)}
          </ul>
        </div>

        <div className="footer-col">
          <h4>{tx.departments}</h4>
          <ul>
            {tx.depts.map(d => <li key={d}>{d}</li>)}
          </ul>
        </div>

        <div className="footer-col">
          <h4>{tx.contact}</h4>
          <div className="footer-contact">
            <div className="contact-item">
              <MapPin size={16} />
              <span>{tx.address}</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>{tx.phone}</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>info@kanpurnagarnigam.in</span>
            </div>
          </div>
          <div className="social-links">
            <button className="social-btn fb">{tx.fb}</button>
            <button className="social-btn tw">{tx.tw}</button>
            <button className="social-btn yt">{tx.yt}</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{tx.copy}</span>
        <span>{tx.policy}</span>
      </div>
    </footer>
  );
}
