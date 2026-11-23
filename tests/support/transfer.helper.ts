import { expect, type Page } from "@playwright/test";

import type { AccountData } from "./account.helper";

import { login } from "../cadastro/support/registration.helper";

// Faz login e abre a tela de transferência.
export async function openTransferPage(
  page: Page,
  account: AccountData,
): Promise<void> {
  await login(page, account.email, account.password);

  await expect(page.locator("#btn-TRANSFERÊNCIA")).toBeVisible();

  await page.locator("#btn-TRANSFERÊNCIA").click();

  await expect(
    page.getByPlaceholder("Informe o número da conta"),
  ).toBeVisible();
}

// Preenche os dados da transferência.
export async function fillTransferForm(
  page: Page,
  data: {
    accountNumber: string;
    digit: string;
    amount: string;
    description: string;
  },
): Promise<void> {
  await page
    .getByPlaceholder("Informe o número da conta")
    .fill(data.accountNumber);

  await page.getByPlaceholder("Informe o dígito da conta").fill(data.digit);

  await page
    .getByPlaceholder("Informe o valor da transferência")
    .fill(data.amount);

  await page.getByPlaceholder("Informe uma descrição").fill(data.description);
}

// Envia o formulário de transferência.
export async function submitTransfer(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Transferir agora" }).click();
}
