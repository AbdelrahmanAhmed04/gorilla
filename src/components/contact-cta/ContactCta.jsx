import "./contact-cta.css";
import ContactCta1Bg from "../../assets/contact-cta-1-bg.webp";
import ContactCta2Bg from "../../assets/contact-cta-2-bg.webp";
import { Link } from "react-router-dom";
function ContactCta(props) {
  return (
    <div
      className={
        props.variant === "1"
          ? "contact-cta-container-1 contact-cta-container"
          : props.variant === "2"
          ? "contact-cta-container-2 contact-cta-container"
          : "contact-cta-container"
      }
    >
      <div
        className="contact-bg-container"
        style={{
          backgroundImage: `url(${
            props.variant === "1" ? ContactCta1Bg : ContactCta2Bg
          }) `,
        }}
      ></div>

      <p className="contact-cta-content">
        {props.variant === "1" ? (
          <>
            Let's Create Something{" "}
            <span className="red-colored uppercase underlined">together</span>
            ...
          </>
        ) : (
          <>
            Want to <span className="uppercase">see more</span>{" "}
            <span className="red-colored">?</span>
            <br />
            Let's create something{" "}
            <span className="uppercase underlined">together</span>
            <span className="red-colored">.</span>
          </>
        )}
      </p>
      <Link to="/contact" id="glass-button-extended" className="glass-button">
        work with us
      </Link>
    </div>
  );
}
export default ContactCta;
