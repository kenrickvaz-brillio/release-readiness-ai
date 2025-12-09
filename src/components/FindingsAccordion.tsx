import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, AlertTriangle, FileText, Code, Terminal, Rocket, ClipboardList, GitPullRequest } from "lucide-react";
import { cn } from "@/lib/utils";

interface FindingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  score: number;
  maxScore: number;
  findings: string[];
}

interface FindingsAccordionProps {
  sections: FindingsSection[];
}

export function FindingsAccordion({ sections }: FindingsAccordionProps) {
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-risk-low";
    if (percentage >= 60) return "text-risk-medium";
    return "text-risk-high";
  };

  return (
    <Accordion type="multiple" className="space-y-3">
      {sections.map((section, index) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="border border-border rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <AccordionTrigger className="px-4 py-3 hover:bg-accent/50 hover:no-underline transition-colors [&[data-state=open]]:bg-accent/30">
            <div className="flex items-center gap-3 w-full">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {section.icon}
              </div>
              <span className="font-medium text-foreground flex-1 text-left">
                {section.title}
              </span>
              <div className="flex items-center gap-2 mr-2">
                <span
                  className={cn(
                    "font-mono text-sm font-semibold",
                    getScoreColor(section.score, section.maxScore)
                  )}
                >
                  {section.score}/{section.maxScore}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ul className="space-y-2 mt-2">
              {section.findings.map((finding, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-muted-foreground animate-slide-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function createFindingsSections(data: {
  breakdown: {
    requirements: number;
    tests: number;
    prQuality: number;
    staticAnalysis: number;
    logs: number;
    deployment: number;
  };
  jiraFindings: string[];
  prFindings: string[];
  testFindings: string[];
  staticAnalysisFindings: string[];
  logFindings: string[];
  deploymentFindings: string[];
}): FindingsSection[] {
  return [
    {
      id: "requirements",
      title: "Requirements Analysis",
      icon: <ClipboardList className="w-4 h-4" />,
      score: data.breakdown.requirements,
      maxScore: 20,
      findings: data.jiraFindings,
    },
    {
      id: "pr-quality",
      title: "PR & Code Quality",
      icon: <GitPullRequest className="w-4 h-4" />,
      score: data.breakdown.prQuality,
      maxScore: 20,
      findings: data.prFindings,
    },
    {
      id: "tests",
      title: "Test Quality",
      icon: <CheckCircle2 className="w-4 h-4" />,
      score: data.breakdown.tests,
      maxScore: 20,
      findings: data.testFindings,
    },
    {
      id: "static-analysis",
      title: "Static Analysis",
      icon: <Code className="w-4 h-4" />,
      score: data.breakdown.staticAnalysis,
      maxScore: 15,
      findings: data.staticAnalysisFindings,
    },
    {
      id: "logs",
      title: "Build & Runtime Logs",
      icon: <Terminal className="w-4 h-4" />,
      score: data.breakdown.logs,
      maxScore: 10,
      findings: data.logFindings,
    },
    {
      id: "deployment",
      title: "Deployment Metadata",
      icon: <Rocket className="w-4 h-4" />,
      score: data.breakdown.deployment,
      maxScore: 15,
      findings: data.deploymentFindings,
    },
  ];
}
