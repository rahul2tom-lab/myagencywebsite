'use client';

import { useEffect, useState } from 'react';

const BOOT_LINES = [
    { prompt: '>', text: 'acquiring target domain list...', color: 'primary' },
    { prompt: '>', text: 'target response rate estimated at 18.4% via LinkedIn protocol.', color: 'success' },
    { prompt: '>', text: 'security parameters handshake success.', color: 'success' },
    { prompt: '>', text: 'syncing outreach engine databases...', color: 'primary' },
    { prompt: '>', text: 'secure calendar API mapping active.', color: 'warning' },
    { prompt: '>>', text: 'operational grid stable. standing by.', color: 'emerald' }
];

export default function HeroTerminal() {
    const [visibleLines, setVisibleLines] = useState([
        { prompt: '>', text: 'booting core system...', color: 'primary' },
        { prompt: '>', text: 'connection secured to SaaS founders database.', color: 'success' },
        { prompt: '>', text: 'loading outbound target filters: Cyber SaaS / MSP / MSSP', color: 'primary' },
        { prompt: '>', text: 'bypassing generic email filters... Deliverability 99.8%', color: 'warning' },
        { prompt: '>', text: 'ready.', color: 'primary' }
    ]);
    const [bootIdx, setBootIdx] = useState(0);

    useEffect(() => {
        if (bootIdx >= BOOT_LINES.length) return;

        const timer = setTimeout(() => {
            setVisibleLines((prev) => [...prev, BOOT_LINES[bootIdx]]);
            setBootIdx((prev) => prev + 1);
        }, 2500);

        return () => clearTimeout(timer);
    }, [bootIdx]);

    return (
        <div class="terminal-hud">
            <div class="terminal-header">
                <div class="terminal-dots">
                    <span class="terminal-dot red"></span>
                    <span class="terminal-dot yellow"></span>
                    <span class="terminal-dot green"></span>
                </div>
                <div class="terminal-title">sentinel_growth_core.exe</div>
            </div>
            <div class="terminal-body">
                {visibleLines.map((line, idx) => {
                    let textClass = 'terminal-output';
                    if (line.color === 'success' || line.color === 'emerald') textClass += ' success';
                    if (line.color === 'warning') textClass += ' warning';
                    
                    return (
                        <div class="terminal-line" key={idx}>
                            <span class="terminal-prompt">{line.prompt}</span>
                            <span class={textClass}>{line.text}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
