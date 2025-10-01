'use client';

import InlineChatBot from '../components/InlineChatBot';

export default function CV() {

  return (
    <>
      <main className="min-h-screen p-8 space-y-24">
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Curriculum Vitae
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto space-y-6">
          
          <div className="space-y-8">
            <section>
              <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Personal Information</h2>
                <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Name:</p>
                  <p className="font-medium">Selma Kocabıyık</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Location:</p>
                  <p className="font-medium">Barendrecht, Netherlands</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">GitHub:</p>
                  <a href="https://github.com/selmakcby" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">github.com/selmakcby</a>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Hugging Face:</p>
                  <a href="https://huggingface.co/kcbkS" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">huggingface.co/kcbkS</a>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Replicate:</p>
                  <a href="https://replicate.com/selmakcby" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">replicate.com/selmakcby</a>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">LinkedIn:</p>
                  <a href="https://www.linkedin.com/in/selma-kocabıyık-12b445264/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">linkedin.com/in/selma-kocabıyık-12b445264</a>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">YouTube:</p>
                  <a href="https://www.youtube.com/@selmaakocabiyik" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">youtube.com/@selmaakocabiyik</a>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Specialization:</p>
                  <p className="font-medium">AI & Data Engineer | LLMs, NLP, RAG Systems & Business Automation</p>
                </div>
              </div>
            </section>

            <section>
              <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Professional Summary</h2>
                <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
              </div>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Bachelor of Artificial Intelligence graduate from VU Amsterdam with hands-on experience in AI development, automation, and data analysis. Skilled in Python, SQL, BI tools, and automation platforms (n8n, MCP), with a proven ability to turn complex datasets into scalable systems and actionable insights.
              </p>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mt-4">
                At Floorplanner, I worked as a Junior AI Developer, where I designed Retrieval-Augmented Generation (RAG) pipelines, created hierarchical data structuring strategies, and prototyped ML models to improve search and automation for millions of design records. At CoreMagnet, I implemented MCP-based LLM integrations for business automation, connecting Claude AI and other LLMs with n8n workflows to streamline B2B processes. Earlier, at Arpsar, I built Python-based pipelines for large-scale scraping, cleaning, and app development, improving dataset quality for dashboards and decision support.
              </p>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mt-4">
                Through these roles I've gained not only technical expertise, but also life-changing experiences, new perspectives, and opportunities to grow — from learning to collaborate with diverse teams to pushing the boundaries of how AI can be applied in real-world systems. These experiences have shaped my passion for applying AI and data science to practical domains, especially financial data analysis and business intelligence, where thoughtful system design can deliver measurable impact.
              </p>
            </section>

            <section>
              <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Experience</h2>
                <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Junior AI Developer — Floorplanner (2025)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Designed and optimized Retrieval-Augmented Generation (RAG) pipelines for large-scale design datasets.
                  </p>
                  <ul className="mt-2 text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Developed hierarchical chunking strategies (project → floor → room → items) for efficient data structuring and retrieval</li>
                    <li>• Prototyped ML models for semantic search and product-in-room generation, improving usability of design metadata</li>
                    <li>• Collaborated with engineers to enhance scalability, automation, and AI-assisted workflows</li>
                    <li>• Gained practical knowledge in team-based development, agile collaboration, and cross-functional problem solving</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">AI Engineer Intern (Bachelor Thesis) — CoreMagnet (2025)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Implemented Model Context Protocol (MCP) to connect LLMs with n8n workflows.
                  </p>
                  <ul className="mt-2 text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Automated B2B data enrichment and sales processes, reducing manual workload and improving workflow efficiency</li>
                    <li>• Conducted comparative evaluation of MCP vs. API-based workflows for scalability and usability</li>
                    <li>• Integrated Claude AI and other LLMs with automation platforms to deliver context-aware, scalable solutions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Data Intern — Arpsar (2023–2024)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Built Python pipelines for large-scale data scraping and cleaning using BeautifulSoup, Pandas, and other libraries.
                  </p>
                  <ul className="mt-2 text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Improved dataset consistency and usability, enabling downstream dashboards and business applications</li>
                    <li>• Deployed apps with cleaned datasets using Vercel and Python backends</li>
                    <li>• Strengthened skills in ETL processes, automation, and data preparation for decision support</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Education</h2>
                <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Vrije Universiteit Amsterdam (VU Amsterdam)</h3>
                  <p className="text-gray-600 dark:text-gray-300">BSc Artificial Intelligence (Aug 2022 – Jul 2025)</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Korea University</h3>
                  <p className="text-gray-600 dark:text-gray-300">Exchange, Computer and Information Sciences (Aug 2024 – Dec 2024)</p>
                </div>
              </div>
            </section>

            <section>
              <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Technical Skills</h2>
                <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="font-medium">Programming Languages</p>
                  <p className="text-gray-600 dark:text-gray-300">Python, SQL, JavaScript, R</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">AI/ML Technologies</p>
                  <p className="text-gray-600 dark:text-gray-300">LLMs, NLP, RAG Systems, PyTorch, Transformers</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Data & Analytics</p>
                  <p className="text-gray-600 dark:text-gray-300">Pandas, NumPy, Scikit-learn, Data Visualization, BI Tools</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Automation & Workflows</p>
                  <p className="text-gray-600 dark:text-gray-300">n8n, Model Context Protocol (MCP), API Integration</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Data Engineering</p>
                  <p className="text-gray-600 dark:text-gray-300">Data Pipelines, ETL/ELT, Data Cleaning, Large-scale Data Processing</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Tools & Platforms</p>
                  <p className="text-gray-600 dark:text-gray-300">Git, Docker, Cloud Platforms, Database Management</p>
                </div>
              </div>
            </section>

            <section>
              <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Languages</h2>
                <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">English</span>
                  <span className="text-gray-600 dark:text-gray-300">C1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Dutch</span>
                  <span className="text-gray-600 dark:text-gray-300">C1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Turkish</span>
                  <span className="text-gray-600 dark:text-gray-300">C2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Korean</span>
                  <span className="text-gray-600 dark:text-gray-300">A2</span>
                </div>
              </div>
            </section>

            <section>
              <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Academic Projects</h2>
                <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Key projects from my Bachelor's in Artificial Intelligence at VU Amsterdam:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="/projects/bachelor-thesis">
                  <div className="font-medium text-purple-900 dark:text-purple-100">Bachelor Thesis</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Enhancing Workflow Automation with MCP and Claude AI</div>
                </a>
                <a className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="/projects/machine-learning">
                  <div className="font-medium text-purple-900 dark:text-purple-100">Machine Learning</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Predictive ML Models on Video Game Dataset</div>
                </a>
                <a className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="/projects/statistics-r">
                  <div className="font-medium text-purple-900 dark:text-purple-100">Statistics & R</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Statistical Analysis Assignments (3 projects)</div>
                </a>
                <a className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="/projects/algorithms-deep-learning">
                  <div className="font-medium text-purple-900 dark:text-purple-100">Algorithms & Deep Learning</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Neural Networks, Optimization, Evolutionary Algorithms</div>
                </a>
                <a className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="/projects/text-mining-nlp">
                  <div className="font-medium text-purple-900 dark:text-purple-100">Text Mining & NLP</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Natural Language Processing Poster</div>
                </a>
                <a className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="/projects/collective-intelligence">
                  <div className="font-medium text-purple-900 dark:text-purple-100">Collective Intelligence</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Energy Level and Population Size Analysis</div>
                </a>
                <a className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="/projects/ai-law-ethics">
                  <div className="font-medium text-purple-900 dark:text-purple-100">AI and Law & Ethics</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Evolutionary Algorithm Model</div>
                </a>
              </div>
            </section>

            <section>
              <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Additional Experience</h2>
                <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">School Coach — Stip Studentenplatform (Sep 2023 – Jul 2024)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Coached high school students in strategic board games such as chess and checkers, helping develop analytical thinking and problem-solving skills.
                  </p>
                  <ul className="mt-2 text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Provided academic mentoring and study support to university students</li>
                    <li>• Helped students with coursework planning, time management, and effective learning strategies</li>
                    <li>• Delivered workshops on time management and study techniques, boosting engagement and retention among struggling students</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Teaching Assistant — Kiem Montessori Amsterdam (Oct 2022 – May 2023)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Assisted in classroom activities and supported teachers in daily lesson delivery, providing individual attention to students.
                  </p>
                  <ul className="mt-2 text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Worked as a part-time teacher, guiding students through self-directed activity periods where they engaged in various educational games</li>
                    <li>• Specialized in teaching strategic games such as chess and checkers, focusing on enhancing their analytical and critical thinking skills</li>
                    <li>• Led strategic game-based learning sessions for 20+ students weekly, using chess and checkers to develop logic, pattern recognition, and decision-making skills</li>
                    <li>• Fostered independent learning during Montessori activity blocks, encouraging curiosity, patience, and critical thinking</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
      </section>

    </main>

    {/* Inline ChatBot */}
    <InlineChatBot 
      pageContext="CV and Professional Experience"
      pageSpecificQuestions={[
        "What are her key technical skills?",
        "Tell me about her MCP thesis work at CoreMagnet",
        "What experience does she have with RAG systems?",
        "What programming languages does she master?",
        "Tell me about her Floorplanner experience"
      ]}
    />
    </>
  );
}
