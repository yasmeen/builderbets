import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProjectSidebar from "@/components/ProjectSidebar";

const ProjectDetail = () => {
  const { id } = useParams();

  // Combine default and stored projects
  const defaultProjects = [
    {
      id: "defi-lending",
      title: "DeFi Lending Protocol",
      description: "A revolutionary lending protocol that enables instant crypto-backed loans with dynamic interest rates. Our platform leverages smart contracts to automate lending processes and provide competitive rates for both lenders and borrowers.",
      raised: 15,
      goal: 20,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      daysLeft: 7,
      contributors: 156,
      contractAddress: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
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
    },
    {
      id: "nft-marketplace",
      title: "NFT Marketplace",
      description: "Next-generation NFT marketplace with cross-chain support and innovative trading features.",
      raised: 8,
      goal: 15,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      daysLeft: 12,
      contributors: 89,
      contractAddress: "0x8b89995e5f793A07Bc00c21412e50Ecae098E8f0",
      team: [
        {
          name: "Carol White",
          role: "Product Manager",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
        }
      ]
    },
    {
      id: "dao-governance",
      title: "DAO Governance Tool",
      description: "Simplified DAO governance with on-chain voting and proposal management.",
      raised: 5,
      goal: 10,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      daysLeft: 15,
      contributors: 45,
      contractAddress: "0x9c99995e5f793A07Bc00c21412e50Ecae098E9f1",
      team: [
        {
          name: "David Lee",
          role: "Blockchain Developer",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
        }
      ]
    }
  ];

  const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
  const allProjects = [...defaultProjects, ...storedProjects];
  const project = allProjects.find(p => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

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