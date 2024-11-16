import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface TeamMemberFieldsProps {
  form: UseFormReturn<any>;
}

const TeamMemberFields = ({ form }: TeamMemberFieldsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-200">Team Member</h2>
      
      <FormField
        control={form.control}
        name="teamName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter team member name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="teamRole"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Role</FormLabel>
            <FormControl>
              <Input placeholder="Enter team member role" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="teamImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Profile Image URL</FormLabel>
            <FormControl>
              <Input placeholder="Enter team member image URL" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TeamMemberFields;