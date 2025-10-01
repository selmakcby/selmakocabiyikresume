import { NextResponse } from 'next/server';

// Selma's actual CV content extracted from her website
const CV_CONTENT = `
SELMA KOCABIYIK - CURRICULUM VITAE

PERSONAL INFORMATION:
- Name: Selma Kocabıyık
- Location: Barendrecht, Netherlands
- GitHub: github.com/selmakcby
- Hugging Face: huggingface.co/kcbkS
- Replicate: replicate.com/selmakcby
- LinkedIn: linkedin.com/in/selma-kocabıyık-12b445264
- YouTube: youtube.com/@selmaakocabiyik
- Specialization: AI & Data Engineer | LLMs, NLP, RAG Systems & Business Automation

PROFESSIONAL SUMMARY:
Bachelor of Artificial Intelligence graduate from VU Amsterdam with hands-on experience in AI development, automation, and data analysis. Skilled in Python, SQL, BI tools, and automation platforms (n8n, MCP), with a proven ability to turn complex datasets into scalable systems and actionable insights.

At Floorplanner, I worked as a Junior AI Developer, where I designed Retrieval-Augmented Generation (RAG) pipelines, created hierarchical data structuring strategies, and prototyped ML models to improve search and automation for millions of design records. At CoreMagnet, I implemented MCP-based LLM integrations for business automation, connecting Claude AI and other LLMs with n8n workflows to streamline B2B processes. Earlier, at Arpsar, I built Python-based pipelines for large-scale scraping, cleaning, and app development, improving dataset quality for dashboards and decision support.

Through these roles I've gained not only technical expertise, but also life-changing experiences, new perspectives, and opportunities to grow — from learning to collaborate with diverse teams to pushing the boundaries of how AI can be applied in real-world systems. These experiences have shaped my passion for applying AI and data science to practical domains, especially financial data analysis and business intelligence, where thoughtful system design can deliver measurable impact.

EXPERIENCE:
1. Junior AI Developer — Floorplanner (2025)
   - Designed and optimized Retrieval-Augmented Generation (RAG) pipelines for large-scale design datasets
   - Developed hierarchical chunking strategies (project → floor → room → items) for efficient data structuring and retrieval
   - Prototyped ML models for semantic search and product-in-room generation, improving usability of design metadata
   - Collaborated with engineers to enhance scalability, automation, and AI-assisted workflows
   - Gained practical knowledge in team-based development, agile collaboration, and cross-functional problem solving

2. AI Engineer Intern (Bachelor Thesis) — CoreMagnet (2025)
   - Implemented Model Context Protocol (MCP) to connect LLMs with n8n workflows
   - Automated B2B data enrichment and sales processes, reducing manual workload and improving workflow efficiency
   - Conducted comparative evaluation of MCP vs. API-based workflows for scalability and usability
   - Integrated Claude AI and other LLMs with automation platforms to deliver context-aware, scalable solutions

3. Data Intern — Arpsar (2023–2024)
   - Built Python pipelines for large-scale data scraping and cleaning using BeautifulSoup, Pandas, and other libraries
   - Improved dataset consistency and usability, enabling downstream dashboards and business applications
   - Deployed apps with cleaned datasets using Vercel and Python backends
   - Strengthened skills in ETL processes, automation, and data preparation for decision support

EDUCATION:
1. Vrije Universiteit Amsterdam (VU Amsterdam)
   - BSc Artificial Intelligence (Aug 2022 – Jul 2025)

2. Korea University
   - Exchange, Computer and Information Sciences (Aug 2024 – Dec 2024)

TECHNICAL SKILLS:
- Programming Languages: Python, SQL, JavaScript, R
- AI/ML Technologies: LLMs, NLP, RAG Systems, PyTorch, Transformers
- Data & Analytics: Pandas, NumPy, Scikit-learn, Data Visualization, BI Tools
- Automation & Workflows: n8n, Model Context Protocol (MCP), API Integration
- Data Engineering: Data Pipelines, ETL/ELT, Data Cleaning, Large-scale Data Processing
- Tools & Platforms: Git, Docker, Cloud Platforms, Database Management

LANGUAGES:
- English: C1
- Dutch: C1
- Turkish: C2
- Korean: A2

ACADEMIC PROJECTS (Bachelor's in AI at VU Amsterdam):

1. BACHELOR THESIS: "Enhancing Workflow Automation with MCP and Claude AI"
   - Focus: Integration of Model Context Protocol (MCP) with Claude AI to enhance workflow automation capabilities
   - Demonstrates how LLMs can be connected with various tools and workflows to create intelligent, context-aware automation systems
   - Key Technologies: Model Context Protocol (MCP), Claude AI, Workflow Automation, n8n Platform, B2B Data Enrichment
   - This was completed at CoreMagnet as an AI Engineer Intern
   - Full thesis PDF available on portfolio website

2. Machine Learning: Predictive ML Models on Video Game Dataset
3. Statistics & R: Statistical Analysis Assignments (3 projects)
4. Algorithms & Deep Learning: Neural Networks, Optimization, Evolutionary Algorithms
5. Text Mining & NLP: Natural Language Processing Poster
6. Collective Intelligence: Energy Level and Population Size Analysis
7. AI and Law & Ethics: Evolutionary Algorithm Model

ADDITIONAL EXPERIENCE:
1. School Coach — Stip Studentenplatform (Sep 2023 – Jul 2024)
   - Coached high school students in strategic board games such as chess and checkers
   - Provided academic mentoring and study support to university students
   - Helped students with coursework planning, time management, and effective learning strategies
   - Delivered workshops on time management and study techniques

2. Teaching Assistant — Kiem Montessori Amsterdam (Oct 2022 – May 2023)
   - Assisted in classroom activities and supported teachers in daily lesson delivery
   - Worked as a part-time teacher, guiding students through self-directed activity periods
   - Specialized in teaching strategic games such as chess and checkers
   - Led strategic game-based learning sessions for 20+ students weekly
   - Fostered independent learning during Montessori activity blocks
`;

export async function GET() {
  return NextResponse.json({ 
    content: CV_CONTENT,
    timestamp: new Date().toISOString()
  });
}
