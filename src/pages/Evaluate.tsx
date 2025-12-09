import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Link as LinkIcon, GitCommit, TestTube, FileCode, Terminal, Rocket, Loader2 } from "lucide-react";

const Evaluate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    navigate("/results");
  };

  const FileUploadField = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ComponentType<{ className?: string }> }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <input
          type="file"
          id={id}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="flex items-center gap-3 px-4 py-3 border border-border rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
          <Icon className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Click or drag to upload</span>
          <Upload className="w-4 h-4 text-muted-foreground ml-auto" />
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">New Evaluation</h1>
            <p className="text-muted-foreground">
              Provide your release artifacts for AI-powered readiness analysis
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Release Information</CardTitle>
                <CardDescription>
                  Fill in the details about your feature release
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Jira URL/Text */}
                <div className="space-y-2">
                  <Label htmlFor="jira" className="text-sm font-medium">
                    Jira Issue URL or Key
                  </Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="jira"
                      placeholder="https://jira.example.com/browse/PROJ-123"
                      className="pl-10 bg-secondary/30 border-border"
                    />
                  </div>
                </div>

                {/* PR URL/Text */}
                <div className="space-y-2">
                  <Label htmlFor="pr" className="text-sm font-medium">
                    Pull Request URL
                  </Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="pr"
                      placeholder="https://github.com/org/repo/pull/123"
                      className="pl-10 bg-secondary/30 border-border"
                    />
                  </div>
                </div>

                {/* Commit Messages */}
                <div className="space-y-2">
                  <Label htmlFor="commits" className="text-sm font-medium">
                    Commit Messages
                  </Label>
                  <div className="relative">
                    <GitCommit className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                      id="commits"
                      placeholder="Paste commit messages here..."
                      className="pl-10 min-h-[100px] bg-secondary/30 border-border resize-none"
                    />
                  </div>
                </div>

                {/* File uploads */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileUploadField id="tests" label="Test Results" icon={TestTube} />
                  <FileUploadField id="lint" label="Lint Report" icon={FileCode} />
                  <FileUploadField id="logs" label="Build Logs" icon={Terminal} />
                  <FileUploadField id="deployment" label="Deployment Metadata" icon={Rocket} />
                </div>

                <Button
                  type="submit"
                  className="w-full glow-primary"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Run AI Evaluation (Demo)"
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Evaluate;
