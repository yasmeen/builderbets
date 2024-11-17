import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProjectSidebar from "@/components/ProjectSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MessageSquare, History } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface Update {
  date: string;
  title: string;
  content: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  image: string;
  daysLeft: number;
  contributors: number;
  contractAddress: string;
  team: TeamMember[];
  category: string;
  updates: Update[];
  risks: string;
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "DeFi Lending Protocol",
    description: "A revolutionary lending protocol that enables instant crypto-backed loans with dynamic interest rates. Our platform leverages smart contracts to automate lending processes and provide competitive rates for both lenders and borrowers.",
    raised: 15,
    goal: 20,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    daysLeft: 7,
    contributors: 156,
    contractAddress: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    category: "DeFi",
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
    ],
    updates: [
      {
        date: "2024-01-15",
        title: "Smart Contract Audit Complete",
        content: "We're excited to announce that our smart contracts have passed the security audit with flying colors!"
      },
      {
        date: "2024-01-10",
        title: "Development Milestone",
        content: "Backend infrastructure is now 80% complete. Testing phase begins next week."
      }
    ],
    risks: "As with any DeFi project, smart contract risks and market volatility are our primary concerns. We're mitigating these through thorough audits and gradual rollout."
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
  const allProjects = [...defaultProjects, ...storedProjects];
  const project = allProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-3xl font-bold">Project not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="aspect-video w-full relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary/90">{project.category}</Badge>
                </div>
              </div>

              <Tabs defaultValue="story" className="bg-white rounded-xl p-6 shadow-sm">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="story">Story</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="risks">Risks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="story">
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    
                    <h3 className="text-xl font-semibold mt-8 mb-4">Team</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.team.map((member) => (
                        <div key={member.name} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-gray-500">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="updates">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-6">
                      {project.updates.map((update, index) => (
                        <div key={index} className="border-l-2 border-primary/20 pl-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <CalendarDays className="w-4 h-4" />
                            {update.date}
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{update.title}</h3>
                          <p className="text-gray-600">{update.content}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="risks">
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed">{project.risks}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div>
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
    </div>
  );
};

export default ProjectDetail;