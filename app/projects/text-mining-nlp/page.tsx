export default function TextMiningNLP() {
  return (
    <main className="min-h-screen p-8 space-y-24">
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          Text Mining & NLP
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Natural Language Processing Poster
        </p>
      </section>

      <section className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-200">
            This project focuses on text mining and natural language processing techniques. 
            The work demonstrates understanding of NLP methods, text analysis, and the application 
            of machine learning techniques to process and understand human language.
          </p>
          
          <h3 className="text-xl font-semibold">Key Technologies</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li>Natural Language Processing</li>
            <li>Text Mining</li>
            <li>Text Analysis</li>
            <li>Machine Learning for NLP</li>
            <li>Language Models</li>
          </ul>

          <div className="pt-6">
            <a 
              href="/projects/nlp-poster.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition font-medium"
            >
              View NLP Poster PDF →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
