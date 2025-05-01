
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface InstagramInputProps {
  onSubmit: (username: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export function InstagramInput({ 
  onSubmit, 
  loading = false, 
  placeholder = "Enter Instagram username..." 
}: InstagramInputProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="w-full max-w-md relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search size={18} />
        </div>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-24 py-6 rounded-full border-gray-300 focus:ring-primary"
          disabled={loading}
        />
        <div className="absolute right-1.5">
          <Button
            type="submit"
            className="bg-instagram-gradient hover:opacity-90 rounded-full px-4"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-1">
                <span className="animate-pulse">Processing</span>
                <span className="animate-pulse delay-75">.</span>
                <span className="animate-pulse delay-150">.</span>
                <span className="animate-pulse delay-300">.</span>
              </div>
            ) : (
              "Analyze"
            )}
          </Button>
        </div>
      </div>
    </motion.form>
  );
}
