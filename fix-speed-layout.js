const fs = require('fs');

let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Slow down particle movement
code = code.replace(/p\.x \+= dx \* 0\.12;/g, 'p.x += dx * 0.04;');
code = code.replace(/p\.y \+= dy \* 0\.12;/g, 'p.y += dy * 0.04;');

// 2. Slow down the interval between words
code = code.replace(/setInterval\(\(\) => \{[\s\S]*?\}, 1500\);/, `setInterval(() => {
        setSubWordIndex(prev => (prev + 1) % subWords.length);
      }, 3500);`);

// 3. Rearrange the boxes (pushing them outward to frame the center better)
const oldProblemsRegex = /const problems = \[[\s\S]*?\];/;
const newProblems = `const problems = [
    { text: 'Identity & Credential Compromise', style: { top: '15%', left: '8%' } },
    { text: 'Unpatched & Vulnerable Systems', style: { top: '20%', right: '8%' } },
    { text: 'Malware & Ransomware Attacks', style: { top: '45%', left: '4%' } },
    { text: 'Email-borne Threats', style: { top: '50%', right: '4%' } },
    { text: 'Data Breaches & Exfiltration', style: { bottom: '15%', left: '15%' } },
    { text: 'Compliance Gaps', style: { bottom: '12%', right: '12%' } },
  ];`;
code = code.replace(oldProblemsRegex, newProblems);

const oldRemediationsRegex = /const remediations = \[[\s\S]*?\];/;
const newRemediations = `const remediations = [
    { text: 'Deploying Identity Threat Detection and Response', style: { top: '15%', left: '8%' } },
    { text: 'Implement a Vulnerability Management Program', style: { top: '20%', right: '8%' } },
    { text: 'Deploying EDR Solutions', style: { top: '45%', left: '4%' } },
    { text: 'Deploying Email Security Gateways & Awareness Training', style: { top: '50%', right: '4%' } },
    { text: 'Deploy DLP & CASB', style: { bottom: '15%', left: '15%' } },
    { text: 'Continuous Compliance Monitoring', style: { bottom: '12%', right: '12%' } },
  ];`;
code = code.replace(oldRemediationsRegex, newRemediations);

fs.writeFileSync('src/app/page.tsx', code, 'utf8');
