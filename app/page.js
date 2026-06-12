'use client';

import { useState, useEffect } from 'react';
import NetworkCanvas from '../components/NetworkCanvas';
import HeroTerminal from '../components/HeroTerminal';
import PipelineCalculator from '../components/PipelineCalculator';
import BriefingScheduler from '../components/BriefingScheduler';
import ProtocolModal from '../components/ProtocolModal';

const PROTOCOL_DATA = {
    'auth-content': {
        tag: 'Protocol Alpha',
        title: 'LinkedIn Authority Content',
        desc: 'Establishing high-credibility personal brand profiles that capture technical executive search queries. We handle writing technical analysis posts, deep-dives into modern SaaS breaches, and MSP efficiency frameworks that stand out under peer review.',
        cadence: '3x Weekly Custom Posts',
        channels: 'LinkedIn Enterprise, Founder Channels',
        objective: 'Inbound CEO engagement and authority verification'
    },
    'linkedin-outreach': {
        tag: 'Protocol Beta',
        title: 'LinkedIn Lead Outreach',
        desc: 'Highly targeted connection strategies focused on specific decision-makers (CISO, CTO, MSP Director). We implement value-first messaging rather than generic pitches, nurturing connections into qualified strategic meetings.',
        cadence: '50-80 Touchpoints Daily',
        channels: 'LinkedIn Premium / Sales Navigator',
        objective: 'Conversion of cold targets into scheduled calls'
    },
    'cold-email': {
        tag: 'Protocol Gamma',
        title: 'Cold Email Campaigns',
        desc: 'Elite outbound systems backed by multi-domain deliverability configurations. We execute domain setup, SPF/DKIM/DMARC optimization, target verification protocols, and high-frequency content variations that bypass spam filters entirely.',
        cadence: '1,500+ Qualified Emails Monthly',
        channels: 'Private Warming Networks, Dedicated Domains',
        objective: 'Consistent meeting booking pipeline'
    },
    'nurture': {
        tag: 'Protocol Delta',
        title: 'Email Nurture Sequences',
        desc: 'Continuous automated drip-feed systems that maintain high top-of-mind recall with prospects. We build education-first templates detailing modern cybersecurity risk reduction, cloud compliance updates, and SaaS maturity frameworks.',
        cadence: 'Weekly / Bi-Weekly Automated Drops',
        channels: 'Nurture Platforms (HubSpot, ActiveCampaign)',
        objective: 'Nurturing long-term prospects to pipeline readiness'
    },
    'crm-setup': {
        tag: 'Protocol Epsilon',
        title: 'CRM Setup & Sync',
        desc: 'Zero-loss pipeline synchronization. We map out automated deal movement, pipeline triggers, meeting logs, lead scores, and security-focused analytics dashboards so that your sales reps focus solely on closing deals.',
        cadence: 'Complete Turnkey Architecture',
        channels: 'HubSpot, Salesforce, Pipedrive',
        objective: 'Seamless tracking and growth attribution'
    }
};

export default function Home() {
    const [activeSection, setActiveSection] = useState('home');
    const [regionPing, setRegionPing] = useState('SYS.PING: 24ms (Region: US-EST)');
    const [activeProtocol, setActiveProtocol] = useState(null);

    // Latency & IP Simulation
    useEffect(() => {
        const simulatePing = () => {
            const mockPing = Math.floor(Math.random() * 19) + 12;
            const regions = ['US-EST', 'US-WEST', 'EU-CENTRAL', 'AP-EAST', 'US-SOUTH'];
            const region = regions[Math.floor(Math.random() * regions.length)];
            setRegionPing(`SYS.PING: ${mockPing}ms (Region: ${region})`);
        };
        const interval = setInterval(simulatePing, 4000);
        return () => clearInterval(interval);
    }, []);

    // Monitor page scroll to highlight navigation links
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.section');
            let current = 'home';
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id') || 'home';
                }
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Particle Mesh Canvas */}
            <NetworkCanvas />

            <div className="content-wrapper">
                {/* HUD Header */}
                <header className="hud-header">
                    <div className="hud-logo" onClick={() => scrollTo('home')} style={{ cursor: 'pointer' }}>
                        <div className="hud-logo-icon"></div>
                        SENTINEL
                    </div>
                    
                    <nav className="hud-nav">
                        <button onClick={() => scrollTo('home')} className={`hud-link ${activeSection === 'home' ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Home</button>
                        <button onClick={() => scrollTo('scan')} className={`hud-link ${activeSection === 'scan' ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>System Scan</button>
                        <button onClick={() => scrollTo('services')} className={`hud-link ${activeSection === 'services' ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Protocols</button>
                        <button onClick={() => scrollTo('calculator')} className={`hud-link ${activeSection === 'calculator' ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Pipeline Projection</button>
                        <button onClick={() => scrollTo('briefing')} className={`hud-link ${activeSection === 'briefing' ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Transmission</button>
                    </nav>
                    
                    <div className="hud-status">
                        <div className="hud-status-indicator"></div>
                        <span>{regionPing}</span>
                    </div>
                </header>

                {/* Section 1: Hero */}
                <section className="section" id="home">
                    <div className="hero-content">
                        <div className="hero-text">
                            <div className="system-tag">Target Acquisition Active</div>
                            <h1 className="hero-title">
                                Autonomous Outbound for <span>Cybersecurity SaaS & MSPs</span>
                            </h1>
                            <p className="hero-desc">
                                Standard outbound fails modern security perimeters. We build surgical authority campaigns, high-deliverability cold email, and warm social systems that convert skepticism into secured meetings.
                            </p>
                            <div className="hero-actions">
                                <button className="btn-cyber" onClick={() => scrollTo('briefing')}>Initialize Briefing</button>
                                <button className="btn-cyber emerald" onClick={() => scrollTo('calculator')}>Project Pipeline</button>
                            </div>
                        </div>
                        
                        {/* Interactive Hero terminal */}
                        <HeroTerminal />
                    </div>
                </section>

                {/* Section 2: Scan */}
                <section className="section" id="scan">
                    <div className="scan-content">
                        <div className="radar-wrapper">
                            <div className="radar-screen">
                                <div className="radar-sweep"></div>
                                <div className="radar-blip b1"></div>
                                <div className="radar-blip b2"></div>
                                <div className="radar-blip b3"></div>
                            </div>
                        </div>
                        
                        <div className="hero-text">
                            <div className="system-tag" style={{ color: 'var(--accent-emerald)' }}>Operational Vulnerability Detect</div>
                            <h2 className="section-title">98% of outreach to Cybersecurity Decision Makers hits the Spam Wall</h2>
                            <p className="hero-desc">
                                SaaS founders and MSP directors are naturally paranoid. Standard sales approaches trigger defensive filters, spam reports, and immediate deletion.
                            </p>
                            <p className="hero-desc" style={{ fontSize: '1rem', borderLeft: '2px solid var(--accent-cyan)', paddingLeft: '16px', fontStyle: 'italic' }}>
                                "To reach security officers, your presence must feel authentic, peer-level, and completely verified. We bypass defensive walls by executing custom content authority sequences and highly calibrated outbound tactics."
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Services Grid */}
                <section className="section" id="services">
                    <div className="section-header">
                        <div className="section-subtitle">Operational Protocols</div>
                        <h2 className="section-title">Tactical Growth Suite</h2>
                    </div>
                    
                    <div className="services-grid">
                        <div className="service-card" onClick={() => setActiveProtocol(PROTOCOL_DATA['auth-content'])}>
                            <div className="service-protocol">Protocol Alpha</div>
                            <div className="service-icon-box"><i className="fa-solid fa-feather-pointed"></i></div>
                            <h3>LinkedIn Authority Content</h3>
                            <p>Building high-credibility industry profiles that draw inbound interest from technical executives.</p>
                        </div>
                        
                        <div className="service-card" onClick={() => setActiveProtocol(PROTOCOL_DATA['linkedin-outreach'])}>
                            <div className="service-protocol">Protocol Beta</div>
                            <div className="service-icon-box"><i className="fa-solid fa-users-viewfinder"></i></div>
                            <h3>LinkedIn Lead Outreach</h3>
                            <p>Polite, direct-value conversation threads targeting specific decision-makers in Cyber-Sectors.</p>
                        </div>
                        
                        <div className="service-card" onClick={() => setActiveProtocol(PROTOCOL_DATA['cold-email'])}>
                            <div className="service-protocol">Protocol Gamma</div>
                            <div className="service-icon-box"><i className="fa-solid fa-envelope-open-text"></i></div>
                            <h3>Cold Email Campaigns</h3>
                            <p>Ultra-secure, multi-domain warming infrastructure delivering crisp value statements directly to clean inboxes.</p>
                        </div>
                        
                        <div className="service-card" onClick={() => setActiveProtocol(PROTOCOL_DATA['nurture'])}>
                            <div className="service-protocol">Protocol Delta</div>
                            <div className="service-icon-box"><i className="fa-solid fa-shuffle"></i></div>
                            <h3>Email Nurture Sequences</h3>
                            <p>Continuous value drop-feed converting cold contacts into trust-rich relationships over time.</p>
                        </div>
                        
                        <div className="service-card" onClick={() => setActiveProtocol(PROTOCOL_DATA['crm-setup'])}>
                            <div className="service-protocol">Protocol Epsilon</div>
                            <div className="service-icon-box"><i className="fa-solid fa-circle-nodes"></i></div>
                            <h3>CRM Setup & Sync</h3>
                            <p>Connecting all outbound flows straight into HubSpot or Salesforce, automating secure lead scoring.</p>
                        </div>
                    </div>
                </section>

                {/* Section 4: Pipeline Calculator */}
                <section className="section" id="calculator">
                    <PipelineCalculator />
                </section>

                {/* Section 5: Scheduler Terminal */}
                <section className="section" id="briefing">
                    <div className="section-header" style={{ textAlign: 'center' }}>
                        <div className="section-subtitle">Transmission Terminal</div>
                        <h2 className="section-title">Schedule Strategic Security Briefing</h2>
                    </div>
                    
                    <BriefingScheduler />
                </section>

                {/* Footer */}
                <footer style={{ backgroundColor: '#010103', padding: '40px', borderTop: '1px solid rgba(255, 255, 255, 0.02)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <div>&copy; 2026 Sentinel Outbound Systems. All Rights Reserved.</div>
                    <div style={{ marginTop: '10px', color: 'var(--accent-cyan-dark)' }}>SYS_SECURE_AUTH: STABLE_RELEASE</div>
                </footer>
            </div>

            {/* Protocol detail overlay modal */}
            <ProtocolModal data={activeProtocol} onClose={() => setActiveProtocol(null)} />
        </>
    );
}
