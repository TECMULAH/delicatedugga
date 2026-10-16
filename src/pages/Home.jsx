import { useRef } from "react";
import { Link } from "react-router-dom";
import gallery from "../data/gallery.json";
import ThrowWheel from "../components/ThrowWheel";
import { aboutImages, contact, studioImages } from "../data/site";

const featured = gallery.filter((item) => item.collection === "delicate-dugga").slice(0, 6);

export default function Home() {
  const hero = useRef(null);

  function follow(event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = hero.current?.getBoundingClientRect();
    if (!box) return;
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    hero.current.style.setProperty("--mx", (x * 22).toFixed(2));
    hero.current.style.setProperty("--my", (y * 14).toFixed(2));
  }

  return (
    <>
      <section
        className="hero"
        ref={hero}
        onMouseMove={follow}
        onMouseLeave={() => {
          hero.current?.style.setProperty("--mx", "0");
          hero.current?.style.setProperty("--my", "0");
        }}
      >
        <div className="hero-bg-wrap">
          <img className="hero-bg" src={aboutImages.wheel} alt="" />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light">Harare, Zimbabwe · Est. 2018</p>
          <h1>African handmade & painted pottery</h1>
          <p>
            Handmade and painted Zimbabwean pottery. Wild animals, baobabs and
            ethnic patterns, thrown and decorated by hand in our Harare studio.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/gallery">
              Explore the gallery
            </Link>
            <a className="btn ghost" href={contact.whatsapp} target="_blank" rel="noreferrer">
              Book pottery painting
            </a>
          </div>
        </div>
        <div className="hero-card-wrap">
          <img
            className="hero-card"
            src={studioImages[0].src}
            alt={studioImages[0].alt}
          />
        </div>
      </section>

      <section className="band" data-reveal>
        <div>
          <p className="eyebrow">The studio</p>
          <h2>A home-run pottery, still made the long way.</h2>
        </div>
        <p>
          Delicate Dugga is a home-run business established in Harare in June
          2018, when we acquired Ros Byrne Pottery. We still produce the iconic
          Ros Byrne collection, and we have developed our own range: an eclectic
          array of wild African animals and ethnic designs, inspired by the
          beauty of Africa. Every piece is hand thrown and individually hand
          painted by local artists.
        </p>
      </section>

      <section className="split" data-reveal>
        <img src={aboutImages.studio} alt="An artist painting a mug in the studio" />
        <div>
          <p className="eyebrow">How a piece is made</p>
          <h2>Thrown, painted, fired.</h2>
          <p>
            Clay is prepared and tested in the studio. Motion throws the forms.
            The artists then paint each one by hand, with particular care for
            the quality and detail of the design. After fettling and firing,
            the work goes to The Stripy Horse Company and our stockists.
          </p>
          <Link className="text-link" to="/about">
            Read our story
          </Link>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="section-head">
          <div>
            <p className="eyebrow">Two collections</p>
            <h2>Choose a design. We will place it on the piece you want.</h2>
          </div>
          <Link className="text-link" to="/gallery">
            View the full gallery
          </Link>
        </div>
        <div className="collection-grid">
          <Link className="collection-card" to="/gallery?collection=delicate-dugga">
            <img src={featured[0]?.src} alt="" />
            <div>
              <h3>Delicate Dugga Designs</h3>
              <p>Tree of Life, Flame Lily, Blue & White, Baobab, and modelled animals.</p>
            </div>
          </Link>
          <Link className="collection-card" to="/gallery?collection=ros-byrne">
            <img src={gallery.find((item) => item.caption === "Elephant")?.src} alt="" />
            <div>
              <h3>Ros Byrne Designs</h3>
              <p>The classic animal, Ndoro, Sorrento and zebra-hide ranges, piece by piece.</p>
            </div>
          </Link>
        </div>
      </section>

      <ThrowWheel />

      <section className="section tight" data-reveal>
        <div className="mosaic">
          {studioImages.slice(1, 7).map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </div>
      </section>

      <section className="paint-banner" data-reveal>
        <div>
          <p className="eyebrow light">Parties, cafes & open sessions</p>
          <h2>Come and paint pottery.</h2>
          <p>
            We bring the bisque, underglazes, brushes and a professional artist.
            Weekly sessions run in Harare, and private parties start from $150.
          </p>
          <Link className="btn" to="/painting">
            See times and booking
          </Link>
        </div>
        <img src={aboutImages.brushes} alt="Brushes and underglaze in the studio" />
      </section>
    </>
  );
}
