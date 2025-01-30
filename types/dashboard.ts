export interface MetricScore {
  value: number
  change: number
  trend: "up" | "down" | "neutral"
}

export interface BrandMetrics {
  perception: MetricScore
  socialEngagement: MetricScore
  sentiment: MetricScore
}

export interface VacancyMetrics {
  readability: number
  averageLength: number
  jargonUse: number
  inclusivity: number
  structure: number
  actionOrientation: number
  ctaEffectiveness: number
  sentiment: number
}

export interface Competitor {
  id: string
  name: string
  brandMetrics: BrandMetrics
  vacancyMetrics: VacancyMetrics
  swot: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
}

