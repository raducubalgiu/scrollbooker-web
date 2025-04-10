export const required = () => {
	return {
		required: {
			value: true,
			message: "Acest câmp este obligatoriu",
		},
	};
};

export const minField = (value: number) => {
	return {
		minLength: {
			value: value,
			message: `Acest câmp trebuie să aibă minim ${value} caractere`,
		},
	};
};

export const maxField = (value: number) => {
	return {
		maxLength: {
			value: value,
			message: `Acest câmp este limitat la ${value} de caractere`,
		},
	};
};
