export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  features: string[];
  materials: string[];
  buildingCodes: string[];
  typicalTimeline: string;
  priceGuide: string;
  image: string;
  badge: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'kitchen' | 'bathroom' | 'addition' | 'deck' | 'whole-home';
  location: string;
  description: string;
  afterImage: string;
  beforeImage?: string;
  details: string[];
  highlight: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  readTime: string;
  summary: string;
  category: string;
  date: string;
  content: string[];
  keyTakeaways: string[];
}

export const CONTRACTOR_INFO = {
  companyName: 'BK Construction',
  tagline: 'Home Improvements & Repairs',
  contractorName: 'Ben',
  phoneDisplay: '(714) 884-2905',
  phoneRaw: '7148842905',
  licenseNumber: 'CA Lic. #1139587',
  licenseStatus: 'California Licensed General Contractor — Fully Licensed, Bonded & Insured',
  experience: '15+ Years Building Excellence',
  serviceAreaName: 'Orange County & Southern California',
  headquarters: 'Orange County, CA',
  workingHours: 'Mon - Sat: 7:00 AM - 6:30 PM (Sun by appointment)',
  rating: '5.0',
  reviewCount: 94,
  cities: [
    'Anaheim',
    'Irvine',
    'Huntington Beach',
    'Newport Beach',
    'Fullerton',
    'Santa Ana',
    'Costa Mesa',
    'Mission Viejo',
    'Laguna Beach',
    'Laguna Niguel',
    'Orange',
    'Tustin',
    'Yorba Linda',
    'San Clemente',
    'Brea',
    'Dana Point'
  ]
};

// Hero Slides featuring 100% clear images, starting with user uploaded kitchen
export const HERO_SLIDES = [
  {
    id: 'gourmet-kitchen',
    title: 'Luxury Gourmet Kitchen',
    location: 'Anaheim Hills, CA',
    description: 'Custom inset shaker cabinetry, Calacatta marble waterfall island, and warm wood flooring.',
    image: '/assets/aistudio/image_355a17dc.png',
    tag: 'Kitchen Renovation',
  },
  {
    id: 'spa-master-bath',
    title: 'Modern Spa Master Bathroom',
    location: 'Newport Coast, CA',
    description: 'Zero-threshold curbless walk-in shower with frameless glass, freestanding tub, and brass fixtures.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1800&q=85',
    tag: 'Bathroom Renovation',
  },
  {
    id: 'custom-outdoor-deck',
    title: 'Custom Redwood & Composite Deck',
    location: 'Huntington Beach, CA',
    description: 'Dual-tone composite deck with stainless steel cable railings and integrated night lighting.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
    tag: 'Custom Deck & Patio',
  },
  {
    id: 'luxury-room-addition',
    title: 'Open-Concept Living Addition',
    location: 'Irvine, CA',
    description: 'Engineered structural beam installation, vaulted ceilings, and multi-slide panoramic doors.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    tag: 'Room Addition',
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'kitchens',
    title: 'Luxury Kitchen Remodeling',
    subtitle: 'Heart of the California Home',
    shortDesc: 'Complete layout transformations, custom cabinet buildouts, expansive marble and quartz islands, and high-performance chef workstations.',
    features: [
      'Custom solid-wood shaker, euro flat-panel, and rift white oak cabinetry',
      'Quartz, granite & bookmatched Calacatta marble slab fabrication',
      'Under-cabinet, toe-kick & recessed Title 24 LED ambient lighting',
      'Appliance reconfiguration (Sub-Zero, Wolf, Thermador, Viking)',
      'Walk-in pantry framing and hidden appliance garages'
    ],
    materials: ['Cambria Quartz', 'Natural Calacatta Marble', 'Solid Maple & White Oak', 'Kohler & Brizo Brass Fixtures'],
    buildingCodes: ['California Title 24 Energy Code (JA8 Compliant LED)', '20-Amp Small Appliance Dedicated Circuits', 'Dedicated Island GFCI / AFCI Outlets'],
    typicalTimeline: '4 – 7 Weeks',
    priceGuide: 'Starting at $35,000 – $95,000+ depending on layout & finishes',
    image: '/assets/aistudio/image_355a17dc.png',
    badge: 'Most Requested'
  },
  {
    id: 'bathrooms',
    title: 'Spa-Inspired Bathrooms',
    subtitle: 'Serene Sanctuary & Flawless Waterproofing',
    shortDesc: 'Curbless walk-in showers with frameless glass, freestanding soaking tubs, floating double vanities, and premium heated tile systems.',
    features: [
      'Zero-threshold curbless shower conversions with linear trench drains',
      'Complete Schluter-KERDI waterproof membrane envelope',
      'Custom floating vanities with soft-close Blum hardware',
      'Thermostatic multi-jet rainfall shower systems and handheld wands',
      'Heated radiant floor systems with smart touchscreen thermostats'
    ],
    materials: ['Large-Format Porcelain Tile', 'Polished Brass & Matte Black Hardware', 'Quartz Vanity Tops', 'Low-Iron Ultra-Clear Glass'],
    buildingCodes: ['California Plumbing Code (CPC 1.2 GPM CalGreen limits)', 'Anti-scald thermostatic shower valves', 'Dedicated 20A GFCI bathroom circuits'],
    typicalTimeline: '3 – 4 Weeks',
    priceGuide: 'Starting at $18,000 – $48,000+ for guest to luxury master suites',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
    badge: 'Master Specialists'
  },
  {
    id: 'additions',
    title: 'Room Additions & ADUs',
    subtitle: 'Expand Your Living Space & Property Value',
    shortDesc: 'Master bedroom suites, ground-floor expansions, second-story additions, and detached accessory dwelling units (ADUs) engineered to California seismic standards.',
    features: [
      'Full architectural drafting, 3D renderings & engineering calculations',
      'Turnkey city plan check, building department permits & inspections',
      'Load-bearing wall removal with structural steel I-beams',
      'Seamless exterior roof tie-in, stucco matching & seamless paint',
      'Dedicated HVAC mini-split or central duct zoning'
    ],
    materials: ['Engineered LVL & Steel Beams', 'Simpson Strong-Tie Seismic Hardware', 'Low-E Dual Pane Milgard Windows', 'Owens Corning Insulation'],
    buildingCodes: ['California Building Code (CBC 2026)', 'Seismic Zone 4 lateral resistance', 'Title 24 envelope insulation standards'],
    typicalTimeline: '8 – 16 Weeks',
    priceGuide: '$275 – $450 per square foot turnkey (including permits & finishes)',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Full Turnkey Permits'
  },
  {
    id: 'decks',
    title: 'Custom Decks & Outdoor Living',
    subtitle: 'Year-Round Southern California Entertaining',
    shortDesc: 'Engineered composite and natural redwood deck systems, stainless steel cable railing, custom shade pergolas, and outdoor kitchens.',
    features: [
      'Trex Transcend, TimberTech & premium California redwood construction',
      'Sleek marine-grade 316 stainless steel cable railing systems',
      'Hidden fastener installation with no visible deck screws',
      'Concrete footing caissons engineered for soil condition and slope',
      'Integrated low-voltage stair riser & perimeter LED lighting'
    ],
    materials: ['Trex Transcend Composite', 'Clear All-Heart Redwood', 'Marine Grade 316 Stainless Steel', 'Simpson Post-to-Beam Ties'],
    buildingCodes: ['50 PSF live load structural framing', 'Wildland-Urban Interface (WUI) fire-resistant materials', 'California safety baluster spacing (<4 inches)'],
    typicalTimeline: '2 – 4 Weeks',
    priceGuide: '$45 – $95 per square foot installed with framing & railings',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    badge: 'Low Maintenance'
  }
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'gal-1',
    title: 'Modern Coastal Chef’s Kitchen',
    category: 'kitchen',
    location: 'Newport Beach, CA',
    description: 'Complete gut remodel removing a center load-bearing wall to create an expansive 14-foot Calacatta marble island with brass accents and custom pantry.',
    afterImage: '/assets/aistudio/image_355a17dc.png',
    beforeImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
    details: ['14-ft Marble Island', 'Wolf Induction Range', 'Custom Shaker Cabinets', 'Title 24 LED Lighting'],
    highlight: 'Full Open Concept Transformation'
  },
  {
    id: 'gal-2',
    title: 'Curbless Spa Master Bath Retreat',
    category: 'bathroom',
    location: 'Irvine, CA',
    description: 'Converted an outdated 1990s fiberglass tub stall into a curbless walk-in wet room featuring bookmatched porcelain slabs and a freestanding resin tub.',
    afterImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
    details: ['Schluter Waterproofing', 'Zero-Threshold Shower', 'Floating Dual Vanity', 'Brizo Matte Black Fixtures'],
    highlight: 'Zero-Threshold Curbless Wet Room'
  },
  {
    id: 'gal-3',
    title: 'Multi-Level Outdoor Entertaining Deck',
    category: 'deck',
    location: 'Huntington Beach, CA',
    description: 'Built a 650 sq.ft. dual-tier composite deck in Havana Gold with integrated seating benches, step risers, and stainless cable railing.',
    afterImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    details: ['Trex Transcend Composite', 'Marine 316 Cable Rail', 'Hidden Fasteners', 'Low-Voltage LED Steps'],
    highlight: 'Zero Splinter, Coastal Salt Air Proof'
  },
  {
    id: 'gal-4',
    title: '520 Sq.Ft. Master Suite Addition',
    category: 'addition',
    location: 'Fullerton, CA',
    description: 'Engineered ground-level bump-out addition featuring a walk-in California closet, ensuite bath, and French doors leading out to the rear garden.',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    details: ['Permitted City Plan Check', 'Title 24 Solar Ready', 'Engineered Foundation Ties', 'Matching Stucco Finish'],
    highlight: 'Turnkey Permitted Expansion'
  },
  {
    id: 'gal-5',
    title: 'Transitional White Oak Kitchen',
    category: 'kitchen',
    location: 'Costa Mesa, CA',
    description: 'Custom rift-sawn white oak lower cabinetry paired with matte white uppers, quartz waterfall countertops, and integrated panel-ready appliances.',
    afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1527359443443-84a48aec73d2?auto=format&fit=crop&w=1200&q=80',
    details: ['Rift White Oak', 'Quartz Waterfall', 'Panel-Ready Dishwasher', 'Brass Pulls'],
    highlight: 'Designer Custom Finishes'
  },
  {
    id: 'gal-6',
    title: 'California Redwood Shade Pavilion',
    category: 'deck',
    location: 'Anaheim, CA',
    description: 'Custom architectural redwood deck featuring an attached heavy-timber pergola providing filtered sun for outdoor dining.',
    afterImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    details: ['Heart Redwood Framing', 'Heavy Timber Pergola', 'UV Inhibitor Sealant', 'Custom Footings'],
    highlight: 'Natural Redwood Craftsmanship'
  }
];

export const BLOG_ARTICLES: ArticleItem[] = [
  {
    id: 'kitchen-cost-oc-2026',
    title: 'How Much Does a Kitchen Remodel Cost in Orange County (2026 Breakdown)',
    slug: 'kitchen-remodel-cost-orange-county-2026',
    readTime: '6 min read',
    category: 'Cost & Budgeting',
    date: 'Updated for 2026',
    summary: 'A realistic, contractor-itemized breakdown of kitchen remodeling costs in Orange County, from mid-range updates to full luxury chef renovations.',
    keyTakeaways: [
      'Mid-range kitchen remodels in Orange County average $35,000 to $55,000.',
      'Luxury chef kitchens with custom cabinetry and quartz/marble waterfall islands range from $65,000 to $115,000+.',
      'Cabinets typically account for 30-35% of the total budget, followed by countertops and installation labor.',
      'California Title 24 compliance requires dedicated energy-efficient LED circuitry and dimmers.'
    ],
    content: [
      'Remodeling a kitchen in Orange County is one of the highest-yield home improvement investments, with average return-on-investment (ROI) consistently exceeding 70% in coastal and inland OC communities.',
      'A minor update—retaining cabinet boxes while replacing doors, installing quartz countertops, and adding a tile backsplash—typically ranges between $25,000 and $38,000.',
      'A major full gut remodel—involving wall removal, custom solid maple or white oak cabinetry, high-grade quartz or marble slabs, premium under-mount sinks, and rewiring to modern 20-amp appliance circuits—ranges from $50,000 to $95,000+.',
      'When working with Ben at BK Construction (CA Lic. #1139587), you receive an itemized proposal with clear material allowances, eliminating surprise change orders and keeping your timeline firmly on schedule.'
    ]
  },
  {
    id: 'permits-room-additions-california',
    title: 'California Building Permits for Room Additions: What Homeowners Must Know',
    slug: 'california-permits-room-additions-guide',
    readTime: '7 min read',
    category: 'Permits & Regulations',
    date: '2026 Building Code',
    summary: 'Navigating city plan-checks, structural engineering, setback requirements, and Title 24 energy standards in Orange County.',
    keyTakeaways: [
      'Unpermitted room additions invalidate homeowners insurance claims and stall property resale escrow.',
      'A licensed contractor coordinates structural calculations, seismic ties, and city building department submittals.',
      'California Title 24 requires compliant R-value wall/roof insulation and dual-pane Low-E glass.',
      'City plan checks in Anaheim, Irvine, and Newport Beach typically require 3 to 6 weeks for approval.'
    ],
    content: [
      'In Southern California, adding square footage is the smartest way to increase equity without paying current interest rates or property tax reassessments on a new home purchase.',
      'However, California building codes require strict adherence to seismic safety standards, energy efficiency guidelines, and local setback ordinances.',
      'BK Construction handles the entire permitting lifecycle on your behalf. From initial architectural drawings and structural engineer stamping to submitting plans to your municipal building department and hosting the city inspectors at each milestone (footings, framing, rough electrical/plumbing, insulation, and final).',
      'Having a licensed contractor (CA Lic. #1139587) on your permit shields you as the homeowner from liability and guarantees the addition is fully recorded with the Orange County Tax Assessor.'
    ]
  },
  {
    id: 'master-bath-trends-2026',
    title: 'Master Bathroom Trends: Walk-in Showers & Freestanding Tubs',
    slug: 'master-bathroom-trends-walk-in-showers',
    readTime: '5 min read',
    category: 'Design Trends',
    date: 'Design Guide',
    summary: 'Why zero-threshold curbless showers, seamless Schluter waterproofing, and organic stone textures are dominating Orange County master suites.',
    keyTakeaways: [
      'Curbless zero-threshold showers create an expansive, modern spa feel while providing universal accessibility.',
      'Schluter-KERDI waterproofing ensures a lifetime seal against moisture leaks and drywall rot.',
      'Freestanding solid-surface soaking tubs serve as striking sculptural focal points.',
      'Warm metallic fixtures (champagne brass, brushed bronze) paired with organic white oak vanities are the #1 aesthetic choice in 2026.'
    ],
    content: [
      'Homeowners across Newport Beach, Huntington Beach, and Irvine are abandoning oversized jacuzzi tub surrounds in favor of open, light-filled wet rooms.',
      'The modern master bath focuses on continuous floor planes: linear trench drains positioned against the wall allow large-format tiles to flow seamlessly from the dry bathroom floor directly into the shower without an awkward step curb.',
      'Pairing a frameless glass enclosure with warm LED niche lighting, a thermostatic rainfall head, and a matte black or brushed brass hand wand transforms daily routines into a five-star resort experience.',
      'Ben and the BK Construction team pay obsessive attention to subfloor leveling and multi-coat waterproofing, guaranteeing your master sanctuary remains leak-free for decades.'
    ]
  },
  {
    id: 'composite-vs-redwood-decks',
    title: 'Composite vs. Natural Redwood Decks for Southern California Homes',
    slug: 'composite-vs-redwood-decks-southern-california',
    readTime: '5 min read',
    category: 'Materials & Exterior',
    date: 'Material Comparison',
    summary: 'Evaluating lifespan, maintenance, coastal UV resistance, and cost factors between Trex/TimberTech composite and California redwood.',
    keyTakeaways: [
      'Composite decking (Trex Transcend, TimberTech) requires zero staining or sealing and resists marine salt air.',
      'Natural California Heart Redwood delivers authentic natural warmth and timber aroma, but requires annual UV sealing.',
      'Composite decks last 25 to 30+ years with simple soap-and-water cleaning.',
      'Redwood offers lower upfront material cost, while composite yields lower long-term maintenance expenses.'
    ],
    content: [
      'Southern California’s sunny climate makes outdoor living spaces a central feature of the home. When planning a new deck or patio, selecting the right surface material is critical.',
      'For coastal homes in Huntington Beach, Newport Beach, and Dana Point, composite decking is the premier choice. It will not warp, splinter, or degrade under harsh marine fog and intense afternoon sun.',
      'For inland properties in Anaheim Hills, Orange, and Fullerton where homeowners love traditional wood craftsmanship, natural Heart Redwood offers unmatched rich grain character.',
      'At BK Construction, all deck framing uses heavy-duty pressure-treated joists secured with Simpson Strong-Tie seismic anchors and corrosion-resistant fasteners.'
    ]
  },
  {
    id: 'hiring-licensed-contractor-lic-1139587',
    title: 'Why Hiring a Licensed Contractor (CA Lic. #1139587) Protects Your Home Investment',
    slug: 'licensed-california-contractor-protection-guide',
    readTime: '6 min read',
    category: 'Consumer Protection',
    date: 'Contractor Credibility',
    summary: 'The vital legal, financial, and safety protections that come with California Contractors State License Board (CSLB) bonding and insurance.',
    keyTakeaways: [
      'In California, any home improvement project totaling $500 or more in labor and materials legally requires a licensed contractor.',
      'Unlicensed handymen leave homeowners personally liable for worker injuries, code violations, and unfinished jobs.',
      'BK Construction holds active California General Building Contractor License #1139587, backed by state surety bonding and comprehensive general liability insurance.',
      'A licensed contractor guarantees compliance with local building codes, inspections, and clean job site standards.'
    ],
    content: [
      'Your home is likely your most valuable financial asset. Entrusting major structural, plumbing, and electrical renovations to an unlicensed worker exposes you to massive personal liability.',
      'If an uninsured worker slips on your property or causes a water leak behind walls, your standard homeowner insurance policy may deny coverage if the work was performed without a licensed contractor and without proper permits.',
      'Ben at BK Construction carries full general liability insurance, workers compensation coverage, and an active surety bond registered with the California CSLB under License #1139587.',
      'With BK Construction, you receive written contracts, detailed milestone payment schedules in strict compliance with California home improvement law, and the peace of mind that a seasoned professional is personally accountable for your home.'
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    author: 'David & Sarah M.',
    city: 'Newport Beach, CA',
    project: 'Full Kitchen Remodel & Island Expansion',
    stars: 5,
    quote: 'Ben and his crew completely transformed our dark 1980s kitchen into a bright, open chef’s dream. The 12-foot marble island is the centerpiece of our home now. Ben was on-site every single day, answered every text within minutes, and finished on time. Rare to find this level of honesty and craftsmanship in Orange County!',
    date: 'August 2026'
  },
  {
    id: 't-2',
    author: 'Mark R.',
    city: 'Anaheim Hills, CA',
    project: 'Master Bath & Walk-in Shower',
    stars: 5,
    quote: 'We interviewed four contractors for our master bathroom. Ben gave us by far the most transparent, itemized estimate. The curbless shower and floating vanity look like a 5-star resort. The tile work is laser-straight. Highly recommend BK Construction!',
    date: 'September 2026'
  },
  {
    id: 't-3',
    author: 'Elena & Carlos G.',
    city: 'Irvine, CA',
    project: 'Room Addition & Structural Beam',
    stars: 5,
    quote: 'We needed a 450 sq.ft. addition for our growing family. Ben took care of the architectural plans, city permits with Irvine building department, and passed every inspection on the first visit. Ben’s direct number (714) 884-2905 was always open. 10/10 service!',
    date: 'July 2026'
  },
  {
    id: 't-4',
    author: 'Brian T.',
    city: 'Huntington Beach, CA',
    project: 'Custom Composite Deck & Cable Railing',
    stars: 5,
    quote: 'Living near the ocean, our old wood deck was rotting away. Ben built a gorgeous Trex Transcend deck with stainless steel cable rails. It has stood up through sun and salt air flawlessly. Clean job site every evening before they left.',
    date: 'October 2026'
  }
];

export const WHY_CHOOSE_US = [
  {
    icon: 'ShieldCheck',
    title: 'Licensed, Bonded & Insured',
    description: 'California General Building Contractor License #1139587 with full liability coverage and state surety bonding for total peace of mind.'
  },
  {
    icon: 'Hammer',
    title: '15+ Years Local Experience',
    description: 'Over a decade and a half delivering bespoke residential remodels throughout Orange County with deep local building code expertise.'
  },
  {
    icon: 'FileSpreadsheet',
    title: 'Itemized Transparent Pricing',
    description: 'Clear, detailed milestone contracts with no hidden fees or surprise change orders. What we quote is what you pay.'
  },
  {
    icon: 'Sparkles',
    title: 'Clean Daily Job Sites',
    description: 'We respect your living space with daily HEPA vacuuming, floor protection runners, and zip-wall dust containment barriers.'
  },
  {
    icon: 'Clock',
    title: 'On-Time Completion Guarantee',
    description: 'Structured timelines with daily project management. We schedule inspections proactively to keep your project moving forward without delays.'
  },
  {
    icon: 'PhoneCall',
    title: 'Direct Access to Ben',
    description: 'No middleman sales reps or runarounds. Ben is on-site managing your project and reachable directly at (714) 884-2905.'
  }
];
