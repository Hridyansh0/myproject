import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload, Camera, X, CheckCircle, AlertCircle, ChevronDown,
  Construction, Droplets, Zap, Trash2, Dog, TreePine, 
  Shield, Activity, Home, Wind
} from 'lucide-react';
import { useLang } from '../LanguageContext';
import './Complaint.css';

const categoriesData = {
  hi: [
    { id: 'road', label: 'सड़क विभाग', icon: <Construction size={18}/>, color: '#e74c3c', subCategories: [{ code: 'RD001', label: 'सड़क में गड्ढे' }, { code: 'RD002', label: 'सड़क टूटी हुई' }, { code: 'RD003', label: 'फुटपाथ क्षतिग्रस्त' }, { code: 'RD004', label: 'नाली अवरुद्ध' }, { code: 'RD005', label: 'सड़क पर अतिक्रमण' }] },
    { id: 'water', label: 'जल आपूर्ति विभाग', icon: <Droplets size={18}/>, color: '#2980b9', subCategories: [{ code: 'WT001', label: 'पानी की आपूर्ति बंद' }, { code: 'WT002', label: 'पाइप लीकेज' }, { code: 'WT003', label: 'दूषित पानी' }, { code: 'WT004', label: 'जल कनेक्शन समस्या' }, { code: 'WT005', label: 'ओवरहेड टैंक खराब' }] },
    { id: 'sewer', label: 'सीवर/नाला विभाग', icon: <Activity size={18}/>, color: '#8e44ad', subCategories: [{ code: 'SW001', label: 'सीवर ओवरफ्लो' }, { code: 'SW002', label: 'सीवर ब्लॉक' }, { code: 'SW003', label: 'नाला अवरुद्ध' }, { code: 'SW004', label: 'सीवर लाइन टूटी' }] },
    { id: 'light', label: 'प्रकाश/स्ट्रीट लाइट', icon: <Zap size={18}/>, color: '#f39c12', subCategories: [{ code: 'LT001', label: 'स्ट्रीट लाइट बंद' }, { code: 'LT002', label: 'खंभा टूटा हुआ' }, { code: 'LT003', label: 'तार लटका हुआ' }, { code: 'LT004', label: 'नई लाइट लगाना' }] },
    { id: 'sanitation', label: 'स्वास्थ्य/सफाई', icon: <Trash2 size={18}/>, color: '#27ae60', subCategories: [{ code: 'SN001', label: 'कूड़ा नहीं उठाना' }, { code: 'SN002', label: 'गंदगी फैली हुई' }, { code: 'SN003', label: 'डस्टबिन क्षतिग्रस्त' }, { code: 'SN004', label: 'नाली सफाई' }, { code: 'SN005', label: 'फॉगिंग नहीं हुई' }] },
    { id: 'toilet', label: 'सार्वजनिक शौचालय', icon: <Home size={18}/>, color: '#16a085', subCategories: [{ code: 'PT001', label: 'शौचालय बंद है' }, { code: 'PT002', label: 'शौचालय गंदा है' }, { code: 'PT003', label: 'शौचालय क्षतिग्रस्त' }, { code: 'PT004', label: 'नया शौचालय चाहिए' }] },
    { id: 'animal', label: 'पशु नियंत्रण', icon: <Dog size={18}/>, color: '#d35400', subCategories: [{ code: 'AN001', label: 'आवारा कुत्ते का खतरा' }, { code: 'AN002', label: 'आवारा गाय/सांड' }, { code: 'AN003', label: 'पशु कल्याण शिकायत' }] },
    { id: 'park', label: 'उद्यान/पार्क', icon: <TreePine size={18}/>, color: '#1abc9c', subCategories: [{ code: 'PK001', label: 'पार्क रखरखाव' }, { code: 'PK002', label: 'पेड़ काटना' }, { code: 'PK003', label: 'झूले खराब' }] },
    { id: 'env', label: 'पर्यावरण', icon: <Wind size={18}/>, color: '#2ecc71', subCategories: [{ code: 'EV001', label: 'कचरा जलाना' }, { code: 'EV002', label: 'प्रदूषण शिकायत' }, { code: 'EV003', label: 'अवैध निर्माण' }] },
    { id: 'misc', label: 'अन्य/विविध', icon: <Shield size={18}/>, color: '#7f8c8d', subCategories: [{ code: 'MC001', label: 'अन्य शिकायत' }, { code: 'MC002', label: 'सुझाव' }] },
  ],
  en: [
    { id: 'road', label: 'Roads Department', icon: <Construction size={18}/>, color: '#e74c3c', subCategories: [{ code: 'RD001', label: 'Potholes on Road' }, { code: 'RD002', label: 'Broken Road' }, { code: 'RD003', label: 'Damaged Footpath' }, { code: 'RD004', label: 'Blocked Drain' }, { code: 'RD005', label: 'Road Encroachment' }] },
    { id: 'water', label: 'Water Supply Dept', icon: <Droplets size={18}/>, color: '#2980b9', subCategories: [{ code: 'WT001', label: 'Water Supply Stopped' }, { code: 'WT002', label: 'Pipe Leakage' }, { code: 'WT003', label: 'Contaminated Water' }, { code: 'WT004', label: 'Connection Issue' }, { code: 'WT005', label: 'Overhead Tank Faulty' }] },
    { id: 'sewer', label: 'Sewer/Drainage Dept', icon: <Activity size={18}/>, color: '#8e44ad', subCategories: [{ code: 'SW001', label: 'Sewer Overflow' }, { code: 'SW002', label: 'Sewer Blocked' }, { code: 'SW003', label: 'Drain Blocked' }, { code: 'SW004', label: 'Sewer Line Broken' }] },
    { id: 'light', label: 'Street Lighting', icon: <Zap size={18}/>, color: '#f39c12', subCategories: [{ code: 'LT001', label: 'Street Light Off' }, { code: 'LT002', label: 'Pole Broken' }, { code: 'LT003', label: 'Wire Hanging' }, { code: 'LT004', label: 'New Light Required' }] },
    { id: 'sanitation', label: 'Health/Sanitation', icon: <Trash2 size={18}/>, color: '#27ae60', subCategories: [{ code: 'SN001', label: 'Garbage Not Collected' }, { code: 'SN002', label: 'Garbage Spread' }, { code: 'SN003', label: 'Dustbin Damaged' }, { code: 'SN004', label: 'Drain Cleaning' }, { code: 'SN005', label: 'Fogging Not Done' }] },
    { id: 'toilet', label: 'Public Toilet', icon: <Home size={18}/>, color: '#16a085', subCategories: [{ code: 'PT001', label: 'Toilet Closed' }, { code: 'PT002', label: 'Toilet Dirty' }, { code: 'PT003', label: 'Toilet Damaged' }, { code: 'PT004', label: 'New Toilet Required' }] },
    { id: 'animal', label: 'Animal Control', icon: <Dog size={18}/>, color: '#d35400', subCategories: [{ code: 'AN001', label: 'Stray Dog Danger' }, { code: 'AN002', label: 'Stray Cow/Bull' }, { code: 'AN003', label: 'Animal Welfare Issue' }] },
    { id: 'park', label: 'Parks/Gardens', icon: <TreePine size={18}/>, color: '#1abc9c', subCategories: [{ code: 'PK001', label: 'Park Maintenance' }, { code: 'PK002', label: 'Tree Cutting' }, { code: 'PK003', label: 'Swing Damaged' }] },
    { id: 'env', label: 'Environment', icon: <Wind size={18}/>, color: '#2ecc71', subCategories: [{ code: 'EV001', label: 'Burning Garbage' }, { code: 'EV002', label: 'Pollution Complaint' }, { code: 'EV003', label: 'Illegal Construction' }] },
    { id: 'misc', label: 'Other/Miscellaneous', icon: <Shield size={18}/>, color: '#7f8c8d', subCategories: [{ code: 'MC001', label: 'Other Complaint' }, { code: 'MC002', label: 'Suggestion' }] },
  ],
};

// const mohallasData = {
//   hi: ['आर्य नगर', 'कल्याणपुर', 'गोविंद नगर', 'जाजमऊ', 'नौबस्ता', 'पनकी', 'बर्रा', 'बिठूर', 'मोतीझील', 'रावतपुर', 'लाल इमली', 'विकास नगर', 'स्वरूप नगर', 'हरजेंडर नगर'],
//   en: ['Arya Nagar', 'Kalyanpur', 'Govind Nagar', 'Jajmau', 'Naubasta', 'Panki', 'Barra', 'Bithoor', 'Motijheel', 'Rawatpur', 'Lal Imli', 'Vikas Nagar', 'Swaroop Nagar', 'Harjender Nagar'],
// };

const mohallasData = { 
  
  en: [
  "LAXMI PURWA",
  "RAI PURWA",
  "ANWAR GANJ",
  "SISAMAU SOUTH",
  "HARBANSH MOHAL",
  "CIVIL LINES",
  "CHATTAI MOHAL",
  "DALEL PURWA",
  "COOPER GANJ",
  "DANAKHORI",
  "PATKAPUR",
  "MAHESHAWARI MOHAL",
  "CHOWK SARRAFA",
  "PRADE",
  "GENERAL GANJ",
  "COLLECTOR GANJ",
  "CHAMAN GANJ",
  "NAZIR BAGH",
  "YASHODA NAGAR WEST",
  "JAJMAU NORTH",
  "CHANDARI",

  "SAFIPUR",
  "CHAKERI",
  "HANS PURAM AWAS VIKAS",
  "KRISHNA NAGAR",
  "GANDHIGRAM",
  "HARJINDER NAGAR",
  "OM PURWA",
  "SANIGAWAN",
  "HANS PURAM",
  "YASHODA NAGAR EAST",
  "DAHELI SUJANPUR KDA COLONY",
  "TIWARIPUR",
  "SWARDA JAYANTI VIHAR",
  "NAUBASTA EAST",
  "PASHUPANTI NAGAR",
  "RAJEEV NAGAR NAUBASTA EAST",
  "JAJMAU SOUTH",
  "SHYAM NAGAR SUJAT GANJ",
  "KAKADEO",
  "HARIHARNATH SHASTRI NAGAR",

  "SABZI MANDI KIDWAI NAGAR",
  "USMANPUR",
  "KHANDIPUR",
  "AJEET GANJ",
  "JUHI HAMIRPUR ROAD",
  "TRANSPORT NAGAR",
  "KARRHI",
  "BARRA NORTH",
  "BABU PURWA COLONY",
  "JARAULI",
  "JUHI KALA",
  "BINGAWAN",
  "BASANT VIHAR",
  "KIDWAI NAGAR SOUTH",
  "KIDWAI NAGAR NORTH",
  "BEGAM PURWA",
  "BABOO PURWA",

  "CHUNNI GANJ",
  "GWALTOLI",
  "JAWAHAR NAGAR",
  "BEHNA JHABHAR",
  "OLD KANPUR",
  "MECROBERT GANJ",
  "ASHOK NAGAR",
  "PERMAT",
  "GANDHI NAGAR",
  "SISAMAU NORTH",
  "TILAK NAGAR",
  "SUTHER GUNJ",
  "BECON GANJ",
  "TALAK MOHAL",
  "COLNEL GANJ",

  "GOVIND NAGAR HARIJAN BASTI",
  "BHANNANAPURWA",
  "NIRALA NAGAR",
  "RAVIDAS PURAM",
  "JUHI",
  "FAZAL GANJ",
  "RATANLAL NAGAR",
  "World Bank Barra",
  "GOVIND NAGAR SOUTH",
  "PANKI",
  "BARRA",
  "SARAIMITA",
  "GUJAIN COLONEY",
  "SWARAJ NAGAR PANKI",
  "BARRA WEST",
  "SARVODAYA NAGAR",
  "KAUSHAL PURI",
  "GOVIND NAGAR NORTH",
  "LAJPAT NAGAR",

  "MASWANPUR",
  "NARAMAU",
  "KALYANPUR SOUTH",
  "KALYANPUR(AWAS VIKAS)",
  "NAVEEN NAGAR KAKADEO",
  "NANKARI",
  "AMBEDKAR NAGAR",
  "VIJAY NAGAR",
  "KALYANPUR NORTH",
  "VISHNUPURI",
  "NAWABGANJ",
  "KHYORA",
  "GITA NAGAR",
  "BINAYAKPUR",
  "RAWAT PUR",
  "SAROJNI NAGAR"
],

hi : [ "लक्ष्मी पुरवा",
  "राय पुरवा",
  "अनवर गंज",
  "सीसामऊ साउथ",
  "हरबंश मोहल",
  "सिविल लाइंस",
  "चटाई मोहल",
  "दलेल पुरवा",
  "कूपर गंज",
  "दानाखोरी",
  "पटकापुर",
  "महेश्वरी मोहल",
  "चौक सर्राफा",
  "परेड",
  "जनरल गंज",
  "कलेक्टर गंज",
  "चमन गंज",
  "नजीर बाग",
  "यशोदा नगर वेस्ट",
  "जाजमऊ नॉर्थ",
  "चंदारी",

  "सफीपुर",
  "चकेरी",
  "हंस पुरम आवास विकास",
  "कृष्णा नगर",
  "गांधीग्राम",
  "हरजिंदर नगर",
  "ओम पुरवा",
  "सनीगवां",
  "हंस पुरम",
  "यशोदा नगर ईस्ट",
  "दहेली सुजानपुर केडीए कॉलोनी",
  "तिवारिपुर",
  "स्वर्ण जयंती विहार",
  "नौबस्ता ईस्ट",
  "पशुपति नगर",
  "राजीव नगर नौबस्ता ईस्ट",
  "जाजमऊ साउथ",
  "श्याम नगर सुजात गंज",
  "काकादेव",
  "हरिहरनाथ शास्त्री नगर",

  "सब्जी मंडी किदवई नगर",
  "उस्मानपुर",
  "खंडीपुर",
  "अजीत गंज",
  "जूही हमीरपुर रोड",
  "ट्रांसपोर्ट नगर",
  "कर्रही",
  "बर्रा नॉर्थ",
  "बाबू पुरवा कॉलोनी",
  "जरौली",
  "जूही कला",
  "बिंगवां",
  "बसंत विहार",
  "किदवई नगर साउथ",
  "किदवई नगर नॉर्थ",
  "बेगम पुरवा",
  "बाबू पुरवा",

  "चुन्नी गंज",
  "ग्वालटोली",
  "जवाहर नगर",
  "बेहना झभर",
  "ओल्ड कानपुर",
  "मैकरोबर्ट गंज",
  "अशोक नगर",
  "परमट",
  "गांधी नगर",
  "सीसामऊ नॉर्थ",
  "तिलक नगर",
  "सुतर गंज",
  "बेगम गंज",
  "तलाक मोहल",
  "कर्नलगंज",

  "गोविंद नगर हरिजन बस्ती",
  "भन्नानापुरवा",
  "निराला नगर",
  "रविदास पुरम",
  "जूही",
  "फजलगंज",
  "रतनलाल नगर",
  "वर्ल्ड बैंक बर्रा",
  "गोविंद नगर साउथ",
  "पनकी",
  "बर्रा",
  "सरायमीता",
  "गुजैनी कॉलोनी",
  "स्वराज नगर पनकी",
  "बर्रा वेस्ट",
  "सर्वोदय नगर",
  "कौशलपुरी",
  "गोविंद नगर नॉर्थ",
  "लाजपत नगर",

  "मस्वानपुर",
  "नरमऊ",
  "कल्याणपुर साउथ",
  "कल्याणपुर (आवास विकास)",
  "नवीन नगर काकादेव",
  "ननकारी",
  "अंबेडकर नगर",
  "विजय नगर",
  "कल्याणपुर नॉर्थ",
  "विष्णुपुरी",
  "नवाबगंज",
  "ख्योरा",
  "गीता नगर",
  "बिनायकपुर",
  "रावतपुर",
  "सरोजनी नगर"]}


  const hindiToEnglishAreaMap = {
  "लक्ष्मी पुरवा": "LAXMI PURWA",
  "राय पुरवा": "RAI PURWA",
  "अनवर गंज": "ANWAR GANJ",
  "सिसामऊ साउथ": "SISAMAU SOUTH",
  "हरबंश मोहल": "HARBANSH MOHAL",
  "सिविल लाइन्स": "CIVIL LINES",
  "चट्टाई मोहल": "CHATTAI MOHAL",
  "दलेल पुरवा": "DALEL PURWA",
  "कूपर गंज": "COOPER GANJ",
  "दानाखोरी": "DANAKHORI",
  "पटकापुर": "PATKAPUR",
  "महेश्वरी मोहल": "MAHESHAWARI MOHAL",
  "चौक सर्राफा": "CHOWK SARRAFA",
  "परेड": "PRADE",
  "जनरल गंज": "GENERAL GANJ",
  "कलेक्टर गंज": "COLLECTOR GANJ",
  "चमन गंज": "CHAMAN GANJ",
  "नज़ीर बाग": "NAZIR BAGH",
  "यशोदा नगर पश्चिम": "YASHODA NAGAR WEST",
  "जाजमऊ उत्तर": "JAJMAU NORTH",
  "चंदारी": "CHANDARI",

  "सफीपुर": "SAFIPUR",
  "चकेरी": "CHAKERI",
  "हंस पुरम आवास विकास": "HANS PURAM AWAS VIKAS",
  "कृष्णा नगर": "KRISHNA NAGAR",
  "गांधीग्राम": "GANDHIGRAM",
  "हरजिंदर नगर": "HARJINDER NAGAR",
  "ओम पुरवा": "OM PURWA",
  "सनिगवां": "SANIGAWAN",
  "हंस पुरम": "HANS PURAM",
  "यशोदा नगर पूर्व": "YASHODA NAGAR EAST",
  "दहेली सुजानपुर केडीए कॉलोनी": "DAHELI SUJANPUR KDA COLONY",
  "तिवारीपुर": "TIWARIPUR",
  "स्वर्ण जयंती विहार": "SWARDA JAYANTI VIHAR",
  "नौबस्ता पूर्व": "NAUBASTA EAST",
  "पशुपति नगर": "PASHUPANTI NAGAR",
  "राजीव नगर नौबस्ता पूर्व": "RAJEEV NAGAR NAUBASTA EAST",
  "जाजमऊ दक्षिण": "JAJMAU SOUTH",
  "श्याम नगर सुजात गंज": "SHYAM NAGAR SUJAT GANJ",
  "काकादेव": "KAKADEO",
  "हरिहरनाथ शास्त्री नगर": "HARIHARNATH SHASTRI NAGAR",

  "सब्जी मंडी किदवई नगर": "SABZI MANDI KIDWAI NAGAR",
  "उस्मानपुर": "USMANPUR",
  "खंडीपुर": "KHANDIPUR",
  "अजीत गंज": "AJEET GANJ",
  "जुही हमीरपुर रोड": "JUHI HAMIRPUR ROAD",
  "ट्रांसपोर्ट नगर": "TRANSPORT NAGAR",
  "कर्रही": "KARRHI",
  "बर्रा उत्तर": "BARRA NORTH",
  "बाबू पुरवा कॉलोनी": "BABU PURWA COLONY",
  "जरौली": "JARAULI",
  "जुही कला": "JUHI KALA",
  "बिंगावां": "BINGAWAN",
  "बसंत विहार": "BASANT VIHAR",
  "किदवई नगर दक्षिण": "KIDWAI NAGAR SOUTH",
  "किदवई नगर उत्तर": "KIDWAI NAGAR NORTH",
  "बेगम पुरवा": "BEGAM PURWA",
  "बाबू पुरवा": "BABOO PURWA",

  "चुन्नी गंज": "CHUNNI GANJ",
  "ग्वालटोली": "GWALTOLI",
  "जवाहर नगर": "JAWAHAR NAGAR",
  "बेहना झभर": "BEHNA JHABHAR",
  "ओल्ड कानपुर": "OLD KANPUR",
  "मैकरोबर्ट गंज": "MECROBERT GANJ",
  "अशोक नगर": "ASHOK NAGAR",
  "परमट": "PERMAT",
  "गांधी नगर": "GANDHI NAGAR",
  "सिसामऊ उत्तर": "SISAMAU NORTH",
  "तिलक नगर": "TILAK NAGAR",
  "सुथर गंज": "SUTHER GUNJ",
  "बेकन गंज": "BECON GANJ",
  "तलाक मोहल": "TALAK MOHAL",
  "कर्नलगंज": "COLNEL GANJ",

  "गोविंद नगर हरिजन बस्ती": "GOVIND NAGAR HARIJAN BASTI",
  "भन्नानापुरवा": "BHANNANAPURWA",
  "निराला नगर": "NIRALA NAGAR",
  "रविदास पुरम": "RAVIDAS PURAM",
  "जुही": "JUHI",
  "फजलगंज": "FAZAL GANJ",
  "रतनलाल नगर": "RATANLAL NAGAR",
  "वर्ल्ड बैंक बर्रा": "World Bank Barra",
  "गोविंद नगर दक्षिण": "GOVIND NAGAR SOUTH",
  "पनकी": "PANKI",
  "बर्रा": "BARRA",
  "सरायमीता": "SARAIMITA",
  "गुजैन कॉलोनी": "GUJAIN COLONEY",
  "स्वराज नगर पनकी": "SWARAJ NAGAR PANKI",
  "बर्रा पश्चिम": "BARRA WEST",
  "सर्वोदय नगर": "SARVODAYA NAGAR",
  "कौशल पुरी": "KAUSHAL PURI",
  "गोविंद नगर उत्तर": "GOVIND NAGAR NORTH",
  "लाजपत नगर": "LAJPAT NAGAR",

  "मसवानपुर": "MASWANPUR",
  "नरमऊ": "NARAMAU",
  "कल्याणपुर दक्षिण": "KALYANPUR SOUTH",
  "कल्याणपुर (आवास विकास)": "KALYANPUR(AWAS VIKAS)",
  "नवीन नगर काकादेव": "NAVEEN NAGAR KAKADEO",
  "ननकारी": "NANKARI",
  "अंबेडकर नगर": "AMBEDKAR NAGAR",
  "विजय नगर": "VIJAY NAGAR",
  "कल्याणपुर उत्तर": "KALYANPUR NORTH",
  "विष्णुपुरी": "VISHNUPURI",
  "नवाबगंज": "NAWABGANJ",
  "ख्योरा": "KHYORA",
  "गीता नगर": "GITA NAGAR",
  "बिनायकपुर": "BINAYAKPUR",
  "रावत पुर": "RAWAT PUR",
  "सरोजनी नगर": "SAROJNI NAGAR"
};


const t = {
  hi: {
    home: 'होम', egov: 'ई-गवर्नेंस', pageTitle: 'शिकायत रजिस्ट्रेशन',
    required: 'सभी (*) चिह्नित फ़ील्ड अनिवार्य हैं',
    catLabel: 'शिकायत श्रेणी *', catPlaceholder: 'श्रेणी चुनें',
    mohallaLabel: 'मोहल्ला *', mohallaPH: 'मोहल्ला का चयन करें',
    subCatLabel: 'उप श्रेणी *', subCatPH: 'कोड चुनें',
    kshetraLabel: 'क्षेत्र *', kshetraReadonly: 'Auto select on mohalla.',
    nameLabel: 'नाम *', namePH: 'नाम',
    wardLabel: 'वार्ड *',
    mobileLabel: 'मोबाइल नंबर *', mobilePH: '9456964569',
    emailLabel: 'ईमेल', emailPH: 'ईमेल',
    photoLabel: 'तस्वीर डालिये (अधिकतम 4)',
    uploadBtn: 'फ़ाइल चुनें', uploadSub: 'Gallery से Upload करें',
    or: 'या',
    cameraBtn: 'फोटो लें', cameraSub: 'Camera से Click करें',
    descLabel: 'शिकायत का विवरण *', descPH: 'अपनी शिकायत का विस्तृत विवरण लिखें...',
    sthanLabel: 'स्थान *', sthanPH: 'कम्प्लेन सम्बंधित जगह का नाम',
    addressLabel: 'पता *', addressPH: 'पूरा पता दर्ज करें',
    cancel: 'रद्द करें', submit: 'शिकायत दर्ज करें',
    alertMsg: 'कृपया सभी अनिवार्य (*) फ़ील्ड भरें।',
    successTitle: 'शिकायत सफलतापूर्वक दर्ज हुई!',
    tokenLabel: 'आपका शिकायत टोकन नंबर',
    successMsg: 'आपकी शिकायत 48 घंटों में हल की जाएगी। टोकन नंबर सुरक्षित रखें।',
    smsSub: 'SMS द्वारा भी सूचना दी जाएगी: +91 ',
    homeBtn: 'होम पेज', newBtn: 'नई शिकायत',
    autoKshetra: 'कानपुर (उत्तर)',
    wardPrefix: 'वार्ड ',
  },
  en: {
    home: 'Home', egov: 'e-Governance', pageTitle: 'Complaint Registration',
    required: 'All (*) marked fields are mandatory',
    catLabel: 'Complaint Category *', catPlaceholder: 'Select Category',
    mohallaLabel: 'Locality *', mohallaPH: 'Select Locality',
    subCatLabel: 'Sub Category *', subCatPH: 'Select Code',
    kshetraLabel: 'Zone *', kshetraReadonly: 'Auto select on locality.',
    nameLabel: 'Name *', namePH: 'Full Name',
    wardLabel: 'Ward *',
    mobileLabel: 'Mobile Number *', mobilePH: '9456964569',
    emailLabel: 'Email', emailPH: 'Email address',
    photoLabel: 'Attach Photos (max 4)',
    uploadBtn: 'Choose File', uploadSub: 'Upload from Gallery',
    or: 'or',
    cameraBtn: 'Take Photo', cameraSub: 'Click from Camera',
    descLabel: 'Complaint Description *', descPH: 'Describe your complaint in detail...',
    sthanLabel: 'Location *', sthanPH: 'Name of the complaint location',
    addressLabel: 'Address *', addressPH: 'Enter full address',
    cancel: 'Cancel', submit: 'Submit Complaint',
    alertMsg: 'Please fill all mandatory (*) fields.',
    successTitle: 'Complaint Registered Successfully!',
    tokenLabel: 'Your Complaint Token Number',
    successMsg: 'Your complaint will be resolved within 48 hours. Keep the token number safe.',
    smsSub: 'You will also be notified via SMS: +91 ',
    homeBtn: 'Home Page', newBtn: 'New Complaint',
    autoKshetra: 'Kanpur (North)',
    wardPrefix: 'Ward ',
  },
};


const zones = {
  zone1: [
    "LAXMI PURWA",
    "RAI PURWA",
    "ANWAR GANJ",
    "SISAMAU SOUTH",
    "HARBANSH MOHAL",
    "CIVIL LINES",
    "CHATTAI MOHAL",
    "DALEL PURWA",
    "COOPER GANJ",
    "DANAKHORI",
    "PATKAPUR",
    "MAHESHAWARI MOHAL",
    "CHOWK SARRAFA",
    "PRADE",
    "GENERAL GANJ",
    "COLLECTOR GANJ",
    "CHAMAN GANJ",
    "NAZIR BAGH",
    "YASHODA NAGAR WEST",
    "JAJMAU NORTH",
    "CHANDARI"
  ],

  zone2: [
    "SAFIPUR",
    "CHAKERI",
    "HANS PURAM AWAS VIKAS",
    "KRISHNA NAGAR",
    "GANDHIGRAM",
    "HARJINDER NAGAR",
    "OM PURWA",
    "SANIGAWAN",
    "HANS PURAM",
    "YASHODA NAGAR EAST",
    "DAHELI SUJANPUR KDA COLONY",
    "TIWARIPUR",
    "SWARDA JAYANTI VIHAR",
    "NAUBASTA EAST",
    "PASHUPANTI NAGAR",
    "RAJEEV NAGAR NAUBASTA EAST",
    "JAJMAU SOUTH",
    "SHYAM NAGAR SUJAT GANJ",
    "KAKADEO",
    "HARIHARNATH SHASTRI NAGAR"
  ],

  zone3: [
    "SABZI MANDI KIDWAI NAGAR",
    "USMANPUR",
    "KHANDIPUR",
    "AJEET GANJ",
    "JUHI HAMIRPUR ROAD",
    "TRANSPORT NAGAR",
    "NAUBASTA EAST",
    "KARRHI",
    "BARRA NORTH",
    "BABU PURWA COLONY",
    "JARAULI",
    "JUHI KALA",
    "BINGAWAN",
    "BASANT VIHAR",
    "KIDWAI NAGAR SOUTH",
    "KIDWAI NAGAR NORTH",
    "BEGAM PURWA",
    "BABOO PURWA"
  ],

  zone4: [
    "CHUNNI GANJ",
    "GWALTOLI",
    "JAWAHAR NAGAR",
    "BEHNA JHABHAR",
    "OLD KANPUR",
    "MECROBERT GANJ",
    "ASHOK NAGAR",
    "PERMAT",
    "GANDHI NAGAR",
    "SISAMAU NORTH",
    "TILAK NAGAR",
    "SUTHER GUNJ",
    "BECON GANJ",
    "TALAK MOHAL",
    "COLNEL GANJ"
  ],

  zone5: [
    "GOVIND NAGAR HARIJAN BASTI",
    "BHANNANAPURWA",
    "NIRALA NAGAR",
    "RAVIDAS PURAM",
    "JUHI",
    "FAZAL GANJ",
    "RATANLAL NAGAR",
    "World Bank Barra",
    "GOVIND NAGAR SOUTH",
    "PANKI",
    "BARRA",
    "SARAIMITA",
    "GUJAIN COLONEY",
    "SWARAJ NAGAR PANKI",
    "BARRA WEST",
    "SARVODAYA NAGAR",
    "KAUSHAL PURI",
    "GOVIND NAGAR NORTH",
    "LAJPAT NAGAR"
  ],

  zone6: [
    "MASWANPUR",
    "NARAMAU",
    "KALYANPUR SOUTH",
    "KALYANPUR(AWAS VIKAS)",
    "NAVEEN NAGAR KAKADEO",
    "NANKARI",
    "AMBEDKAR NAGAR",
    "VIJAY NAGAR",
    "KALYANPUR NORTH",
    "VISHNUPURI",
    "NAWABGANJ",
    "KHYORA",
    "GITA NAGAR",
    "BINAYAKPUR",
    "RAWAT PUR",
    "SAROJNI NAGAR"
  ]
};



export default function Complaint() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const tx = t[lang];
  const categories = categoriesData[lang];
  const mohallas = mohallasData[lang];
  const fileInputRef = useRef();
  const cameraInputRef = useRef();

  const [form, setForm] = useState({
    category: '', subCategory: '', mohalla: '', kshetra: '', ward: '',
    name: '', mobile: '', email: '', description: '', sthan: '', pata: '',
  });
  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const selectedCat = categories.find(c => c.id === form.category);

  const getZoneByArea = (area) => {

  // Hindi ko English me convert karo
  const convertedArea =
    hindiToEnglishAreaMap[area] || area;

  const upperArea = convertedArea.toUpperCase();

  for (const zone in zones) {

    const found = zones[zone].find(
      item => item.toUpperCase() === upperArea
    );

    if (found) {
      return zone.toUpperCase();
    }
  }

  return '';
};

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    if (field === 'category') setForm(f => ({ ...f, category: val, subCategory: '' }));
    if (field === 'mohalla') {

  const selectedZone = getZoneByArea(val);

  setForm(f => ({
    ...f,

    mohalla: val,

    // Dynamic Zone
    kshetra: selectedZone,

    // Random Ward
    ward: val
      ? `${tx.wardPrefix}${Math.floor(Math.random() * 110) + 1}`
      : '',
  }));
}
    // if (field === 'mohalla') {
    //   setForm(f => ({
    //     ...f,
    //     mohalla: val,
    //     kshetra: val ? tx.autoKshetra : '',
    //     ward: val ? `${tx.wardPrefix}${Math.floor(Math.random() * 110) + 1}` : '',
    //   }));
    // }
  };

  const handleFiles = (files) => {
    const arr = Array.from(files).slice(0, 4 - photos.length);
    arr.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => setPhotos(p => [...p, { url: e.target.result, name: file.name }]);
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (i) => setPhotos(p => p.filter((_, idx) => idx !== i));

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!form.category || !form.subCategory || !form.mohalla || !form.name || !form.mobile || !form.description) {
  //     alert(tx.alertMsg);
  //     return;
  //   }
  //   setSubmitted(true);
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validation
  if (!form.category || !form.subCategory || !form.mohalla || !form.name || !form.mobile || !form.description) {
    alert('कृपया सभी अनिवार्य (*) फ़ील्ड भरें।');
    return;
  }

  // Create FormData object
  const formData = new FormData();
  formData.append('category', form.category);
  formData.append('subCategory', form.subCategory);
  formData.append('mohalla', form.mohalla);
  formData.append('kshetra', form.kshetra);
  formData.append('ward', form.ward);
  formData.append('name', form.name);
  formData.append('mobile', form.mobile);
  formData.append('email', form.email);
  formData.append('description', form.description);
  formData.append('sthan', form.sthan);
  formData.append('pata', form.pata);

  // Append photos (assuming photos array stores actual File objects)
  // If your photos are dataURLs, see note below
  photos.forEach(photo => {
    if (photo.file) {
      formData.append('photos', photo.file);
    }
  });

  console.log('Submitting complaint with data:', form);

  try {
    const response = await fetch('http://localhost:5000/api/complaints', {
      method: 'POST',
      body: formData,  // No 'Content-Type' header - browser sets multipart boundary automatically
    });

    const data = await response.json();

    if (response.ok) {
      setSubmitted(true);
      // Optional: store token for success display
      localStorage.setItem('lastComplaintToken', data.token);
    } else {
     
      alert('शिकायत दर्ज नहीं हुई: ' + (data.error || 'कोई त्रुटि'));
    }
  } catch (err) {
    console.error(err);
    alert('नेटवर्क एरर। कृपया बाद में प्रयास करें।');
  }
};

  if (submitted) {
    const token = 'KNN' + Date.now().toString().slice(-8);
    return (
      <div className="complaint-page">
        <div className="complaint-success">
          <div className="success-circle">
            <CheckCircle size={64} color="#27ae60"/>
          </div>
          <h2 className="success-title">{tx.successTitle}</h2>
          <div className="success-token">
            <div className="token-label">{tx.tokenLabel}</div>
            <div className="token-num">{token}</div>
          </div>
          <p className="success-msg">
            {tx.successMsg}<br/>
            {tx.smsSub}+91 {form.mobile}
          </p>
          <div className="success-btns">
            <button className="btn-primary" onClick={() => navigate('/')}>{tx.homeBtn}</button>
            <button className="btn-outline" onClick={() => setSubmitted(false)}>{tx.newBtn}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="complaint-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span onClick={() => navigate('/')}>{tx.home}</span>
        <span className="bc-sep">/</span>
        <span>{tx.egov}</span>
        <span className="bc-sep">/</span>
        <span className="bc-active">{tx.pageTitle}</span>
      </div>

      <div className="complaint-container">
        <div className="complaint-header">
          <h1 className="complaint-title">
            <AlertCircle size={28} color="var(--knn-orange)"/> {tx.pageTitle}
          </h1>
          <p className="complaint-subtitle">{tx.required}</p>
        </div>

        <form className="complaint-form" onSubmit={handleSubmit}>
          {/* Row 1: Category + Mohalla */}
          <div className="form-row">
            <div className="form-group">
              <label>{tx.catLabel}</label>
              <div className="custom-select">
                <select value={form.category} onChange={e => handleChange('category', e.target.value)}>
                  <option value="">{tx.catPlaceholder}</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
                {selectedCat && (
                  <div className="cat-badge" style={{ background: selectedCat.color + '20', color: selectedCat.color }}>
                    {selectedCat.icon}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>{tx.mohallaLabel}</label>
              <select value={form.mohalla} onChange={e => handleChange('mohalla', e.target.value)}>
                <option value="">{tx.mohallaPH}</option>
                {mohallas.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2: SubCategory + Kshetra */}
          <div className="form-row">
            
            <div className="form-group">
              <label>{tx.subCatLabel}</label>
              <select
                value={form.subCategory}
                onChange={e => handleChange('subCategory', e.target.value)}
                disabled={!form.category}
              >
                <option value="">{tx.subCatPH}</option>
                {selectedCat?.subCategories.map(s => (
                  <option key={s.code} value={s.code}>{s.code} — {s.label}</option>
                ))}
              </select>
            </div>


            <div className="form-group">
              <label>{tx.kshetraLabel}</label>
              <input type="text" value={form.kshetra} readOnly placeholder={tx.kshetraReadonly} className="readonly-input"/>
            </div>
          </div>

          {/* Row 3: Name + Ward */}
          <div className="form-row">
            <div className="form-group">
              <label>{tx.nameLabel}</label>
              <input type="text" placeholder={tx.namePH} value={form.name} onChange={e => handleChange('name', e.target.value)}/>
            </div>
            <div className="form-group">
              <label>{tx.wardLabel}</label>
              <input type="text" value={form.ward} readOnly placeholder={tx.kshetraReadonly} className="readonly-input"/>
            </div>
          </div>

          {/* Row 4: Mobile + Email */}
          <div className="form-row">
            <div className="form-group">
              <label>{tx.mobileLabel}</label>
              <input
                type="tel"
                placeholder={tx.mobilePH}
                maxLength={10}
                value={form.mobile}
                onChange={e => handleChange('mobile', e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <div className="form-group">
              <label>{tx.emailLabel}</label>
              <input type="email" placeholder={tx.emailPH} value={form.email} onChange={e => handleChange('email', e.target.value)}/>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="photo-section">
            <label className="photo-section-label">{tx.photoLabel}</label>
            {photos.length > 0 && (
              <div className="photo-previews">
                {photos.map((p, i) => (
                  <div key={i} className="photo-thumb">
                    <img src={p.url} alt={p.name}/>
                    <button type="button" className="photo-remove" onClick={() => removePhoto(i)}>
                      <X size={14}/>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {photos.length < 4 && (
              <div className="photo-upload-area">
                <button type="button" className="photo-btn upload-btn" onClick={() => fileInputRef.current?.click()}>
                  <Upload size={20}/>
                  <span>{tx.uploadBtn}</span>
                  <span className="photo-btn-sub">{tx.uploadSub}</span>
                </button>
                <div className="photo-or">{tx.or}</div>
                <button type="button" className="photo-btn camera-btn" onClick={() => cameraInputRef.current?.click()}>
                  <Camera size={20}/>
                  <span>{tx.cameraBtn}</span>
                  <span className="photo-btn-sub">{tx.cameraSub}</span>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)}/>
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)}/>
              </div>
            )}
          </div>

          {/* Row 5: Description + Sthan */}
          <div className="form-row">
            <div className="form-group">
              <label>{tx.descLabel}</label>
              <textarea rows={4} placeholder={tx.descPH} value={form.description} onChange={e => handleChange('description', e.target.value)}/>
            </div>
            <div className="form-group">
              <label>{tx.sthanLabel}</label>
              <textarea rows={4} placeholder={tx.sthanPH} value={form.sthan} onChange={e => handleChange('sthan', e.target.value)}/>
            </div>
          </div>

          {/* Row 6: Address */}
          <div className="form-row">
            <div className="form-group full-width">
              <label>{tx.addressLabel}</label>
              <input type="text" placeholder={tx.addressPH} value={form.pata} onChange={e => handleChange('pata', e.target.value)}/>
            </div>
          </div>

          {/* Submit */}
          <div className="form-submit-row">
            <button type="button" className="btn-outline-gray" onClick={() => navigate('/')}>
              {tx.cancel}
            </button>
            <button type="submit" className="btn-submit">
              <CheckCircle size={18}/>
              {tx.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
