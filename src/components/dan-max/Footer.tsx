'use client';

import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Black Circle */}
      <div className="footer-circle"></div>

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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
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