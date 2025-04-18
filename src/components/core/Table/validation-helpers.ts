type ValidationFn = (value: unknown) => string | null;

export const required_MR: ValidationFn = value => {
	return value === null || value === undefined || value === ""
		? "This field is required"
		: null;
};

export const minLength_MR =
	(min: number): ValidationFn =>
	value => {
		return typeof value === "string" && value.length < min
			? `Minimum length is ${min}`
			: null;
	};

export const runValidations_MR = (
	value: unknown,
	validators: ValidationFn[]
): string | null => {
	for (const validate of validators) {
		const error = validate(value);
		if (error) return error;
	}
	return null;
};

export const hasValidationErrors = (
	errors: Record<string, Record<number, string>>
): boolean => {
	if (!errors || typeof errors !== "object") return false;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return Object.entries(errors).some(([_, fieldErrors]) => {
		return Object.values(fieldErrors).some(msg => msg?.trim() !== "");
	});
};
