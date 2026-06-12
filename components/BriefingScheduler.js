'use client';

import { useState, useEffect } from 'react';

export default function BriefingScheduler() {
    const [step, setStep] = useState(1);
    const [ipAddress, setIpAddress] = useState('Scanning...');
    
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [companyType, setCompanyType] = useState('');
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    
    // Generate simulated client IP on mount
    useEffect(() => {
        const octets = [
            Math.floor(Math.random() * 190) + 20,
            Math.floor(Math.random() * 254) + 1,
            Math.floor(Math.random() * 254) + 1,
            Math.floor(Math.random() * 254) + 1
        ];
        setIpAddress(octets.join('.'));
    }, []);

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    // Calculate business days for calendar picker (2-week horizon)
    const getCalendarDays = () => {
        const days = [];
        const today = new Date();
        const currentDay = today.getDay();
        const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() + mondayOffset);

        for (let i = 0; i < 14; i++) {
            const targetDate = new Date(startOfWeek);
            targetDate.setDate(startOfWeek.getDate() + i);
            
            const isWeekend = targetDate.getDay() === 0 || targetDate.getDay() === 6;
            const isPast = targetDate < today && targetDate.toDateString() !== today.toDateString();
            
            days.push({
                date: targetDate,
                label: targetDate.getDate(),
                disabled: isWeekend || isPast,
                dateStr: targetDate.toDateString()
            });
        }
        return days;
    };

    const calendarDays = getCalendarDays();
    const timeSlots = [
        "09:00 - 09:30 AM",
        "11:00 - 11:30 AM",
        "02:00 - 02:30 PM",
        "04:00 - 04:30 PM"
    ];

    const isBookingValid = selectedDate && selectedTime;

    return (
        <div class="terminal-intake">
            <div class="intake-layout">
                {/* Console Side */}
                <div class="intake-console">
                    <div>
                        <div class="system-tag" style={{ marginBottom: '20px' }}>System Status</div>
                        <div class="intake-status-grid">
                            <div class="intake-status-item">
                                <span>CONNECTION:</span>
                                <span class="intake-status-value">SECURE (TLS 1.3)</span>
                            </div>
                            <div class="intake-status-item">
                                <span>ENCRYPTION:</span>
                                <span class="intake-status-value">AES-256-GCM</span>
                            </div>
                            <div class="intake-status-item">
                                <span>OUTBOUND ENGINE:</span>
                                <span class="intake-status-value" style={{ color: 'var(--accent-emerald)' }}>ONLINE</span>
                            </div>
                            <div class="intake-status-item">
                                <span>IP ADDRESS:</span>
                                <span class="intake-status-value">{ipAddress}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', lineHeight: '1.4' }}>
                        * Establish a direct sync with our growth architects. We will detail audit diagnostics on target security bypass capabilities.
                    </div>
                </div>
                
                {/* Form / Interactive Side */}
                <div class="intake-form-side">
                    {step === 1 && (
                        <form onSubmit={handleInfoSubmit} class="intake-form">
                            <div class="form-group">
                                <label class="form-label" htmlFor="full-name">Briefing Officer Name</label>
                                <input 
                                    type="text" 
                                    id="full-name" 
                                    class="form-input" 
                                    required 
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="e.g. Alexis Carter"
                                />
                            </div>
                            <div class="form-group">
                                <label class="form-label" htmlFor="email">Secure Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    class="form-input" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="alexis@cyberfirm.com"
                                />
                            </div>
                            <div class="form-group">
                                <label class="form-label" htmlFor="company-type">Corporate Sector</label>
                                <select 
                                    id="company-type" 
                                    class="form-select" 
                                    required
                                    value={companyType}
                                    onChange={(e) => setCompanyType(e.target.value)}
                                >
                                    <option value="">Select Sector...</option>
                                    <option value="Cybersecurity SaaS">Cybersecurity SaaS</option>
                                    <option value="Managed Service Provider (MSP)">Managed Service Provider (MSP)</option>
                                    <option value="Managed Security Service Provider (MSSP)">Managed Security Service Provider (MSSP)</option>
                                    <option value="Enterprise Security Vendor">Enterprise Security Vendor</option>
                                </select>
                            </div>
                            
                            <button type="submit" class="btn-cyber" style={{ width: '100%', marginTop: '10px' }}>Select Briefing Time</button>
                        </form>
                    )}

                    {step === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div class="form-label">Select Briefing Date</div>
                            <div class="scheduler-calendar">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((h, idx) => (
                                    <div class="calendar-day-header" key={idx}>{h}</div>
                                ))}
                                {calendarDays.map((day, idx) => (
                                    <button 
                                        key={idx}
                                        className={`calendar-day-btn ${selectedDate === day.dateStr ? 'selected' : ''}`}
                                        disabled={day.disabled}
                                        onClick={() => setSelectedDate(day.dateStr)}
                                    >
                                        {day.label}
                                    </button>
                                ))}
                            </div>
                            
                            <div class="form-label" style={{ marginTop: '10px' }}>Select Time Window (EST)</div>
                            <div class="time-slots">
                                {timeSlots.map((slot, idx) => (
                                    <button 
                                        key={idx}
                                        className={`time-slot-btn ${selectedTime === slot ? 'selected' : ''}`}
                                        onClick={() => setSelectedTime(slot)}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                            
                            <button 
                                class="btn-cyber emerald" 
                                disabled={!isBookingValid} 
                                onClick={() => setStep(3)}
                                style={{ width: '100%', marginTop: '20px' }}
                            >
                                Authorize Briefing
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div class="intake-success-screen">
                            <i class="fa-solid fa-circle-check success-icon"></i>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>Transmission Authorized</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, fontSize: '0.95rem' }}>
                                Briefing confirmed for <strong style={{ color: 'var(--accent-cyan)' }}>{selectedDate}</strong> at <strong style={{ color: 'var(--accent-cyan)' }}>{selectedTime}</strong>.
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: 0.85rem, fontFamily: 'var(--font-mono)', marginTop: '10px' }}>
                                Secure invitation key sent to {email}.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
