export interface TechItem {
  id: number;
  name: string;
  desc: string;
  img: string;
}

export const getTechKnowledgeVault = (email:string): TechItem[] => {
  return [
    {
      id: 1,
      name: "Next.js",
      desc: "React framework for production with server-side rendering and static site generation",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
    },
    {
      id: 2,
      name: "TypeScript",
      desc: "Typed superset of JavaScript that compiles to plain JavaScript",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    },
    {
      id: 3,
      name: "React",
      desc: "JavaScript library for building user interfaces with component-based architecture",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    {
      id: 4,
      name: "Node.js",
      desc: "JavaScript runtime built on Chrome's V8 engine for server-side applications",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    {
      id: 5,
      name: "Tailwind CSS",
      desc: "Utility-first CSS framework for rapidly building custom user interfaces",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
    },
    {
      id: 6,
      name: "PostgreSQL",
      desc: "Open-source relational database management system with advanced features",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
    },
    {
      id: 7,
      name: "MongoDB",
      desc: "NoSQL document database for flexible, scalable data storage",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    },
    {
      id: 8,
      name: "Docker",
      desc: "Platform for developing, shipping, and running applications in containers",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
    },
    {
      id: 9,
      name: "Git",
      desc: "Distributed version control system for tracking code changes",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
    },
    {
      id: 10,
      name: "GraphQL",
      desc: "Query language for APIs providing a complete and understandable description of data",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
    }
  ];
}
