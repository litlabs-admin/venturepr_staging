import heroImage from "../assets/case-studies/hero/beatbot-hero.png";
import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";
import lexImage from "../assets/case-studies/grid/lex-machina.png";
import guruImage from "../assets/case-studies/grid/guru.png";
import audyenceImage from "../assets/case-studies/grid/audyence.png";
import loomlyImage from "../assets/case-studies/grid/loomly.png";
import rabbitImage from "../assets/case-studies/grid/rabbit.png";
import roborockImage from "../assets/case-studies/grid/roborock.png";
import narwalImage from "../assets/case-studies/grid/narwal.png";
import beatbotImage from "../assets/case-studies/grid/beatbot.png";

const caseStudySections = [
  {
    title: "Overview",
    body: [
      "Beatbot, a pioneer in AI-powered pool robotics, partnered with Venture PR to elevate global brand presence and introduce the AquaSense, AquaSense Pro, and AquaSense 2 Ultra during high-profile launches.",
      "Collaboration focused on strategic media engagement, targeted outreach to leading technology publications, and CES 2025 event activations.",
      "Objectives included establishing Beatbot as the leader in consumer-focused robotics, winning top innovation awards, and driving rapid market adoption.",
    ],
  },
  {
    title: "Approach",
    body: [
      "Developed and executed a global media strategy for new product launches with integrated messaging focused on innovation, user experience, and environmental benefits.",
      "Organized hands-on press events and demo opportunities at industry shows like CES 2025, securing direct access and reviews by influential technology journalists.",
      "Coordinated targeted media outreach and pitching to secure recognition in both consumer tech and robotics trade outlets.",
      "Submitted flagship products to prestigious award programs and supported applications with compelling evidence around design, technology, and market impact.",
    ],
  },
  {
    title: "Impact",
    body: [
      { text: "Achieved widespread coverage:", weight: "bold" },
      {
        text: "CNET: Praised AquaSense Pro as the world’s first 5-in-1 pool cleaning solution, with exceptional cleaning, AI path optimization, and ease of use.",
      },
      {
        text: "ZDNet: Named AquaSense Pro one of the best pool-cleaning robots ever tested, citing robust performance.",
      },
      { text: "TechCrunch: Highlighted Beatbot’s CES showcase and ecologically-focused innovations." },
      { text: "IEEE Spectrum: Spotlighted Beatbot’s robotics and AI navigation engineering." },
      { text: "Secured major awards and accolades:", weight: "bold" },
      { text: "Red Dot Design Award: Recognizing product excellence and innovation." },
      { text: "CES Innovation Award: Celebrating breakthrough features and smart home integration." },
      { text: "Best of CES: Industry roundups listing Beatbot among top smart home devices." },
      {
        text: "Featured by Smart Home World Magazine, Robotics Business Review, and Fast Company for operational impact, environmental focus, and market leadership.",
        weight: "bold",
      },
      {
        text: "Impact included immediate retailer and consumer interest, rapid adoption, accelerated sales, and global tech sector recognition.",
        weight: "bold",
      },
    ],
  },
  {
    title: "Conclusion",
    body: [
      "Venture PR’s partnership with Beatbot delivered exceptional visibility, credibility, and acclaim for the brand’s AI robotics innovation. Through strategic media engagement and sustained award campaigns, Beatbot set a new standard for smart pool cleaning—solidifying its market leadership in consumer robotics.",
    ],
  },
  {
    title: "Publication highlights",
    body: [
      "Breakthrough award wins, top-tier press coverage, and thought leadership distinguished Beatbot and its product line as innovators in the smart pool cleaning and robotics sector throughout 2024 and 2025.",
    ],
  },
];

const caseStudies = [
  {
    name: "Lex Machina",
    description: "Building Global Visibility for a Leading Legal Analytics Platform",
    image: lexImage,
    frameColor: "#000000",
    imageStyle: { width: 429, height: 319, top: 0, left: -1, objectFit: "cover" },
  },
  {
    name: "GuRu",
    description: "Driving Media Attention Around Breakthrough Wireless Technology",
    image: guruImage,
    frameColor: "#0b041a",
    imageStyle: { width: 357, height: 357, top: -38, left: 24, objectFit: "cover" },
  },
  {
    name: "Audyence",
    description: "Redefining B2B Demand Generation with Programmatic Innovation",
    image: audyenceImage,
    frameColor: "#000000",
    imageStyle: { width: 423, height: 423, top: 0, left: 0, objectFit: "cover" },
  },
  {
    name: "Loomly",
    description: "Sustained Media Coverage for a Social Media Management Platform",
    image: loomlyImage,
    frameColor: "#ddf9ae",
    imageStyle: { width: 455, height: 328, top: -5, left: -14, objectFit: "cover" },
  },
  {
    name: "Rabbit",
    description:
      "Rabbit r1 is a personal assistant by Rabbit Inc, designed with Teenage Engineering. It offers smart functions like browsing and music.",
    image: rabbitImage,
    frameColor: "#ddf9ae",
    imageStyle: { width: 455, height: 328, top: -5, left: -14, objectFit: "cover" },
  },
  {
    name: "Roborock",
    description: "Top Tier Product Reviews and Media Awards for Roborock.",
    image: roborockImage,
    frameColor: "#000000",
    imageStyle: { width: 762, height: 319, top: 0, left: -251, objectFit: "fill" },
  },
  {
    name: "Narwal",
    description:
      "Elevating Smart Cleaning Through Top-Tier Technology Media and Industry Recognition",
    image: narwalImage,
    frameColor: "#000000",
    imageStyle: { width: 419, height: 319, top: 0, left: 0, objectFit: "fill" },
  },
  {
    name: "Beatbot",
    description:
      "Beatbot announces the AquaSense 2 Series alongside new partnership with U.S. SailGP team.",
    image: beatbotImage,
    frameColor: "#000000",
    imageStyle: { width: 495, height: 370, top: -51, left: -45, objectFit: "fill" },
  },
];

export function CaseStudiesPage() {
  return (
    <div className="page-exact-shell">
      <FloatingNav />
      <main className="case-studies-page-exact">
      <div className="case-detail-exact">
        <div className="case-detail-exact__intro">
          <div className="case-detail-exact__hero">
            <div className="case-detail-exact__hero-media">
              <img src={heroImage} alt="" />
            </div>
          </div>
          <div className="case-detail-exact__stack">
            <div className="case-detail-exact__title">
              <h1>AquaSense 2</h1>
              <p>
                Beatbot announces the AquaSense 2 Series alongside new partnership with
                U.S. SailGP team.
              </p>
            </div>

            {caseStudySections.map((section, index) => (
              <div key={section.title} className="case-detail-exact__block">
                <h2>{section.title}</h2>
                {section.body.map((paragraph, pIndex) => {
                  const text = typeof paragraph === "string" ? paragraph : paragraph.text;
                  const weight =
                    typeof paragraph === "object" && paragraph.weight === "bold"
                      ? "bold"
                      : "normal";
                  return (
                    <p
                      key={`${section.title}-${pIndex}`}
                      className={`case-detail-exact__paragraph case-detail-exact__paragraph--${weight}`}
                    >
                      {text}
                    </p>
                  );
                })}
                {index < 3 && <div className="case-detail-exact__divider" />}
              </div>
            ))}
          </div>
        </div>

        <div className="case-detail-exact__publication">
          <h2>Publication highlights</h2>
          <p>
            Breakthrough award wins, top-tier press coverage, and thought leadership
            distinguished Beatbot and its product line as innovators in the smart pool
            cleaning and robotics sector throughout 2024 and 2025.
          </p>
        </div>
      </div>

      <section className="case-studies-grid-exact">
        <div className="case-studies-grid-exact__eyebrow">/ Our Work</div>
        <div className="case-studies-grid-exact__header">
          <h2>Performance Audits &amp; Client Scenarios</h2>
          <p>
            Step-by-step analyses of our operational execution. We dissect the initial
            problem, the exact strategies deployed, and the raw, unedited data that
            defined the final outcome.
          </p>
        </div>

        <div className="case-studies-grid-exact__row">
          {caseStudies.map((study) => (
            <article key={study.name} className="case-studies-grid-exact__card">
              <div
                className="case-studies-grid-exact__frame"
                style={{ backgroundColor: study.frameColor }}
              >
                <img
                  src={study.image}
                  alt=""
                  style={{
                    position: "absolute",
                    width: study.imageStyle.width,
                    height: study.imageStyle.height,
                    top: study.imageStyle.top,
                    left: study.imageStyle.left,
                    objectFit: study.imageStyle.objectFit,
                  }}
                />
              </div>
              <div className="case-studies-grid-exact__panel">
                <h3>{study.name}</h3>
                <p>{study.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      </main>
      <FooterSection />
    </div>
  );
}
