import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PersonaCardProps {
  name: string;
  description: string;
  avatar: string;
  personality: string;
  onClick: () => void;
}

const PersonaCard = ({ name, description, avatar, personality, onClick }: PersonaCardProps) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-card border-border/50 hover:bg-card-hover transition-all duration-300 hover:shadow-card hover:scale-[1.02] group">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img 
              src={avatar} 
              alt={`${name} avatar`}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">{name}</h3>
            <p className="text-sm text-primary font-medium">{personality}</p>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
          {description}
        </p>
        
        <Button 
          onClick={onClick}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 group-hover:scale-[1.02]"
          size="lg"
        >
          Chat with {name}
        </Button>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
    </Card>
  );
};

export default PersonaCard;