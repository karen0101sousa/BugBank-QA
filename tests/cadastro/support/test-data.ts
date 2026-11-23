export type RegistrationData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

// Gera um e-mail utilizando o horário atual.
export function generateUniqueEmail(): string {
  return `usuario.${Date.now()}@example.com`;
}

// Cria dados válidos para um cadastro.
export function createValidRegistrationData(): RegistrationData {
  return {
    name: "Maria Oliveira",
    email: generateUniqueEmail(),
    password: "QaTeste@2026",
    passwordConfirmation: "QaTeste@2026",
  };
}
