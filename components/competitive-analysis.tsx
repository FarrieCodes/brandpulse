"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Competitor } from "@/types/dashboard"

interface CompetitiveAnalysisProps {
  competitors: Competitor[]
  selectedCompetitors: string[]
  onCompetitorSelect: (id: string) => void
}

export function CompetitiveAnalysis({
  competitors,
  selectedCompetitors,
  onCompetitorSelect,
}: CompetitiveAnalysisProps) {
  const selectedCompetitorData = competitors.filter((c) => selectedCompetitors.includes(c.id))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compare Competitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Select key={i} value={selectedCompetitors[i]} onValueChange={(value) => onCompetitorSelect(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select competitor..." />
                </SelectTrigger>
                <SelectContent>
                  {competitors.map((competitor) => (
                    <SelectItem
                      key={competitor.id}
                      value={competitor.id}
                      disabled={selectedCompetitors.includes(competitor.id)}
                    >
                      {competitor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comparison Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                {selectedCompetitorData.map((competitor) => (
                  <TableHead key={competitor.id}>{competitor.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Perception Score</TableCell>
                {selectedCompetitorData.map((competitor) => (
                  <TableCell key={competitor.id}>{competitor.brandMetrics.perception.value}/100</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Social Engagement</TableCell>
                {selectedCompetitorData.map((competitor) => (
                  <TableCell key={competitor.id}>{competitor.brandMetrics.socialEngagement.value}/100</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Sentiment Score</TableCell>
                {selectedCompetitorData.map((competitor) => (
                  <TableCell key={competitor.id}>{competitor.brandMetrics.sentiment.value}/100</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedCompetitorData.map((competitor) => (
        <Card key={competitor.id}>
          <CardHeader>
            <CardTitle>{competitor.name} - SWOT Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Strengths</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {competitor.swot.strengths.map((strength, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Weaknesses</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {competitor.swot.weaknesses.map((weakness, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Opportunities</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {competitor.swot.opportunities.map((opportunity, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {opportunity}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Threats</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {competitor.swot.threats.map((threat, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {threat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

