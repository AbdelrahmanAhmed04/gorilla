import "./location-section.css";
import EmailIcon from "../../assets/icons/email.svg";
import PhoneIcon from "../../assets/icons/telephone.svg";
import WhatsappIcon from "../../assets/icons/whatsapp.svg";
import LocationIcon from "../../assets/icons/location.svg";
function LocationSection() {
  return (
    <section className="location-section">
      <h3>
        Wherever you are,
        <br />
        let's start the{" "}
        <span className="bold underlined uppercase">conversation</span>
        <span className="bold red-colored">.</span>
      </h3>
      <div className="location-details">
        <div className="right-clustur">
          <div className="contact-container">
            <img src={EmailIcon} alt="Email" />
            <h4>Email</h4>
            <p>info@gorilla.com</p>
          </div>
          <div className="contact-container">
            <img src={WhatsappIcon} alt="Whatsapp" />
            <h4>WhatsApp</h4>
            <p>+20 XXX XXX XXXX</p>
          </div>
        </div>
        <div className="left-clustur">
          <div className="contact-container">
            <img src={PhoneIcon} alt="Phone Number" />
            <h4>Phone Number</h4>
            <p>+20 XXX XXX XXXX | +966 XXX XXX XXXX</p>
          </div>
          <div className="contact-container">
            <img src={LocationIcon} alt="Locations" />
            <h4>Locations</h4>
            <p>Cairo · Riyadh</p>
          </div>
        </div>
      </div>
      <iframe
        className="gorilla-location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6821609297003!2d31.224298799999996!3d30.045975100000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458409aa81d58a5%3A0x6ce6bf7cd258d6fe!2sCairo%20Tower!5e0!3m2!1sen!2seg!4v1758234487129!5m2!1sen!2seg"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
}

export default LocationSection;
