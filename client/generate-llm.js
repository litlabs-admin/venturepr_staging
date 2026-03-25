import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { loadEnv } from 'vite';

const require = createRequire(import.meta.url);
const { buildBlogsIndexResponse, buildBlogDetailResponse } = require('../lib/airtableBlogs.cjs');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generate() {
  console.log('Generating comprehensive llm.txt for AI discoverability...');
  
  const env = loadEnv('', process.cwd(), "");
  Object.assign(process.env, env);

  let md = `# Venture PR - Detailed Knowledge Base\n\n`;
  md += `Venture PR provides strategic public relations for disruptive companies. We earn billions of impressions for the world's most ambitious brands.\n\n`;
  
  md += `## Comprehensive Services\n\n`;
  md += `### 1. Earned Media & Press Coverage\n`;
  md += `Your brand story is only as powerful as the outlets telling it. At Venture PR, we pitch your story to the journalists who matter — securing earned coverage in tier-1 tech and consumer publications, not paid placements.\n`;
  md += `- Media Strategy & Pitching\n- Press Releases & Announcements\n- Product Reviews & Unboxings\n- Journalist Relationship Management\n- Trade & Consumer Media Targeting\n- Funding & Launch Announcements\n\n`;

  md += `### 2. Thought Leadership\n`;
  md += `Position your executives as the go-to experts in your field. Our team of former WSJ, TechCrunch, and Forbes journalists ghost-writes op-eds, bylines, and commentary that get published — and get noticed.\n`;
  md += `- Ghostwritten Op-Eds & Bylines\n- Executive Positioning Strategy\n- Expert Commentary Placement\n- Industry Trend Articles\n- Podcast & Speaking Opportunities\n- LinkedIn & Social Thought Leadership\n\n`;

  md += `### 3. Product Launches & Events\n`;
  md += `Big moments require big planning. Whether it's a CES debut, a funding announcement, or a new product drop, we build the launch strategy, manage press outreach, and get your product in front of the journalists and influencers that drive buying decisions.\n`;
  md += `- Launch Strategy & Timeline\n- CES & Trade Show PR\n- Press Briefings & Events\n- Influencer & KOL Outreach\n- Event Production Management\n- Embargo Strategy\n\n`;

  md += `### 4. Brand Strategy & Messaging\n`;
  md += `Before you pitch, you need a story. We help you find the angles that make journalists stop scrolling, craft the differentiated narrative that sets you apart from the noise, and develop the messaging that resonates with your market.\n`;
  md += `- Narrative Development\n- Competitive Differentiation\n- Media Training & Spokesperson Prep\n- Electronic Press Kit (EPK) Build\n- Crisis Communications\n- Messaging Architecture\n\n`;

  md += `## Case Studies & Client Success\n\n`;
  
  try {
    const caseStudiesRaw = fs.readFileSync(path.resolve(__dirname, 'src/data/caseStudies.js'), 'utf-8');
    const caseStudiesClean = caseStudiesRaw.replace(/import\s+([A-Za-z0-9_]+)\s+from\s+['"].*?['"];?/gi, 'const $1 = "";');
    const tempFile = path.resolve(__dirname, 'src/data/caseStudies.temp.js');
    fs.writeFileSync(tempFile, caseStudiesClean);
    
    // Safely import the modified file without asset images
    const { caseStudies } = await import(`file://${tempFile.replace(/\\/g, '/')}`);
    
    for (const study of caseStudies) {
      if (!study) continue;
      md += `### Case Study: ${study.name}\n`;
      md += `**Headline:** ${study.headline}\n`;
      if (study.publicationIntro) {
        md += `*${study.publicationIntro}*\n\n`;
      }
      
      if (study.overviewSections) {
        for (const section of study.overviewSections) {
          md += `#### ${section.title}\n`;
          for (const block of section.body) {
            if (typeof block === 'string') {
              md += `${block}\n\n`;
            } else if (typeof block === 'object' && block.text) {
              md += `**${block.text}**\n\n`;
              if (block.children && Array.isArray(block.children)) {
                for (const child of block.children) {
                  md += `- ${typeof child === 'string' ? child : child.text}\n`;
                }
                md += `\n`;
              }
            }
          }
        }
      }
      md += `---\n\n`;
    }
    
    fs.unlinkSync(tempFile);
  } catch(e) {
    console.warn("Failed to parse case studies:", e.message);
  }

  md += `## Insights & Blog Posts\n\n`;
  
  try {
    const response = await buildBlogsIndexResponse(process.env);
    if (response && response.body && response.body.posts) {
      for (const post of response.body.posts) {
        md += `### ${post.title}\n`;
        md += `*Published: ${post.publishDate} | Category: ${post.category || 'General'}*\n\n`;
        
        try {
          const detail = await buildBlogDetailResponse(post.slug, process.env);
          if (detail && detail.body && detail.body.post && detail.body.post.bodyMarkdown) {
            md += `${detail.body.post.bodyMarkdown}\n\n`;
          } else {
            md += `${post.excerpt}\n\n`;
          }
        } catch(e) {
          md += `${post.excerpt}\n\n`;
        }
        md += `---\n\n`;
      }
    }
  } catch (err) {
    console.error("Failed to fetch blogs for llm.txt:", err.message);
  }

  const distDir = path.resolve(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const outPath = path.resolve(distDir, 'llm.txt');
  fs.writeFileSync(outPath, md, 'utf-8');
  console.log(`Successfully wrote comprehensive AI endpoints to ${outPath}`);
}

generate();
