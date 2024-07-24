import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
    AlertTriangleIcon,
    BadgeCheckIcon,
    PartyPopperIcon,
    UserCheck,
    UserCheckIcon,
    UserIcon,
    UserRoundXIcon
} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Image from "next/image";
import cm from "@/public/images/cm.jpg";

type Props = {
    totalEmployee: number;
    employeePresent: number;
    presentPercentage?: number;
}

const EmployeesStats = ({totalEmployee, employeePresent, presentPercentage}: Props) => {
    presentPercentage = ((employeePresent / totalEmployee) * 100);

    return (
        <div className="grid lg:grid-cols-3 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Total employees</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between">
                    <div className="flex gap-2">
                        <UserIcon />
                        <div className="text-5xl font-bold">{totalEmployee}</div>
                    </div>
                    <div>
                        <Button size="xs" asChild>
                            <Link href="/dashboard/employees">View all</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Employee present</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        {presentPercentage > 70 ?
                        <UserCheckIcon /> : <UserRoundXIcon />}
                        <div className="text-5xl font-bold">{employeePresent}</div>
                    </div>
                </CardContent>
                <CardFooter>
                    <span className={cn(
                        "flex items-center gap-1 text-xs",
                        presentPercentage > 70 ? "text-green-500" : "text-red-500",
                    )}>
                        {presentPercentage > 70 ?
                            <BadgeCheckIcon /> : <AlertTriangleIcon />}

                        {presentPercentage.toFixed(2)}% of employees are present
                    </span>
                </CardFooter>
            </Card>
            <Card className="border-primary flex flex-col">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Employee of the month</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                    <Avatar>
                        <Image src={cm} alt="Employe of month avatar" />
                        <AvatarFallback>CM</AvatarFallback>
                    </Avatar>
                    <span className="text-2xl">Colin Murray!</span>
                </CardContent>
                <CardFooter className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                    <PartyPopperIcon className="text-primary" />
                    <span>Congratulations, Colin!</span>
                </CardFooter>
            </Card>
        </div>
    );
};

export default EmployeesStats;