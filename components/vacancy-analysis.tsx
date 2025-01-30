"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { VacancyMetrics } from "@/types/dashboard"

interface VacancyAnalysisProps {
  metrics: VacancyMetrics
  improvementTips: string[]
}

export function VacancyAnalysis({ metrics, improvementTips }: VacancyAnalysisProps) {
  const metricsList = [
    { label: "Readability", value: metrics.readability },
    { label: "Average Length", value: metrics.averageLength },
    { label: "Jargon Use", value: metrics.jargonUse },
    { label: "Inclusivity", value: metrics.inclusivity },
    { label: "Structure", value: metrics.structure },
    { label: "Action Orientation", value: metrics.actionOrientation },
    { label: "CTA Effectiveness", value: metrics.ctaEffectiveness },
    { label: "Sentiment", value: metrics.sentiment },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Vacancy Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {metricsList.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{metric.label}</span>
                <span className="text-sm text-muted-foreground">{metric.value}%</span>
              </div>
              <Progress value={metric.value} />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Improvement Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4 space-y-2">
            {improvementTips.map((tip, index) => (
              <li key={index} className="text-muted-foreground">
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

