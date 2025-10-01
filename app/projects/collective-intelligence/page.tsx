export default function CollectiveIntelligence() {
  return (
    <main className="min-h-screen p-8 space-y-24">
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          Collective Intelligence
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Energy Level and Population Size Analysis
        </p>
      </section>

      <section className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-200">
            This project explores collective intelligence concepts through the analysis of energy levels 
            and population size dynamics. The study examines how group behavior and collective decision-making 
            processes are influenced by various factors including energy distribution and population characteristics.
          </p>
          
          <h3 className="text-xl font-semibold">Key Technologies</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li>Collective Intelligence</li>
            <li>Population Dynamics</li>
            <li>Energy Analysis</li>
            <li>Group Behavior Modeling</li>
            <li>Statistical Analysis</li>
          </ul>

          <div className="pt-6">
            <a 
              href="/projects/collective-intelligence.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition font-medium"
            >
              View Full Report PDF →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
