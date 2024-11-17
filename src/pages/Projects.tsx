import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const defaultProjects = [
  {
    id: "1",
    title: "DeFi Lending Protocol",
    description: "A revolutionary lending protocol that enables instant crypto-backed loans with dynamic interest rates.",
    raised: 15,
    goal: 20,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    daysLeft: 7,
    category: "DeFi",
    contractAddress: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"
  },
  {
    id: "2",
    title: "NFT Marketplace",
    description: "Next-generation NFT marketplace with cross-chain support and innovative trading features.",
    raised: 8,
    goal: 15,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    daysLeft: 12,
    category: "NFT",
    contractAddress: "0x8b89995e5f793A07Bc00c21412e50Ecae098E8f0"
  },
  {
    id: "3",
    title: "DAO Governance Tool",
    description: "Simplified DAO governance with on-chain voting and proposal management.",
    raised: 5,
    goal: 10,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    daysLeft: 15,
    category: "DAO",
    contractAddress: "0x9c99995e5f793A07Bc00c21412e50Ecae098E9f1"
  }
];

const Projects = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "DeFi", "NFT", "DAO", "Gaming", "Infrastructure"];

  const filteredProjects = [...defaultProjects].filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                         project.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-3xl font-bold">Explore Projects</h1>
            <Input
              type="search"
              placeholder="Search projects..."
              className="max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;