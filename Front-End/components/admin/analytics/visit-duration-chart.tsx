"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import type { VisitDurationChartProps } from "@/Front-End/types"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function VisitDurationChart({ analytics }: VisitDurationChartProps) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    // Group durations into ranges
    const durationRanges = {
      "< 1 min": 0,
      "1-5 mins": 0,
      "5-10 mins": 0,
      "10-30 mins": 0,
      "> 30 mins": 0,
    }

    analytics.forEach((user) => {
      const minutes = user.visit_duration / 60

      if (minutes < 1) {
        durationRanges["< 1 min"]++
      } else if (minutes < 5) {
        durationRanges["1-5 mins"]++
      } else if (minutes < 10) {
        durationRanges["5-10 mins"]++
      } else if (minutes < 30) {
        durationRanges["10-30 mins"]++
      } else {
        durationRanges["> 30 mins"]++
      }
    })

    setChartData({
      labels: Object.keys(durationRanges),
      datasets: [
        {
          label: "Number of Users",
          data: Object.values(durationRanges),
          backgroundColor: "rgba(34, 197, 94, 0.6)",
          borderColor: "rgba(34, 197, 94, 1)",
          borderWidth: 1,
        },
      ],
    })
  }, [analytics])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Visit Duration Distribution",
      },
    },
  }

  return <Bar data={chartData} options={options} />
}

