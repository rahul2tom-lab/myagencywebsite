'use client';

import { useState } from 'react';

export default function PipelineCalculator() {
    const [contractValue, setContractValue] = useState(50000);
    const [meetingsValue, setMeetingsValue] = useState(8);

    const formatCurrency = (val) => {
        return '$' + Number(val).toLocaleString();
    };

    // Calculate pipeline value: meetings * 12 months * 15% close rate * contract value
    const closeRate = 0.15;
    const projectedDeals = meetingsValue * 12 * closeRate;
    const totalPipeline = Math.round(projectedDeals * contractValue);

    return (
        <div class="calc-content">
            <div class="hero-text">
                <div class="system-tag" style={{ color: 'var(--accent-emerald)' }}>Projection Engine</div>
                <h2 class="section-title">Forecast Your Growth Pipeline</h2>
                <p class="hero-desc">
                    Our model scales outbound precisely. Select your target contract size and weekly meeting requirements below to calculate your projected annualized revenue pipeline.
                </p>
                
                <div class="calc-panel">
                    <div class="calc-group">
                        <div class="calc-label-row">
                            <span class="calc-label">Target Contract Value (ARR)</span>
                            <span class="calc-value-display">{formatCurrency(contractValue)}</span>
                        </div>
                        <input 
                            type="range" 
                            class="calc-range" 
                            min="10000" 
                            max="250000" 
                            step="5000" 
                            value={contractValue}
                            onChange={(e) => setContractValue(Number(e.target.value))}
                        />
                    </div>
                    
                    <div class="calc-group">
                        <div class="calc-label-row">
                            <span class="calc-label">Monthly Booked Strategy Briefings</span>
                            <span class="calc-value-display">{meetingsValue}</span>
                        </div>
                        <input 
                            type="range" 
                            class="calc-range" 
                            min="2" 
                            max="40" 
                            step="1" 
                            value={meetingsValue}
                            onChange={(e) => setMeetingsValue(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>
            
            <div class="calc-output-panel">
                <div>
                    <div class="calc-stat-label">Projected Annual Pipeline Value</div>
                    <div class="calc-stat-number">{formatCurrency(totalPipeline)}</div>
                    <div class="calc-stat-subtext">Assuming average close rates of 15%</div>
                </div>
                
                <div>
                    <div class="calc-stat-label">System Deliverability Health</div>
                    <div class="calc-stat-number" style={{ color: 'var(--accent-cyan)', textShadow: 'var(--glow-shadow-cyan)' }}>99.8%</div>
                    <div class="calc-stat-subtext">Zero domain burn protection enabled</div>
                </div>
                
                <button 
                    class="btn-cyber" 
                    onClick={() => document.getElementById('briefing').scrollIntoView({ behavior: 'smooth' })} 
                    style={{ width: '100%' }}
                >
                    Establish Secure Transmission
                </button>
            </div>
        </div>
    );
}
