import { useEffect } from "react";

export default function Lightbox({ items, index, onClose, onIndex }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (event.key === "ArrowLeft")
        onIndex((index - 1 + items.length) % items.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onClose, onIndex]);

  if (!item) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.caption || item.alt}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        Close
      </button>
      <button
        className="lightbox-nav prev"
        onClick={() => onIndex((index - 1 + items.length) % items.length)}
        aria-label="Previous image"
      >
        ‹
      </button>
      <figure>
        <img src={item.src} alt={item.caption || item.alt || ""} />
        {(item.caption || item.section) && (
          <figcaption>
            {item.section && <span>{item.section}</span>}
            {item.caption}
          </figcaption>
        )}
      </figure>
      <button
        className="lightbox-nav next"
        onClick={() => onIndex((index + 1) % items.length)}
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  );
}
