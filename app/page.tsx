"use client"

import { useState } from "react"
import { BrandOverview } from "@/components/brand-overview"
import { VacancyAnalysis } from "@/components/vacancy-analysis"
import { CompetitiveAnalysis } from "@/components/competitive-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data - in a real app, this would come from your backend
const mockData = {
  brandMetrics: {
    perception: { value: 85, change: 5, trend: "up" as const },
    socialEngagement: { value: 72, change: -2, trend: "down" as const },
    sentiment: { value: 90, change: 3, trend: "up" as const },
  },
  evpSummary:
    "A dynamic workplace fostering innovation and growth, offering competitive benefits and flexible work arrangements...",
  brandImprovementTips: [
    "Increase employee testimonial content on social media",
    "Highlight diversity initiatives in company communications",
    "Develop more engaging recruitment video content",
  ],
  vacancyMetrics: {
    readability: 85,
    averageLength: 70,
    jargonUse: 25,
    inclusivity: 90,
    structure: 85,
    actionOrientation: 75,
    ctaEffectiveness: 80,
    sentiment: 85,
  },
  vacancyImprovementTips: [
    "Reduce technical jargon in job descriptions",
    "Add more specific examples of day-to-day responsibilities",
    "Include clearer progression opportunities",
  ],
  competitors: [
    {
      id: "1",
      name: "TechCorp",
      brandMetrics: {
        perception: { value: 80, change: 2, trend: "up" as const },
        socialEngagement: { value: 75, change: 5, trend: "up" as const },
        sentiment: { value: 85, change: -1, trend: "down" as const },
      },
      vacancyMetrics: {
        readability: 80,
        averageLength: 65,
        jargonUse: 30,
        inclusivity: 85,
        structure: 80,
        actionOrientation: 70,
        ctaEffectiveness: 75,
        sentiment: 80,
      },
      swot: {
        strengths: ["Strong market presence", "Innovative culture"],
        weaknesses: ["High turnover rate", "Complex hiring process"],
        opportunities: ["Expanding remote work options", "New graduate program"],
        threats: ["Intense competition for talent", "Changing industry regulations"],
      },
    },
    // Add more competitors as needed
  ],
}

export default function DashboardPage() {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])

  const handleCompetitorSelect = (id: string) => {
    if (selectedCompetitors.includes(id)) {
      setSelectedCompetitors(selectedCompetitors.filter((c) => c !== id))
    } else if (selectedCompetitors.length < 3) {
      setSelectedCompetitors([...selectedCompetitors, id])
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor and analyze your employer brand performance</p>
      </div>

      <div className="grid gap-6">
        <BrandOverview
          metrics={mockData.brandMetrics}
          evpSummary={mockData.evpSummary}
          improvementTips={mockData.brandImprovementTips}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-gradient border-transparent">
            <CardHeader>
              <CardTitle>Vacancy Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <VacancyAnalysis metrics={mockData.vacancyMetrics} improvementTips={mockData.vacancyImprovementTips} />
            </CardContent>
          </Card>

          <Card className="card-gradient border-transparent">
            <CardHeader>
              <CardTitle>Competitive Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CompetitiveAnalysis
                competitors={mockData.competitors}
                selectedCompetitors={selectedCompetitors}
                onCompetitorSelect={handleCompetitorSelect}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

