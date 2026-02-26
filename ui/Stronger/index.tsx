

export type PasswordStrength = {
  score: number;
  color: string;
};

export default function passwordValidate(password: string): PasswordStrength {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;
  let color: string;

  if (score === 1) {
    color = "#EF4444";
  } else if (score === 2) {
    color = "#F97316";
  } else if (score === 3) {
    color = "#EAB308";
  } else if (score === 4) {
    color = "#67f55d";
  } else {
    color = "#018d06";
  }

  return { score, color };
}
