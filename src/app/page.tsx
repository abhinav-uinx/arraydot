import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSlider />
      
      {/* Shop By Category Section */}
      <section className="shop-category">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <div className="heading-line"></div>
        </div>

        <div className="category-grid">
          {/* Category 1 */}
          <a href="#" className="category-card">
            <img src="https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?q=80&w=600&auto=format&fit=crop" alt="Cables" />
            <div className="card-overlay">
              <h3>CABLES</h3>
              <p>Cables & Accessories</p>
            </div>
          </a>
          {/* Category 2 */}
          <a href="#" className="category-card">
            <img src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=600&auto=format&fit=crop" alt="Cooling" />
            <div className="card-overlay">
              <h3>COOLING</h3>
              <p>Fans & Environmental</p>
            </div>
          </a>
          {/* Category 3 */}
          <a href="#" className="category-card">
            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop" alt="Firewalls" /><div className="card-overlay"><h3>FIREWALLS</h3>
              <p>Network Security</p>
            </div>
          </a>
          {/* Category 4 */}
          <a href="#" className="category-card">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" alt="HCI" />
            <div className="card-overlay">
              <h3>HCI</h3>
              <p>Hyperconverged Infrastructure</p>
            </div>
          </a>
          {/* Category 5 */}
          <a href="#" className="category-card">
            <img src="https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?q=80&w=600&auto=format&fit=crop" alt="Memory" />
            <div className="card-overlay">
              <h3>MEMORY</h3>
              <p>DDR3, DDR4 & DDR5</p>
            </div>
          </a>
          {/* Category 6 */}
          <a href="#" className="category-card">
            <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop" alt="Networking" />
            <div className="card-overlay">
              <h3>NETWORKING</h3>
              <p>NICs, SFPs & Switches</p>
            </div>
          </a>
          {/* Category 7 */}
          <a href="#" className="category-card">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop" alt="Power Supplies" />
            <div className="card-overlay">
              <h3>POWER SUPPLIES</h3>
              <p>Server PSUs</p>
            </div>
          </a>
          {/* Category 8 */}
          <a href="#" className="category-card">
            <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=600&auto=format&fit=crop" alt="Processors" />
            <div className="card-overlay">
              <h3>PROCESSORS</h3>
              <p>Intel Xeon & AMD EPYC</p>
            </div>
          </a>
          {/* Category 9 */}
          <a href="#" className="category-card">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop" alt="Servers" />
            <div className="card-overlay">
              <h3>SERVERS</h3>
              <p>Enterprise Server Systems</p>
            </div>
          </a>
          {/* Category 10 */}
          <a href="#" className="category-card">
            <img src="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=600&auto=format&fit=crop" alt="Storage" />
            <div className="card-overlay">
              <h3>STORAGE</h3>
              <p>HDD, SSD & NVMe</p>
            </div>
          </a>
        </div>
      </section>

      {/* Brands We Carry Section */}
      <section className="brands-section">
        <h2 className="section-title">Brands We Carry</h2>
        <div className="brands-grid">
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-server brand-icon"></i>
                <img src="https://img.logo.dev/dell.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="Dell" className="real-logo" />
              
            </div>
            <span>Dell</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-network-wired brand-icon"></i>
                <img src="https://img.logo.dev/hpe.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="HPE" className="real-logo" />
              
            </div>
            <span>HPE</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-laptop brand-icon"></i>
                <img src="https://img.logo.dev/lenovo.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="Lenovo" className="real-logo" />
              
            </div>
            <span>Lenovo</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-database brand-icon"></i>
                <img src="https://img.logo.dev/ibm.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="IBM" className="real-logo" />
              
            </div>
            <span>IBM</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-wifi brand-icon"></i>
                <img src="https://img.logo.dev/cisco.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="Cisco" className="real-logo" />
              
            </div>
            <span>Cisco</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-microchip brand-icon"></i>
                <img src="https://img.logo.dev/supermicro.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="Supermicro" className="real-logo" />
              </div>
              <span>Supermicro</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-memory brand-icon"></i>
                <img src="https://img.logo.dev/intel.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="Intel" className="real-logo" />
              </div>
              <span>Intel</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-microchip brand-icon"></i>
                <img src="https://img.logo.dev/amd.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="AMD" className="real-logo" />
              </div>
              <span>AMD</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-hard-drive brand-icon"></i>
                <img src="https://img.logo.dev/netapp.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="NetApp" className="real-logo" />
              </div>
              <span>NetApp</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-sitemap brand-icon"></i>
                <img src="https://img.logo.dev/juniper.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="Juniper" className="real-logo" />
              
            </div>
            <span>Juniper</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-shield-halved brand-icon"></i>
                <img src="https://img.logo.dev/fortinet.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="Fortinet" className="real-logo" />
              
            </div>
            <span>Fortinet</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-hard-drive brand-icon"></i>
                <img src="https://img.logo.dev/seagate.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="Seagate" className="real-logo" />
              </div>
              <span>Seagate</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-memory brand-icon"></i>
                <img src="https://img.logo.dev/samsung.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="Samsung" className="real-logo" />
              </div>
              <span>Samsung</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-microchip brand-icon"></i>
                <img src="https://img.logo.dev/nvidia.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="NVIDIA" className="real-logo" />
              </div>
              <span>NVIDIA</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-brands fa-apple brand-icon"></i>
                <img src="https://img.logo.dev/apple.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="Apple" className="real-logo" />
              
            </div>
            <span>Apple</span>
          </div>
          <div className="brand-card">
            <div className="icon-container">
              <i className="fa-solid fa-desktop brand-icon"></i>
                <img src="https://img.logo.dev/hp.com?token=pk_N91VRyDQRQC1FfL6rnQ95Q&format=webp&retina=true" alt="HP" className="real-logo" />
              
            </div>
            <span>HP</span>
          </div>
        </div>
      </section>

      {/* Enterprise Services and Solutions */}
      <section className="services-section">
        <h2 className="section-title">Enterprise Services and Solutions</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>IT Services</h3>
            <p>TPM, maintenance contracts, SPaaS, ITAD, leasing, and professional services.</p>
          </div>
          <div className="service-card">
            <h3>Server Solutions</h3>
            <p>AI/ML, database, virtualization, VDI, NAS, and email server configurations.</p>
          </div>
          <div className="service-card">
            <h3>EOSL Library</h3>
            <p>Check end-of-life dates for 249 server and storage models across 7 brands.</p>
          </div>
          <div className="service-card">
            <h3>Price Match</h3>
            <p>We match any authorized dealer&apos;s price on genuine enterprise parts.</p>
          </div>
        </div>
      </section>

      {/* Shipping / Countries Section */}
      <section className="shipping-section">
        <div className="shipping-container">
          <h3 className="shipping-title">Server parts by country</h3>
          <p className="shipping-desc">Tested, serial-verified enterprise parts shipped from our Riyadh warehouse. Each country page states the delivery lane and the local import position.</p>
          <div className="country-links">
            <a href="#">United States</a> - <a href="#">India</a> - <a href="#">UAE</a> - <a href="#">United Kingdom</a> - <a href="#">Egypt</a> - <a href="#">Germany</a> - <a href="#">Saudi Arabia</a> - <a href="#">Netherlands</a> - <a href="#">Turkey</a> - <a href="#">Pakistan</a> - <a href="#">Poland</a> - <a href="#">Morocco</a>
          </div>
          <a href="#" className="view-all-link">All countries we ship to &rarr;</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-info">
          <span><i className="fa-solid fa-truck-fast"></i> Delivery Across MENA, Africa & Beyond</span>
          <span><i className="fa-solid fa-phone"></i> +966 12 345 6789</span>
          <span><i className="fa-solid fa-envelope"></i> sales@arabia-it.com</span>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Arabia Enterprise IT Solutions. All Rights Reserved.</p>
        </div>
      </footer>

    </main>
  );
}















