import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import EmployeesModule from "@/components/modules/EmployeesModule/EmployeesModule";
import React from "react";

async function Employees() {
	return <EmployeesModule />;
}

export default ProtectedPage(Employees, "EMPLOYEES_VIEW");
