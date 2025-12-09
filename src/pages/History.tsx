import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RiskBadge } from "@/components/RiskBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, ArrowRight, Plus } from "lucide-react";
import { subDays } from "date-fns";

// Generate dynamic history based on current date
const generateHistoryData = () => {
  const today = new Date();
  return [
    {
      id: "eval-001",
      date: subDays(today, 2),
      score: 78,
      risk: "Medium",
      summary: "Good coverage, minor issues with test stability",
    },
    {
      id: "eval-002",
      date: subDays(today, 5),
      score: 91,
      risk: "Low",
      summary: "Strong test depth, clean code review",
    },
    {
      id: "eval-003",
      date: subDays(today, 9),
      score: 66,
      risk: "High",
      summary: "Logs contain errors, missing acceptance criteria",
    },
    {
      id: "eval-004",
      date: subDays(today, 14),
      score: 85,
      risk: "Low",
      summary: "Excellent PR quality, all tests passing",
    },
    {
      id: "eval-005",
      date: subDays(today, 21),
      score: 72,
      risk: "Medium",
      summary: "Static analysis warnings need attention",
    },
  ];
};
const History = () => {
  const historyData = generateHistoryData();
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-risk-low";
    if (score >= 60) return "text-risk-medium";
    return "text-risk-high";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Evaluation History</h1>
              <p className="text-muted-foreground">
                Review past release readiness evaluations
              </p>
            </div>
            <Button asChild className="glow-primary gap-2">
              <Link to="/evaluate">
                <Plus className="w-4 h-4" />
                New Evaluation
              </Link>
            </Button>
          </div>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Score</TableHead>
                    <TableHead className="text-muted-foreground">Risk Level</TableHead>
                    <TableHead className="text-muted-foreground">Summary</TableHead>
                    <TableHead className="text-muted-foreground text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historyData.map((evaluation, index) => (
                    <TableRow
                      key={evaluation.id}
                      className="border-border hover:bg-accent/50 animate-fade-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {formatDate(evaluation.date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-mono font-bold text-lg ${getScoreColor(
                            evaluation.score
                          )}`}
                        >
                          {evaluation.score}
                        </span>
                      </TableCell>
                      <TableCell>
                        <RiskBadge
                          risk={evaluation.risk as "Low" | "Medium" | "High"}
                        />
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <span className="text-sm text-muted-foreground line-clamp-1">
                          {evaluation.summary}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-primary hover:text-primary"
                        >
                          <Link to="/results">
                            View
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {historyData.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No evaluations yet</p>
              <Button asChild>
                <Link to="/evaluate">Run Your First Evaluation</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default History;
