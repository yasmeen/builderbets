import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";

const featuredProjects = [
  {
    id: "1",
    title: "DeFi Lending Protocol",
    description: "A revolutionary lending protocol that enables instant crypto-backed loans with dynamic interest rates.",
    raised: 15,
    goal: 20,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    daysLeft: 7
  },
  {
    id: "2",
    title: "NFT Marketplace",
    description: "Next-generation NFT marketplace with cross-chain support and innovative trading features.",
    raised: 8,
    goal: 15,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    daysLeft: 12
  },
  {
    id: "3",
    title: "DAO Governance Tool",
    description: "Simplified DAO governance with on-chain voting and proposal management.",
    raised: 5,
    goal: 10,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    daysLeft: 15
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Fund the Future of Web3
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Support innovative hackathon projects and earn token allocations. Your contribution today shapes tomorrow's blockchain ecosystem.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/projects" className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                Explore Projects
              </Link>
              <Link to="/submit" className="px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-colors">
                Submit Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Project</h3>
              <p className="text-gray-600">Browse innovative hackathon projects and find ones that excite you.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fund with Crypto</h3>
              <p className="text-gray-600">Contribute ETH to support project development and secure your allocation.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Tokens</h3>
              <p className="text-gray-600">Receive future token allocations based on your contribution amount.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;