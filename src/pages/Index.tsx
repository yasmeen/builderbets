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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Welcome to LaunchPad
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The premier platform for Web3 projects. Back innovative ideas, earn tokens, and be part of the future.
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
      </div>

      {/* Stats Section */}
      <div className="border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">269,319</div>
              <div className="text-gray-500 mt-2">Projects Funded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary">$8.4B+</div>
              <div className="text-gray-500 mt-2">Total Raised</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent">99.1M+</div>
              <div className="text-gray-500 mt-2">Total Backers</div>
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

      {/* Categories Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["DeFi", "NFT", "GameFi", "DAO", "Infrastructure", "Social", "Tools", "Other"].map((category) => (
              <Link
                key={category}
                to={`/projects?category=${category}`}
                className="group relative aspect-video overflow-hidden rounded-lg bg-gray-900"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/0" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-medium text-white">{category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;