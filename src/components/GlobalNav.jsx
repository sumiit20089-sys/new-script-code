function GlobalNav() {
  return (
    <>
      <input type="checkbox" id="ac-gn-menustate" className="ac-gn-menustate" />
      <nav id="ac-globalnav" className="no-js">
        <div className="ac-gn-content">
          <ul className="ac-gn-header">
            <li className="ac-gn-item ac-gn-menuicon">
              <label className="ac-gn-menuicon-label" htmlFor="ac-gn-menustate" aria-hidden="true">
                <span className="ac-gn-menuicon-bread ac-gn-menuicon-bread-top">
                  <span className="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-top"></span>
                </span>
                <span className="ac-gn-menuicon-bread ac-gn-menuicon-bread-bottom">
                  <span className="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-bottom"></span>
                </span>
              </label>
              <a href="#ac-gn-menustate" className="ac-gn-menuanchor ac-gn-menuanchor-open" id="ac-gn-menuanchor-open">
                <span className="ac-gn-menuanchor-label">Open Menu </span>
              </a>
              <a href="#" className="ac-gn-menuanchor ac-gn-menuanchor-close" id="ac-gn-menuanchor-close">
                <span className="ac-gn-menuanchor-label">Close Menu </span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-apple">
              <a className="ac-gn-link ac-gn-link-apple" href="#" id="ac-gn-firstfocus-small">
                <span className="ac-gn-link-text">Apple </span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-bag ac-gn-bag-small" id="ac-gn-bag-small">
              <a className="ac-gn-link ac-gn-link-bag analytics-exitlink" href="#">
                <span className="ac-gn-link-text">Shopping Bag </span>
                <span className="ac-gn-bag-badge"></span>
              </a>
              <span className="ac-gn-bagview-caret ac-gn-bagview-caret-large"></span>
            </li>
          </ul>
          <ul className="ac-gn-list">
            <li className="ac-gn-item ac-gn-apple">
              <a className="ac-gn-link ac-gn-link-apple" href="#" id="ac-gn-firstfocus">
                <span className="ac-gn-link-text">Apple </span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-mac">
              <a className="ac-gn-link ac-gn-link-mac" href="#">
                <span className="ac-gn-link-text">Mac </span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-ipad">
              <a className="ac-gn-link ac-gn-link-ipad" href="#">
                <span className="ac-gn-link-text">iPad </span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-iphone">
              <a className="ac-gn-link ac-gn-link-iphone" href="#">
                <span className="ac-gn-link-text">iPhone </span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-watch">
              <a className="ac-gn-link ac-gn-link-watch" href="#">
                <span className="ac-gn-link-text">Watch </span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-tv">
              <a className="ac-gn-link ac-gn-link-tv" href="#">
                <span className="ac-gn-link-text">TV </span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-music">
              <a className="ac-gn-link ac-gn-link-music" href="#">
                <span className="ac-gn-link-text">Music </span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-support">
              <a className="ac-gn-link ac-gn-link-support" href="#">
                <span className="ac-gn-link-text">Support </span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-item-menu ac-gn-search" role="search">
              <a className="ac-gn-link ac-gn-link-search" href="#">
                <span className="ac-gn-search-placeholder" aria-hidden="true">
                  Search apple.com{' '}
                </span>
              </a>
            </li>
            <li className="ac-gn-item ac-gn-bag" id="ac-gn-bag">
              <a className="ac-gn-link ac-gn-link-bag analytics-exitlink" href="#" aria-label="Shopping Bag">
                <span className="ac-gn-link-text">Shopping Bag </span>
                <span className="ac-gn-bag-badge" aria-hidden="true"></span>
              </a>
              <span className="ac-gn-bagview-caret ac-gn-bagview-caret-large"></span>
            </li>
          </ul>
          <aside id="ac-gn-searchview" className="ac-gn-searchview" role="search">
            <div className="ac-gn-searchview-content">
              <form id="ac-gn-searchform" className="ac-gn-searchform" action="http://www.apple.com/us/search" method="get">
                <div className="ac-gn-searchform-wrapper">
                  <input
                    id="ac-gn-searchform-input"
                    className="ac-gn-searchform-input"
                    type="text"
                    placeholder="Search apple.com"
                    autoCorrect="off"
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <input id="ac-gn-searchform-src" type="hidden" name="src" value="globalnav" />
                  <button
                    id="ac-gn-searchform-submit"
                    className="ac-gn-searchform-submit"
                    type="submit"
                    disabled
                    aria-label="Submit"
                  ></button>
                  <button
                    id="ac-gn-searchform-reset"
                    className="ac-gn-searchform-reset"
                    type="reset"
                    disabled
                    aria-label="Clear Search"
                  ></button>
                </div>
              </form>
              <aside id="ac-gn-searchresults" className="ac-gn-searchresults"></aside>
            </div>
            <button id="ac-gn-searchview-close" className="ac-gn-searchview-close" aria-label="Close Search">
              <span className="ac-gn-searchview-close-wrapper">
                <span className="ac-gn-searchview-close-left"></span>
                <span className="ac-gn-searchview-close-right"></span>
              </span>
            </button>
          </aside>
          <aside className="ac-gn-bagview">
            <div className="ac-gn-bagview-scrim">
              <span className="ac-gn-bagview-caret ac-gn-bagview-caret-small"></span>
            </div>
            <div className="ac-gn-bagview-content" id="ac-gn-bagview-content"></div>
          </aside>
        </div>
      </nav>
      <div id="ac-gn-curtain" className="ac-gn-curtain"></div>
      <div id="ac-gn-placeholder" className="ac-nav-placeholder"></div>
    </>
  );
}

export default GlobalNav;
