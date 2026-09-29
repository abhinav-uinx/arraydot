const fs = require('fs');

// 1. Add CSS
let css = fs.readFileSync('src/app/globals.css', 'utf8');
const breachCss = `
.breach-section {
  position: relative;
  background: #000;
  color: #fff;
  padding: 120px 20px 80px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #111;
}
.breach-w {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}
.breach-p {
  font-size: clamp(18px, 2.5vw, 28px);
  line-height: 1.4;
  font-weight: 500;
  margin-bottom: 120px;
}
.breach-q {
  font-size: 14px;
  font-style: italic;
  color: #777;
  margin-bottom: 20px;
}
.breach-counter-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.breach-number {
  font-size: clamp(100px, 22vw, 320px);
  font-weight: 900;
  color: #050505;
  -webkit-text-stroke: 1px #222;
  letter-spacing: -2px;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  user-select: none;
}
.breach-dotted-text {
  position: absolute;
  font-size: clamp(24px, 4.5vw, 64px);
  font-weight: 500;
  color: transparent;
  background-image: radial-gradient(circle, #888 1px, transparent 1px);
  background-size: 4px 4px;
  -webkit-background-clip: text;
  background-clip: text;
  white-space: nowrap;
  letter-spacing: 2px;
}
.breach-attr {
  position: absolute;
  bottom: 15px;
  right: 25px;
  font-size: 11px;
  color: #555;
  font-style: italic;
}
`;
fs.writeFileSync('src/app/globals.css', css + breachCss, 'utf8');

// 2. Add Component to page.tsx
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const breachComponent = `
function BreachSection() {
  const [count, setCount] = useState(4466336);

  useEffect(() => {
    const interval = setInterval(() => {
      // Tick up realistically like a live meter
      setCount(c => c + Math.floor(Math.random() * 8 + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="breach-section">
      <div className="breach-w">
        <p className="breach-p">
          SMBs are often affected by cyberattacks, incurring an average cost of USD 4.4 M. A huge price that can easily be avoided with our cost-effective security solutions. We provide comprehensive services that keep your operations secure while ensuring you don't overspend.
        </p>
        <p className="breach-q">
          "Threats are evolving faster than solutions; stay on guard with the right security partner"
        </p>
        
        <div className="breach-counter-wrap">
          <div className="breach-number">{count}</div>
          <div className="breach-dotted-text">The Cost of a Data Breach</div>
        </div>
      </div>
      <div className="breach-attr">
        *Cost of a Data Breach Report 2025, IBM
      </div>
    </section>
  );
}

export default function Home() {`;

code = code.replace('export default function Home() {', breachComponent);

// 3. Inject <BreachSection /> into JSX
code = code.replace(
  '</div>\n  <div className="chips"',
  '</div>\n  <BreachSection />\n  <div className="chips"'
);

// We should also replace standard line breaks if they differ
// Let's use a looser regex for the injection
code = code.replace(/<\/div>\s*<div className="chips"/, '</div>\n  <BreachSection />\n  <div className="chips"');

fs.writeFileSync('src/app/page.tsx', code, 'utf8');
