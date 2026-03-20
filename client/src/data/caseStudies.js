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

function isBoldItem(item) {
  return typeof item === "object" && item.weight === "bold";
}

function hasChildren(item) {
  return typeof item === "object" && Array.isArray(item.children) && item.children.length > 0;
}

function isGroupHeading(item) {
  return isBoldItem(item) && !hasChildren(item) && /:\s*$/.test(item.text);
}

function normalizeSectionBody(body) {
  const normalized = [];

  for (let index = 0; index < body.length; index += 1) {
    const item = body[index];

    if (!isGroupHeading(item)) {
      normalized.push(item);
      continue;
    }

    const children = [];
    let lookahead = index + 1;

    while (lookahead < body.length && !isBoldItem(body[lookahead])) {
      children.push(body[lookahead]);
      lookahead += 1;
    }

    if (children.length > 0) {
      normalized.push({ ...item, children });
      index = lookahead - 1;
      continue;
    }

    normalized.push(item);
  }

  return normalized;
}

function normalizeSections(sections) {
  return sections.map((section) => ({
    ...section,
    body: normalizeSectionBody(section.body),
  }));
}

function createFallbackSections(name, headline) {
  return normalizeSections([
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
  ]);
}

const beatbotSections = normalizeSections([
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
      {
        text: "Achieved widespread coverage:",
        weight: "bold",
        children: [
          "CNET: Praised AquaSense Pro as the world's first 5-in-1 pool cleaning solution, with exceptional cleaning, AI path optimization, and ease of use.",
          "ZDNet: Named AquaSense Pro one of the best pool-cleaning robots ever tested, citing robust performance.",
          "TechCrunch: Highlighted Beatbot's CES showcase and ecologically focused innovations.",
          "IEEE Spectrum: Spotlighted Beatbot's robotics and AI navigation engineering.",
        ],
      },
      {
        text: "Secured major awards and accolades:",
        weight: "bold",
        children: [
          "Red Dot Design Award: Recognizing product excellence and innovation.",
          "CES Innovation Award: Celebrating breakthrough features and smart home integration.",
          "Best of CES: Industry roundups listing Beatbot among top smart home devices.",
        ],
      },
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
]);

const audyenceSections = normalizeSections([
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
]);

const narwalSections = normalizeSections([
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
]);

const roborockSections = normalizeSections([
  {
    title: "Overview",
    body: [
      "The most advanced robot vacuum and mop electronics manufacturer wanted to see a steady stream of awards, reviews, and top-tier coverage, along with executive thought leadership.",
      "The VPR team collaborated with Roborock leadership to secure top awards, product coverage, reviews, and bylines.",
    ],
  },
  {
    title: "Approach",
    body: [
      "Researched top awards and review opportunities in the consumer brand category.",
      "Collaborated on strategy and messaging for brand thought leadership.",
      "Made the most of notable seasonal sale and holiday opportunities.",
    ],
  },
  {
    title: "Impact",
    body: [
      { text: "Massive worldwide exposure and attention", weight: "bold" },
      { text: "274 feature and trade stories." },
      { text: "Audience reached: 87,578,540,890" },
    ],
  },
  {
    title: "Conclusion",
    body: [
      "Top-tier coverage, awards, product reviews, and thought leadership for a leading robot vacuum mop brand.",
    ],
  },
]);

const loomlySections = normalizeSections([
  {
    title: "Overview",
    body: [
      "Venture Public Relations partnered with Loomly to strengthen its market position as a top social media management platform.",
      "Objectives included maximizing high-impact media coverage, elevating Loomly's integrations (Google Drive, Zapier), advocacy for product launches, and executive thought leadership.",
      "Targeted outcomes: industry awards, recognition for innovation, and demonstrable annual growth.",
    ],
  },
  {
    title: "Approach",
    body: [
      "Researched major award opportunities and top review channels in SaaS/marketing tech.",
      "Developed strategies highlighting Loomly's integrations for remote collaboration and marketing automation.",
      "Deployed targeted media pitches, milestone press releases, and thought leadership content across technology, marketing, and business sectors.",
      "Leveraged seasonal campaigns and product launches, aligning with industry trends like no-code automation and distributed workflows.",
    ],
  },
  {
    title: "Impact",
    body: [
      "Secured feature coverage in CNET (Google Drive integration), ZDNet (Zapier automation workflow), and TechCrunch (acquisition scalability narrative).",
      "Achieved industry recognition, including G2 Crowd's Momentum Leader, triple-digit growth, and inclusion in Gartner's Market Guide and Capterra's Top 20.",
      "85M+ media impressions across top outlets, supporting Loomly's acquisition by Traject, a major expansion to 13,000 global customers, and a leap to $18.1M ARR by 2024.",
      "Enhanced reputation against competitors (Hootsuite, Agorapulse) in usability and affordability, validated by reviews, awards, and analyst reports.",
      "Thought leadership supported by bylined articles in AdWeek and Marketing Dive, using Loomly's analytics as case examples in ROI measurement and crisis communication.",
    ],
  },
  {
    title: "Conclusion",
    body: [
      "VenturePR's targeted media strategy transformed Loomly into a SaaS category leader. Strategic PR aligned with product innovation, remote team trends, and validation from premier outlets, amplifying Loomly's differentiation in a competitive space.",
      "This format and rewrite combine the narrative structure and achievement sections of your original case study template, with detailed information extracted directly from your supplied Loomly case study and tailored for VenturePR's business development goals.",
    ],
  },
]);

const lexMachinaSections = normalizeSections([
  {
    title: "Overview",
    body: [
      "Lex Machina, a LexisNexis company, is the pioneering force in legal analytics, delivering unmatched insights on federal and state case law, attorneys, judges, and legal outcomes.",
      "Since 2020, Venture PR has led a multi-year campaign encompassing data launch PR, analyst relations, award submissions, and strategic research-based storytelling across major practice areas.",
      "The partnership's objectives were to amplify Lex Machina's market dominance, elevate product innovation visibility, and secure recognition as the industry's most authoritative analytics provider.",
    ],
  },
  {
    title: "Approach",
    body: [
      "Formalized a consistent PR cadence tied to Lex Machina's annual litigation and damages reports, transforming data releases into nationally recognized industry benchmarks.",
      "Placed Lex Machina's experts in influential media coverage as thought leaders on litigation analytics, federal data trends, and predictive modeling for law firms.",
      "Collaborated on high-profile features across legal, business, and data science outlets to expand awareness beyond the legal industry.",
      "Secured feature-specific launches of Litigation Footprint, State Court Modules, and Damages Awards Reports, reaching both general and niche audiences.",
      "Implemented an award and speaker campaign that highlighted Lex Machina's business innovation, workplace excellence, and thought leadership impact.",
    ],
  },
  {
    title: "Impact",
    body: [
      {
        text: "Coverage volume:",
        weight: "bold",
        children: [
          "Achieved extensive global coverage across The Wall Street Journal, Forbes, Bloomberg Law, Law360, National Law Journal, The Recorder, Fast Company, CIO Review, Above the Law, PR Newswire, Legal Tech News, and others.",
          "Publication highlights included detailed analysis of litigation trends, firm performance data, and emerging predictive analytics use cases.",
          "Year-over-year coverage growth resulted in hundreds of earned stories and an estimated 45 million media impressions since 2020.",
        ],
      },
      {
        text: "Awards and honors:",
        weight: "bold",
        children: [
          "Forbes Best Workplaces Bay Area (2024)",
          "Media Excellence Award for Analytics & Big Data (2024, 2021)",
          "Great Places to Work (2023-2024)",
          "Legal Tech's Most Promising Solution Provider (CIO Review Awards, 2022)",
          "Top Workplaces Greater Bay Area (2022)",
          "Legal Tech Company of the Year (2021)",
          "Legal Technology Trailblazer (National Law Journal, 2021)",
        ],
      },
      {
        text: "Leadership results:",
        weight: "bold",
        children: [
          "Lex Machina became synonymous with the term 'legal analytics', driving widespread adoption across AmLaw 200 firms and Fortune 500 corporations.",
          "The introduction of the Litigation Footprint platform was featured in The Wall Street Journal and other national outlets, affirming Lex Machina's leadership in legal technology innovation.",
          "Over five years, Venture PR's campaign contributed to increased law firm client acquisition, global brand recognition, and thought leadership prominence in both the legal and data-analytics sectors.",
        ],
      },
    ],
  },
  {
    title: "Conclusion",
    body: [
      "Venture PR's five-year collaboration with Lex Machina has elevated the company from legal tech pioneer to industry-defining leader. Through constant alignment of data-driven storytelling, earned coverage in premier media such as The Wall Street Journal and Forbes, and recognition through top legal technology awards, Lex Machina's brand visibility and credibility have reached record levels, cementing its position as the gold standard in legal analytics.",
    ],
  },
]);

const guruSections = normalizeSections([
  {
    title: "Overview",
    body: [
      "Imagine a world without wires. GuRu powers an ecosystem of wireless power, dramatically changing the future uses and layout plans of business, industrial and consumer electronics. The company wanted ongoing visibility in industry publications and to make a splash with major partnership and product announcements.",
    ],
  },
  {
    title: "Approach",
    body: [
      "The Guru executive team wanted to build brand equity and awareness within the quickly-moving industry, and leverage press to build credibility for new partnerships, recruiting and fund-raising. They also wanted to be positioned as thought leaders in the industry and for the executive team.",
    ],
  },
  {
    title: "Impact",
    body: [
      "Exposure and attention",
      "Feature and trade stories: 238 and 105 broadcast news clips",
      "Audience reached: 8,696,429 viewers",
    ],
  },
  {
    title: "Conclusion",
    body: [
      "Venture PR's partnership with GuRu Wireless successfully established the company as a leading voice in the emerging wireless power category. By combining strategic media placements, high-impact partnership announcements, and sustained thought leadership, GuRu achieved significant industry visibility and credibility. This consistent exposure not only accelerated awareness across business and consumer audiences but also supported key objectives in partnerships, recruitment, and fundraising, positioning GuRu at the forefront of next-generation wireless innovation.",
    ],
  },
]);

const rabbitSections = normalizeSections([
  {
    title: "Overview",
    body: [
      "Rabbit, an AI hardware startup, partnered with Venture PR to prepare and execute the global launch of its flagship product, the Rabbit R1, during CES 2024 in Las Vegas.",
      "The collaboration encompassed strategic planning, messaging architecture, media pitching, development of launch materials, and coordination of an on-site press event with global media outlets.",
      "The campaign objective was to introduce the R1 as a breakthrough in AI-driven consumer hardware, build strong cross-market awareness, and reinforce Rabbit's identity as a pioneer among emerging AI-first device brands.",
    ],
  },
  {
    title: "Approach",
    body: [
      "Co-developed Rabbit's launch strategy, designing a cohesive narrative around AI accessibility and natural-language computing.",
      "Prepared all media and press materials, including messaging frameworks, press kits, and executive quotes.",
      "Collaborated with Rabbit to identify key targets for domestic and international press pitching, securing significant coverage across technology, business, and mainstream outlets.",
      "Orchestrated the official launch event at CES 2024, facilitating product demos, hands-on sessions, and interviews with Rabbit executives, generating real-time buzz and consumer intrigue.",
      "Ensured post-event amplification through follow-up pitching and content syndication across print, digital, and social channels.",
    ],
  },
  {
    title: "Impact",
    body: [
      { text: "Media results included widespread coverage in TechCrunch, Forbes, TechRadar, The Verge, Engadget, and TIME Magazine.", weight: "bold" },
      {
        text: "TIME named the Rabbit R1 one of 2024's defining innovations.",
      },
      {
        text: "Rabbit's CES activation was credited with immediate market traction, rave reviews, rapid pre-order sellouts across multiple batches, and strong international media resonance.",
      },
      {
        text: "Earned Best of CES 2024 honors in multiple lists, reinforcing Rabbit's brand credibility as a trailblazer in AI-driven personal devices.",
      },
      {
        text: "The combined strategy of storytelling, experiential media outreach, and precision pitching expanded Rabbit's share of voice across the U.S. and Asia-Pacific technology markets.",
      },
      {
        text: "The launch positioned Rabbit as a cultural symbol for the next generation of intuitive AI design partnerships.",
      },
    ],
  },
  {
    title: "Conclusion",
    body: [
      "Venture PR's collaboration with Rabbit blended strategic foresight, creative storytelling, and meticulous launch execution. By synchronizing messaging, media outreach, and live event management, the campaign redefined what a hardware PR launch could achieve, turning a debut product into one of CES 2024's most celebrated innovations.",
    ],
  },
]);

export const defaultCaseStudySlug = "beatbot";

export const caseStudies = [
  {
    slug: "lex-machina",
    name: "Lex Machina",
    title: "Lex Machina",
    headline:
      "Catalyzing Legal Analytics Leadership With Press and Industry Recognition (2020-2025)",
    heroImage: lexGridImage,
    heroImageAlt: "Lex Machina case study hero visual",
    overviewSections: lexMachinaSections,
    publicationIntro:
      "Lex Machina's transformation into the most recognized brand in legal analytics has been marked by a surge of tier-1 coverage, major industry honors, and thought leadership across technology, business, and legal press. Since partnering with Venture PR in 2020, Lex Machina's presence in major publications has positioned it as the leader redefining the future of data-driven law.",
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
    headline:
      "Big partnership announcements and top trades for cutting-edge GuRu Wireless",
    heroImage: guruGridImage,
    heroImageAlt: "GuRu case study hero visual",
    overviewSections: guruSections,
    publicationIntro:
      "CBS (The Late Show with James Corden), Venturebeat, The Verge, Forbes, ZDNET, CNET, Gizmodo, PC Mag, The Next Web, Digital Trends, Engadget, Stuff, iHeart Radio, Spotify",
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
      "Through strategic PR campaigns, Audyence gained broad media coverage, executive visibility, and rapid customer adoption, establishing itself as a game-changer in the $21 billion global B2B demand generation market.",
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
    headline:
      "Strategic Media Amplification for a Social Media Management Platform",
    heroImage: loomlyGridImage,
    heroImageAlt: "Loomly case study hero visual",
    overviewSections: loomlySections,
    publicationIntro:
      "Top-tier coverage, product launches, awards, and thought leadership secured for Loomly, positioning the brand as a leader in collaborative social media management, workflow automation, and remote team productivity through strategic PR campaigns.",
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
    overviewSections: rabbitSections,
    publicationIntro:
      "Comprehensive global coverage, product launch storytelling, and thought leadership secured for Rabbit, establishing it as a leader in AI hardware innovation and a hallmark success of CES 2024.",
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
    headline:
      "Top tier coverage, awards, product reviews, and thought leadership for leading robot vacuum mop brand",
    heroImage: roborockGridImage,
    heroImageAlt: "Roborock case study hero visual",
    overviewSections: roborockSections,
    publicationIntro:
      "CNN, NBC News, People, Better Homes & Gardens, Real Simple, Elle, Wired, GQ, Rolling Stone, Good Housekeeping, Mashable, Forbes, Esquire, CNET, Readers Digest, Popular Mechanics, Bustle, Apartment Therapy, Digital Trends, Business Insider, and The Hollywood Reporter helped validate Roborock's sustained visibility across consumer, business, and lifestyle media.",
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
      "Award-winning innovation and widespread media attention established Narwal's Flow Series and Freo Z Ultra as global benchmarks for smart home cleaning robotics, driving brand recognition and demand throughout 2024 and 2025.",
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
