import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "./metric-card"
import type { BrandMetrics } from "@/types/dashboard"

interface BrandOverviewProps {
  metrics: BrandMetrics
  evpSummary: string
  improvementTips: string[]
}

export function BrandOverview({ metrics, evpSummary, improvementTips }: BrandOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Perception Score"
          value={metrics.perception.value}
          change={metrics.perception.change}
          trend={metrics.perception.trend}
          suffix="/100"
        />
        <MetricCard
          title="Social Engagement"
          value={metrics.socialEngagement.value}
          change={metrics.socialEngagement.change}
          trend={metrics.socialEngagement.trend}
          suffix="/100"
        />
        <MetricCard
          title="Sentiment Score"
          value={metrics.sentiment.value}
          change={metrics.sentiment.change}
          trend={metrics.sentiment.trend}
          suffix="/100"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated EVP</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{evpSummary}</p>
          </CardContent>
        </Card>
        <Card>
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
    </div>
  )
}

