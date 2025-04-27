import { useSession } from "next-auth/react";

type usePermissionProps = { permission: string };

export default function usePermission({ permission }: usePermissionProps) {
	const { data: session } = useSession();

	return {
		hasPermission: session?.permissions.includes(permission),
	};
}
