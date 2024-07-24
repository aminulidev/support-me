import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmployeesStats from "@/app/dashboard/components/employees-stats";

const DashboardPage = () => {
    return (
        <Tabs defaultValue="employees">
            <TabsList className="mb-4">
                <TabsTrigger value="employees">Employees stats</TabsTrigger>
                <TabsTrigger value="teams">Teams stats</TabsTrigger>
            </TabsList>
            <TabsContent value="employees">
                <EmployeesStats
                    totalEmployee={120} employeePresent={95}
                />
            </TabsContent>
            <TabsContent value="teams">Teams stats view</TabsContent>
        </Tabs>

    );
};

export default DashboardPage;