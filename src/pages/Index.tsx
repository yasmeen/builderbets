import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const featuredProjects = [
  {
    id: "1",
    title: "DeFi Lending Protocol",
    description: "A revolutionary lending protocol that enables instant crypto-backed loans with dynamic interest rates.",
    raised: 15,
    goal: 20,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    daysLeft: 7,
    category: "DeFi"
  },
  {
    id: "2",
    title: "NFT Marketplace",
    description: "Next-generation NFT marketplace with cross-chain support and innovative trading features.",
    raised: 8,
    goal: 15,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    daysLeft: 12,
    category: "NFT"
  },
  {
    id: "3",
    title: "DAO Governance Tool",
    description: "Simplified DAO governance with on-chain voting and proposal management.",
    raised: 5,
    goal: 10,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    daysLeft: 15,
    category: "DAO"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      <Navbar />

      {/* Stats Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">1,234</div>
              <div className="text-gray-500 mt-2">Active Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary">$42.5M</div>
              <div className="text-gray-500 mt-2">Total Raised</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent">25.7K</div>
              <div className="text-gray-500 mt-2">Active Backers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="featured" className="space-y-8">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new">Just Launched</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="featured" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Show different projects here */}
              </div>
            </TabsContent>

            <TabsContent value="new">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Show different projects here */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
