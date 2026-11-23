import { expect, type Page } from "@playwright/test";

import {
  openRegistrationForm,
  fillRegistrationForm,
} from "../cadastro/support/registration.helper";

import { createValidRegistrationData } from "../cadastro/support/test-data";

// Dados de uma conta criada durante o teste.
export type AccountData = {
  email: string;
  password: string;
  number: string;
  digit: string;
};

// Cria uma conta e captura seu número e dígito.
export async function createAccount(
  page: Page,
  withInitialBalance: boolean,
): Promise<AccountData> {
  const registrationData = createValidRegistrationData();

  const registrationForm = await openRegistrationForm(page);

  await fillRegistrationForm(registrationForm, registrationData);

  if (withInitialBalance) {
    await registrationForm.locator("#toggleAddBalance").click();
  }

  await registrationForm.getByRole("button", { name: "Cadastrar" }).click();

  const successMessage = page.getByText(
    /A conta \d+-\d+ foi criada com sucesso/,
  );

  await expect(successMessage).toBeVisible();

  const message = await successMessage.innerText();

  const accountMatch = /A conta (\d+)-(\d+) foi criada com sucesso/.exec(
    message,
  );

  if (!accountMatch) {
    throw new Error("Não foi possível capturar os dados da conta criada.");
  }

  const account: AccountData = {
    email: registrationData.email,
    password: registrationData.password,
    number: accountMatch[1]!,
    digit: accountMatch[2]!,
  };

  await page.locator("#btnCloseModal").click();

  return account;
}
