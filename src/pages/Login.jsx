import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Phone, LogIn, ArrowLeft } from 'lucide-react';
import { useLang } from '../LanguageContext';
import './Login.css';

const t = {
  hi: {
    back: 'वापस होम',
    logoHindi: 'कानपुर नगर निगम',
    logoEn: 'नागरिक लॉगिन',
    badge: '🏛️ कानपुर नगर निगम',
    leftTitle: 'नागरिक पोर्टल',
    leftSub: 'लॉगिन करें और पाएं सरकारी सेवाओं तक आसान पहुंच — शिकायत, कर भुगतान, प्रमाण पत्र और बहुत कुछ।',
    points: ['✅ ऑनलाइन शिकायत पंजीकरण', '✅ रियल-टाइम शिकायत ट्रैकिंग', '✅ डिजिटल प्रमाण पत्र', '✅ ऑनलाइन कर भुगतान'],
    tabMobile: 'मोबाइल OTP',
    tabPassword: 'पासवर्ड',
    mobileLabel: 'मोबाइल नंबर *',
    mobilePlaceholder: '10 अंकों का मोबाइल नंबर',
    sendOtp: 'OTP भेजें',
    otpSent: '✅ OTP भेजा गया: +91 ',
    otpLabel: 'OTP दर्ज करें *',
    loginBtn: 'लॉगिन करें',
    resend: 'OTP पुनः भेजें',
    userLabel: 'यूजर ID / मोबाइल *',
    userPlaceholder: 'यूजर ID या मोबाइल नंबर',
    passLabel: 'पासवर्ड *',
    passPlaceholder: 'पासवर्ड दर्ज करें',
    forgot: 'पासवर्ड भूल गए?',
    or: 'या',
    newUser: 'नए नागरिक?',
    register: 'यहाँ पंजीकरण करें',
    helpline: 'सहायता के लिए: ',
    call: ' पर कॉल करें',
    cityText: 'कानपुर — नगरी उद्योग एवं संस्कृति की',
  },
  en: {
    back: 'Back to Home',
    logoHindi: 'Kanpur Nagar Nigam',
    logoEn: 'Citizen Login',
    badge: '🏛️ Kanpur Nagar Nigam',
    leftTitle: 'Citizen Portal',
    leftSub: 'Login and get easy access to government services — complaints, tax payment, certificates and more.',
    points: ['✅ Online Complaint Registration', '✅ Real-Time Complaint Tracking', '✅ Digital Certificates', '✅ Online Tax Payment'],
    tabMobile: 'Mobile OTP',
    tabPassword: 'Password',
    mobileLabel: 'Mobile Number *',
    mobilePlaceholder: '10-digit mobile number',
    sendOtp: 'Send OTP',
    otpSent: '✅ OTP sent to: +91 ',
    otpLabel: 'Enter OTP *',
    loginBtn: 'Login',
    resend: 'Resend OTP',
    userLabel: 'User ID / Mobile *',
    userPlaceholder: 'User ID or mobile number',
    passLabel: 'Password *',
    passPlaceholder: 'Enter password',
    forgot: 'Forgot password?',
    or: 'or',
    newUser: 'New citizen?',
    register: 'Register here',
    helpline: 'For help call: ',
    call: '',
    cityText: 'Kanpur — City of Industry & Culture',
  },
};

export default function Login() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const tx = t[lang];
  const [tab, setTab] = useState('mobile');
  const [showPass, setShowPass] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  const sendOtp = () => {
    if (mobile.length === 10) setOtpSent(true);
  };

  const handleOtp = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const handleLogin = () => navigate('/');

  return (
    <div className="login-page">
      {/* Left Panel — City Image */}
      <div className="login-left">
        <div className="login-left-overlay"/>
        <div className="city-art">
          <svg viewBox="0 0 520 400" width="100%" style={{maxWidth:'480px'}}>
            <rect width="520" height="400" fill="url(#skyGrad)"/>
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#001840"/>
                <stop offset="100%" stopColor="#003580"/>
              </linearGradient>
              <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a3a20"/>
                <stop offset="100%" stopColor="#0d2010"/>
              </linearGradient>
            </defs>
            {[30,80,120,160,200,240,280,320,360,400,450,490,50,100,140,180,220,260,300,350,420,460].map((x,i)=>(
              <circle key={i} cx={x} cy={10+(i*13)%50} r="1.2" fill="white" opacity={0.5+Math.random()*0.5}/>
            ))}
            <circle cx="440" cy="55" r="30" fill="#ffd700" opacity="0.85"/>
            <circle cx="455" cy="45" r="25" fill="#003580" opacity="0.85"/>
            <rect x="0" y="300" width="520" height="100" fill="url(#groundGrad)"/>
            <rect x="0" y="310" width="520" height="18" fill="#1a5276" opacity="0.6"/>
            <rect x="0" y="316" width="520" height="4" fill="#2980b9" opacity="0.5"/>
            <rect x="40" y="180" width="80" height="125" fill="#1a2a4a"/>
            <rect x="50" y="165" width="60" height="20" fill="#243558"/>
            <polygon points="80,130 50,165 110,165" fill="#2c4070"/>
            <rect x="68" y="230" width="24" height="75" fill="#0d1a30"/>
            {[0,1,2].map(r => [0,1,2].map(c => (
              <rect key={`b1-${r}-${c}`} x={55+c*22} y={185+r*28} width="12" height="16" fill="#ffd700" opacity={0.4+Math.random()*0.4} rx="2"/>
            )))}
            <rect x="150" y="200" width="50" height="105" fill="#243050"/>
            <rect x="165" y="185" width="20" height="20" fill="#2c3a60"/>
            <ellipse cx="175" cy="183" rx="12" ry="15" fill="#1e2d50"/>
            <rect x="170" y="168" width="10" height="18" fill="#c0392b"/>
            <rect x="172" y="162" width="6" height="10" fill="#e74c3c"/>
            <circle cx="175" cy="160" r="4" fill="#ffd700"/>
            {[0,1,2].map(r => [0,1].map(c => (
              <rect key={`b2-${r}-${c}`} x={158+c*18} y={205+r*28} width="10" height="14" fill="#87ceeb" opacity={0.5+Math.random()*0.3} rx="1"/>
            )))}
            <rect x="230" y="150" width="60" height="155" fill="#162038"/>
            <rect x="240" y="140" width="40" height="15" fill="#1e2d50"/>
            <rect x="255" y="128" width="10" height="16" fill="#243558"/>
            {[0,1,2,3,4].map(r => [0,1,2].map(c => (
              <rect key={`b3-${r}-${c}`} x={236+c*16} y={155+r*24} width="11" height="16" fill={r===0||c===1?"#ffd700":"#4a90d9"} opacity={0.35+Math.random()*0.4} rx="1"/>
            )))}
            <rect x="320" y="210" width="70" height="95" fill="#1e2a42"/>
            <rect x="330" y="198" width="50" height="16" fill="#253252"/>
            <polygon points="355,175 330,200 380,200" fill="#2c3e6a"/>
            {[0,1,2].map(r => [0,1,2].map(c => (
              <rect key={`b4-${r}-${c}`} x={328+c*18} y={215+r*24} width="12" height="16" fill="#ffd700" opacity={0.3+Math.random()*0.4} rx="2"/>
            )))}
            <rect x="415" y="230" width="50" height="75" fill="#162030"/>
            <rect x="422" y="220" width="36" height="14" fill="#1e2c44"/>
            {[0,1].map(r => [0,1].map(c => (
              <rect key={`b5-${r}-${c}`} x={424+c*16} y={234+r*22} width="10" height="14" fill="#4a90d9" opacity={0.5} rx="1"/>
            )))}
            {[130,195,310,395,480].map((x,i) => (
              <g key={`tree-${i}`}>
                <rect x={x} y="295" width="5" height="20" fill="#5d4037"/>
                <ellipse cx={x+2.5} cy="290" rx="12" ry="16" fill="#1a5e20" opacity="0.9"/>
              </g>
            ))}
            {[100,260,400].map((x,i) => (
              <g key={`light-${i}`}>
                <rect x={x} y="270" width="3" height="35" fill="#555"/>
                <ellipse cx={x+1.5} cy="268" rx="8" ry="5" fill="rgba(255,255,100,0.4)"/>
                <circle cx={x+1.5} cy="270" r="4" fill="#ffd700" opacity="0.9"/>
              </g>
            ))}
            <text x="260" y="380" textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.5)" fontFamily="sans-serif">{tx.cityText}</text>
          </svg>
        </div>
        <div className="login-left-text">
          <div className="ll-badge">{tx.badge}</div>
          <h2 className="ll-title">{tx.leftTitle}</h2>
          <p className="ll-sub">{tx.leftSub}</p>
          <div className="ll-points">
            {tx.points.map(p => <div key={p} className="ll-point">{p}</div>)}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="login-right">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16}/> {tx.back}
        </button>

        <div className="login-form-box">
          <div className="lf-logo">
            <svg viewBox="0 0 60 60" width="56" height="56">
              <circle cx="30" cy="30" r="28" fill="#ffd700" stroke="#e87722" strokeWidth="2"/>
              <circle cx="30" cy="30" r="22" fill="none" stroke="#003580" strokeWidth="1.5"/>
              <text x="30" y="28" textAnchor="middle" fontSize="9" fill="#003580" fontWeight="bold">KNN</text>
              <text x="30" y="38" textAnchor="middle" fontSize="6" fill="#003580">1861</text>
            </svg>
            <div>
              <div className="lf-logo-h">{tx.logoHindi}</div>
              <div className="lf-logo-e">{tx.logoEn}</div>
            </div>
          </div>

          <div className="login-tabs">
            <button className={`ltab ${tab === 'mobile' ? 'active' : ''}`} onClick={() => setTab('mobile')}>
              <Phone size={14}/> {tx.tabMobile}
            </button>
            <button className={`ltab ${tab === 'password' ? 'active' : ''}`} onClick={() => setTab('password')}>
              <Lock size={14}/> {tx.tabPassword}
            </button>
          </div>

          {tab === 'mobile' && (
            <div className="login-fields">
              <div className="field-group">
                <label>{tx.mobileLabel}</label>
                <div className="input-with-prefix">
                  <span className="prefix">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder={tx.mobilePlaceholder}
                    value={mobile}
                    onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
                    disabled={otpSent}
                  />
                </div>
              </div>
              {!otpSent ? (
                <button className="submit-btn" onClick={sendOtp} disabled={mobile.length !== 10}>
                  {tx.sendOtp}
                </button>
              ) : (
                <>
                  <div className="otp-sent-msg">{tx.otpSent}{mobile}</div>
                  <div className="field-group">
                    <label>{tx.otpLabel}</label>
                    <div className="otp-inputs">
                      {otp.map((d, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          type="text"
                          maxLength={1}
                          className="otp-box"
                          value={d}
                          onChange={e => handleOtp(i, e.target.value)}
                        />
                      ))}
                    </div>
                  </div>
                  <button className="submit-btn" onClick={handleLogin}>
                    <LogIn size={16}/> {tx.loginBtn}
                  </button>
                  <button className="resend-btn" onClick={() => { setOtp(['','','','','','']); }}>
                    {tx.resend}
                  </button>
                </>
              )}
            </div>
          )}

          {tab === 'password' && (
            <div className="login-fields">
              <div className="field-group">
                <label>{tx.userLabel}</label>
                <input type="text" placeholder={tx.userPlaceholder} value={userId} onChange={e => setUserId(e.target.value)} />
              </div>
              <div className="field-group">
                <label>{tx.passLabel}</label>
                <div className="input-with-icon">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder={tx.passPlaceholder}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button className="eye-btn" type="button" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>
              <div className="forgot-row">
                <button className="forgot-btn">{tx.forgot}</button>
              </div>
              <button className="submit-btn" onClick={handleLogin}>
                <LogIn size={16}/> {tx.loginBtn}
              </button>
            </div>
          )}

          <div className="login-divider"><span>{tx.or}</span></div>
          <div className="register-row">
            {tx.newUser}{' '}
            <button className="reg-link">{tx.register}</button>
          </div>

          <div className="helpline-note">
            {tx.helpline}<strong>1533</strong>{tx.call}
          </div>
        </div>
      </div>
    </div>
  );
}
