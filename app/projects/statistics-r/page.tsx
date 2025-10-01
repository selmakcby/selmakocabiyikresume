export default function StatisticsR() {
  return (
    <main className="min-h-screen p-8 space-y-24">
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          Statistics & R Projects
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Statistical Analysis Assignments using R Programming
        </p>
      </section>

      <section className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-200">
            A series of statistical analysis assignments completed using R programming language. 
            These projects demonstrate proficiency in statistical methods, data visualization, 
            and statistical computing for data analysis and interpretation.
          </p>
          
          <h3 className="text-xl font-semibold">Key Technologies</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li>R Programming</li>
            <li>Statistical Analysis</li>
            <li>Data Visualization</li>
            <li>Statistical Computing</li>
            <li>Hypothesis Testing</li>
          </ul>

          <h3 className="text-xl font-semibold">Assignments</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-black/10 dark:border-white/20 rounded-lg">
              <span className="font-medium">Assignment 1</span>
              <a 
                href="/projects/statistics-assignment-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF →
              </a>
            </div>
            <div className="flex justify-between items-center p-3 border border-black/10 dark:border-white/20 rounded-lg">
              <span className="font-medium">Assignment 2</span>
              <a 
                href="/projects/statistics-assignment-2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF →
              </a>
            </div>
            <div className="flex justify-between items-center p-3 border border-black/10 dark:border-white/20 rounded-lg">
              <span className="font-medium">Assignment 3</span>
              <a 
                href="/projects/statistics-assignment-3.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
