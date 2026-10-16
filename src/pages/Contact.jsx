import { useState } from "react";
import PageHero from "../components/PageHero";
import SocialLinks from "../components/SocialLinks";
import { contact, media } from "../data/site";

export default function Contact() {
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    const subject = "Message for Delicate Dugga";
    const body = `Name: ${form.first} ${form.last}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Get in touch."
        lede="The shop, the studio and pottery painting bookings all come through the same desk."
      />
      <section className="contact-layout" data-reveal>
        <div className="contact-facts">
          <img src={media["shop-contact"]} alt="An artist painting a small jug" />
          <h2>Our shop</h2>
          <p>
            {contact.shop}
            <br />
            {contact.address.join(", ")}
          </p>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            <a href={contact.phoneHref}>{contact.phone}</a>
          </p>
          <SocialLinks labelled />
          <a
            className="text-link"
            href="https://www.google.com/maps/search/?api=1&query=Paddington+Square+178+Ed+Mnangagwa+Road+Harare"
            target="_blank"
            rel="noreferrer"
          >
            Locate us here
          </a>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <div className="names">
            <label>
              First name
              <input name="first" value={form.first} onChange={update} required />
            </label>
            <label>
              Last name
              <input name="last" value={form.last} onChange={update} required />
            </label>
          </div>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              required
            />
          </label>
          <label>
            Comment or message
            <textarea
              name="message"
              rows="6"
              value={form.message}
              onChange={update}
              required
            />
          </label>
          <button className="btn" type="submit">
            Send message
          </button>
          {sent && (
            <p className="form-note">
              Your email app should open with this message addressed to{" "}
              {contact.email}. If it does not, write to us directly.
            </p>
          )}
        </form>
      </section>
    </>
  );
}
