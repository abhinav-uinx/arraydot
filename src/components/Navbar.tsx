import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="logo">
          <img src="/logo-white.svg" alt="Array Logo" style={{ height: "55px", width: "auto" }} />
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
          <li className="has-dropdown">
            <Link href="#">Products <i className="fa-solid fa-chevron-down"></i></Link>
            <ul className="dropdown-menu">
              <li><Link href="#"><span>Browse All Parts</span></Link></li>
              <li><Link href="#"><span>Infrastructure</span> <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", marginLeft: "6px" }}></i></Link></li>
              <li><Link href="#"><span>Security &amp; Networking</span> <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", marginLeft: "6px" }}></i></Link></li>
              <li><Link href="#"><span>Backup</span> <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", marginLeft: "6px" }}></i></Link></li>
              <li><Link href="#"><span>More Brands</span> <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", marginLeft: "6px" }}></i></Link></li>
              <li><div style={{ height: "1px", background: "rgba(0,0,0,0.1)", margin: "8px 10px" }}></div></li>
              <li><Link href="#"><span>Dell</span></Link></li>
              <li><Link href="#"><span>HPE</span></Link></li>
              <li><Link href="#"><span>Lenovo</span></Link></li>
              <li><Link href="#"><span>Cisco</span></Link></li>
              <li><Link href="#"><span>IBM</span></Link></li>
              <li><Link href="#"><span>Supermicro</span></Link></li>
              <li><div style={{ height: "1px", background: "rgba(0,0,0,0.1)", margin: "8px 10px" }}></div></li>
              <li><Link href="#"><span>Memory</span></Link></li>
              <li><Link href="#"><span>SSD</span></Link></li>
              <li><Link href="#"><span>Hard Drives</span></Link></li>
              <li><Link href="#"><span>Processors</span></Link></li>
              <li><Link href="#"><span>RAID &amp; HBA</span></Link></li>
              <li><Link href="#"><span>Networking</span></Link></li>
              <li><Link href="#"><span>Power Supplies</span></Link></li>
              <li><Link href="#"><span>Cables &amp; Accessories</span></Link></li>
              <li><Link href="#"><span>Heatsinks &amp; Fans</span></Link></li>
              <li><Link href="#"><span>Rails &amp; Bezels</span></Link></li>
              <li><div style={{ height: "1px", background: "rgba(0,0,0,0.1)", margin: "8px 10px" }}></div></li>
              <li><Link href="#"><span>Cairo (Same Day)</span></Link></li>
              <li><Link href="#"><span>Saudi Arabia</span></Link></li>
              <li><Link href="#"><span>UAE &amp; Dubai</span></Link></li>
            </ul>
          </li>
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
          <li className="has-dropdown">
            <Link href="#">Data Center <i className="fa-solid fa-chevron-down"></i></Link>
            <ul className="dropdown-menu">
              <li><Link href="#"><span>Dell</span> <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", marginLeft: "6px" }}></i></Link></li>
              <li><Link href="#"><span>HPE</span> <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", marginLeft: "6px" }}></i></Link></li>
              <li><Link href="#"><span>IBM</span> <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", marginLeft: "6px" }}></i></Link></li>
              <li><Link href="#"><span>Lenovo</span> <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", marginLeft: "6px" }}></i></Link></li>
              <li><Link href="#"><span>Cisco</span> <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", marginLeft: "6px" }}></i></Link></li>
              <li><Link href="#"><span>Supermicro</span> <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", marginLeft: "6px" }}></i></Link></li>
              <li><Link href="#"><span>NetApp</span></Link></li>
              <li><Link href="#"><span>Hitachi</span></Link></li>
              <li><Link href="#"><span>Pure Storage</span></Link></li>
              <li><Link href="#"><span>Infinidat</span></Link></li>
              <li><Link href="#"><span>Synology</span></Link></li>
              <li><Link href="#"><span>QNAP</span></Link></li>
              <li><Link href="#"><span>Oracle</span></Link></li>
              <li><Link href="#"><span>Fujitsu</span></Link></li>
              <li><Link href="#"><span>Huawei</span></Link></li>
              <li><Link href="#"><span>Nutanix</span></Link></li>
            </ul>
          </li>
          <li className="has-dropdown"><Link href="#">Computing <i className="fa-solid fa-chevron-down"></i></Link></li>
          <li className="has-dropdown"><Link href="#">Services <i className="fa-solid fa-chevron-down"></i></Link></li>
          <li><Link href="#">Upgrade Guides</Link></li>
          <li><Link href="#">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}







