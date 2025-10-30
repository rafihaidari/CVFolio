export type Experience = {
  company: string
  role: string
  period: string
  location?: string
  summary: string
}

export type Profile = {
  name: string
  headline: string
  location?: string
  about: string
  skills: string[]
  experiences: Experience[]
  links: {
    linkedin: string
    github?: string
    email?: string
    emailParts?: { user: string; domain: string }
  }
  contact?: {
    phone?: string
    phoneParts?: string[]
    location?: string
    address?: string
  }
  languages?: string[]
  certifications?: string[]
  education?: Array<{
    degree: string
    institution: string
    period: string
    details?: string[]
  }>
}

export const profile: Profile = {
  name: 'Rafi Haidari',
  headline: 'Software Engineer • Frontend Developer • Technical Team Lead',
  location: 'Magdeburg, Germany',
  about:
    "Full‑stack developer with 12+ years in web engineering. I specialize in JavaScript, TypeScript, React, Vue and Node, with experience across OAuth2, DevOps and cloud. I love building responsive UIs, integrating third‑party tools and leading teams to deliver polished products.",
  skills: [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Node.js', 'Express.js',
    'Tailwind CSS', 'Chakra UI', 'Bootstrap', 'HTML5', 'CSS3', 'Sass',
    'REST', 'GraphQL', 'OAuth2', 'MongoDB', 'MySQL', 'PostgreSQL', 'Firebase',
    'WordPress', 'WooCommerce', 'Vite', 'Webpack', 'Babel',
    'Azure DevOps', 'AWS CodePipeline', 'GitHub Actions', 'Azure', 'AWS', 'Heroku', 'Netlify', 'DigitalOcean',
    'Storybook', 'Cypress', 'Unit Testing',
    'Micro‑services', 'Serverless',
    'Figma', 'ConceptBoard'
  ],
  experiences: [
    {
      company: 'mediMESH GmbH',
      role: 'Software Engineer (Frontend)',
      period: 'May 2022 - Present',
      summary: 'Building polished frontend experiences and collaborating across product and design.',
    },
    {
      company: 'Webfume Technologies LLC',
      role: 'Product Development Lead',
      period: 'Jul 2022 - Nov 2022',
      summary: 'Led product development initiatives and front‑end quality with Tailwind, accessibility and cross‑browser focus.',
    },
    {
      company: 'Alpha4All Limited',
      role: 'Full Stack Developer',
      period: 'Oct 2020 - May 2022',
      location: 'Italy',
      summary: 'Full‑stack work across Vue, Node, Express, Firebase, PHP, MySQL, WordPress/WooCommerce and various APIs—owning end‑to‑end delivery.',
    },
    {
      company: 'wpPlan',
      role: 'Senior Front‑End Developer (Part‑time)',
      period: 'Jun 2020 - Sep 2020',
      summary: 'Shipped and maintained marketing sites and apps in close collaboration with design and full‑stack teams.',
    },
    {
      company: 'ClikGlobal (via PomTech)',
      role: 'Senior Full Stack Developer (Freelance)',
      period: 'Dec 2017 - May 2020',
      location: 'Colorado, United States',
      summary: 'Senior developer & team lead delivering web platforms through a US‑Afghanistan partnership with PomTech.',
    },
    {
      company: 'Globe Runner (via PomTech)',
      role: 'Senior Web Developer (Freelance)',
      period: 'Jul 2015 - Nov 2017',
      location: 'United States',
      summary: 'Led web dev for a Texas digital agency partnership; mentored team and ensured delivery quality.',
    },
    {
      company: 'PomTech ICT Solutions',
      role: 'Co‑founder',
      period: '2015',
      summary: 'Co‑founded to create opportunities for fresh graduates; delivered software and training.',
    },
    {
      company: 'DAI',
      role: 'Database and GIS Officer',
      period: 'Aug 2013 - Mar 2014',
      summary: 'Maintained and deployed MIS/databases; developed asset management systems for municipalities.',
    },
    {
      company: 'Asiapharma',
      role: 'IT Manager',
      period: 'Jun 2010 - Aug 2012',
      summary: 'Managed databases, systems and networks; ensured operational reliability and timely support.',
    },
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/rafi-haidari/',
    github: 'https://github.com/rafihaidari',
    email: undefined,
    emailParts: { user: 'hello.rafihaidari', domain: 'gmail.com' },
  },
  contact: {
    phone: undefined,
    phoneParts: ['+49', '175', '88', '95', '409'],
    location: 'Magdeburg, Germany',
    address: 'Hermann-Hesse-Str 16, Magdeburg, Germany',
  },
  languages: ['English (C1)', 'German (A1)', 'Persian (Native)'],
  certifications: [
    'Google Analytics (Google)',
    'Google Tag Manager (Google)',
    'ES6 JavaScript (Udemy)',
    'OOP PHP (Udemy)',
    'cPanel Professional (CPP)',
    'Full Stack and Frontend (LinkedIn)',
    'JavaScript Essential (LinkedIn)',
    'Business Communication (USAID/AWDP)'
  ],
  education: [
    {
      degree: 'BSc in Computer Science (Software Engineering Major)',
      institution: 'Hariwa University, Herat, Afghanistan',
      period: '2014 – 2019',
      details: ['Graduated Top 3%']
    },
    {
      degree: 'Diploma in Leadership and Management',
      institution: 'Institute for Leadership Development, Herat, Afghanistan',
      period: '2016 – 2017',
      details: ['Leadership, critical thinking and team dynamics']
    }
  ]
}



