import Navbar from "@/components/Navbar";
import ProjectSubmitForm from "@/components/ProjectSubmitForm";

const Submit = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Submit Your Project
          </h1>
          
          <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
            <ProjectSubmitForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;