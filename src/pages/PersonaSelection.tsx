import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonaCard from "@/components/PersonaCard";
import lunaAvatar from "@/assets/luna-avatar.png";
import alexAvatar from "@/assets/alex-avatar.png";

const personas = [
  {
    id: "luna",
    name: "Luna",
    personality: "Creative & Empathetic",
    description: "A warm and intuitive AI who loves exploring creative ideas, understanding emotions, and helping with artistic projects. Luna excels at brainstorming, creative writing, and providing thoughtful emotional support.",
    avatar: lunaAvatar,
  },
  {
    id: "alex",
    name: "Alex",
    personality: "Analytical & Practical",
    description: "A logical and efficient AI focused on problem-solving, technical discussions, and productivity. Alex is perfect for coding help, business strategy, data analysis, and systematic thinking.",
    avatar: alexAvatar,
  },
];

const PersonaSelection = () => {
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId);
    // Small delay for visual feedback
    setTimeout(() => {
      navigate(`/chat/${personaId}`);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Choose Your AI Companion
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Select a persona that matches your needs. Each AI has unique strengths and conversational styles.
          </p>
        </div>

        {/* Persona Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              name={persona.name}
              description={persona.description}
              avatar={persona.avatar}
              personality={persona.personality}
              onClick={() => handlePersonaSelect(persona.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground">
            You can switch between personas anytime during your conversation
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonaSelection;