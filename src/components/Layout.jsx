import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { contact, media } from "../data/site";
import SocialLinks from "./SocialLinks";
import useReveal from "./useReveal";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/team", label: "Our Team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/stockists", label: "Stockists" },
  { to: "/painting", label: "Pottery Painting" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const close = () => setOpen(false);
  useReveal();

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="topbar">
        <a href={contact.phoneHref}>{contact.phone}</a>
        <span aria-hidden="true">·</span>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <span aria-hidden="true">·</span>
        <SocialLinks />
      </div>
      <header className="header">
        <NavLink to="/" className="brand" onClick={close}>
          <img src={media.logo} alt="Delicate Dugga Pottery" />
        </NavLink>
        <div className="header-end">
          <SocialLinks />
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={open ? "nav open" : "nav"}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={close}
            >
              {link.label}
            </NavLink>
          ))}
          <a className="nav-cta" href={contact.whatsapp} target="_blank" rel="noreferrer">
            Book on WhatsApp
          </a>
        </nav>
        </div>
      </header>
      <main id="main">
        <div key={pathname} className="page">
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <img src={media.logo} alt="" className="footer-logo" />
            <p>
              Handmade and hand-painted Zimbabwean pottery. Each piece is thrown
              and painted in Harare by local artists.
            </p>
          </div>
          <div>
            <h2>Visit</h2>
            <p>
              {contact.shop}
              <br />
              {contact.address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div>
            <h2>Talk to us</h2>
            <p>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <br />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <br />
              <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </p>
            <SocialLinks labelled />
          </div>
        </div>
        <p className="fine">
          © {new Date().getFullYear()} Delicate Dugga Pottery. Harare, Zimbabwe.
        </p>
      </footer>
    </>
  );
}
