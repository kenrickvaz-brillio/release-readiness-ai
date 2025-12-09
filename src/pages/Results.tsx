import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ScoreGauge } from "@/components/ScoreGauge";
import { RiskBadge } from "@/components/RiskBadge";
import { FindingsAccordion, createFindingsSections } from "@/components/FindingsAccordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Lightbulb, FileText, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import evaluationData from "@/mock/evaluation.json";

const Results = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const sections = createFindingsSections(evaluationData);

  const handleCopyNotes = async () => {
    await navigator.clipboard.writeText(evaluationData.releaseNotes);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Release notes copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Score Panel */}
          <Card className="border-border bg-card/50 backdrop-blur-sm mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="animate-fade-up">
                  <ScoreGauge score={evaluationData.score} size={180} />
                </div>
                <div className="flex-1 text-center md:text-left animate-fade-up" style={{ animationDelay: "100ms" }}>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <h1 className="text-2xl font-bold">Release Readiness Score</h1>
                    <RiskBadge risk={evaluationData.risk as "Low" | "Medium" | "High"} />
                  </div>
                  <p className="text-muted-foreground text-lg">
                    {evaluationData.summary}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Findings Accordions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Detailed Findings
            </h2>
            <FindingsAccordion sections={sections} />
          </div>

          {/* Suggested Fixes */}
          <Card className="border-border bg-card/50 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-risk-medium" />
                Suggested Improvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {evaluationData.suggestedFixes.map((fix, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-risk-medium/10 border border-risk-medium/20 animate-slide-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-risk-medium/20 text-risk-medium text-xs font-bold shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm text-foreground">{fix}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Release Notes */}
          <Card className="border-border bg-card/50 backdrop-blur-sm mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Generated Release Notes</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyNotes}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-secondary/30 border border-border font-mono text-sm">
                {evaluationData.releaseNotes}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center">
            <Button asChild size="lg" className="glow-primary gap-2">
              <Link to="/evaluate">
                <RefreshCw className="w-4 h-4" />
                Run Another Evaluation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
