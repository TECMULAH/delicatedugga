import { contact } from "../data/site";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12.2 3 11 4.4 11 6.6v1.9H9v2.8h2V21h3.5v-9.7h2.3l.4-2.8h-2.7z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm8 1.8H8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8a3.2 3.2 0 0 0 3.2-3.2V8A3.2 3.2 0 0 0 16 4.8zM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.4 7.3a.9.9 0 1 1-.9-.9.9.9 0 0 1 .9.9z" />
    </svg>
  );
}

const links = [
  { href: contact.facebook, label: "Facebook", icon: <FacebookIcon /> },
  { href: contact.instagram, label: "Instagram", icon: <InstagramIcon /> },
];

export default function SocialLinks({ labelled = false }) {
  return (
    <div className={labelled ? "socials labelled" : "socials"}>
      {links.map((link) => (
        <a
          key={link.label}
          className="social"
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
        >
          {link.icon}
          {labelled && <span>{link.label}</span>}
        </a>
      ))}
    </div>
  );
}
