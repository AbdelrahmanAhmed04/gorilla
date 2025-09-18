import "./about-main-section.css";

function AboutMainSection() {
  return (
    <section className="about-main">
      <div className="who-we">
        <div className="who-we__title__container">
          <h2 className="who-we__title">About</h2>
          <div className="vertical-break"></div>
        </div>
        <div className="who-we__intro">
          <div className="who-we__content">
            <h3>who we are</h3>

            <div className="who-we__categories">
              <p className="red-colored">.</p>
              <p className="category">Bold stories</p>
              <p className="red-colored">.</p>
              <p className="category">Cinematic craft</p>
              <p className="red-colored">.</p>
              <p className="category">Middle Eastern roots</p>
            </div>
          </div>
          <div className="who-we__bio">
            <h3>bio</h3>
            <p>
              Gorilla is a creative production house based in Cairo and Riyadh.
              We specialize in commercials, films, and branded content that
              connect brands with audiences. Our mission is to merge cinematic
              storytelling with marketing insight, delivering work that
              resonates across cultures and platforms.
            </p>
          </div>
        </div>
      </div>
      <div className="about-container-2">
        <div className="about-2-content">
          <div className="our-approch-container">
            <h3>our approach</h3>
            <div className="services-container">
              <div className="service">
                <h4>
                  <span className="red-colored">.</span>creative vision
                </h4>

                <p>We bring bold, original ideas to life.</p>
              </div>
              <div className="service">
                <h4>
                  <span className="red-colored">.</span>technical excellence
                </h4>
                <p>
                  From high-end cinematography to post-production, we ensure
                  world-class quality.
                </p>
              </div>
              <div className="service">
                <h4>
                  <span className="red-colored">.</span>collaborative spirit
                </h4>
                <p>
                  We partner closely with agencies, brands, and creatives to
                  deliver authentic stories.
                </p>
              </div>
            </div>
          </div>
          <div className="our-presence-container">
            <h3>our presence</h3>
            <p>
              <span className="bold">EG – KSA</span> <br />
              With roots in Cairo and a presence in Riyadh, Gorilla works across
              the Middle East, delivering stories that reflect both regional
              identity and global standards.
            </p>
          </div>
        </div>
        <div className="title-container">
          <h2 className="title">About</h2>
          <div className="vertical-break"></div>
        </div>
      </div>
    </section>
  );
}
export default AboutMainSection;
