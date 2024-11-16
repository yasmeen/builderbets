import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Added missing import
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import TeamMemberFields from "./TeamMemberFields";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  goal: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Goal must be a positive number",
  }),
  image: z.string().url({ message: "Please enter a valid URL" }),
  teamName: z.string().min(2, { message: "Team name must be at least 2 characters." }),
  teamRole: z.string().min(2, { message: "Team role must be at least 2 characters." }),
  teamImage: z.string().url({ message: "Please enter a valid URL" }),
});

const ProjectSubmitForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      goal: "0.01",
      image: "",
      teamName: "",
      teamRole: "",
      teamImage: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      // Store the project in localStorage
      const projects = JSON.parse(localStorage.getItem("projects") || "[]");
      const newProject = {
        id: (projects.length + 1).toString(),
        ...values,
        raised: 0,
        daysLeft: 30,
        contributors: 0,
        category: "DeFi",
      };
      projects.push(newProject);
      localStorage.setItem("projects", JSON.stringify(projects));
      
      toast({
        title: "Success!",
        description: "Your project has been submitted.",
      });
      
      navigate("/projects");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Funding Goal (ETH)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter funding goal in ETH"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Project Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <TeamMemberFields form={form} />
        
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Project"}
        </Button>
      </form>
    </Form>
  );
};

export default ProjectSubmitForm;