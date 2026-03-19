import beatbotHeroImage from "../assets/case-studies/hero/beatbot-hero.png";
import lexGridImage from "../assets/case-studies/grid/lex-machina.png";
import guruGridImage from "../assets/case-studies/grid/guru.png";
import audyenceGridImage from "../assets/case-studies/grid/audyence.png";
import loomlyGridImage from "../assets/case-studies/grid/loomly.png";
import rabbitGridImage from "../assets/case-studies/grid/rabbit.png";
import roborockGridImage from "../assets/case-studies/grid/roborock.png";
import narwalGridImage from "../assets/case-studies/grid/narwal.png";
import beatbotGridImage from "../assets/case-studies/grid/beatbot.png";
import lexListingImage from "../assets/our-work/case-studies/lex-machina.png";
import guruListingImage from "../assets/our-work/case-studies/guru.png";
import audyenceListingImage from "../assets/our-work/case-studies/audyence.png";
import loomlyListingImage from "../assets/our-work/case-studies/loomly.png";
import rabbitListingImage from "../assets/our-work/case-studies/rabbit.png";
import roborockListingImage from "../assets/our-work/case-studies/roborock.png";
import narwalListingImage from "../assets/our-work/case-studies/narwal.png";
import beatbotListingImage from "../assets/our-work/case-studies/beatbot.png";

const GRID_FRAME_WIDTH = 427;
const GRID_FRAME_HEIGHT = 319;

function createCrop(width, height, top, left, objectFit) {
  return {
    widthRatio: width / GRID_FRAME_WIDTH,
    heightRatio: height / GRID_FRAME_HEIGHT,
    topRatio: top / GRID_FRAME_HEIGHT,
    leftRatio: left / GRID_FRAME_WIDTH,
    objectFit,
  };
}

function createFallbackSections(name, headline) {
  return [
    {
      title: "Overview",
      body: [
        `${name} partnered with Venture PR to strengthen market visibility and sharpen how its story landed with the right audience.`,
        `${headline} served as the central narrative anchor for outreach, positioning, and campaign storytelling.`,
        "This shared template now supports the full case study experience while the longer campaign breakdown is being expanded.",
      ],
    },
    {
      title: "Approach",
      body: [
        "Built a focused communications program around clear messaging, timely media outreach, and repeatable campaign execution.",
        "Aligned product, company, and category narratives so each touchpoint reinforced the most important proof points.",
        "Structured the work so launch momentum, earned coverage, and follow-on visibility could compound over time.",
      ],
    },
    {
      title: "Impact",
      body: [
        { text: headline, weight: "bold" },
        `The engagement helped ${name} build stronger awareness and clearer positioning across priority media and market conversations.`,
        "Additional publication highlights, supporting metrics, and long-form campaign notes will be added as source material is finalized.",
      ],
    },
    {
      title: "Conclusion",
      body: [
        `${name}'s case study is now live in the shared responsive template, giving the campaign a dedicated destination that can expand as new assets and copy are added.`,
      ],
    },
  ];
}

const beatbotSections = [
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
        text: "CNET: Praised AquaSense Pro as the world's first 5-in-1 pool cleaning solution, with exceptional cleaning, AI path optimization, and ease of use.",
      },
      {
        text: "ZDNet: Named AquaSense Pro one of the best pool-cleaning robots ever tested, citing robust performance.",
      },
      { text: "TechCrunch: Highlighted Beatbot's CES showcase and ecologically focused innovations." },
      { text: "IEEE Spectrum: Spotlighted Beatbot's robotics and AI navigation engineering." },
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
      "Venture PR's partnership with Beatbot delivered exceptional visibility, credibility, and acclaim for the brand's AI robotics innovation. Through strategic media engagement and sustained award campaigns, Beatbot set a new standard for smart pool cleaning, solidifying its market leadership in consumer robotics.",
    ],
  },
];

const audyenceSections = [
  {
    title: "Overview",
    body: [
      "Founded in 2023 by industry veterans, Audyence developed the first programmatic platform enabling cost-per-lead campaigns in B2B marketing.",
      "Venture PR was engaged to launch Audyence's Real-Time Demand platform and spotlight its differentiated approach centered on automation, transparency, and efficiency.",
      "The campaign aimed to position Audyence as a category leader by securing coverage in leading business, marketing, and technology publications.",
    ],
  },
  {
    title: "Approach",
    body: [
      "Directed launch campaigns that positioned Audyence RTD as a transformative programmatic CPL platform for B2B marketers.",
      "Secured thought leadership through bylined articles, executive interviews, and industry commentary that highlighted the team's expertise.",
      "Shared early adopter success stories demonstrating meaningful reductions in cost per lead and faster time-to-market.",
      "Submitted Audyence for key industry awards and rankings to build recognition and credibility.",
      "Engaged top-tier media including Business Wire, Marketing Dive, AdExchanger, MarTech Series, Demand Gen Report, Adweek, USA Today, and more to amplify brand presence across multiple verticals.",
    ],
  },
  {
    title: "Impact",
    body: [
      { text: "Achieved more than 40 million media impressions across business, marketing, and technology outlets.", weight: "bold" },
      {
        text: "Delivered a 100% post-beta renewal rate while projected annual revenue reached seven figures early in the company's growth.",
      },
      {
        text: "Earned recognition from industry analysts and trade publications as a leading innovator in B2B demand generation.",
      },
      {
        text: "Established Audyence executives as sought-after thought leaders on the future of programmatic B2B marketing.",
      },
      {
        text: "Generated featured stories and interviews covering the platform's integration capabilities, marketing efficiency gains, and the industry's shift from CPM to CPL.",
      },
    ],
  },
  {
    title: "Conclusion",
    body: [
      "Venture PR's partnership with Audyence shows how strategic public relations can accelerate market entry and category leadership. By combining product innovation, thought leadership, and customer success narratives, Audyence redefined B2B demand generation and strengthened its path to sustained growth.",
    ],
  },
];

const narwalSections = [
  {
    title: "Overview",
    body: [
      "Narwal, a global leader in intelligent cleaning robotics, engaged Venture PR to amplify brand impact and advance major product launches in the US and international markets.",
      "The engagement focused on strategic collaboration across product messaging, media strategy, CES 2025 launch moments, and submissions to top global award programs.",
      "Key objectives included securing high-profile technology coverage, winning international recognition for design and performance, and positioning Narwal at the forefront of consumer robotics innovation.",
    ],
  },
  {
    title: "Approach",
    body: [
      "Developed and executed comprehensive media strategies for the Flow Series, Freo Z10, Freo Pro, and S30, spotlighting both breakthrough technology and user-focused design.",
      "Coordinated press events at CES 2025 with direct product demonstrations for influential journalists and industry analysts.",
      "Engaged leading technology and business publications across the US and Asia-Pacific to give launches and milestones influential global reach.",
      "Led targeted award submissions that secured wins across the Red Dot Design Award, CES Innovation Award, and Edison Gold Award, among others.",
    ],
  },
  {
    title: "Impact",
    body: [
      { text: "Media results included top-tier coverage:", weight: "bold" },
      {
        text: "Time: Named Narwal's innovations among the Best Inventions, citing market impact and outstanding user design.",
      },
      {
        text: "Forbes: Highlighted Narwal's global sales growth, technical milestones, and rise into the top five smart cleaning brands.",
      },
      {
        text: "TechCrunch, Engadget, CNET, and WIRED: Delivered extensive coverage of CES product reveals, hands-on reviews, and engineering breakthroughs.",
      },
      { text: "Award wins included:", weight: "bold" },
      { text: "Red Dot Design Award for product excellence." },
      { text: "CES Innovation Award 2025 for the Freo Z Ultra and Flow Series." },
      { text: "Edison Gold Award for technology and innovation leadership." },
      {
        text: "Backed by investor recognition from Sequoia Capital, Hillhouse Capital, ByteDance, and Tencent, Narwal's market leadership was further validated by consistent product sell-outs after each global launch.",
        weight: "bold",
      },
      {
        text: "Thought leadership across robotics, smart home, and business media sustained demand and reinforced Narwal's industry credibility.",
        weight: "bold",
      },
    ],
  },
  {
    title: "Conclusion",
    body: [
      "Venture PR's strategic engagement with Narwal set a new standard for brand building and launch excellence in smart home robotics. By unlocking major media, award, and investor visibility, Narwal accelerated adoption and strengthened its role as an innovation leader in the global cleaning technology market.",
    ],
  },
];

export const defaultCaseStudySlug = "beatbot";

export const caseStudies = [
  {
    slug: "lex-machina",
    name: "Lex Machina",
    title: "Lex Machina",
    headline: "Building Global Visibility for a Leading Legal Analytics Platform",
    heroImage: lexGridImage,
    heroImageAlt: "Lex Machina case study hero visual",
    overviewSections: createFallbackSections(
      "Lex Machina",
      "Building Global Visibility for a Leading Legal Analytics Platform"
    ),
    publicationIntro:
      "Publication highlights and supporting campaign outcomes for Lex Machina will expand here as the full long-form case study is finalized.",
    gridImage: lexGridImage,
    gridFrameColor: "#000000",
    gridImageCrop: createCrop(429, 319, 0, -1, "cover"),
    listingImage: lexListingImage,
    frameClass: "lex",
  },
  {
    slug: "guru",
    name: "GuRu",
    title: "GuRu",
    headline: "Driving Media Attention Around Breakthrough Wireless Technology",
    heroImage: guruGridImage,
    heroImageAlt: "GuRu case study hero visual",
    overviewSections: createFallbackSections(
      "GuRu",
      "Driving Media Attention Around Breakthrough Wireless Technology"
    ),
    publicationIntro:
      "Publication highlights and supporting campaign outcomes for GuRu will expand here as the full long-form case study is finalized.",
    gridImage: guruGridImage,
    gridFrameColor: "#0b041a",
    gridImageCrop: createCrop(357, 357, -38, 24, "cover"),
    listingImage: guruListingImage,
    frameClass: "guru",
  },
  {
    slug: "audyence",
    name: "Audyence",
    title: "Audyence",
    headline: "Redefining B2B Demand Generation with Programmatic Innovation",
    heroImage: audyenceGridImage,
    heroImageAlt: "Audyence case study hero visual",
    overviewSections: audyenceSections,
    publicationIntro:
      "Coverage across business, marketing, and technology outlets helped frame Audyence's platform launch, early traction, and category perspective as proof of momentum in programmatic B2B demand generation.",
    gridImage: audyenceGridImage,
    gridFrameColor: "#000000",
    gridImageCrop: createCrop(423, 423, 0, 0, "cover"),
    listingImage: audyenceListingImage,
    frameClass: "audyence",
  },
  {
    slug: "loomly",
    name: "Loomly",
    title: "Loomly",
    headline: "Sustained Media Coverage for a Social Media Management Platform",
    heroImage: loomlyGridImage,
    heroImageAlt: "Loomly case study hero visual",
    overviewSections: createFallbackSections(
      "Loomly",
      "Sustained Media Coverage for a Social Media Management Platform"
    ),
    publicationIntro:
      "Publication highlights and supporting campaign outcomes for Loomly will expand here as the full long-form case study is finalized.",
    gridImage: loomlyGridImage,
    gridFrameColor: "#ddf9ae",
    gridImageCrop: createCrop(455, 328, -5, -14, "cover"),
    listingImage: loomlyListingImage,
    frameClass: "loomly",
  },
  {
    slug: "rabbit",
    name: "Rabbit",
    title: "Rabbit r1",
    headline:
      "Rabbit r1 is a personal assistant by Rabbit Inc, designed with Teenage Engineering. It offers smart functions like browsing and music.",
    heroImage: rabbitGridImage,
    heroImageAlt: "Rabbit case study hero visual",
    overviewSections: createFallbackSections(
      "Rabbit",
      "Rabbit r1 is a personal assistant by Rabbit Inc, designed with Teenage Engineering. It offers smart functions like browsing and music."
    ),
    publicationIntro:
      "Publication highlights and supporting campaign outcomes for Rabbit will expand here as the full long-form case study is finalized.",
    gridImage: rabbitGridImage,
    gridFrameColor: "#ddf9ae",
    gridImageCrop: createCrop(455, 328, -5, -14, "cover"),
    listingImage: rabbitListingImage,
    frameClass: "rabbit",
  },
  {
    slug: "roborock",
    name: "Roborock",
    title: "Roborock",
    headline: "Top Tier Product Reviews and Media Awards for Roborock.",
    heroImage: roborockGridImage,
    heroImageAlt: "Roborock case study hero visual",
    overviewSections: createFallbackSections(
      "Roborock",
      "Top Tier Product Reviews and Media Awards for Roborock."
    ),
    publicationIntro:
      "Publication highlights and supporting campaign outcomes for Roborock will expand here as the full long-form case study is finalized.",
    gridImage: roborockGridImage,
    gridFrameColor: "#000000",
    gridImageCrop: createCrop(762, 319, 0, -251, "fill"),
    listingImage: roborockListingImage,
    frameClass: "roborock",
  },
  {
    slug: "narwal",
    name: "Narwal",
    title: "Narwal",
    headline:
      "Elevating Smart Cleaning Through Top-Tier Technology Media and Industry Recognition",
    heroImage: narwalGridImage,
    heroImageAlt: "Narwal case study hero visual",
    overviewSections: narwalSections,
    publicationIntro:
      "Coverage across Time, Forbes, TechCrunch, Engadget, CNET, and WIRED helped turn Narwal's product launches, award wins, and market traction into clear proof of leadership in smart home robotics.",
    gridImage: narwalGridImage,
    gridFrameColor: "#000000",
    gridImageCrop: createCrop(419, 319, 0, 0, "fill"),
    listingImage: narwalListingImage,
    frameClass: "narwal",
  },
  {
    slug: "beatbot",
    name: "Beatbot",
    title: "AquaSense 2",
    headline:
      "Beatbot announces the AquaSense 2 Series alongside new partnership with U.S. SailGP team.",
    heroImage: beatbotHeroImage,
    heroImageAlt: "Beatbot AquaSense 2 campaign hero visual",
    overviewSections: beatbotSections,
    publicationIntro:
      "Breakthrough award wins, top-tier press coverage, and thought leadership distinguished Beatbot and its product line as innovators in the smart pool cleaning and robotics sector throughout 2024 and 2025.",
    gridImage: beatbotGridImage,
    gridFrameColor: "#000000",
    gridImageCrop: createCrop(495, 370, -51, -45, "fill"),
    listingImage: beatbotListingImage,
    frameClass: "beatbot",
  },
];

export const caseStudiesBySlug = Object.fromEntries(
  caseStudies.map((study) => [study.slug, study])
);
