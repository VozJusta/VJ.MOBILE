export type ChecklistItem = {
  label: string;
  valid: boolean;
};

export type PasswordStrength = {
  score: number;
  color: string;
  checklist: ChecklistItem[];
};

export default function passwordValidate(password: string): PasswordStrength {
  const rules = [
    { label: "+8 caracteres", test: (v: string) => v.length >= 8 },
    { label: "Maiúscula",     test: (v: string) => /[A-Z]/.test(v) },
    { label: "Minúscula",     test: (v: string) => /[a-z]/.test(v) },
    { label: "Número",        test: (v: string) => /[0-9]/.test(v) },
    { label: "Símbolo",       test: (v: string) => /[@$!%*?&]/.test(v) },
  ];

  if (/\s/.test(password)) {
    return {
      score: 0,
      color: "#EF4444",
      checklist: rules.map(({ label }) => ({ label, valid: false })),
    };
  }

  const checklist = rules.map(({ label, test }) => ({
    label,
    valid: test(password),
  }));

  const score = checklist.filter((item) => item.valid).length;

  const color =
    score <= 1 ? "#EF4444" :
    score === 2 ? "#F97316" :
    score === 3 ? "#EAB308" :
    score === 4 ? "#67f55d" :
                  "#018d06";

  return { score, color, checklist };
}