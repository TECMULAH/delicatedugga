import PageHero from "../components/PageHero";
import { aboutImages, team } from "../data/site";

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The hands behind the clay."
        lede="Throwers, painters, a kiln operator and the owner who brought the studio back to life in 2018."
      />
      <img className="wide-photo" data-reveal src={aboutImages.group} alt="The Delicate Dugga team together" />
      <section className="team-list">
        {team.map((person) => (
          <article key={person.name} className="person" data-reveal>
            <img src={person.image} alt={person.name} />
            <div>
              <p className="eyebrow">{person.role}</p>
              <h2>{person.name}</h2>
              {person.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
