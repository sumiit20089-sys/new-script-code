function LocalNav({ phone }) {
  return (
    <nav id="ac-localnav" className="js no-touch css-sticky" lang="en-US" role="navigation" data-sticky="">
      <div className="ac-ln-wrapper">
        <div className="ac-ln-background"></div>
        <div className="ac-ln-content">
          <span className="ac-ln-title">
            <a href="#">
              Apple Support +1(855)526-9908{' '}
              <font color="red">
                <font className="js_setPhoneBlock">{phone}</font>
              </font>
            </a>
          </span>
          <div className="ac-ln-menu">
            <a
              href="#ac-ln-menustate"
              className="ac-ln-menucta-anchor ac-ln-menucta-anchor-open"
              id="ac-ln-menustate-open"
            >
              <span className="ac-ln-menucta-anchor-label">Open menu </span>
            </a>
            <a href="#" className="ac-ln-menucta-anchor ac-ln-menucta-anchor-close" id="ac-ln-menustate-close">
              <span className="ac-ln-menucta-anchor-label">Close menu </span>
            </a>
            <div className="ac-ln-menu-tray">
              <ul className="ac-ln-menu-items">
                <li className="ac-ln-menu-item">
                  <a href="#" className="ac-ln-menu-link analytics-exitlink">
                    {' '}
                    Communities{' '}
                  </a>
                </li>
              </ul>
            </div>
            <div className="ac-ln-actions">
              <div className="ac-ln-action ac-ln-action-menucta" aria-hidden="true">
                <label htmlFor="ac-ln-menustate" className="ac-ln-menucta">
                  <span className="ac-ln-menucta-chevron"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LocalNav;
