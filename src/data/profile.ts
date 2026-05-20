export type Project = {
  name: string
  link: string
}

export type ProjectCategory = {
  title: string
  items: Project[]
}

export type Experience = {
  company: string
  role: string
  period: string
  location?: string
  summary: string
  description?: string
  skills?: string[]
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
  projects?: ProjectCategory[]
  scheduler?: {
    link: string
  }
}

export const profile: Profile = {
  name: 'Rafi Haidari',
  headline: 'Software Engineer • Full Stack Developer • Technical Team Lead',
  location: 'Magdeburg, Germany',
  about:
    "Full‑stack developer with 12+ years in web engineering. I specialize in JavaScript, TypeScript, React, Vue and Node, with experience across OAuth2, DevOps and cloud. I love building responsive UIs, integrating third‑party tools and leading teams to deliver polished products.",
  skills: [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Node.js', 'Express.js',
    'Tailwind CSS', 'Chakra UI', 'Bootstrap', 'HTML5', 'CSS3', 'Sass',
    'REST', 'GraphQL', 'OAuth2', 'MongoDB', 'MySQL', 'PostgreSQL', 'Firebase',
    'WordPress', 'WooCommerce', 'Vite', 'Webpack', 'Babel',
    'Azure DevOps', 'AWS CodePipeline', 'GitHub Actions', 'Azure', 'AWS', 'Heroku', 'Netlify', 'DigitalOcean', 'Ark UI', 'Storybook', 'Cypress', 'Unit Testing',
    'Micro‑services', 'Serverless',
    'Figma', 'ConceptBoard', 'Project Management', 'Project Planning', 'Project Execution', 'Project Monitoring', 'Project Control', 'Project Closure', 'Component Library', 'Medical Platforms', 'Responsive Design', 'API Integration', 'Code Review', 'Frontend Architecture', 'Scalable UI', 'Technical Direction', 'Client Collaboration', 'Cross-browser Compatibility', 'Design Systems', 'Performance Optimization', 'Remote Collaboration', 'Backend Logic', 'System Design', 'Cross-continental Workflow', 'Team Leadership', 'Requirement Engineering', 'Agile/Scrum', 'Release Management', 'Mentoring', 'SDLC', 'Technical Vision', 'Code Quality', 'Sprint Planning', 'Client Management', 'Web Development', 'Entrepreneurship', 'Technical Training', 'Software Project Management', 'Strategic Planning', 'Mentorship', 'Curriculum Development', 'Startup Management', 'Resource Planning', 'Database Management', 'MIS', 'GIS Systems', 'Asset Management', 'Data Analysis', 'SQL Server', 'Database Configuration', 'System Deployment', 'Reporting Tools', 'IT Infrastructure', 'Network Administration', 'Database Security', 'Disaster Recovery', 'System Monitoring', 'Hardware Configuration', 'Technical Support', 'IT Management', 'Network Security'
  ],
  experiences: [
    {
      company: 'mediMESH GmbH',
      role: 'Software Engineer (Frontend)',
      period: 'May 2022 - Present',
      summary: 'Building polished frontend experiences and collaborating across product and design.',
      description: 'As a Frontend Engineer at mediMESH, I lead the development of intuitive and performance-driven medical platform interfaces. I collaborate closely with product managers and UX designers to translate complex requirements into seamless digital experiences, ensuring high accessibility and cross-browser compatibility.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Vite', 'Chakra UI', 'Storybook', 'REST API', 'Unit Testing', 'Integration Testing', 'End-to-End Testing', 'CI/CD', 'Agile', 'Scrum', 'Project Management', 'Component Library', 'Medical Platforms', 'Responsive Design', 'API Integration', 'Code Review', 'Frontend Architecture']
    },
    {
      company: 'Webfume Technologies LLC',
      role: 'Product Development Lead',
      period: 'Jul 2022 - Nov 2022',
      summary: 'Led product development initiatives and front‑end quality with Tailwind, accessibility and cross‑browser focus.',
      description: 'Spearheaded technical direction and frontend excellence for client projects. Focused on building scalable component libraries using Tailwind CSS and ensuring all products met high standards of performance and accessibility.',
      skills: ['Product Leadership', 'Tailwind CSS', 'Accessibility', 'React', 'Project Management', 'Project Planning', 'Project Execution', 'Project Monitoring', 'Project Control', 'Project Closure', 'Scalable UI', 'Technical Direction', 'Client Collaboration', 'Cross-browser Compatibility', 'Design Systems', 'Performance Optimization']
    },
    {
      company: 'Alpha4All Limited',
      role: 'Full Stack Developer',
      period: 'Oct 2020 - May 2022',
      location: 'Italy',
      summary: 'Full‑stack work across Vue, Node, Express, Firebase, PHP, MySQL, WordPress/WooCommerce and various APIs—owning end‑to‑end delivery.',
      description: 'Acted as a comprehensive Full Stack Engineer, managing end-to-end development of complex web applications. I designed and implemented scalable database architectures and integrated various third-party services. My work balanced performance and user experience across diverse tech stacks, from modern JavaScript frameworks to robust PHP-based platforms.',
      skills: ['Vue.js', 'Node.js', 'Express.js', 'Firebase', 'PHP', 'MySQL', 'WordPress', 'WooCommerce', 'OAuth2', 'Database Architecture', 'API Integration', 'Full-stack Engineering', 'Backend Development', 'JavaScript', 'HTML5', 'SQL']
    },
    {
      company: 'wpPlan',
      role: 'Senior Front‑End Developer (Part‑time)',
      period: 'Jun 2020 - Sep 2020',
      summary: 'Shipped and maintained marketing sites and apps in close collaboration with design and full‑stack teams.',
      description: 'Responsible for architecting and building high-traffic websites and applications. I worked in a tight-knit loop with UI/UX designers to bring pixel-perfect mocks to life and collaborated with backend teams to ensure seamless data integration and reliable application state management.',
      skills: ['Frontend Architecture', 'JavaScript', 'UI/UX Design', 'Sass', 'State Management', 'High-traffic Sites', 'Responsive Development', 'Babel', 'Webpack', 'Frontend Engineering', 'Pixel-perfect UI', 'Team Collaboration']
    },
    {
      company: 'ClikGlobal (via PomTech)',
      role: 'Senior Full Stack Developer (Freelance)',
      period: 'Dec 2017 - May 2020',
      location: 'Colorado, United States',
      summary: 'Senior developer & team lead delivering web platforms through a US‑Afghanistan partnership with PomTech.',
      description: 'Designed and developed versatile web applications, focusing on intuitive user interactions and robust backend logic. I ensured that all applications were fully responsive and performed consistently across all modern devices and browsers, while managing complex cross-continental collaborations.',
      skills: ['Full Stack Development', 'React', 'Node.js', 'AWS', 'Responsive Design', 'API Integration', 'Remote Collaboration', 'Backend Logic', 'System Design', 'JavaScript', 'Cross-continental Workflow']
    },
    {
      company: 'Globe Runner (via PomTech)',
      role: 'Senior Web Developer (Freelance)',
      period: 'Jul 2015 - Nov 2017',
      location: 'United States',
      summary: 'Led web dev for a Texas digital agency partnership; mentored team and ensured delivery quality.',
      description: 'Served as the lead developer for a portfolio of international clients. My responsibilities covered the entire SDLC, including requirement engineering, sprint planning with user stories, and technical release management. I provided technical vision and mentored junior developers to maintain high code quality standards.',
      skills: ['Team Leadership', 'Requirement Engineering', 'Agile/Scrum', 'Release Management', 'Mentoring', 'SDLC', 'Technical Vision', 'Code Quality', 'Sprint Planning', 'Client Management', 'Web Development']
    },
    {
      company: 'PomTech ICT Solutions',
      role: 'Co‑founder',
      period: 'Jul 2015 - Present',
      summary: 'Co‑founded to create opportunities for fresh graduates; delivered software and training.',
      description: 'Co-founded the agency to bridge the gap between academic learning and professional software engineering. I managed early-stage software projects and developed training programs to equip new graduates with industry-ready technical skills.',
      skills: ['Entrepreneurship', 'Technical Training', 'Software Project Management', 'Strategic Planning', 'Mentorship', 'Curriculum Development', 'Startup Management', 'Resource Planning']
    },
    {
      company: 'DAI',
      role: 'Database and GIS Officer',
      period: 'Aug 2013 - Mar 2014',
      summary: 'Maintained and deployed MIS/databases; developed asset management systems for municipalities.',
      description: 'Supported and configured custom MIS and database systems for large-scale municipal deployments. I specialized in developing asset management solutions that streamlined data tracking and reporting for western municipalities.',
      skills: ['Database Management', 'MIS', 'GIS Systems', 'Asset Management', 'Data Analysis', 'SQL Server', 'Database Configuration', 'System Deployment', 'Reporting Tools']
    },
    {
      company: 'Asiapharma',
      role: 'IT Manager',
      period: 'Jun 2010 - Aug 2012',
      summary: 'Managed databases, systems and networks; ensured operational reliability and timely support.',
      description: 'Directed all IT operations, including the planning, implementation, and maintenance of critical company databases. I was responsible for the entire infrastructure, from hardware configuration and network monitoring to providing timely support for all technical systems.',
      skills: ['IT Infrastructure', 'Network Administration', 'Database Security', 'Disaster Recovery', 'System Monitoring', 'Hardware Configuration', 'Technical Support', 'IT Management', 'Network Security']
    },
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/rafi-haidari/',
    github: 'https://github.com/rafihaidari',
    email: undefined,
    emailParts: { user: 'rafi', domain: 'haidari.co' },
  },
  contact: {
    phone: undefined,
    phoneParts: ['+49', '175', '88', '95', '409'],
    location: 'Magdeburg, Germany',
    address: 'Hermann-Hesse-Str 16, Magdeburg, Germany',
  },
  languages: ['English (C1)', 'German (A2)', 'Persian (Native)'],
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
  ],
  projects: [
    {
      title: 'Chrome Extensions',
      items: [
        { name: 'Weatherly', link: 'https://chromewebstore.google.com/detail/weatherly-weather-forecas/heifjnlfhcndklgdnbjkailkipkfgkpm' },
        { name: 'Breakly', link: 'https://chromewebstore.google.com/detail/breakly-time-breaker/oanldpfmdigndchcghohbhldaplogcam' }
      ]
    },
    {
      title: 'Figma Plugins',
      items: [
        { name: 'Refine Selection', link: 'https://www.figma.com/community/plugin/1498434473988492326/refine-selection' },
        { name: 'QR Code Figma', link: 'https://www.figma.com/community/plugin/1489632885969501770/qr-code-figma' }
      ]
    },
    {
      title: 'Open Source Projects',
      items: [
        { name: 'FigDU', link: 'https://github.com/rafihaidari/figdu' },
        { name: 'CVFolio', link: 'https://github.com/rafihaidari/CVFolio' }
      ]
    }
  ],
  scheduler: {
    link: import.meta.env.VITE_CALCOM_LINK || 'rafi-haidari/30min'
  }
}



