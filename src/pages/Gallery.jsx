import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import gallery from "../data/gallery.json";
import { contact, media } from "../data/site";
import Lightbox from "../components/Lightbox";
import PageHero from "../components/PageHero";
import usePicks from "../components/usePicks";

const collections = [
  { id: "delicate-dugga", label: "Delicate Dugga Designs" },
  { id: "ros-byrne", label: "Ros Byrne Designs" },
];

export default function Gallery() {
  const [params, setParams] = useSearchParams();
  const collection = params.get("collection") === "ros-byrne" ? "ros-byrne" : "delicate-dugga";
  const [section, setSection] = useState("All");
  const [open, setOpen] = useState(null);
  const [tray, setTray] = useState(false);
  const picks = usePicks();

  const sections = useMemo(() => {
    const names = gallery
      .filter((item) => item.collection === collection)
      .map((item) => item.section);
    return ["All", ...new Set(names)];
  }, [collection]);

  useEffect(() => {
    const grid = document.querySelector(".gallery-grid");
    if (!grid) return undefined;
    grid.classList.remove("in");
    const frame = requestAnimationFrame(() => grid.classList.add("in"));
    return () => cancelAnimationFrame(frame);
  }, [section, collection]);

  const items = gallery.filter(
    (item) =>
      item.collection === collection &&
      (section === "All" || item.section === section)
  );

  function chooseCollection(id) {
    setSection("All");
    setParams(id === "delicate-dugga" ? {} : { collection: id });
  }

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Select a design."
        lede="Choose the design you like and we will be happy to place it on a plate, mug, cup, jug, salt and pepper set, teapot or bowl. Email us for a current price list to match the reference numbers."
      />

      <div className="filters">
        <button
          className="btn surprise"
          onClick={() => {
            if (!items.length) return;
            setOpen(Math.floor(Math.random() * items.length));
          }}
        >
          Surprise me
        </button>
        <div className="pills" role="tablist" aria-label="Collection">
          {collections.map((item) => (
            <button
              key={item.id}
              className={collection === item.id ? "pill on" : "pill"}
              onClick={() => chooseCollection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="pills subtle" aria-label="Design groups">
          {sections.map((name) => (
            <button
              key={name}
              className={section === name ? "pill on" : "pill"}
              onClick={() => setSection(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <section className="gallery-grid" data-reveal>
        {items.map((item, index) => (
          <article
            key={`${item.src}-${item.caption}`}
            className={picks.has(item.src) ? "tile saved" : "tile"}
            style={{ "--i": index % 10 }}
          >
            <button
              className={picks.has(item.src) ? "heart on" : "heart"}
              aria-pressed={picks.has(item.src)}
              aria-label={picks.has(item.src) ? "Remove from your picks" : "Save to your picks"}
              onClick={() => picks.toggle(item)}
            >
              ♥
            </button>
            <button className="tile-open" onClick={() => setOpen(index)}>
              <img src={item.src} alt={item.caption} />
              <span>
                <small>{item.section}</small>
                {item.caption}
              </span>
            </button>
          </article>
        ))}
      </section>

      <section className="catalog" data-reveal>
        <div>
          <p className="eyebrow">Price list</p>
          <h2>Reference sheets</h2>
          <p>
            Drop us an email on{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> for an
            updated price list to match the reference numbers in the galleries.
          </p>
        </div>
        <div className="catalog-sheets">
          <img src={media["catalog-1"]} alt="Delicate Dugga catalogue page one" />
          <img src={media["catalog-2"]} alt="Delicate Dugga catalogue page two" />
        </div>
      </section>

      {picks.picks.length > 0 && (
        <div className="tray">
          <button className="tray-toggle" onClick={() => setTray((openTray) => !openTray)}>
            Your picks · {picks.picks.length}
          </button>
          {tray && (
            <div className="tray-panel">
              {picks.picks.map((pick) => (
                <button key={pick.src} onClick={() => picks.toggle(pick)}>
                  <img src={pick.src} alt="" />
                  <span>{pick.caption}</span>
                </button>
              ))}
              <a
                className="btn"
                href={contact.whatsappWith(
                  `Hello Delicate Dugga, I'd like to ask about these pieces:\n${picks.picks
                    .map((pick) => `• ${pick.caption}`)
                    .join("\n")}`
                )}
                target="_blank"
                rel="noreferrer"
              >
                Send this list
              </a>
              <button className="text-link tray-clear" onClick={picks.clear}>
                Clear picks
              </button>
            </div>
          )}
        </div>
      )}

      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          onClose={() => setOpen(null)}
          onIndex={setOpen}
        />
      )}
    </>
  );
}
