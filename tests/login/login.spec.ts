
import { test, expect } from "@playwright/test";

import {
  openRegistrationForm,
  fillRegistrationForm,
  login,
} from "../cadastro/support/registration.helper";

import { createValidRegistrationData } from "../cadastro/support/test-data";

test.describe("Login de usuário", () => {
  // CT-LOG-001: Login com credenciais válidas.
  test("CT-LOG-001 - Deve realizar login com credenciais válidas", async ({
    page,
  }) => {
    const registrationData = createValidRegistrationData();

    // Pré-condição: cadastrar um usuário.
    const registrationForm = await openRegistrationForm(page);

    await fillRegistrationForm(registrationForm, registrationData);

    await registrationForm.getByRole("button", { name: "Cadastrar" }).click();

    await expect(
      page.getByText(/A conta \d+-\d+ foi criada com sucesso/),
    ).toBeVisible();

    await page.getByText("Fechar").click();

    // Realizar login com as credenciais cadastradas.
    await login(
      page,
      registrationData.email,
      registrationData.password,
    );

    // Validar acesso à conta.
    await expect(
      page.getByText("Saldo em conta R$ 0,00"),
    ).toBeVisible();
  });

  // CT-LOG-002: Login com senha vazia.
  test("CT-LOG-002 - Deve impedir login com senha vazia", async ({
    page,
  }) => {
    await page.goto("/");

    const loginForm = page.locator("form").filter({
      has: page.getByRole("button", { name: "Acessar" }),
    });

    await loginForm.locator('input[name="email"]').fill("usuario@example.com");

    await loginForm.getByRole("button", { name: "Acessar" }).click();

    await expect(
      loginForm
        .locator('input[name="password"]')
        .locator("xpath=following-sibling::p"),
    ).toHaveText("É campo obrigatório");
  });

  // CT-LOG-003: Login com e-mail vazio.
  test("CT-LOG-003 - Deve impedir login com e-mail vazio", async ({
    page,
  }) => {
    await page.goto("/");

    const loginForm = page.locator("form").filter({
      has: page.getByRole("button", { name: "Acessar" }),
    });

    await loginForm.locator('input[name="password"]').fill("Senha123");

    await loginForm.getByRole("button", { name: "Acessar" }).click();

    await expect(
      loginForm
        .locator('input[name="email"]')
        .locator("xpath=following-sibling::p"),
    ).toHaveText("É campo obrigatório");
  });

  // CT-LOG-004: Login com e-mail e senha vazios.
  test("CT-LOG-004 - Deve impedir login com e-mail e senha vazios", async ({
    page,
  }) => {
    await page.goto("/");

    const loginForm = page.locator("form").filter({
      has: page.getByRole("button", { name: "Acessar" }),
    });

    await loginForm.getByRole("button", { name: "Acessar" }).click();

    await expect(
      loginForm
        .locator('input[name="email"]')
        .locator("xpath=following-sibling::p"),
    ).toHaveText("É campo obrigatório");

    await expect(
      loginForm
        .locator('input[name="password"]')
        .locator("xpath=following-sibling::p"),
    ).toHaveText("É campo obrigatório");
  });

  // CT-LOG-005: Login com credenciais inválidas.
  test("CT-LOG-005 - Deve impedir login com credenciais inválidas", async ({
    page,
  }) => {
    await page.goto("/");

    const loginForm = page.locator("form").filter({
      has: page.getByRole("button", { name: "Acessar" }),
    });

    await loginForm.locator('input[name="email"]').fill("invalido@example.com");
    await loginForm.locator('input[name="password"]').fill("SenhaIncorreta123");

    await loginForm.getByRole("button", { name: "Acessar" }).click();

    await expect(
      page.getByText(
        "Usuário ou senha inválido. Tente novamente ou verifique suas informações!",
      ),
    ).toBeVisible();
  });
});
