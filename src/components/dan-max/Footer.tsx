'use client';

import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Black Circle */}
      <div className="circle-top-section">

        <div className="footer-circle">
          <img src="https://idc.co.nz/wp-content/uploads/2025/03/IDC-circle.svg" alt="" />
        </div>

        <p className="">imagedrivencontent</p>

      </div>


      {/* Main Footer Content */}
      <div className="footer-content">
        {/* Left Side */}
        <div className="footer-left">
          <p className="footer-inquiry">For all inquiries:</p>
          <h2 className="footer-email">
            <a href="mailto:MICHELE@IDC.CO.NZ">MICHELE@IDC.CO.NZ</a>
          </h2>

          {/* Social Icons */}
          <div className="footer-socials">
            <a href="#" aria-label="Instagram" className="footer-social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="footer-social-icon">
              <svg aria-hidden="true" className="e-font-icon-svg e-fab-linkedin-in" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
            </a>
          </div>

          {/* Company Info */}
          <div className="footer-company">
            <p className="footer-company-name">IDC WORLDWIDE LTD.</p>
            <p className="footer-address">498 GREAT NORTH RD, GREY LYNN, AUCKLAND, NEW ZEALAND</p>
            <p className="footer-links">
              <a href="#">PRIVACY POLICY</a>
              <span className="footer-divider">|</span>
              <a href="#">TERMS OF USE</a>
              <span className="footer-divider">|</span>
              <a href="#">ACCESSIBILITY</a>
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="footer-right">
          {/* Footer Image */}
          <div className="footer-image">
            <img
              src="/images/Footer.jpg"
              alt="Studio"
              loading="lazy"
            />
          </div>

          {/* Rights Section */}
          <div className="footer-rights">
            <p className="footer-rights-title">
              <span className="footer-rights-italic">© All rights</span>{' '}
              <span className="footer-rights-bold">RESERVED</span>
            </p>
            <p className="footer-rights-text">
              PLEASE BE INFORMED, THAT THE INTELLECTUAL PROPERTY RIGHTS TO ALL THE PHOTOS, VIDEOS, & OTHER MATERIALS ON THIS SITE BELONG TO IDC WORLDWIDE LTD AND ALL THE RESPECTIVE PHOTOGRAPHERS.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">© Copyright – IDC Worldwide, 2026</p>
        <div className="footer-developed">
          <img
            src="/images/Young-pandas-footer-white-text-logo.png"
            alt="Young Pandas"
            className="footer-dev-logo"
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
}