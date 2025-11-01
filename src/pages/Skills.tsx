import { useNavigate, useSearchParams } from "react-router-dom";
import { QuestCard } from "@/components/QuestCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, TrendingUp, Code, FileSpreadsheet, Palette } from "lucide-react";

const Skills = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level") || "unknown";

  const skills = [
    {
      id: "ielts",
      title: "IELTS Prep",
      icon: MessageCircle,
    },
    {
      id: "sat",
      title: "SAT Prep",
      icon: TrendingUp,
    },
    {
      id: "python",
      title: "Python Micro Course",
      icon: Code,
    },
    {
      id: "excel",
      title: "Excel Mastery",
      icon: FileSpreadsheet,
    },
    {
      id: "canva",
      title: "Canva Design",
      icon: Palette,
    },
  ];

  const handleSkillSelect = (skillId: string) => {
    navigate(`/skills/${skillId}/start`);
  };

  const handleBack = () => {
    navigate("/education");
  };

  return (
    <div className="min-h-screen bg-gradient-quest p-8 relative overflow-hidden">
      {/* Pixel decoration elements */}
      <div className="absolute top-10 right-10 text-5xl animate-glow text-primary">🎮</div>
      <div className="absolute top-1/3 left-10 text-6xl animate-pixel-bounce text-secondary" style={{ animationDelay: '0.5s' }}>⚡</div>
      <div className="absolute bottom-20 right-1/4 text-7xl animate-flicker text-accent" style={{ animationDelay: '1s' }}>🌟</div>
      <div className="absolute bottom-1/3 left-1/4 text-5xl animate-pixel-bounce text-pixel-orange" style={{ animationDelay: '1.5s' }}>🗡️</div>
      
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack} className="group border-0">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-pixel text-[0.65rem]">BACK</span>
          </Button>
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 bg-primary border-2 border-primary animate-flicker">
              <span className="text-[0.6rem] font-pixel text-primary-foreground">🎯 QUEST BOARD</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-pixel text-primary animate-glow flex items-center justify-center gap-4 leading-relaxed">
            <span className="text-4xl">⚔️</span>
            CHOOSE QUEST
            <span className="text-4xl">🗡️</span>
          </h1>
          <p className="text-xs text-muted-foreground font-pixel leading-relaxed">
            PICK A SKILL AS{" "}
            <span className="px-3 py-2 bg-primary border-2 border-primary font-pixel text-primary-foreground inline-block text-[0.6rem]">
              {level.toUpperCase()}
            </span>
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="px-4 py-2 bg-accent border-2 border-accent animate-pixel-bounce">
              <span className="text-[0.6rem] font-pixel text-card">💪 {skills.length} QUESTS</span>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div key={skill.id} className="transform hover:scale-105 transition-all duration-300">
              <QuestCard
                title={skill.title}
                icon={skill.icon}
                onClick={() => handleSkillSelect(skill.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
