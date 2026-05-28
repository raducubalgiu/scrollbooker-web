type FieldRequiredType = {
  isNumber?: boolean;
};

export const required = ({ isNumber }: FieldRequiredType = {}) => {
  if (isNumber) {
    return {
      validate: (value: any) => {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue) || numericValue <= 0) {
          return "Acest câmp este obligatoriu";
        }
        return true;
      },
    };
  }

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

export const min = (n: number) => {
  return {
    min: {
      value: n,
      message: `Acest câmp trebuie să fie mai mare ca ${n}`,
    },
  };
};

export const max = (n: number) => {
  return {
    max: {
      value: n,
      message: `Acest câmp trebuie să fie mai mic ca ${n}`,
    },
  };
};
