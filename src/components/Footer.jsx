function Footer({ phone }) {
  return (
    <footer id="ac-globalfooter" className="no-js">
      <div className="ac-gf-content">
        <section className="ac-gf-footer">
          <div className="ac-gf-footer-shop">
            {' '}
            More ways to: Visit an <a href="#" className="analytics-exitlink">Apple Store </a>,{' '}
            <span className="nowrap">
              call <font className="js_setPhoneBlock">{phone}</font>, or{' '}
              <a href="#" className="analytics-exitlink">find a reseller </a>
            </span>
            .
          </div>
          <div className="ac-gf-footer-locale">
            <a
              className="ac-gf-footer-locale-link"
              href="#"
              title="Choose your country or region"
              aria-label="United States. Choose your country or region"
            >
              <img
                className="ac-gf-footer-locale-flag"
                src="/globalnav/apple/us.png"
                alt=""
                width="16"
                height="16"
              />
              United States{' '}
            </a>
          </div>
          <div className="ac-gf-footer-legal">
            <div className="ac-gf-footer-legal-copyright">Copyright© 2023 Apple . All rights reserved. </div>
            <div className="ac-gf-footer-legal-links">
              <a className="ac-gf-footer-legal-link analytics-exitlink" href="#">
                Privacy Policy{' '}
              </a>{' '}
              <a className="ac-gf-footer-legal-link analytics-exitlink" href="#">
                Terms of Use{' '}
              </a>
              <a className="ac-gf-footer-legal-link analytics-exitlink" href="#">
                Sales and Refunds{' '}
              </a>{' '}
              <a className="ac-gf-footer-legal-link" href="#">
                Site Map{' '}
              </a>{' '}
              <a className="ac-gf-footer-legal-link" href="#">
                Contact Apple{' '}
              </a>
            </div>
          </div>
          <meta content="Apple" property="name" />
          <meta content="+1(855)526-9908" property="telephone" />
        </section>
      </div>
    </footer>
  );
}

export default Footer;
