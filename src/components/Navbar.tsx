import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="logo">
          <svg width="34" height="34" viewBox="0 0 24 24" className="logo-icon-svg" style={{ color: "var(--primary-color)" }}>
            <rect x="2" y="4" width="20" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="2" y="13" width="20" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="6" y1="7.5" x2="10" y2="7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="16.5" x2="10" y2="16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <g className="server-dots" fill="currentColor">
              <circle cx="15" cy="7.5" r="1.5" />
              <circle cx="19" cy="7.5" r="1.5" />
              <circle cx="15" cy="16.5" r="1.5" />
              <circle cx="19" cy="16.5" r="1.5" />
            </g>
          </svg>
          <div className="logo-text">
            <span className="company-name">array<span className="highlight">.</span></span>
            <span className="company-tagline">Enterprise Solutions</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input type="text" placeholder="Search by Part Number, Brand, or Keyword..." />
        </div>

        {/* User Actions */}
        <div className="user-actions">
          <Link href="/signin" className="btn-signin">
            <i className="fa-regular fa-user"></i> Sign In
          </Link>
          <Link href="/cart" className="btn-cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="main-nav">
        <ul className="nav-links">
          <li className="has-dropdown"><Link href="#">Products <i className="fa-solid fa-chevron-down"></i></Link></li>
          <li className="has-dropdown">
            <Link href="#">Solutions <i className="fa-solid fa-chevron-down"></i></Link>
            <ul className="dropdown-menu">
              <li><Link href="#"><span>Best Parts</span></Link></li>
              <li><Link href="#"><span>Bulk Order</span></Link></li>
              <li><Link href="#"><span>SpecsPro</span> <i className="fa-solid fa-chevron-right"></i></Link></li>
              <li><Link href="#"><span>End of Life</span></Link></li>
              <li><Link href="#"><span>AI & ML Servers</span></Link></li>
              <li><Link href="#"><span>Database Servers</span></Link></li>
              <li><Link href="#"><span>NAS & Storage</span></Link></li>
              <li><Link href="#"><span>Virtualization</span></Link></li>
              <li><Link href="#"><span>Email Servers</span></Link></li>
              <li><Link href="#"><span>VDI Servers</span></Link></li>
            </ul>
          </li>
          <li className="has-dropdown"><Link href="#">Data Center <i className="fa-solid fa-chevron-down"></i></Link></li>
          <li className="has-dropdown"><Link href="#">Computing <i className="fa-solid fa-chevron-down"></i></Link></li>
          <li className="has-dropdown"><Link href="#">Services <i className="fa-solid fa-chevron-down"></i></Link></li>
          <li><Link href="#">Upgrade Guides</Link></li>
          <li><Link href="#">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}

