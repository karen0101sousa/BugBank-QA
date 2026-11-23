import { test, expect, type Page } from "@playwright/test";

import { createAccount, type AccountData } from "../support/account.helper";

import {
  openTransferPage,
  fillTransferForm,
  submitTransfer,
} from "../support/transfer.helper";

// Prepara duas contas e deixa o usuário de origem na tela de transferência.
async function prepareTransfer(
  page: Page,
  originWithBalance = true,
): Promise<{ origin: AccountData; destination: AccountData }> {
  const origin = await createAccount(page, originWithBalance);
  const destination = await createAccount(page, false);

  await openTransferPage(page, origin);

  return { origin, destination };
}

test.describe("Transferência bancária", () => {
  // CT-TRF-001: Transferência com dados válidos.
  test("CT-TRF-001 - Deve realizar transferência com dados válidos", async ({
    page,
  }) => {
    const { destination } = await prepareTransfer(page);

    await fillTransferForm(page, {
      accountNumber: destination.number,
      digit: destination.digit,
      amount: "500",
      description: "Transferência entre contas",
    });

    await submitTransfer(page);

    await expect(
      page.getByText("Transferencia realizada com sucesso"),
    ).toBeVisible();
  });

  // CT-TRF-002: Conta de destino inexistente.
  test("CT-TRF-002 - Deve rejeitar transferência para conta inexistente", async ({
    page,
  }) => {
    await prepareTransfer(page);

    await fillTransferForm(page, {
      accountNumber: "999999",
      digit: "9",
      amount: "100",
      description: "Conta inexistente",
    });

    await submitTransfer(page);

    await expect(page.getByText("Conta inválida ou inexistente")).toBeVisible();
  });

  // CT-TRF-003: Saldo insuficiente.
  test("CT-TRF-003 - Deve rejeitar transferência com saldo insuficiente", async ({
    page,
  }) => {
    const { destination } = await prepareTransfer(page, false);

    await fillTransferForm(page, {
      accountNumber: destination.number,
      digit: destination.digit,
      amount: "1",
      description: "Saldo insuficiente",
    });

    await submitTransfer(page);

    await expect(
      page.getByText("Você não tem saldo suficiente para essa transação"),
    ).toBeVisible();
  });

  // CT-TRF-004: Valor zero ou negativo.
  const invalidAmountScenarios = [
    { description: "valor zero", amount: "0" },
    { description: "valor negativo", amount: "-1" },
  ];

  for (const scenario of invalidAmountScenarios) {
    test(`CT-TRF-004 - Deve rejeitar transferência com ${scenario.description}`, async ({
      page,
    }) => {
      const { destination } = await prepareTransfer(page);

      await fillTransferForm(page, {
        accountNumber: destination.number,
        digit: destination.digit,
        amount: scenario.amount,
        description: "Teste de valor inválido",
      });

      await submitTransfer(page);

      await expect(
        page.getByText("Valor da transferência não pode ser 0 ou negativo"),
      ).toBeVisible();
    });
  }

  // CT-TRF-005: Todos os campos vazios.
  test("CT-TRF-005 - Deve validar os campos quando todos estiverem vazios", async ({
    page,
  }) => {
    await prepareTransfer(page);

    await submitTransfer(page);

    // Não deve apresentar mensagem técnica de conversão de valor.
    await expect(
      page.getByText(/transferValue must be a `number` type/),
    ).toBeHidden();
  });

  // CT-TRF-006: Descrição vazia.
  // Teste de caracterização: documenta o comportamento atualmente observado.
  test("CT-TRF-006 - Deve permitir transferência sem descrição", async ({
    page,
  }) => {
    const { destination } = await prepareTransfer(page);

    await fillTransferForm(page, {
      accountNumber: destination.number,
      digit: destination.digit,
      amount: "1",
      description: "",
    });

    await submitTransfer(page);

    await expect(
      page.getByText("Transferencia realizada com sucesso"),
    ).toBeVisible();
  });

  // CT-TRF-007: Número da conta e dígito vazios.
  test("CT-TRF-007 - Não deve efetivar transferência sem conta e dígito", async ({
    page,
  }) => {
    await prepareTransfer(page);

    await fillTransferForm(page, {
      accountNumber: "",
      digit: "",
      amount: "1",
      description: "Conta não informada",
    });

    await submitTransfer(page);

    // O saldo de origem deve permanecer inalterado.
    await expect(page.getByText("Saldo em conta R$ 1.000,00")).toBeVisible();
  });

  // CT-TRF-008: Somente o dígito informado.
  test("CT-TRF-008 - Não deve efetivar transferência sem número da conta", async ({
    page,
  }) => {
    const { destination } = await prepareTransfer(page);

    await fillTransferForm(page, {
      accountNumber: "",
      digit: destination.digit,
      amount: "1",
      description: "Número da conta não informado",
    });

    await submitTransfer(page);

    // O saldo de origem deve permanecer inalterado.
    await expect(page.getByText("Saldo em conta R$ 1.000,00")).toBeVisible();
  });

  // CT-TRF-009: Dígito incorreto.
  test("CT-TRF-009 - Deve rejeitar transferência com dígito incorreto", async ({
    page,
  }) => {
    const { destination } = await prepareTransfer(page);

    const wrongDigit = destination.digit === "0" ? "1" : "0";

    await fillTransferForm(page, {
      accountNumber: destination.number,
      digit: wrongDigit,
      amount: "100",
      description: "Dígito incorreto",
    });

    await submitTransfer(page);

    await expect(page.getByText("Conta inválida ou inexistente")).toBeVisible();
  });

  // CT-TRF-010: Transferência para a própria conta.
  test("CT-TRF-010 - Deve impedir transferência para a própria conta", async ({
    page,
  }) => {
    const origin = await createAccount(page, true);

    await openTransferPage(page, origin);

    await fillTransferForm(page, {
      accountNumber: origin.number,
      digit: origin.digit,
      amount: "100",
      description: "Transferência para a própria conta",
    });

    await submitTransfer(page);

    await expect(
      page.getByText("Nao pode transferir pra mesmo conta"),
    ).toBeVisible();
  });
});
