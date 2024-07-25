"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    office: {
        label: "office",
        color: "hsl(var(--chart-1))",
    },
    wfh: {
        label: "wfh",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig


const data = [
    {
        name: "Jan",
        office: 82,
        wfh: 44,
    },
    {
        name: "Feb",
        office: 80,
        wfh: 40,
    },
    {
        name: "Mar",
        office: 83,
        wfh: 42,
    },
    {
        name: "Apr",
        office: 50,
        wfh: 50,
    },
    {
        name: "May",
        office: 40,
        wfh: 60,
    },
    {
        name: "Jun",
        office: 60,
        wfh: 40,
    },
    {
        name: "Jul",
        office: 55,
        wfh: 55,
    },
    {
        name: "Aug",
        office: 49,
        wfh: 61,
    },
    {
        name: "Sep",
        office: 44,
        wfh: 70,
    },
    {
        name: "Oct",
        office: 40,
        wfh: 40,
    },
    {
        name: "Nov",
        office: 50,
        wfh: 50,
    },
    {
        name: "Dec",
        office: 50,
        wfh: 50,
    },
];

export default function WorkLocationTrends() {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="office" fill="var(--color-office)" radius={4} />
                <Bar dataKey="wfh" fill="var(--color-wfh)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}