import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { ArrowRight, Bot, CheckCircle2, GitPullRequest, FileCode, Terminal } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: FileCode,
      title: "Jira Analysis",
      description: "Evaluates acceptance criteria and user stories for completeness",
    },
    {
      icon: GitPullRequest,
      title: "PR Quality",
      description: "Reviews code changes, descriptions, and review status",
    },
    {
      icon: CheckCircle2,
      title: "Test Coverage",
      description: "Analyzes test results and identifies coverage gaps",
    },
    {
      icon: Terminal,
      title: "Log Analysis",
      description: "Scans build logs for warnings and errors",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-up">
            <Bot className="w-4 h-4" />
            AI-Powered Release Analysis
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Is Your Feature{" "}
            <span className="text-gradient">Ready to Ship?</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
            Get instant AI-powered insights on your release readiness. Analyze Jira
            stories, pull requests, test coverage, and more in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Button asChild size="lg" className="glow-primary group">
              <Link to="/evaluate">
                Start Evaluation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/history">View Past Evaluations</Link>
            </Button>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-24 animate-fade-up" style={{ animationDelay: "800ms" }}>
          {[
            { value: "6", label: "Data Sources" },
            { value: "100+", label: "Checks Performed" },
            { value: "<5s", label: "Analysis Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary font-mono">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
