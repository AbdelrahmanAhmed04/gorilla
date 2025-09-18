import MainSectionBg from "../../assets/contact-hero-bg.png";
import "./contact-hero.css";

function ContactHero() {
  return (
    <section className="contact-hero-container">
      <div
        className="contact-hero-bg-container"
        style={{ backgroundImage: `url(${MainSectionBg})` }}
      ></div>
      <h3>
        Let's Create Something <span className="uppercase">together</span>
      </h3>
      <p>We’re here to bring your ideas to life. Reach out and let’s talk.</p>
    </section>
  );
}

export default ContactHero;
