import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Gemini API client if API key is present
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (geminiApiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// In-memory lead store for quotes & estimates
interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  zipCode: string;
  timeline: string;
  description: string;
  estimatedBudget?: string;
  createdAt: string;
}

const leads: LeadRecord[] = [];

// Fallback knowledge base for fast, reliable responses
function getLocalKnowledgeResponse(userMessage: string): string {
  const query = userMessage.toLowerCase();

  if (query.includes('kitchen') || query.includes('cabinet') || query.includes('countertop') || query.includes('island')) {
    return `For kitchen remodels in Orange County, full renovations typically range from $35,000 for mid-range updates up to $95,000+ for custom luxury chef's kitchens (including custom shaker or euro-flat cabinets, Calacatta quartz or marble countertops, Title 24 LED lighting, and layout changes). Most kitchens take 4 to 7 weeks from demo to final walk-through. Ben can meet you at your home for an exact, itemized estimate. You can call or text him directly at (714) 884-2905!`;
  }

  if (query.includes('bath') || query.includes('shower') || query.includes('tub') || query.includes('vanity')) {
    return `Master bathroom and guest bath remodels in Southern California typically run between $18,000 and $45,000, depending on fixtures, tile work, and whether we are re-routing plumbing. We specialize in curbless zero-threshold walk-in showers with frameless glass, Schluter waterproofing, freestanding soaking tubs, and floating double vanities. Typical timeline is 3 to 4 weeks. Ben would be happy to measure your space—call him at (714) 884-2905.`;
  }

  if (query.includes('addition') || query.includes('room') || query.includes('adu') || query.includes('permit') || query.includes('square')) {
    return `Room additions, second-story expansions, and ADUs in Orange County generally average $275 to $450 per square foot, which includes architectural drafting, structural engineering, Title 24 energy calculations, city plan check, and full construction. As a licensed California General Contractor (CA Lic. #1139587), Ben handles the entire permit process with your local city building department (Anaheim, Irvine, Huntington Beach, Newport Beach, etc.). Contact Ben at (714) 884-2905 to review your property setbacks and plans!`;
  }

  if (query.includes('deck') || query.includes('patio') || query.includes('redwood') || query.includes('trex') || query.includes('composite')) {
    return `For outdoor living, we build custom composite decks (Trex, TimberTech) and premium California redwood decks. Composite decks range from $50 to $95 per square foot installed with framing, and redwood decks range from $40 to $75 per square foot. We also construct custom pergolas, cable rail systems, and integrated step lighting. Coastal homes in Newport Beach and Huntington Beach especially benefit from moisture- and salt-resistant composite. Call Ben at (714) 884-2905 to discuss your outdoor space!`;
  }

  if (query.includes('license') || query.includes('insured') || query.includes('lic') || query.includes('bond') || query.includes('who are you') || query.includes('about')) {
    return `BK Construction is fully licensed, bonded, and insured with the California Contractors State License Board under CA Lic. #1139587. Ben has over 15 years of experience delivering high-end residential remodeling across Orange County with a spotless record, clean daily job sites, and an on-time completion guarantee. You can reach Ben directly at (714) 884-2905.`;
  }

  if (query.includes('cost') || query.includes('price') || query.includes('estimate') || query.includes('quote') || query.includes('how much')) {
    return `We provide 100% free, no-obligation on-site estimates throughout Orange County. Because every home has unique layout and material preferences, Ben visits the property to take laser measurements and provide a clear, transparent, itemized proposal. You can click 'Get Free Estimate' on our site or call Ben directly at (714) 884-2905 to pick a convenient day!`;
  }

  if (query.includes('area') || query.includes('location') || query.includes('serve') || query.includes('city') || query.includes('orange county')) {
    return `BK Construction proudly serves all of Orange County and surrounding Southern California communities, including Anaheim, Irvine, Newport Beach, Huntington Beach, Costa Mesa, Fullerton, Santa Ana, Orange, Mission Viejo, Laguna Beach, Yorba Linda, and Tustin. If you are located in OC, call Ben at (714) 884-2905!`;
  }

  return `Thank you for asking! Ben at BK Construction (CA Lic. #1139587) handles luxury kitchen remodels, master bathrooms, room additions, and custom decks across Orange County. We provide free on-site consultations with transparent, itemized quotes. What specific project do you have in mind for your home? You can also call or text Ben directly at (714) 884-2905.`;
}

// AI Chat Route
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, conversationHistory } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  // If Gemini API is configured, use gemini-3.8-flash
  if (aiClient) {
    try {
      const systemInstruction = `You are the friendly, knowledgeable, and honest AI Assistant for "BK Construction - Home Improvements & Repairs", a top-tier licensed California General Contractor serving Orange County and Southern California.
License: CA Lic. #1139587 (Fully Licensed, Bonded & Insured).
Owner & Lead Contractor: Ben.
Phone & Text: (714) 884-2905.
Key Services:
- Kitchen Remodels: Custom cabinetry, quartz/marble island fabrication, Title 24 LED lighting, appliance packages, layout reconfiguration. Range: ~$35,000 - $95,000+.
- Bathroom Renovations: Master suites, curbless walk-in showers with frameless glass, Schluter waterproofing, freestanding tubs, floating double vanities. Range: ~$18,000 - $45,000+.
- Room Additions & ADUs: Master bedroom expansions, second-story additions, bump-outs, garage conversions, city permits & architectural plans. Range: ~$275 - $450/sqft.
- Custom Decks & Patios: Trex & TimberTech composite, California redwood, cable railings, outdoor kitchens, pergolas. Range: ~$40 - $95/sqft.
Service Area: All of Orange County, CA (Anaheim, Irvine, Newport Beach, Huntington Beach, Costa Mesa, Fullerton, Santa Ana, Mission Viejo, Laguna Niguel, Laguna Beach, etc.).

Voice & Persona Guidelines:
- Speak in plain, everyday, conversational English that is warm, transparent, and respectful.
- Never use robotic jargon or fluff. Give realistic ballpark ranges for Southern California costs when asked.
- Always reassure the homeowner that estimates are 100% free and no-obligation.
- Encourage them to call or text Ben directly at (714) 884-2905 for a quick walkthrough or to answer any questions.
- Keep responses concise (2 to 4 short paragraphs or bullet points).`;

      // Build context
      let promptText = '';
      if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
        promptText += 'Previous conversation:\n';
        for (const item of conversationHistory.slice(-4)) {
          promptText += `${item.role === 'user' ? 'Customer' : 'Assistant'}: ${item.text}\n`;
        }
        promptText += `\nCustomer's new question: ${message}`;
      } else {
        promptText = message;
      }

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction,
        },
      });

      const replyText = response.text || getLocalKnowledgeResponse(message);
      res.json({ reply: replyText, source: 'gemini' });
      return;
    } catch (apiError) {
      console.warn('Gemini API call failed, falling back to local knowledge engine:', apiError);
      const fallbackReply = getLocalKnowledgeResponse(message);
      res.json({ reply: fallbackReply, source: 'fallback' });
      return;
    }
  }

  // Local knowledge fallback
  const fallbackReply = getLocalKnowledgeResponse(message);
  res.json({ reply: fallbackReply, source: 'fallback' });
});

// Lead Submission Route
app.post('/api/leads', (req: Request, res: Response) => {
  const { name, phone, email, projectType, zipCode, timeline, description, estimatedBudget } = req.body;

  if (!name || !phone) {
    res.status(400).json({ error: 'Name and phone number are required.' });
    return;
  }

  const newLead: LeadRecord = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: email ? String(email).trim() : undefined,
    projectType: projectType || 'General Remodel',
    zipCode: zipCode || 'Orange County',
    timeline: timeline || 'Flexible',
    description: description || '',
    estimatedBudget: estimatedBudget || undefined,
    createdAt: new Date().toISOString(),
  };

  leads.unshift(newLead);
  console.log('New estimate request received for Ben:', newLead);

  res.json({
    success: true,
    message: 'Estimate request received! Ben will call you within 24 business hours.',
    leadId: newLead.id,
    directPhone: '(714) 884-2905',
  });
});

// Get leads endpoint
app.get('/api/leads', (_req: Request, res: Response) => {
  res.json({ leads: leads.slice(0, 20), count: leads.length });
});

// Quick project cost estimator endpoint
app.post('/api/calculate-estimate', (req: Request, res: Response) => {
  const { projectType, sizeSqFt, finishGrade } = req.body;

  let baseLow = 25000;
  let baseHigh = 65000;
  let unit = 'project';

  const gradeMultiplier = finishGrade === 'luxury' ? 1.45 : finishGrade === 'premium' ? 1.2 : 1.0;
  const sqft = Number(sizeSqFt) || 0;

  switch (projectType) {
    case 'kitchen':
      baseLow = 32000 * gradeMultiplier;
      baseHigh = 85000 * gradeMultiplier;
      break;
    case 'bathroom':
      baseLow = 16000 * gradeMultiplier;
      baseHigh = 42000 * gradeMultiplier;
      break;
    case 'addition':
      const sq = sqft > 0 ? sqft : 400;
      baseLow = sq * 275 * (gradeMultiplier * 0.9);
      baseHigh = sq * 425 * gradeMultiplier;
      unit = `${sq} sq.ft. addition`;
      break;
    case 'deck':
      const deckSq = sqft > 0 ? sqft : 300;
      baseLow = deckSq * 45 * gradeMultiplier;
      baseHigh = deckSq * 85 * gradeMultiplier;
      unit = `${deckSq} sq.ft. deck`;
      break;
    case 'repair':
    default:
      baseLow = 3500 * gradeMultiplier;
      baseHigh = 18000 * gradeMultiplier;
      break;
  }

  res.json({
    projectType,
    finishGrade,
    unit,
    estimatedRange: {
      low: Math.round(baseLow / 500) * 500,
      high: Math.round(baseHigh / 500) * 500,
    },
    currency: 'USD',
    note: 'Estimated Orange County residential remodeling cost benchmark (2026). Schedule an on-site visit with Ben for an exact itemized bid.',
  });
});

// Setup Vite or static serving
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in dev mode');
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BK Construction server running on port ${PORT}`);
  });
}

startServer();
