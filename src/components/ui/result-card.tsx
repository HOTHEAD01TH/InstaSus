
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  title: string;
  result: string | ReactNode;
  icon?: ReactNode;
  variant?: "red" | "green" | "neutral";
  className?: string;
}

export function ResultCard({ 
  title, 
  result, 
  icon,
  variant = "neutral",
  className
}: ResultCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "red":
        return "bg-red-50 border-red-200";
      case "green":
        return "bg-green-50 border-green-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getHeaderClasses = () => {
    switch (variant) {
      case "red":
        return "text-red-600 bg-red-100/50";
      case "green":
        return "text-green-600 bg-green-100/50";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("overflow-hidden", className)}
    >
      <Card className={cn("overflow-hidden shadow-sm", getVariantClasses())}>
        <CardHeader className={cn("pb-2", getHeaderClasses())}>
          <CardTitle className="text-lg flex items-center gap-2">
            {icon && <div>{icon}</div>}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-gray-700 whitespace-pre-wrap">{result}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
