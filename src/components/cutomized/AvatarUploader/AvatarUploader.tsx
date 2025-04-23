import { PhotoCamera } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";

type AvatarUploaderProps = { url: string | undefined };

export default function AvatarUploader({ url }: AvatarUploaderProps) {
	const [image, setImage] = useState<string | undefined>(url);
	const [loading, setLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setLoading(true);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result as string);
				setLoading(false);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Box display="flex" alignItems="center" gap={2}>
			<IconButton onClick={() => fileInputRef.current?.click()}>
				<Avatar
					src={image || ""}
					alt="User Avatar"
					sx={{ width: 120, height: 120 }}
				>
					{loading ? <CircularProgress size={20} /> : <PhotoCamera />}
				</Avatar>
			</IconButton>
			<input
				type="file"
				accept="image/*"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleImageChange}
			/>
		</Box>
	);
}
