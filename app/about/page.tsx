export default function AboutPage() {
  return (
    <main className="min-h-screen p-8 space-y-24">
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            About Me
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto space-y-6" id="bio">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-200">My Journey</h2>
          <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
        </div>
        <p className="text-gray-700 dark:text-gray-200">
          I'm Selma, a 22-year-old passionate AI engineer with a love for building systems that make complex data more useful and accessible. Today, I spend most of my time experimenting with AI tools, designing automation workflows, and exploring how technology can solve real-world problems.
        </p>
        <p className="text-gray-700 dark:text-gray-200">
          My journey started when I moved to the Netherlands during my teenage years, an experience that shaped who I am both personally and professionally. I completed VWO, worked hard to master Dutch, and later joined an exchange program that opened my eyes to new cultures, ideas, and people from all around the world. Along the way, I discovered how much I enjoy connecting with others, whether through socializing, content creation, or cross-cultural collaboration.
        </p>
        <p className="text-gray-700 dark:text-gray-200">
          I've always been fascinated by technology and AI. From an early age, I dreamed of building my own intelligent systems, maybe even a robot powered by an LLM one day. I love diving into new AI tools, constantly experimenting and learning through trial and error. For me, it's not just about the technical challenge; it's about the fun and fulfillment of shaping ideas into working systems.
        </p>
        <p className="text-gray-700 dark:text-gray-200">
          Outside of coding, I recharge by playing piano, creating art and paintings, reading, and running. I also love traveling and taking photos, capturing moments and experiences that inspire me. These creative and physical outlets give me balance and often inspire fresh perspectives that I bring back into my technical projects.
        </p>
      </section>



      <section className="max-w-3xl mx-auto space-y-6" id="documents">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-200">Application Documents</h2>
          <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="/cv">
            <div className="font-medium text-purple-900 dark:text-purple-100">Curriculum Vitae</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Complete professional profile and experience</div>
          </a>
          <a className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="/motivation">
            <div className="font-medium text-purple-900 dark:text-purple-100">Motivation Letter</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Personalized cover letter for Adyen</div>
          </a>
          <a className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="https://github.com/selmakcby" target="_blank" rel="noreferrer">
            <div className="font-medium text-purple-900 dark:text-purple-100">GitHub Portfolio</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Code repositories and projects</div>
          </a>
        </div>
      </section>
    </main>
  );
}
