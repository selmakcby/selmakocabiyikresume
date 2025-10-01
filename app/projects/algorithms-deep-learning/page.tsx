export default function AlgorithmsDeepLearning() {
  return (
    <main className="min-h-screen p-8 space-y-24">
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          Algorithms & Deep Learning
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Neural Networks, Optimization, and Evolutionary Algorithms
        </p>
      </section>

      <section className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-200">
            A comprehensive collection of projects covering advanced algorithms and deep learning techniques. 
            These projects explore neural networks, optimization algorithms, evolutionary algorithms, 
            and neuroevolution approaches to solving complex computational problems.
          </p>
          
          <h3 className="text-xl font-semibold">Key Technologies</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li>Neural Networks</li>
            <li>Deep Learning</li>
            <li>Optimization Algorithms</li>
            <li>Evolutionary Algorithms</li>
            <li>Neuroevolution</li>
            <li>Reinforcement Learning</li>
          </ul>

          <h3 className="text-xl font-semibold">Projects</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-black/10 dark:border-white/20 rounded-lg">
              <span className="font-medium">Neural Networks</span>
              <a 
                href="/projects/neural-networks.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF →
              </a>
            </div>
            <div className="flex justify-between items-center p-3 border border-black/10 dark:border-white/20 rounded-lg">
              <span className="font-medium">Optimization</span>
              <a 
                href="/projects/optimization.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF →
              </a>
            </div>
            <div className="flex justify-between items-center p-3 border border-black/10 dark:border-white/20 rounded-lg">
              <span className="font-medium">Evolutionary Algorithms</span>
              <a 
                href="/projects/evolutionary-algorithms.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF →
              </a>
            </div>
            <div className="flex justify-between items-center p-3 border border-black/10 dark:border-white/20 rounded-lg">
              <span className="font-medium">Neuroevolution</span>
              <a 
                href="/projects/neuroevolution.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF →
              </a>
            </div>
            <div className="flex justify-between items-center p-3 border border-black/10 dark:border-white/20 rounded-lg">
              <span className="font-medium">Reinforcement Learning</span>
              <a 
                href="/projects/reinforcement-learning.pdf"
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
