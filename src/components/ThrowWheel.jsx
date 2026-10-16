import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gallery from "../data/gallery.json";
import { contact } from "../data/site";

const pots = [
  { label: "Anything", test: () => true },
  { label: "Tree of Life", test: (item) => item.section === "Tree of life" },
  { label: "Flame Lily", test: (item) => item.section === "Flame Lily" },
  { label: "Baobab", test: (item) => item.section === "The Baobab Design" },
  { label: "Animals", test: (item) => /Designs|Animal|Egg/.test(item.section) },
];

function pickFrom(list, avoid) {
  const pool = list.length > 1 ? list.filter((item) => item.src !== avoid) : list;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function ThrowWheel() {
  const [pot, setPot] = useState(pots[0]);
  const [piece, setPiece] = useState(() => pickFrom(gallery));
  const [spinning, setSpinning] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  function throwPiece() {
    if (spinning) return;
    const list = gallery.filter(pot.test);
    setSpinning(true);
    let ticks = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      ticks += 1;
      setPiece(pickFrom(list));
      if (ticks >= 9) {
        clearInterval(timer.current);
        setPiece(pickFrom(list));
        setSpinning(false);
      }
    }, 90);
  }

  const ask = contact.whatsappWith(
    `Hello Delicate Dugga, the piece I landed on is "${piece.caption}" (${piece.section}). Is it available?`
  );

  return (
    <section className="play" data-reveal>
      <div className="play-copy">
        <p className="eyebrow">Throw a piece</p>
        <h2>See what the wheel gives you.</h2>
        <p>
          Pick a family, then throw. We’ll land on a real piece from the studio.
          If you like it, ask for it, or keep throwing.
        </p>
        <div className="pills" role="group" aria-label="Design family">
          {pots.map((option) => (
            <button
              key={option.label}
              className={pot.label === option.label ? "pill on" : "pill"}
              onClick={() => {
                setPot(option);
                if (!option.test(piece)) setPiece(pickFrom(gallery.filter(option.test)));
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button className="btn throw" onClick={throwPiece} disabled={spinning}>
          {spinning ? "Spinning…" : "Throw"}
        </button>
      </div>
      <div className={spinning ? "stage spinning" : "stage"}>
        <img key={piece.src + (spinning ? "-spin" : "")} src={piece.src} alt={piece.caption} />
        <p>
          <small>{piece.section}</small>
          {piece.caption}
        </p>
        <div className="stage-actions">
          <a className="btn" href={ask} target="_blank" rel="noreferrer">
            Ask for this one
          </a>
          <Link className="text-link" to="/gallery">
            Browse the whole set
          </Link>
        </div>
      </div>
    </section>
  );
}
