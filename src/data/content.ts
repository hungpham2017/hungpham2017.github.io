/**
 * Site content, shared by every page so no two renderings can drift apart.
 * Copied verbatim out of the components; nothing here is rewritten.
 */

/**
 * Descriptions lead with the application rather than the method, and the two
 * many-body method threads (embedding and AFQMC) are one entry instead of two.
 * Every fact and nearly all the wording is carried over from the originals —
 * only the order of emphasis changed.
 */
export const projects = [
  {
    title: 'AI + Science',
    tagline: 'Drug discovery, materials, catalysis, energy',
    description: "Accelerating downstream applications — drug discovery, materials design, catalysis, and energy solutions — by applying deep learning, generative models, and agentic AI to quantum chemical data.",
    tags: ['Deep Learning', 'Agentic AI', 'Drug Discovery', 'Materials Design'],
    links: [],
  },
  {
    title: 'GPU-Accelerated Quantum Chemistry',
    tagline: 'Simulation fast enough for industry',
    description: "Making advanced simulation practical for real-world industrial applications beyond standard DFT, by rebuilding methods like the random phase approximation and quantum embedding to run on GPUs.",
    tags: ['GPU', 'RPA', 'HPC'],
    links: [{ label: 'ByteQC', url: 'https://github.com/bytedance/byteqc' }],
  },
  {
    title: 'Correlated Electronic Structure',
    tagline: 'Catalysis, superconductors, quantum computing',
    description: "Advancing quantum chemistry applications in catalysis, superconductors, and quantum computing through 1 kcal/mol-accurate ab initio simulation of strongly correlated and metallic systems — quantum embedding on classical and quantum platforms, and AFQMC algorithms that exploit locality and modern GPUs to reach large molecules and metallic surfaces.",
    tags: ['Quantum Embedding', 'AFQMC', 'Python', 'C/C++', 'Fortran'],
    links: [{ label: 'pDMET', url: 'https://github.com/hungpham2017/pDMET' }],
  },
  {
    title: 'Novel Materials Design',
    tagline: 'Topological insulators, perovskites, MOFs, COFs',
    description: "Investigating reticular frameworks, topological systems, and photovoltaics with periodic DFT, Wannier tight-binding models, and Grand Canonical Monte Carlo.",
    tags: ['DFT', 'Wannier90', 'GCMC'],
    links: [
      { label: 'MCU', url: 'https://github.com/hungpham2017/mcu' },
      { label: 'pyWannier90', url: 'https://github.com/hungpham2017/pyWannier90' },
    ],
  },
];

/**
 * Scientific software. Anything without a `url` is internal and is listed
 * without a link rather than pointed anywhere; the section caption counts
 * those itself so it cannot go stale.
 */
export const software = [
  { name: 'ByteQC', role: 'Contributor', note: 'GPU-accelerated quantum chemistry for large-scale systems', language: 'CUDA', url: 'https://github.com/bytedance/byteqc' },
  { name: 'PySCF', role: 'Contributor', note: 'Python-based simulations of chemistry', language: 'Python', url: 'https://github.com/pyscf/pyscf' },
  { name: 'ipie', role: 'Contributor', note: 'Auxiliary-field quantum Monte Carlo', language: 'Python', url: 'https://github.com/JoonhoLee-Group/ipie' },
  { name: 'pDMET', role: 'Lead developer', note: 'Periodic density matrix embedding theory', language: 'Python', url: 'https://github.com/hungpham2017/pDMET' },
  { name: 'MCU', role: 'Lead developer', note: 'Modeling and crystallographic utilities', language: 'Python', url: 'https://github.com/hungpham2017/mcu' },
  { name: 'pyWannier90', role: 'Lead developer', note: 'Wannier90 interface for periodic systems', language: 'Python', url: 'https://github.com/hungpham2017/pyWannier90' },
  // ByteQEmbed and cuRPA were folded into FEMION, which is not being open
  // sourced — hence no link and no language badge.
  { name: 'FEMION', role: 'Lead developer', note: 'Quantum embedding for metals, GPU random phase approximation', language: null, url: null },
];

export const experiences = [
  {
    title: 'ByteDance',
    role: 'Research Scientist',
    period: 'March 2022 — Present',
    focus: 'AI for science and quantum chemistry',
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
  /** How the page introduces him. The employment title stays 'Research
      Scientist' in the structured data, where it needs to be literal. */
  role: 'Scientist + Tech Builder',
  // Ordered by where the work is now, not by how it started: AI + Science is
  // the day job, software is what gets shipped, quantum chemistry is the
  // training underneath both. Previously QC shared top billing with AI.
  tagline: 'AI + Science • Scientific Software • Quantum Chemistry',
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
