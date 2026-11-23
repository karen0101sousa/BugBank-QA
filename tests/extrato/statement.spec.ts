import { test, expect, type Page } from "@playwright/test";

import { createAccount, type AccountData } from "../support/account.helper";

import {
  openTransferPage,
  fillTransferForm,
  submitTransfer,
} from "../support/transfer.helper";

import { login } from "../cadastro/support/registration.helper";

// Faz login e abre o Extrato.
async function openStatementPage(
  page: Page,
  account: AccountData,
): Promise<void> {
  await login(page, account.email, account.password);

  await expect(page.locator("#btn-EXTRATO")).toBeVisible();

  await page.locator("#btn-EXTRATO").click();

  await expect(page.locator("#btnExit")).toBeVisible();
}

// Localiza uma movimentação específica no Extrato.
function getTransaction(page: Page, type: string) {
  return page.locator("div[class*='bank-statement__Transaction-sc']").filter({
    has: page.locator("#textTypeTransaction").filter({
      hasText: type,
    }),
  });
}

test.describe("Extrato bancário", () => {
  // CT-EXT-001: Abertura de conta sem saldo inicial.
  test("CT-EXT-001 - Deve exibir o registro de abertura de conta sem saldo", async ({
    page,
  }) => {
    const account = await createAccount(page, false);

    await openStatementPage(page, account);

    const transaction = getTransaction(page, "Abertura de conta");

    await expect(transaction).toHaveCount(1);

    await expect(transaction.locator("#textDateTransaction")).toHaveText(
      /\d{2}\/\d{2}\/\d{4}/,
    );

    await expect(transaction.locator("#textTypeTransaction")).toHaveText(
      "Abertura de conta",
    );

    await expect(transaction.locator("#textDescription")).toHaveText(
      "Cliente optou por não ter saldo ao abrir conta",
    );

    await expect(transaction.locator("#textTransferValue")).toHaveText(
      /R\$\s*0,00/,
    );
  });

  // CT-EXT-002: Abertura de conta com saldo inicial.
  test("CT-EXT-002 - Deve exibir o registro de abertura de conta com saldo", async ({
    page,
  }) => {
    const account = await createAccount(page, true);

    await openStatementPage(page, account);

    const transaction = getTransaction(page, "Abertura de conta");

    await expect(transaction).toHaveCount(1);

    await expect(transaction.locator("#textDateTransaction")).toHaveText(
      /\d{2}\/\d{2}\/\d{4}/,
    );

    await expect(transaction.locator("#textTypeTransaction")).toHaveText(
      "Abertura de conta",
    );

    await expect(transaction.locator("#textDescription")).toHaveText(
      "Saldo adicionado ao abrir conta",
    );

    await expect(transaction.locator("#textTransferValue")).toHaveText(
      /R\$\s*1\.000,00/,
    );
  });

  // CT-EXT-003: Transferência recebida.
  test("CT-EXT-003 - Deve exibir uma transferência recebida no Extrato", async ({
    page,
  }) => {
    const origin = await createAccount(page, true);
    const destination = await createAccount(page, false);

    // Acessa a conta de origem e realiza a transferência.
    await openTransferPage(page, origin);

    await fillTransferForm(page, {
      accountNumber: destination.number,
      digit: destination.digit,
      amount: "100",
      description: "Recebimento para teste do Extrato",
    });

    await submitTransfer(page);

    // Confirma a mensagem de sucesso da transferência.
    await expect(
      page.getByText("Transferencia realizada com sucesso"),
    ).toBeVisible();

    // Fecha o modal de confirmação da transferência.
    await page.locator("#btnCloseModal").click();

    // Sai da conta de origem.
    await page.locator("#btnExit").click();

    // Entra na conta de destino e abre o Extrato.
    await openStatementPage(page, destination);

    const transaction = getTransaction(page, "Transferência recebida");

    await expect(transaction).toHaveCount(1);

    await expect(transaction.locator("#textDateTransaction")).toHaveText(
      /\d{2}\/\d{2}\/\d{4}/,
    );

    await expect(transaction.locator("#textTypeTransaction")).toHaveText(
      "Transferência recebida",
    );

    await expect(transaction.locator("#textDescription")).toHaveText(
      "Recebimento para teste do Extrato",
    );

    await expect(transaction.locator("#textTransferValue")).toHaveText(
      /R\$\s*100,00/,
    );
  });

  // CT-EXT-004: Transferência enviada.
  test("CT-EXT-004 - Deve exibir uma transferência enviada no Extrato", async ({
    page,
  }) => {
    const origin = await createAccount(page, true);
    const destination = await createAccount(page, false);

    // Acessa a conta de origem e abre a tela de transferência.
    await openTransferPage(page, origin);

    // Preenche os dados da transferência.
    await fillTransferForm(page, {
      accountNumber: destination.number,
      digit: destination.digit,
      amount: "100",
      description: "Envio para teste do Extrato",
    });

    // Realiza a transferência.
    await submitTransfer(page);

    // Confirma a mensagem de sucesso.
    await expect(
      page.getByText("Transferencia realizada com sucesso"),
    ).toBeVisible();

    // Fecha o modal de confirmação.
    await page.locator("#btnCloseModal").click();

    // Sai da conta de origem.
    await page.locator("#btnExit").click();

    // Faz login novamente na conta de origem e abre o Extrato.
    await openStatementPage(page, origin);

    // Localiza a transferência enviada.
    const transaction = getTransaction(page, "Transferência enviada");

    await expect(transaction).toHaveCount(1);

    // Valida a data da movimentação.
    await expect(transaction.locator("#textDateTransaction")).toHaveText(
      /\d{2}\/\d{2}\/\d{4}/,
    );

    // Valida o tipo de movimentação.
    await expect(transaction.locator("#textTypeTransaction")).toHaveText(
      "Transferência enviada",
    );

    // Valida a descrição.
    await expect(transaction.locator("#textDescription")).toHaveText(
      "Envio para teste do Extrato",
    );

    // Valida o valor negativo da transferência.
    await expect(transaction.locator("#textTransferValue")).toHaveText(
      /-R\$\s*100,00/,
    );
  });
});
