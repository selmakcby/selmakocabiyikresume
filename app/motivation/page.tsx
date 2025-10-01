'use client';

import { useState } from 'react';
import PageChatBot from '../components/PageChatBot';

export default function Motivation() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen p-8 space-y-24">
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Motivation Letter
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto space-y-6">
          
          <div className="space-y-6 text-gray-700 dark:text-gray-200 leading-relaxed">
            <p>
              Dear Hiring Team,
            </p>
            
            <p>
              I am excited to apply for this position and contribute my expertise in AI, data engineering, and automation. 
              What motivates me most is the opportunity to work at the intersection of technology and business impact, where 
              precision, scale, and innovation directly drive growth and efficiency.
            </p>
            
            <p>
              Coming from a background in Artificial Intelligence and data systems, I have experienced firsthand how thoughtful 
              automation and well-designed data pipelines can transform complex processes into something clear and actionable. 
              My passion lies in turning intricate operations into insights and automation that empower teams to make 
              data-driven decisions and focus on strategic initiatives.
            </p>
            
            <p>
              For me, this represents a genuine career aspiration where my technical expertise in Python, SQL, BI tools, and 
              automation can bring immediate value while allowing me to grow in domains I'm deeply interested in. I'm particularly 
              fascinated by how AI can enhance data analysis through anomaly detection, intelligent dashboards, and AI-powered 
              assistants that help teams navigate complex datasets with ease.
            </p>
            
            <p>
              What excites me about this opportunity is the scale and responsibility of the work. The idea of contributing to 
              systems that directly impact business operations and enable real-time decision making is both inspiring and motivating. 
              I thrive in environments that value innovation, operational excellence, and continuous learning.
            </p>
            
            <p>
              I am eager to bring my technical skills, enthusiasm for learning, and drive for meaningful impact to your team. 
              I believe my combination of analytical thinking, technical expertise, and passion for automation makes me a strong 
              candidate who can contribute from day one while continuing to grow and develop.
            </p>
            
            <p>
              Thank you for considering my application. I would be thrilled to contribute my curiosity, energy, and technical 
              expertise to your team.
            </p>
            
            <p>
              Best regards,<br />
              Selma Kocabıyık
            </p>
          </div>
      </section>

      {/* AI Assistant Button */}
      <section className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="hidden group-hover:block text-sm font-medium">Ask about my motivation</span>
        </button>
      </section>
    </main>

    {/* PageChatBot Modal */}
    <PageChatBot 
      isOpen={isChatOpen} 
      onClose={() => setIsChatOpen(false)}
      pageContext="Motivation Letter and Career Goals"
      pageSpecificQuestions={[
        "What drives her passion for AI and data engineering?",
        "Why is she interested in this field?",
        "What are her career aspirations?",
        "How does she approach problem-solving?",
        "What makes her a unique candidate?"
      ]}
    />
    </>
  );
}
