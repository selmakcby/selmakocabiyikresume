export default function AILawEthics() {
  return (
    <main className="min-h-screen p-8 space-y-24">
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          AI and Law & Ethics
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Evolutionary Algorithm Model
        </p>
      </section>

      <section className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-200">
            This project examines the intersection of artificial intelligence, law, and ethics through 
            the development and analysis of evolutionary algorithm models. The work explores how AI systems 
            can be designed and implemented while considering legal and ethical implications.
          </p>
          
          <h3 className="text-xl font-semibold">Key Technologies</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li>Evolutionary Algorithms</li>
            <li>AI Ethics</li>
            <li>Legal AI</li>
            <li>Algorithmic Fairness</li>
            <li>Ethical AI Design</li>
          </ul>

          <div className="pt-6">
            <a 
              href="/projects/ai-law-ethics.pdf"
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
