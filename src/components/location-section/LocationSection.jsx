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
        let's start the
        <span className="bold red-colored uppercase"> conversation</span>
        <span className="bold red-colored">.</span>
      </h3>
      <div className="location-details">
        <div className="right-clustur">
          <div className="contact-container">
            <img src={EmailIcon} alt="Email" />
            <h4>Email</h4>
            <p>info@gorillaproduction.org</p>
          </div>
          <div className="contact-container">
            <img src={WhatsappIcon} alt="Whatsapp" />
            <h4>WhatsApp</h4>
            <p>+201205505035</p>
          </div>
        </div>
        <div className="left-clustur">
          <div className="contact-container">
            <img src={PhoneIcon} alt="Phone Number" />
            <h4>Phone Number</h4>
            <p>+201205505035</p>
          </div>
          <div className="contact-container">
            <img src={LocationIcon} alt="Locations" />
            <h4>Locations</h4>
            <p>52 Gamal Salem, Giza, Dokki</p>
          </div>
        </div>
      </div>
      <iframe
        className="gorilla-location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8155474898094!2d31.200974999999993!3d30.042149199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145846ccb5d88dfb%3A0x60864035928b53ec!2s52%20Gamal%20Salem%2C%20Ad%20Doqi%2C%20Dokki%2C%20Giza%20Governorate%203751210!5e0!3m2!1sen!2seg!4v1763263108331!5m2!1sen!2seg"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
}

export default LocationSection;
