import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  image: string;
  daysLeft: number;
}

const ProjectCard = ({ id, title, description, raised, goal, image, daysLeft }: ProjectCardProps) => {
  const progress = (raised / goal) * 100;

  return (
    <Link to={`/project/${id}`}>
      <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-primary/50 transition-all hover:shadow-lg">
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="font-medium">{raised} ETH raised</span>
              <span className="text-gray-500">{daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;