export default function MachineLearning() {
  return (
    <main className="min-h-screen p-8 space-y-24">
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          Machine Learning Project
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Exploration of Predictive Machine Learning Models on Video Game Dataset
        </p>
      </section>

      <section className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-200">
            This project involved exploring and implementing various predictive machine learning models 
            on a video game dataset. The study compares different algorithms and their performance 
            in predicting game-related outcomes and player behavior patterns.
          </p>
          
          <h3 className="text-xl font-semibold">Key Technologies</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li>Machine Learning Algorithms</li>
            <li>Data Analysis</li>
            <li>Predictive Modeling</li>
            <li>Video Game Analytics</li>
            <li>Python & ML Libraries</li>
          </ul>

          <div className="pt-6">
            <a 
              href="/projects/machine-learning.pdf"
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
