import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const listeningData = [
  {
    id: 1,
    title: "Section 1",
    duration: "5 mins",
    questions: [
      { id: 1, question: "What is the main topic of the conversation?", answer: "Booking a hotel" },
      { id: 2, question: "What time is the meeting scheduled?", answer: "10 AM" },
    ],
  },
  {
    id: 2,
    title: "Section 2",
    duration: "15 mins",
    questions: [
      { id: 1, question: "Who is speaking in the conversation?", answer: "A manager" },
      { id: 2, question: "Where is the meeting happening?", answer: "Conference room" },
    ],
  },
  {
    id: 3,
    title: "Section 3",
    duration: "30 mins",
    questions: [
      { id: 1, question: "What is being discussed?", answer: "Project deadline" },
      { id: 2, question: "When is the deadline?", answer: "Friday" },
    ],
  },
  {
    id: 4,
    title: "Section 4",
    duration: "1 hour",
    questions: [
      { id: 1, question: "What is the purpose of the call?", answer: "Team update" },
      { id: 2, question: "Who is absent from the meeting?", answer: "John" },
    ],
  },
];

const Listening = () => {
  const { skillName } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [unlockedSections, setUnlockedSections] = useState([1]); // Section 1 unlocked by default

  const handleChange = (sectionId, questionId, value) => {
    const key = `${sectionId}-${questionId}`;
    setUserAnswers({ ...userAnswers, [key]: value });
  };

  const handleSubmit = (sectionId) => {
    const section = listeningData.find((s) => s.id === sectionId);
    const newFeedback = { ...feedback };

    section.questions.forEach((q) => {
      const key = `${section.id}-${q.id}`;
      newFeedback[key] =
        userAnswers[key]?.trim().toLowerCase() === q.answer.toLowerCase()
          ? "correct"
          : "wrong";
    });

    setFeedback(newFeedback);
  };

  const handleDone = (sectionId) => {
    // Unlock next section
    if (sectionId < listeningData.length) {
      setUnlockedSections((prev) => [...new Set([...prev, sectionId + 1])]);
    }

    // If it's the last section → mark listening as completed
    if (sectionId === listeningData.length) {
      const completedSteps =
        JSON.parse(localStorage.getItem(`${skillName}-completed`)) || [];
      const newCompleted = [...new Set([...completedSteps, 21])]; // Listening ID
      localStorage.setItem(`${skillName}-completed`, JSON.stringify(newCompleted));
      navigate(`/lessons/${skillName}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6 overflow-y-auto">
       {/* Back Button */}
            <div>
                <Button variant="ghost" onClick={handleBack} className="group border-0">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-pixel text-[0.65rem]">BACK</span>
                </Button>
            </div>
      <h1 className="text-3xl font-pixel mb-8 animate-glow text-center">
        🎧 Listening Practice
      </h1>

      <div className="w-full max-w-2xl space-y-12">
        {listeningData.map((section, sectionIndex) => {
          const isUnlocked = unlockedSections.includes(section.id);

          return (
            <div
              key={section.id}
              className={`p-6 rounded-2xl shadow-md border transition-all duration-500 ${
                isUnlocked
                  ? "bg-white/10 border-gray-400"
                  : "bg-gray-900/40 border-gray-700 opacity-60 pointer-events-none"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-400 mb-4">⏱ Duration: {section.duration}</p>

              {isUnlocked ? (
                <div className="space-y-4">
                  {section.questions.map((q) => {
                    const key = `${section.id}-${q.id}`;
                    return (
                      <div key={key} className="flex flex-col space-y-1">
                        <label className="font-bold">{q.question}</label>
                        <input
                          type="text"
                          value={userAnswers[key] || ""}
                          onChange={(e) =>
                            handleChange(section.id, q.id, e.target.value)
                          }
                          className="p-2 rounded border border-[hsl(var(--border))] bg-white text-black"
                        />
                        {feedback[key] && (
                          <span
                            className={`font-bold ${
                              feedback[key] === "correct"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {feedback[key] === "correct"
                              ? "Correct ✅"
                              : `Wrong ❌ (Answer: ${q.answer})`}
                          </span>
                        )}
                      </div>
                    );
                  })}

                  <div className="flex mt-6 space-x-4">
                    {!section.questions.some(
                      (q) => feedback[`${section.id}-${q.id}`]
                    ) && (
                      <Button
                        onClick={() => handleSubmit(section.id)}
                        className="px-6 py-2 rounded-full font-pixel hover:scale-105 transition-all"
                      >
                        Submit
                      </Button>
                    )}

                    {section.questions.every(
                      (q) => feedback[`${section.id}-${q.id}`]
                    ) && (
                      <Button
                        onClick={() => handleDone(section.id)}
                        className="px-6 py-2 rounded-full font-pixel bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:scale-105 transition-all"
                      >
                        {section.id === listeningData.length
                          ? "Finish 🎉"
                          : "Done →"}
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  🔒 Complete the previous section to unlock this one.
                </p>
              )}

              {sectionIndex !== listeningData.length - 1 && (
                <hr className="mt-8 border-t border-gray-500 opacity-40" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listening;
