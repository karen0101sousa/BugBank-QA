import { expect, type Locator, type Page } from "@playwright/test";
import type { RegistrationData } from "./test-data";

// Abre a tela de cadastro e retorna o formulário.
export async function openRegistrationForm(page: Page): Promise<Locator> {
  await page.goto("/");
  await page.getByRole("button", { name: "Registrar" }).click();

  const registrationForm = page.locator("form").filter({
    has: page.locator("#toggleAddBalance"),
  });

  await expect(registrationForm).toBeVisible();

  return registrationForm;
}

// Preenche os campos do formulário de cadastro.
export async function fillRegistrationForm(
  registrationForm: Locator,
  data: RegistrationData,
): Promise<void> {
  await registrationForm.locator('input[name="name"]').fill(data.name);
  await registrationForm.locator('input[name="email"]').fill(data.email);
  await registrationForm.locator('input[name="password"]').fill(data.password);
  await registrationForm
    .locator('input[name="passwordConfirmation"]')
    .fill(data.passwordConfirmation);
}

// Realiza login com os dados informados.
export async function login(
  page: Page,
  email: string,
  password: string,
): Promise<void> {
  const loginForm = page.locator("form").filter({
    has: page.getByRole("button", { name: "Acessar" }),
  });

  await loginForm.locator('input[name="email"]').fill(email);
  await loginForm.locator('input[name="password"]').fill(password);

  await loginForm.getByRole("button", { name: "Acessar" }).click();
}
