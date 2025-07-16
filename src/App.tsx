import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import TaskList from './components/TaskList';
import './App.css';

const logo = require('./assets/images/logo.png');

const privacyPolicyHtml = `
  <h2>Privacy Policy</h2>
  <p><b>Your privacy matters.</b> Quizify processes your HTML files <b>entirely in your browser</b>. No files or quiz data are uploaded to any server. All conversions and quiz attempts happen locally on your device. We do not collect, store, or share any personal data or quiz content.</p>
  <ul>
    <li>No file uploads to our servers</li>
    <li>No account or signup required</li>
    <li>No tracking of quiz answers or results</li>
    <li>Analytics are anonymous and only for site improvement</li>
  </ul>
  <h3>Ad Disclaimer</h3>
  <p>
    This website displays advertisements provided by third-party networks such as Adsterra.
    We do not control or endorse the content of these ads. Some ads may contain content that is not suitable for all audiences.
    We do not promote or support any adult, gambling, or misleading content that may appear through these third-party ads.
    Please exercise caution when interacting with external links.
  </p>
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

    useEffect(() => {
        // Inject ad script after component mounts
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = '//pl27087518.profitableratecpm.com/a13f6b1ec6ebaaeeaf31a1248ac15bd7/invoke.js';
        const container = document.getElementById('container-a13f6b1ec6ebaaeeaf31a1248ac15bd7');
        if (container) {
            container.appendChild(script);
        }
        // Cleanup: remove script on unmount
        return () => {
            if (container && script.parentNode === container) {
                container.removeChild(script);
            }
        };
    }, []);

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
                    <span>Made with <span style={{color: '#ff4d4d', fontSize: '1.2em', verticalAlign: 'middle'}}>&hearts;</span><b></b></span>
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
            {/* Ad Script Injection */}
            <div id="container-a13f6b1ec6ebaaeeaf31a1248ac15bd7" style={{ minHeight: 100 }}></div>
        </HelmetProvider>
    );
}

export default App;