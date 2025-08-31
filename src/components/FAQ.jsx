import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How do I book an online consultation?",
    answer: "Booking an online consultation is simple! Just click on the 'Book Appointment' button, select your preferred doctor and time slot, provide your basic information, and make the payment. You'll receive a confirmation email with the video call link.",
  },
  {
    question: "Is my medical data secure and private?",
    answer: "Absolutely! We use bank-level encryption and comply with HIPAA regulations to ensure your medical data is completely secure. All consultations are confidential, and your personal health information is stored in our secure Health Vault with multi-layer protection.",
  },
  {
    question: "What types of medical reports can be analyzed?",
    answer: "Our AI-powered system can analyze various medical reports including blood tests, MRI scans, CT scans, X-rays, ECGs, and lab reports. The system provides detailed insights and recommendations, but always consult with a healthcare professional for final diagnosis.",
  },
  {
    question: "How does the AI chatbot work for medical queries?",
    answer: "Our AI virtual assistant is trained on medical knowledge and can provide initial guidance for common health concerns, medication information, and symptom assessment. However, it's designed to supplement, not replace, professional medical advice. For serious conditions, we recommend consulting with our doctors.",
  },
  {
    question: "What should I do in case of a medical emergency?",
    answer: "For life-threatening emergencies, always call 911 or visit the nearest emergency room immediately. Our platform offers 24/7 emergency support for urgent but non-life-threatening situations, and our real-time facility tracking can help you find the nearest healthcare facility.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our healthcare platform and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 transform hover:shadow-xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 py-5 text-left font-semibold text-xl text-gray-800 transition-colors duration-300"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-4">
            Still have questions? We're here to help!
          </p>
          <button
            className="px-8 py-3 bg-medical-primary text-black rounded-full font-semibold shadow-lg hover:bg-medical-primary/90 transition-all duration-300 transform hover:scale-105"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;