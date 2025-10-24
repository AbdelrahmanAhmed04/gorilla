import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm, ValidationError } from "@formspree/react";
import NameIcon from "../../assets/icons/signature.svg";
import EmailIcon from "../../assets/icons/email.svg";
import PhoneIcon from "../../assets/icons/mobile.svg";
import CompanyIcon from "../../assets/icons/company.svg";
import MessageIcon from "../../assets/icons/message.svg";
import "./lead-form.css";

/* Toast rendered into document.body via portal.
   - duration === null  => stay open until manually closed or replaced
   - variant: "sending" | "success" | "error" | "info"
*/
function Toast({
  open,
  onClose,
  duration = 3000,
  children,
  left = 20,
  bottom = 20,
  variant = "info",
}) {
  useEffect(() => {
    if (!open) return;
    if (duration == null) return; // don't auto-close if duration is null
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  const bg = {
    info: "rgba(0,0,0,0.85)",
    sending: "rgba(55,65,81,0.95)", // subtle dark while sending
    success: "rgba(16,185,129,0.95)", // green
    error: "rgba(220,38,38,0.95)", // red
  }[variant];

  const animDuration = duration == null ? 300 : duration; // fallback animation length
  const style = {
    position: "fixed",
    left: `${left}px`,
    bottom: `${bottom}px`,
    zIndex: 2,
    padding: "2vw 3vw",
    borderRadius: "8px",
    background: bg,
    color: "var(--main-light)",
    fontFamily: "var(--default-font)",
    fontSize: "1vw",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    animation: `fadeInOut ${animDuration}ms ease forwards`,
    cursor: "pointer",
    pointerEvents: "auto",
  };

  // clicking the toast dismisses it immediately
  return createPortal(
    <div
      role="status"
      aria-live="polite"
      style={style}
      onClick={() => onClose?.()}
      title="Click to dismiss"
    >
      {children}
    </div>,
    document.body
  );
}

export default function LeadForm() {
  const [state, handleSubmit] = useForm("xdklqovz");
  const formRef = useRef(null);

  // single toast state object
  const [toast, setToast] = useState({
    open: false,
    variant: "info",
    message: "",
    duration: 3000,
    left: 20,
    bottom: 20,
  });

  // Watch submission lifecycle:
  // - when submitting starts -> show persistent "sending" toast
  // - when submitting finishes -> show success OR error toast (and reset form on success)
  useEffect(() => {
    // submission finished (state.submitting === false)
    if (state.succeeded) {
      // success: reset form and show success toast (auto-close)
      formRef.current?.reset();
      setToast({
        open: true,
        variant: "success",
        message: "Your message was sent — thanks!",
        duration: 3000,
        left: 20,
        bottom: 20,
      });
      return;
    }

    // not succeeded and not submitting — check for errors
    if (!state.succeeded && state.errors && state.errors.length) {
      const errMsg = state.errors
        .map((e) => e.message)
        .filter(Boolean)
        .join(" • ");
      setToast({
        open: true,
        variant: "error",
        message: errMsg || "Failed to send message. Please try again.",
        duration: 4500,
        left: 20,
        bottom: 20,
      });
      return;
    }

    // otherwise close any existing toast (fallback)
    setToast((t) => (t.open ? { ...t, open: false } : t));
  }, [state.submitting, state.succeeded, state.errors]);

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="lead-form">
        <div className="form-feild">
          <label htmlFor="fullName">
            <img src={NameIcon} alt="Name" />
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>

        <div className="form-feild">
          <label htmlFor="email">
            <img src={EmailIcon} alt="Email" />
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div className="form-feild">
          <label htmlFor="number">
            <img src={PhoneIcon} alt="Phone Number" />
            Phone Number
          </label>
          <input
            id="number"
            name="number"
            placeholder="Phone Number"
            required
          />
          <ValidationError
            prefix="Number"
            field="number"
            errors={state.errors}
          />
        </div>

        <div className="form-feild">
          <label htmlFor="company">
            <img src={CompanyIcon} alt="Company" />
            Company / Brand
          </label>
          <input
            id="company"
            name="company"
            placeholder="Company / Brand Name"
            required
          />
          <ValidationError
            prefix="company"
            field="company"
            errors={state.errors}
          />
        </div>

        <div className="form-feild">
          <label htmlFor="message">
            <img src={MessageIcon} alt="Message" />
            Message / Project Brief
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here"
            required
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.target.form.requestSubmit();
              }
            }}
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>

        <div className="form-feild">
          <button
            className="glass-button"
            type="submit"
            disabled={state.submitting}
          >
            {state.submitting ? "Sending…" : "Send Message"}
          </button>
        </div>
      </form>

      <Toast
        open={toast.open}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        duration={toast.duration}
        variant={toast.variant}
        left={toast.left}
        bottom={toast.bottom}
      >
        {toast.message}
      </Toast>
    </>
  );
}
