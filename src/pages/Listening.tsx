import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";

const listeningData = [
  {
    id: 1,
    title: "Section 1 - Hotel Booking",
    duration: "5 mins",
    audioText: "Good morning, I'd like to book a hotel room for next weekend. Yes, we have availability. What time would you like to check in? Around 10 AM would be perfect.",
    questions: [
      { id: 1, question: "What is the main topic of the conversation?", answer: "Booking a hotel" },
      { id: 2, question: "What time is the meeting scheduled?", answer: "10 AM" },
    ],
  },
  {
    id: 2,
    title: "Section 2 - Manager's Meeting",
    duration: "15 mins",
    audioText: "Hello everyone, this is your manager speaking. Today we'll be discussing the quarterly results in the conference room. Please make sure to bring your reports.",
    questions: [
      { id: 1, question: "Who is speaking in the conversation?", answer: "A manager" },
      { id: 2, question: "Where is the meeting happening?", answer: "Conference room" },
    ],
  },
  {
    id: 3,
    title: "Section 3 - Project Deadline",
    duration: "30 mins",
    audioText: "We need to talk about the project deadline. The client expects everything to be completed by Friday. Make sure all deliverables are ready.",
    questions: [
      { id: 1, question: "What is being discussed?", answer: "Project deadline" },
      { id: 2, question: "When is the deadline?", answer: "Friday" },
    ],
  },
  {
    id: 4,
    title: "Section 4 - Team Update Call",
    duration: "1 hour",
    audioText: "Good afternoon team. This is our weekly team update call. I notice John is absent today. Let's proceed with the agenda and catch him up later.",
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
  const [unlockedSections, setUnlockedSections] = useState([1]);
  const [playingSection, setPlayingSection] = useState(null);
  const [listenedSections, setListenedSections] = useState(new Set());
  
  const speechSynthesis = window.speechSynthesis;

  const handleChange = (sectionId, questionId, value) => {
    const key = `${sectionId}-${questionId}`;
    setUserAnswers({ ...userAnswers, [key]: value });
  };

  const handlePlayAudio = (sectionId, audioText) => {
    // Stop any currently playing audio
    speechSynthesis.cancel();

    if (playingSection === sectionId) {
      setPlayingSection(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(audioText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setPlayingSection(null);
      setListenedSections(prev => new Set([...prev, sectionId]));
    };

    utterance.onerror = () => {
      setPlayingSection(null);
    };

    setPlayingSection(sectionId);
    speechSynthesis.speak(utterance);
  };

  const handleReplayAudio = (sectionId, audioText) => {
    speechSynthesis.cancel();
    setPlayingSection(null);
    setTimeout(() => handlePlayAudio(sectionId, audioText), 100);
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
    if (sectionId < listeningData.length) {
      setUnlockedSections((prev) => [...new Set([...prev, sectionId + 1])]);
    }

    if (sectionId === listeningData.length) {
      const completedSteps =
        JSON.parse(localStorage.getItem(`${skillName}-completed`)) || [];
      const newCompleted = [...new Set([...completedSteps, 21])];
      localStorage.setItem(`${skillName}-completed`, JSON.stringify(newCompleted));
      navigate(`/lessons/${skillName}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6 overflow-y-auto">
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
          const hasListened = listenedSections.has(section.id);

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
                  {/* Audio Player Section */}
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-4 rounded-xl border border-purple-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">🎵 Audio Clip</span>
                      {hasListened && (
                        <span className="text-xs text-green-400">✓ Listened</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handlePlayAudio(section.id, section.audioText)}
                        className="flex items-center gap-2 flex-1"
                        variant={playingSection === section.id ? "destructive" : "default"}
                      >
                        {playingSection === section.id ? (
                          <>
                            <Pause className="h-4 w-4" />
                            Stop
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            Play Audio
                          </>
                        )}
                      </Button>
                      {hasListened && (
                        <Button
                          onClick={() => handleReplayAudio(section.id, section.audioText)}
                          variant="outline"
                          className="px-3"
                          title="Replay"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-4 mt-6">
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
                            placeholder="Type your answer here..."
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
                  </div>

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