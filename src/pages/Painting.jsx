import { useState } from "react";
import PageHero from "../components/PageHero";
import { contact, paintingSessions } from "../data/site";

const spots = [
  { id: "thu", label: "Thursday cafe", detail: "Maize & Mingle · 12:30–4pm" },
  { id: "sat", label: "Saturday cafe", detail: "Maize & Mingle · 8:30–12:30" },
  { id: "fri", label: "Friday cafe", detail: "Luna’s · 12:30–4pm" },
  { id: "party", label: "Private party", detail: "We come to you · from $150" },
];

const shapes = ["Mugs", "Bowls", "Plates", "You choose"];

export default function Painting() {
  const [spot, setSpot] = useState(spots[3].id);
  const [chosen, setChosen] = useState(["Mugs"]);
  const [people, setPeople] = useState(6);

  function toggleShape(shape) {
    setChosen((current) =>
      current.includes(shape) ? current.filter((item) => item !== shape) : [...current, shape]
    );
  }

  const place = spots.find((item) => item.id === spot);
  const note = contact.whatsappWith(
    `Hello Delicate Dugga, I'd like to book pottery painting.\nWhen: ${place.label} (${place.detail})\nPeople: ${people}\nPieces: ${chosen.join(", ") || "you choose"}`
  );
  return (
    <>
      <PageHero
        eyebrow="Pottery painting"
        title="Painting pottery for parties and open sessions."
        lede="We supply the bisque, the colours, the brushes, and an artist to help. You take the brushes. We take the pots back to the kiln."
      />

      <section className="session-grid">
        {paintingSessions.map((session) => (
          <article key={session.place} className="session" data-reveal>
            <img src={session.image} alt={`Pottery painting at ${session.place}`} />
            <div>
              <h2>{session.place}</h2>
              <p>{session.where}</p>
              <p className="when">{session.when}</p>
              {session.extra && <p className="when">{session.extra}</p>}
            </div>
          </article>
        ))}
      </section>

      <section className="party" data-reveal>
        <div>
          <p className="eyebrow">Private parties & events</p>
          <h2>We come to you.</h2>
          <ul>
            <li>A variety of pieces, with choices and prices sent to you.</li>
            <li>The bisque, which is the raw pottery.</li>
            <li>A professional artist to assist you.</li>
            <li>Underglaze colours and the brushes.</li>
          </ul>
          <p>
            We charge a minimum of <strong>$150</strong> for private parties.
            This is paid upfront at our shop to secure the booking. It is the
            equivalent of 12 mugs or 10 ice-cream bowls, for example. More items
            can be added and paid for on the day, on a pay-as-you-paint basis.
          </p>
        </div>
        <div className="party-card">
          <h3>Build your booking</h3>
          <p className="choice-label">Where and when</p>
          <div className="choice-grid">
            {spots.map((item) => (
              <button
                key={item.id}
                className={spot === item.id ? "choice on" : "choice"}
                onClick={() => setSpot(item.id)}
              >
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </button>
            ))}
          </div>
          <p className="choice-label">What do you want to paint?</p>
          <div className="pills">
            {shapes.map((shape) => (
              <button
                key={shape}
                className={chosen.includes(shape) ? "pill on" : "pill"}
                onClick={() => toggleShape(shape)}
              >
                {shape}
              </button>
            ))}
          </div>
          <p className="choice-label">How many people</p>
          <div className="stepper">
            <button onClick={() => setPeople((count) => Math.max(1, count - 1))} aria-label="Fewer people">
              −
            </button>
            <strong>{people}</strong>
            <button onClick={() => setPeople((count) => Math.min(40, count + 1))} aria-label="More people">
              +
            </button>
          </div>
          <p>
            Finished pots come back to the studio for firing, then to The Stripy
            Horse Company about three weeks later. Private parties need a $150
            deposit at the shop.
          </p>
          <a className="btn" href={note} target="_blank" rel="noreferrer">
            Send this on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
