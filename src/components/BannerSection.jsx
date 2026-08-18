function BannerSection({ displayText }) {
  return (
    <section className="as-columns  as-columns--1up  as-banner as-banner--top">
      <div className="row">
        <div className="column large-12 medium-12 small-12">
          <div className="as-banner-cont">
            <div className="as-banner-image as-banner-image--top">
              <style type="text/css">{`
                .as-banner-image.as-banner-image--top {
                  background-image: url("/globalnav/apple/contact-us-hero.image.large_2x.jpg");
                }

                .as-banner-image.as-banner-image--top:before {
                  content: "";
                  display: block;
                }

                @media only screen and (max-width: 735px) {
                  .as-banner-image.as-banner-image--top {
                    background-image: url("/globalnav/apple/contact-us-hero.image.small_2x.jpg");
                  }
                }
              `}</style>
              <img
                sizes="(min-width:735px ) 735w, 100vw"
                srcSet="/globalnav/apple/contact-us-hero.image.small_2x.jpg 735w, /globalnav/apple/contact-us-hero.image.large_2x.jpg 1440w"
                alt=""
                className="as-image-speculativedownload"
                src="/globalnav/apple/contact-us-hero.image.large_2x.jpg"
              />
            </div>
          </div>
          <div className="as-banner-content">
            <div className="pageTitle  ">
              <h1 className="pageTitle-heading">Apple Support </h1>
              <p className="pageTitle-intro js_setTextBlock">{displayText}</p>
            </div>
            <div className="sectionTitle sectionTitleBlock">
              <h2 className="sectionTitle-heading"></h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerSection;
