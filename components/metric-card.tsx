import { TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: number
  change?: number
  trend?: "up" | "down" | "neutral"
  suffix?: string
  className?: string
}

export function MetricCard({ title, value, change, trend, suffix = "", className }: MetricCardProps) {
  return (
    <Card className={cn("card-gradient border-transparent transition-all", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-text-secondary">{title}</CardTitle>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend === "up" ? "text-[#22C55E]" : "text-[#EF4444]",
            )}
          >
            {trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {change && `${change > 0 ? "+" : ""}${change}%`}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">
          {value}
          {suffix}
        </div>
      </CardContent>
    </Card>
  )
}

