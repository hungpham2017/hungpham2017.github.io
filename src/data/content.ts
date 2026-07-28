/**
 * Site content, shared by every page so no two renderings can drift apart.
 * Copied verbatim out of the components; nothing here is rewritten.
 */

export const projects = [
  {
    title: 'AI + Science',
    tagline: 'AI + Chemistry for Real-World Impact',
    description: "Applying deep learning, generative models, and agentic AI to quantum chemical data to accelerate downstream applications — drug discovery, materials design, catalysis, and energy solutions.",
    tags: ['Deep Learning', 'Agentic AI', 'Drug Discovery', 'Materials Design'],
    links: [],
  },
  {
    title: 'Quantum Embedding',
    tagline: 'Scalable Quantum Embedding for Material Simulation',
    description: "Developing quantum embedding algorithms for efficient, 1 kcal/mol-accurate ab initio simulations of strongly correlated and metallic systems on classical and quantum platforms, advancing quantum chemistry applications in catalysis, superconductors, and quantum computing.",
    tags: ['Python', 'C/C++', 'Fortran', 'Linear Algebra'],
    links: [{ label: 'pDMET', url: 'https://github.com/hungpham2017/pDMET' }],
  },
  {
    title: 'Quantum Monte Carlo',
    tagline: 'Large-scale Quantum Monte Carlo',
    description: "Developing advanced AFQMC algorithms leveraging locality and modern GPUs, enabling scalable, chemically accurate quantum chemistry simulations for large systems, including strongly correlated molecules and metallic surfaces.",
    tags: ['AFQMC', 'GPU', 'Stochastic Methods'],
    links: [],
  },
  {
    title: 'Novel Materials Design',
    tagline: 'Topological Insulators | Perovskites | MOFs | COFs',
    description: "Applying advanced computational techniques — periodic DFT, Wannier tight-binding models, and Grand Canonical Monte Carlo — to investigate reticular frameworks, topological systems, and photovoltaics.",
    tags: ['DFT', 'Wannier90', 'GCMC'],
    links: [
      { label: 'MCU', url: 'https://github.com/hungpham2017/mcu' },
      { label: 'pyWannier90', url: 'https://github.com/hungpham2017/pyWannier90' },
    ],
  },
  {
    title: 'GPU-Accelerated Quantum Chemistry',
    tagline: 'Fast Quantum Chemistry on GPU',
    description: "Accelerating quantum chemistry methods like random phase approximation and quantum embedding by leveraging GPUs, making advanced simulations practical for real-world industrial applications beyond standard DFT.",
    tags: ['GPU', 'RPA', 'HPC'],
    links: [],
  },
];

export const experiences = [
  {
    title: 'ByteDance Research',
    role: 'Research Scientist',
    period: 'March 2022 — Present',
    focus: 'AI for science, quantum chemistry, and GPU-accelerated chemistry software',
  },
  {
    title: 'Columbia University',
    role: 'Postdoctoral Research Scientist',
    period: 'June 2021 — March 2022',
    advisor: 'David Reichman',
    focus: 'Auxiliary-field quantum Monte Carlo for periodic solids',
  },
  {
    title: 'University of Minnesota, Twin Cities',
    role: 'Research Assistant',
    period: 'Jan 2017 — May 2021',
    advisor: 'Laura Gagliardi',
    focus: 'Electronic structure theory, quantum embedding, and materials design',
  },
  {
    title: 'MANAR & ICST, Ho Chi Minh City',
    role: 'Research Assistant',
    period: 'Oct 2011 — Jul 2015',
    advisor: 'Nguyen-Nguyen Pham-Tran',
    focus: 'Periodic DFT, grand canonical Monte Carlo, and reticular chemistry for gas-storage materials',
  },
];

export const education = [
  {
    school: 'University of Minnesota, Twin Cities',
    degree: 'Ph.D. in Chemistry',
    period: 'Aug 2015 — May 2021',
  },
  {
    school: 'VNUHCM - University of Science',
    degree: 'B.S. in Chemistry',
    period: 'Sep 2007 — Sep 2011',
  },
];

/** Hero identity block. */
export const identity = {
  name: 'Hung Q. Pham',
  role: 'Research Scientist',
  tagline: 'AI + Science • Quantum Chemistry',
};

/** About copy, in order. The first line is set as a standfirst. */
export const about = {
  standfirst: 'Science accelerates when AI meets deep domain expertise.',
  paragraphs: [
    "I build at that intersection — using modern deep learning techniques and agentic AI combined with ab initio high-fidelity data from quantum chemistry to reveal hidden chemical transformations that can drive progress in drug development, materials design, energy, and beyond.",
    "Beyond fundamental research, I bring the same AI + Science mindset to real-world problems — building systems and models that integrate AI into different fields to boost productivity and efficiency. From agentic workflows to intelligent tools, if there's a way AI can make something faster, smarter, or more impactful, I want to build it.",
    "I'm interested in how science and technology shape the way we live. Outside of work, you'll find me at a music festival, on the dance floor, or over a good cocktail — I also used to train in Shotokan karate.",
  ],
};

/**
 * Every outbound URL, in one place. Previously the LinkedIn address was
 * duplicated across the hero, the shared profile list, and the JSON-LD
 * sameAs — and drifted, pointing at a slug that did not resolve.
 */
export const links = {
  email: 'mailto:pqh3.14@gmail.com',
  github: 'https://github.com/hungpham2017',
  linkedin: 'https://www.linkedin.com/in/hung-pham-4b46598b/',
  twitter: 'https://twitter.com/hungpham314',
  scholar: 'https://scholar.google.com/citations?user=MIe6vYUAAAAJ',
  orcid: 'https://orcid.org/0000-0003-3608-1298',
  resume: '/assets/resume.pdf',
} as const;

export const profiles = [
  { label: 'Email', url: links.email },
  { label: 'GitHub', url: links.github },
  { label: 'LinkedIn', url: links.linkedin },
  { label: 'Twitter', url: links.twitter },
  { label: 'Google Scholar', url: links.scholar },
  { label: 'ORCID', url: links.orcid },
  { label: 'Resume', url: links.resume },
];

/** Profiles that identify the same person, for schema.org sameAs. */
export const sameAs = [
  links.scholar,
  links.orcid,
  links.github,
  links.linkedin,
  links.twitter,
];
