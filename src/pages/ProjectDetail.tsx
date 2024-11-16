import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProjectSidebar from "@/components/ProjectSidebar";

const ProjectDetail = () => {
  const { id } = useParams();

  // Example project data - in a real app, this would come from your backend
  const project = {
    id: "1",
    title: "DeFi Lending Protocol",
    description: "A revolutionary lending protocol that enables instant crypto-backed loans with dynamic interest rates. Our platform leverages smart contracts to automate lending processes and provide competitive rates for both lenders and borrowers.",
    raised: 15,
    goal: 20,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    daysLeft: 7,
    contributors: 156,
    contractAddress: "0x123...", // Replace with your actual contract address
    team: [
      {
        name: "Alice Johnson",
        role: "Lead Developer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      {
        name: "Bob Smith",
        role: "Smart Contract Engineer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-video object-cover rounded-xl"
              />
              
              <div className="bg-gray-800 rounded-xl p-8 space-y-6 shadow-xl">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {project.title}
                </h1>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.team.map((member) => (
                    <div key={member.name} className="flex items-center space-x-4 bg-gray-700/50 p-4 rounded-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary"
                      />
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-gray-400 text-sm">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <ProjectSidebar
              raised={project.raised}
              goal={project.goal}
              contributors={project.contributors}
              daysLeft={project.daysLeft}
              contractAddress={project.contractAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;