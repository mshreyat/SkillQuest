import { useNavigate } from "react-router-dom";
import { QuestCard } from "@/components/QuestCard";
import { GraduationCap, BookOpen, Scroll } from "lucide-react";

const Education = () => {
  const navigate = useNavigate();

  const educationLevels = [
    {
      id: "12th",
      title: "12th Student",
      icon: BookOpen,
      level: "12th",
    },
    {
      id: "undergraduate",
      title: "Undergraduate",
      icon: GraduationCap,
      level: "undergraduate",
    },
    {
      id: "postgraduate",
      title: "Postgraduate",
      icon: Scroll,
      level: "postgraduate",
    },
  ];

  const handleSelect = (level: string) => {
    navigate(`/skills?level=${level}`);
  };

  return (
    <div className="min-h-screen bg-gradient-quest p-8 relative overflow-hidden">
      {/* Pixel decorative game elements */}
      <div className="absolute top-20 left-20 text-6xl animate-pixel-bounce text-primary">⭐</div>
      <div className="absolute top-40 right-32 text-5xl animate-glow text-secondary" style={{ animationDelay: '0.5s' }}>🏆</div>
      <div className="absolute bottom-32 left-40 text-7xl animate-flicker text-accent" style={{ animationDelay: '1s' }}>💎</div>
      <div className="absolute bottom-20 right-20 text-6xl animate-pixel-bounce text-pixel-orange" style={{ animationDelay: '1.5s' }}>🎯</div>
      <div className="absolute top-1/2 left-1/3 text-4xl animate-flicker text-pixel-blue" style={{ animationDelay: '2s' }}>✨</div>
      
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-2 bg-primary border-2 border-primary mb-4 animate-flicker">
            <span className="text-[0.6rem] font-pixel text-primary-foreground">📍 QUEST SELECT</span>
          </div>
          <h1 className="text-4xl font-pixel text-primary animate-glow leading-relaxed">
            CHOOSE PATH
          </h1>
          <p className="text-xs text-muted-foreground font-pixel leading-relaxed">
            SELECT EDUCATION LEVEL
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-accent border-2 border-accent">
              <span className="text-[0.6rem] font-pixel text-card">★ LVL 1</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-secondary border-2 border-secondary animate-flicker">
              <span className="text-[0.6rem] font-pixel text-secondary-foreground">🪙 0 XP</span>
            </div>
          </div>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationLevels.map((edu) => (
            <div key={edu.id} className="transform hover:scale-105 transition-all duration-300">
              <QuestCard
                title={edu.title}
                icon={edu.icon}
                onClick={() => handleSelect(edu.level)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
