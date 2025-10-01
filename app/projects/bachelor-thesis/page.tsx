export default function BachelorThesis() {
  return (
    <main className="min-h-screen p-8 space-y-24">
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          Bachelor Thesis
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Enhancing Workflow Automation with MCP and Claude AI
        </p>
      </section>

      <section className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-200">
            This bachelor thesis project explores the integration of Model Context Protocol (MCP) with Claude AI 
            to enhance workflow automation capabilities. The project demonstrates how LLMs can be connected with 
            various tools and workflows to create more intelligent and context-aware automation systems.
          </p>
          
          <h3 className="text-xl font-semibold">Key Technologies</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li>Model Context Protocol (MCP)</li>
            <li>Claude AI</li>
            <li>Workflow Automation</li>
            <li>n8n Platform</li>
            <li>B2B Data Enrichment</li>
          </ul>

          <div className="pt-6">
            <a 
              href="/projects/bachelor-thesis.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition font-medium"
            >
              View Full Thesis PDF →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
