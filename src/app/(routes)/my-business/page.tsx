import React from "react";
import MainLayout from "../../../components/cutomized/MainLayout/MainLayout";
import MyBusinessDetails from "@/components/modules/MyBusinessModule/MyBusinessDetails";
import MyBusinessServices from "@/components/modules/MyBusinessModule/MyBusinessServices";

export default async function MyBusiness() {
	return (
		<MainLayout title="My Business" hideAction>
			<MyBusinessDetails />
			<MyBusinessServices />
		</MainLayout>
	);
}
