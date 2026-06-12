// Interactive Canvas Network Mesh
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: null, y: null, radius: 150 };

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Handle Mouse Move
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Particle Definition
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1.5;
        this.color = Math.random() > 0.3 ? '#00f0ff' : '#00ff66';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundary
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Interaction with mouse
        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                let force = (mouse.radius - dist) / mouse.radius;
                let angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * 2;
                this.y -= Math.sin(angle) * force * 2;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
    }
}

// Initialize Particle Array
function initParticles() {
    particles = [];
    let numParticles = Math.floor((canvas.width * canvas.height) / 11000);
    numParticles = Math.min(numParticles, 120); // capped for performance
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}
initParticles();
window.addEventListener('resize', initParticles);

// Connect Particles with Glowing Lines
function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let limit = 120;

            if (dist < limit) {
                let alpha = (1 - (dist / limit)) * 0.15;
                ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

// Main Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connect();
    requestAnimationFrame(animate);
}
animate();


// Latency & IP Simulation
const regionPing = document.getElementById('region-ping');
const clientIpDisplay = document.getElementById('client-ip');

function simulatePing() {
    let mockPing = Math.floor(Math.random() * 20) + 12;
    let regions = ['US-EST', 'US-WEST', 'EU-CENTRAL', 'AP-EAST', 'US-SOUTH'];
    let region = regions[Math.floor(Math.random() * regions.length)];
    regionPing.innerText = `SYS.PING: ${mockPing}ms (Region: ${region})`;
}
setInterval(simulatePing, 4000);

// Client simulated IP details
function initClientIP() {
    let octets = [
        Math.floor(Math.random() * 190) + 20,
        Math.floor(Math.random() * 254) + 1,
        Math.floor(Math.random() * 254) + 1,
        Math.floor(Math.random() * 254) + 1
    ];
    clientIpDisplay.innerText = octets.join('.');
}
initClientIP();


// Active Navigation Link on Scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.hud-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id') || 'home';
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Hero Terminal Script simulation
const heroTerminal = document.getElementById('hero-terminal');
const bootLines = [
    { prompt: '>', text: 'acquiring target domain list...', color: 'primary' },
    { prompt: '>', text: 'target response rate estimated at 18.4% via LinkedIn protocol.', color: 'success' },
    { prompt: '>', text: 'security parameters handshake success.', color: 'success' },
    { prompt: '>', text: 'syncing outreach engine databases...', color: 'primary' },
    { prompt: '>', text: 'secure calendar API mapping active.', color: 'warning' },
    { prompt: '>>', text: 'operational grid stable. standing by.', color: 'emerald' }
];
let currentLineIdx = 0;

function appendTerminalLines() {
    if (currentLineIdx >= bootLines.length) return;
    const line = bootLines[currentLineIdx];
    const lineEl = document.createElement('div');
    lineEl.className = 'terminal-line';
    
    let textClass = 'terminal-output';
    if (line.color === 'success') textClass += ' success';
    if (line.color === 'warning') textClass += ' warning';
    if (line.color === 'emerald') textClass += ' success'; // fits green

    lineEl.innerHTML = `
        <span class="terminal-prompt">${line.prompt}</span>
        <span class="${textClass}">${line.text}</span>
    `;
    heroTerminal.appendChild(lineEl);
    currentLineIdx++;
    setTimeout(appendTerminalLines, 2500);
}
setTimeout(appendTerminalLines, 3000);


// Service Protocol Modal Data Map
const protocolData = {
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

const modal = document.getElementById('protocol-modal');
const modalTag = document.getElementById('modal-protocol-tag');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalCadence = document.getElementById('modal-spec-cadence');
const modalChannels = document.getElementById('modal-spec-channels');
const modalObjective = document.getElementById('modal-spec-objective');

function openProtocol(key) {
    const data = protocolData[key];
    if (!data) return;
    
    modalTag.innerText = data.tag;
    modalTitle.innerText = data.title;
    modalDesc.innerText = data.desc;
    modalCadence.innerText = data.cadence;
    modalChannels.innerText = data.channels;
    modalObjective.innerText = data.objective;
    
    modal.classList.add('active');
}

function closeProtocol() {
    modal.classList.remove('active');
}

// Close modal on escape or outer click
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProtocol();
});
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProtocol();
});


// Pipeline Calculator logic
const contractValueRange = document.getElementById('contract-value-range');
const contractValueDisplay = document.getElementById('contract-value-display');
const meetingsValueRange = document.getElementById('meetings-value-range');
const meetingsValueDisplay = document.getElementById('meetings-value-display');
const annualPipelineDisplay = document.getElementById('annual-pipeline-value');

function formatCurrency(val) {
    return '$' + Number(val).toLocaleString();
}

function recalculatePipeline() {
    const contractVal = Number(contractValueRange.value);
    const meetingsVal = Number(meetingsValueRange.value);
    
    contractValueDisplay.innerText = formatCurrency(contractVal);
    meetingsValueDisplay.innerText = meetingsVal;
    
    // Annualized calculation: Meetings * 12 months * 15% close rate * contract value
    const closeRate = 0.15;
    const projectedDeals = meetingsVal * 12 * closeRate;
    const totalPipeline = projectedDeals * contractVal;
    
    annualPipelineDisplay.innerText = formatCurrency(Math.round(totalPipeline));
}

contractValueRange.addEventListener('input', recalculatePipeline);
meetingsValueRange.addEventListener('input', recalculatePipeline);
recalculatePipeline(); // run initially


// Contact Form & Multi-step Integrated Scheduler
const leadForm = document.getElementById('lead-form');
const formContainer = document.getElementById('intake-form-container');
const schedulerContainer = document.getElementById('scheduler-container');
const calendarGrid = document.getElementById('calendar-grid');
const confirmBookingBtn = document.getElementById('confirm-booking-btn');

let selectedDate = null;
let selectedTime = null;
let userData = {};

leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Capture data
    userData.name = document.getElementById('full-name').value;
    userData.email = document.getElementById('email').value;
    userData.sector = document.getElementById('company-type').value;
    
    // Swap form view
    leadForm.style.display = 'none';
    schedulerContainer.style.display = 'flex';
    
    generateCalendar();
});

// Generate dynamic selectable calendar dates (next 10 business days)
function generateCalendar() {
    calendarGrid.innerHTML = '';
    
    // Headers
    const headers = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    headers.forEach(h => {
        const headerEl = document.createElement('div');
        headerEl.className = 'calendar-day-header';
        headerEl.innerText = h;
        calendarGrid.appendChild(headerEl);
    });
    
    const today = new Date();
    // Offset to start of week (Monday)
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + mondayOffset);

    // Render 14 days representing current + next week
    for (let i = 0; i < 14; i++) {
        const targetDate = new Date(startOfWeek);
        targetDate.setDate(startOfWeek.getDate() + i);
        
        const dayBtn = document.createElement('button');
        dayBtn.className = 'calendar-day-btn';
        dayBtn.innerText = targetDate.getDate();
        
        const isWeekend = targetDate.getDay() === 0 || targetDate.getDay() === 6;
        const isPast = targetDate < today && targetDate.toDateString() !== today.toDateString();
        
        if (isWeekend || isPast) {
            dayBtn.disabled = true;
        } else {
            dayBtn.addEventListener('click', () => {
                // Remove previous selected
                document.querySelectorAll('.calendar-day-btn').forEach(btn => btn.classList.remove('selected'));
                dayBtn.classList.add('selected');
                selectedDate = targetDate.toDateString();
                validateBookingState();
            });
        }
        calendarGrid.appendChild(dayBtn);
    }
}

function selectTimeSlot(btn) {
    document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedTime = btn.innerText;
    validateBookingState();
}

function validateBookingState() {
    if (selectedDate && selectedTime) {
        confirmBookingBtn.disabled = false;
    }
}

function completeBooking() {
    formContainer.innerHTML = `
        <div class="intake-success-screen">
            <i class="fa-solid fa-circle-check success-icon"></i>
            <h3 style="font-size: 1.5rem; font-weight: 600; color: var(--accent-emerald);">Transmission Authorized</h3>
            <p style="color: var(--text-secondary); line-height: 1.5; font-size: 0.95rem;">
                Briefing confirmed for <strong style="color: var(--accent-cyan);">${selectedDate}</strong> at <strong style="color: var(--accent-cyan);">${selectedTime}</strong>.
            </p>
            <p style="color: var(--text-muted); font-size: 0.85rem; font-family: var(--font-mono); margin-top: 10px;">
                Secure invitation key sent to ${userData.email}.
            </p>
        </div>
    `;
}
