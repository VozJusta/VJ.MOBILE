export type PasswordStrength = {
  score: number;
  label: "Muito Fraca" | "Fraca" | "Aceitavel" | "Forte";
  color: string;
};

export default function passwordValidate(password: string): PasswordStrength {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;
  let label: "Muito Fraca" | "Fraca" | "Aceitavel" | "Forte";
  let color: string;

  if (score === 0) {
    label = "Muito Fraca";
    color = "#EF4444";
  } else if (score === 1) {
    label = "Fraca";
    color = "#F97316";
  } else if (score === 2) {
    label = "Aceitavel";
    color = "#EAB308";
  } else {
    label = "Forte";
    color = "#22C55E";
  }

  return { score, label, color };
}
