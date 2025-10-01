'use client';

import Link from 'next/link';
import InlineChatBot from './components/InlineChatBot';

export default function Home() {
  return (
    <>
      <main className="min-h-screen p-8 space-y-24">
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Welcome to Selma Kocabıyık's AI Portfolio
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>
        <div className="space-y-3">
          <p className="text-xl sm:text-2xl text-purple-700 dark:text-purple-300 font-medium">
            AI & Data Engineer
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Data Analysis, Data Cleaning, Machine Learning, LLMs, NLP, RAG Systems and Business Automation
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Professional Portfolio & Resume
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto space-y-8" id="application-materials">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-200">Application Materials</h2>
          <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Explore my personal story and professional background</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="/about">
            <div className="font-medium text-purple-900 dark:text-purple-100">About Me</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Personal story, journey, and interests</div>
          </Link>
          <Link className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition" href="/cv">
            <div className="font-medium text-purple-900 dark:text-purple-100">Curriculum Vitae</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Complete career, education & projects</div>
          </Link>
          <Link className="rounded-lg bg-purple-600 dark:bg-purple-700 border border-purple-600 dark:border-purple-700 p-4 hover:bg-purple-700 dark:hover:bg-purple-600 transition" href="/motivation">
            <div className="font-medium text-white">Motivation Letter</div>
            <div className="text-sm text-purple-100">General cover letter for applications</div>
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto space-y-6" id="why-fit">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-200">Why I'm a Great Candidate</h2>
          <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-8 rounded-r-lg">
          <p className="text-gray-700 dark:text-gray-200 mt-4">
            As an AI & Data Engineer with experience in LLMs, NLP, and RAG systems, I bring a unique perspective to data analysis and automation. 
            My background in building scalable data pipelines and automation systems enables me to transform complex processes into 
            clear, actionable insights that drive business growth and efficiency.
          </p>
          <div className="mt-4">
            <a className="text-purple-600 hover:text-purple-700 dark:text-purple-400 hover:underline font-medium" href="/cv">Read more about my experience →</a>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto space-y-8" id="contact">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-200">Contact</h2>
          <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 dark:text-gray-300">Email:</p>
            <a href="mailto:selmabiyik@icloud.com" className="font-medium hover:underline">selmabiyik@icloud.com</a>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300">Email (Alternative):</p>
            <a href="mailto:selmabiyik222@gmail.com" className="font-medium hover:underline">selmabiyik222@gmail.com</a>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300">Location:</p>
            <p className="font-medium">Amsterdam, Netherlands</p>
          </div>
          <div className="flex space-x-4 pt-4">
            <a 
              href="https://www.linkedin.com/in/selma-kocabıyık-12b445264/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn →
            </a>
            <a 
              href="https://www.youtube.com/@selmaakocabiyik" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:underline"
            >
              YouTube →
            </a>
          </div>
        </div>
      </section>

    </main>

    {/* Inline ChatBot */}
    <InlineChatBot 
      pageContext="Portfolio and Background"
      pageSpecificQuestions={[
        "What's her background in AI and data engineering?",
        "Tell me about her impressive MCP expertise and thesis work",
        "What programming languages and frameworks does she master?",
        "What makes her an outstanding candidate for tech roles?",
        "What's her experience with machine learning?"
      ]}
    />
    </>
  );
}
