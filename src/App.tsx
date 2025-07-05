import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import TaskList from './components/TaskList';
import './App.css';

const logo = require('./assets/images/logo.png');

const privacyPolicyHtml = `
  <h1>Privacy Policy</h1>
  <p>At Task Master, your privacy is our top priority. We do not collect, store, or share any personal information. All your tasks and data are stored locally in your browser and are never transmitted to any server or third party.</p>
  <h2>Information Collection and Use</h2>
  <p>Task Master is a client-side application. We do not require you to create an account or provide any personal details. All data you enter remains on your device.</p>
  <h2>Cookies and Tracking</h2>
  <p>We do not use cookies, analytics, or any tracking technologies. Your activity within the app is private and not monitored.</p>
  <h2>Contact</h2>
  <p>If you have any questions or concerns about your privacy, please contact us at <a href="mailto:chetankumarpulipati4@gmail.com">chetankumarpulipati4@gmail.com</a>.</p>
  <h2>Policy Updates</h2>
  <p>This privacy policy may be updated from time to time. Please check this page for the latest information.</p>
  <p>Last updated: July 5, 2025</p>
`;

function setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name: string) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

function App() {
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showCookieBanner, setShowCookieBanner] = useState(false);

    useEffect(() => {
        if (!getCookie('cookieConsent')) {
            setShowCookieBanner(true);
        }
    }, []);

    const handleAcceptCookies = () => {
        setCookie('cookieConsent', 'accepted', 365);
        setShowCookieBanner(false);
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>Task Master - Organize Your Tasks Efficiently</title>
                <meta name="description" content="Task Master helps you manage your tasks, boost productivity, and stay organized. Create, track, and complete your to-dos easily!" />
                <meta name="keywords" content="task manager, productivity, to-do list, task master, organize tasks, project management, reminders, schedule" />
                <meta property="og:title" content="Task Master - Organize Your Tasks Efficiently" />
                <meta property="og:description" content="Task Master helps you manage your tasks, boost productivity, and stay organized. Create, track, and complete your to-dos easily!" />
                <meta property="og:image" content="/assets/images/task-master.png" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yourdomain.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Task Master - Organize Your Tasks Efficiently" />
                <meta name="twitter:description" content="Task Master helps you manage your tasks, boost productivity, and stay organized. Create, track, and complete your to-dos easily!" />
                <meta name="twitter:image" content="/assets/images/task-master.png" />
            </Helmet>
            <nav className="navbar">
                <div className="navbar-content">
                    <img src={logo} alt="TaskMaster Logo" className="navbar-logo" />
                    <span className="navbar-title">TaskMaster</span>
                </div>
            </nav>
            <div className="app-container">
                <div className="header">
                    {/* Removed duplicate logo and title from header for modern look */}
                </div>
                {showPrivacy ? (
                  <div className="privacy-modal" style={{background:'#fff',borderRadius:8,boxShadow:'0 0 15px rgba(0,0,0,0.08)',padding:32,maxWidth:700,margin:'40px auto'}}>
                    <button style={{float:'right',background:'#ffb347',color:'#232526',border:'none',borderRadius:4,padding:'4px 12px',cursor:'pointer',fontWeight:600}} onClick={()=>setShowPrivacy(false)}>Close</button>
                    <div dangerouslySetInnerHTML={{__html: privacyPolicyHtml}} />
                  </div>
                ) : (
                  <TaskList />
                )}
            </div>
            <footer className="footer">
                <ul className="footer-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="#" onClick={e => {e.preventDefault(); window.open('mailto:chetankumarpulipati4@gmail.com');}}>Contact</a></li>
                    <li><a href="#" onClick={e => {e.preventDefault(); setShowPrivacy(true);}}>Privacy Policy</a></li>
                </ul>
                <p>&copy; {new Date().getFullYear()} Task Master. All rights reserved.</p>
                <div className="footer-extra">
                    <span>Made with <span style={{color: '#ff4d4d', fontSize: '1.2em', verticalAlign: 'middle'}}>&hearts;</span> by <b>ckmrp</b></span>
                    <a className="coffee-link" href="https://www.buymeacoffee.com/ckmrp" target="_blank" rel="noopener noreferrer">☕ Buy me a coffee</a>
                </div>
            </footer>
            {showCookieBanner && (
                <div className="cookie-banner">
                    <span>
                        This website uses cookies to enhance your experience. By continuing to use the site, you accept our use of cookies.
                    </span>
                    <button onClick={handleAcceptCookies}>Accept</button>
                </div>
            )}
        </HelmetProvider>
    );
}

export default App;