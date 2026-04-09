

type PasswordChecklistItem = {
  label: string;
  isValid: boolean;
  valid: boolean;
  checked: boolean;
};

export function buildPasswordChecklist(
  password: string
): PasswordChecklistItem[] {
  const rules = [
    {
      label: "+8 caracteres",
      test: (value: string) => value.length >= 8,
    },
    {
      label: "Maiúscula",
      test: (value: string) => /[A-Z]/.test(value),
    },
    {
      label: "Minúscula",
      test: (value: string) => /[a-z]/.test(value),
    },
    {
      label: "Número",
      test: (value: string) => /\d/.test(value),
    },
    {
      label: "Símbolo",
      test: (value: string) => /[^A-Za-z0-9]/.test(value),
    },
  ];

  return rules.map(({ label, test }) => {
    const passed = test(password);

    return {
      label,
      isValid: passed,
      valid: passed,
      checked: passed,
    };
  });
}