import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  risk: "Low" | "Medium" | "High";
  className?: string;
}

export function RiskBadge({ risk, className }: RiskBadgeProps) {
  const variants = {
    Low: "bg-risk-low/20 text-risk-low border-risk-low/30",
    Medium: "bg-risk-medium/20 text-risk-medium border-risk-medium/30",
    High: "bg-risk-high/20 text-risk-high border-risk-high/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
        variants[risk],
        className
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full mr-2",
          risk === "Low" && "bg-risk-low",
          risk === "Medium" && "bg-risk-medium",
          risk === "High" && "bg-risk-high"
        )}
      />
      {risk} Risk
    </span>
  );
}
