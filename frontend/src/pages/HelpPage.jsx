import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSidebar } from "../contexts/SidebarProvider";

export default function HelpPage() {
  const { isCollapsed } = useSidebar();
  const [openItem, setOpenItem] = useState(null);

  const faqItems = [
    {
      question: "How can I get familiar with the work culture at Rezime?",
      answer:
        "At Rezime, we focus on creating a collaborative, transparent, and productive work environment. You'll start with an onboarding training to get acquainted with our company values, team dynamics, and project workflows.",
    },
    {
      question: "What is expected of me during the training sessions?",
      answer:
        "Training sessions are designed to familiarize you with Rezime's work culture, protocols, and tools. Attendance is important, and if you miss a session, please inform HR with a valid reason. Active participation will help you integrate seamlessly into the team.",
    },
    {
      question: "How can I report an absence from a training session?",
      answer:
        "If you're unable to attend a training session, please email HR at least 24 hours in advance, stating your name, department, and reason for absence. This helps us manage training schedules and ensures you're not left behind.",
    },
    {
      question: "What are the protocols for task management at Rezime?",
      answer:
        "At Rezime, we follow the QuadStep Task Completion Protocol. This ensures clear communication, task acknowledgment, progress tracking, and feedback to ensure efficient work and successful task completion.",
    },
    {
      question: "What tools are used to manage tasks and projects?",
      answer:
        "We use Rezime Workspace for managing tasks and tracking project progress. It’s integrated into your employee portal, where you can see task details, status updates, and project timelines.",
    },
    {
      question:
        "How does Rezime ensure quality and professionalism in its work?",
      answer:
        "Rezime adheres to industry standards, including ISO certification for quality management, secure email practices, and clearly defined task protocols. This ensures we maintain professionalism and high standards in everything we do.",
    },
    {
      question: "What is the process to access and utilize company resources?",
      answer:
        "Company resources, including project management tools, payroll documents, and communication tools, are accessible via your employee portal. Ensure you're familiar with the tools as part of your onboarding training.",
    },
    {
      question: "How can I request leave or report an absence during training?",
      answer:
        "For any leave requests or absences, please email HR at least 24 hours in advance. Ensure to provide your name, department, and reason for absence, especially if it’s related to training sessions.",
    },
    {
      question:
        "How do I stay updated on upcoming training sessions and initiatives?",
      answer:
        "Upcoming training sessions, company initiatives, and events are communicated via company email and posted on your employee portal. Be sure to check regularly to stay informed and engaged.",
    },
    {
      question:
        "How do I reset my email password if I have trouble accessing it?",
      answer:
        "If you have trouble accessing your company email, use the 'Forgot Password' feature on the login page. If you continue to experience issues, please contact IT support for immediate assistance.",
    },
    {
      question:
        "What is the policy on working hours and breaks during training?",
      answer:
        "During your training, you are expected to adhere to a 9-hour workday, which includes a 1-hour lunch break. Flexible working hours may be arranged with prior approval from your manager.",
    },
    {
      question:
        "How do I report any concerns or grievances regarding the training process?",
      answer:
        "If you have concerns during your training, whether about the content or your experience, please reach out to HR via email or use the anonymous reporting feature in the employee portal. Your feedback is important to us.",
    },
    {
      question:
        "How can I make sure I’m following the company's equipment usage policy?",
      answer:
        "Company equipment should only be used for official tasks. Ensure you follow all usage guidelines provided during your training. Report any damage or loss immediately to IT or admin.",
    },
    {
      question:
        "What should I do if I encounter technical issues during training?",
      answer:
        "If you experience technical issues during your training sessions, email the IT support team with a description of the problem and screenshots, if possible. They will assist you promptly to resolve the issue.",
    },
    {
      question:
        "How do I request a reference letter after completing my training?",
      answer:
        "Once you've completed your training and internship, you can request a reference letter by emailing your manager or HR with relevant details. Allow up to 5 business days for processing.",
    },
    {
      question: "How do I update my personal details in the employee portal?",
      answer:
        "To update your personal information, log into your employee portal and navigate to the 'Profile' section. Submit the required changes for approval or reach out to HR for assistance.",
    },
    {
      question:
        "Which email service does Rezime use for official communication?",
      answer:
        "Rezime uses Zoho Mail for email hosting. All employees receive secure, personalized email accounts for internal and external communication.",
    },
  ];

  return (
    <div
      className={`min-h-screen w-full transition-all duration-300 bg-[#1a1f2e] text-white font-sans px-4 pt-16 pb-5 ${
        isCollapsed ? "md:px-8" : "md:px-4 md:pl-64 md:pr-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Help Center</h1>

        <div className="bg-[#1e2536] rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-[#2a3241] last:border-b-0"
              >
                <button
                  onClick={() => setOpenItem(openItem === index ? null : index)}
                  className="w-full flex items-center justify-between py-4 text-left hover:text-gray-300 transition-colors duration-200"
                >
                  <span className="text-lg font-medium">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openItem === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {openItem === index && (
                  <div className="pb-4 text-[#8b95a9] animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1e2536] rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-[#8b95a9]">HR Department:</p>
              <p className="text-white">hr@rezime.in</p>
            </div>
            <div>
              <p className="text-[#8b95a9]">General Inquiries:</p>
              <p className="text-white">info@rezime.in</p>
            </div>
            <div>
              <p className="text-[#8b95a9]">Technical Support:</p>
              <p className="text-white">support@rezime.in</p>
            </div>
            <div>
              <p className="text-[#8b95a9]">Finance Department:</p>
              <p className="text-white">finance@rezime.in</p>
            </div>
            <div>
              <p className="text-[#8b95a9]">IT Support:</p>
              <p className="text-white">it@rezime.in</p>
            </div>
            <div>
              <p className="text-[#8b95a9]">Marketing Department:</p>
              <p className="text-white">marketing@rezime.in</p>
            </div>
            <div>
              <p className="text-[#8b95a9]">Operations Department:</p>
              <p className="text-white">operations@rezime.in</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1e2536] rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
          <p className="text-[#8b95a9]">
            If you couldn't find the answer to your question, please don't
            hesitate to reach out to our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
