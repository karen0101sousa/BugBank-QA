
import { test, expect, type Locator, type Page } from "@playwright/test";

type RegistrationData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

// Gera um e-mail utilizando o horário atual.
function generateUniqueEmail(): string {
  return `usuario.${Date.now()}@example.com`;
}

// Cria dados válidos para um cadastro.
function createValidRegistrationData(): RegistrationData {
  return {
    name: "Maria Oliveira",
    email: generateUniqueEmail(),
    password: "QaTeste@2026",
    passwordConfirmation: "QaTeste@2026",
  };
}

// Abre a tela de cadastro e retorna o formulário.
async function openRegistrationForm(page: Page): Promise<Locator> {
  await page.goto("/");
  await page.getByRole("button", { name: "Registrar" }).click();

  const registrationForm = page.locator("form").filter({
    has: page.locator("#toggleAddBalance"),
  });

  await expect(registrationForm).toBeVisible();

  return registrationForm;
}

// Preenche os campos do formulário de cadastro.
async function fillRegistrationForm(
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
async function login(
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

test.describe("Cadastro de usuário", () => {
  test("CT-CAD-001 - Deve cadastrar usuário com saldo inicial habilitado", async ({
    page,
  }) => {
    const registrationForm = await openRegistrationForm(page);
    const registrationData = createValidRegistrationData();

    await fillRegistrationForm(registrationForm, registrationData);

    await registrationForm.locator("#toggleAddBalance").click();

    await registrationForm.getByRole("button", { name: "Cadastrar" }).click();

    await expect(
      page.getByText(/A conta \d+-\d+ foi criada com sucesso/),
    ).toBeVisible();

    await page.getByText("Fechar").click();

    await login(
      page,
      registrationData.email,
      registrationData.password,
    );

    await expect(
      page.getByText("Saldo em conta R$ 1.000,00"),
    ).toBeVisible();
  });

  test("CT-CAD-002 - Deve cadastrar usuário sem saldo inicial", async ({
    page,
  }) => {
    const registrationForm = await openRegistrationForm(page);
    const registrationData = createValidRegistrationData();

    await fillRegistrationForm(registrationForm, registrationData);

    await registrationForm.getByRole("button", { name: "Cadastrar" }).click();

    await expect(
      page.getByText(/A conta \d+-\d+ foi criada com sucesso/),
    ).toBeVisible();

    await page.getByText("Fechar").click();

    await login(
      page,
      registrationData.email,
      registrationData.password,
    );

    await expect(
      page.getByText("Saldo em conta R$ 0,00"),
    ).toBeVisible();
  });

  // CT-CAD-003: validação dos campos obrigatórios.
  const requiredFieldScenarios = [
    {
      description: "nome vazio",
      data: {
        name: "",
        email: "teste.nome@example.com",
        password: "QaTeste@2026",
        passwordConfirmation: "QaTeste@2026",
      },
      field: "name",
    },
    {
      description: "e-mail vazio",
      data: {
        name: "Maria Oliveira",
        email: "",
        password: "QaTeste@2026",
        passwordConfirmation: "QaTeste@2026",
      },
      field: "email",
    },
    {
      description: "senha vazia",
      data: {
        name: "Maria Oliveira",
        email: "teste.senha@example.com",
        password: "",
        passwordConfirmation: "QaTeste@2026",
      },
      field: "password",
    },
    {
      description: "confirmação de senha vazia",
      data: {
        name: "Maria Oliveira",
        email: "teste.confirmacao@example.com",
        password: "QaTeste@2026",
        passwordConfirmation: "",
      },
      field: "passwordConfirmation",
    },
  ];

  for (const scenario of requiredFieldScenarios) {
    test(`CT-CAD-003 - Deve rejeitar cadastro com ${scenario.description}`, async ({
      page,
    }) => {
      const registrationForm = await openRegistrationForm(page);

      await fillRegistrationForm(registrationForm, scenario.data);

      await registrationForm.getByRole("button", { name: "Cadastrar" }).click();

      if (scenario.field === "name") {
        await expect(
          page.getByText("Nome não pode ser vazio."),
        ).toBeVisible();
      } else {
        const field = registrationForm.locator(
          `input[name="${scenario.field}"]`,
        );

        await expect(
          field.locator("xpath=following-sibling::p"),
        ).toHaveText("É campo obrigatório");
      }
    });
  }

  // CT-CAD-004: senhas diferentes.
  test("CT-CAD-004 - Deve rejeitar cadastro quando as senhas forem diferentes", async ({
    page,
  }) => {
    const registrationForm = await openRegistrationForm(page);

    await fillRegistrationForm(registrationForm, {
      name: "Maria Oliveira",
      email: "teste.divergencia@example.com",
      password: "QaTeste@2026",
      passwordConfirmation: "QaTeste@2027",
    });

    await registrationForm.getByRole("button", { name: "Cadastrar" }).click();

    await expect(
      page.getByText("As senhas não são iguais."),
    ).toBeVisible();
  });

  // CT-CAD-005: validação de formatos de e-mail inválidos.
  const invalidEmailScenarios = [
    {
      description: "sem @",
      email: "usuarioemail.com",
    },
    {
      description: "sem domínio",
      email: "usuario@",
    },
    {
      description: "sem nome de usuário",
      email: "@email.com",
    },
    {
      description: "sem extensão de domínio",
      email: "usuario@email",
    },
  ];

  for (const scenario of invalidEmailScenarios) {
    test(`CT-CAD-005 - Deve rejeitar e-mail ${scenario.description}`, async ({
      page,
    }) => {
      const registrationForm = await openRegistrationForm(page);

      await fillRegistrationForm(registrationForm, {
        name: "Maria Oliveira",
        email: scenario.email,
        password: "QaTeste@2026",
        passwordConfirmation: "QaTeste@2026",
      });

      const emailField = registrationForm.locator('input[name="email"]');

      await expect(
        emailField.locator("xpath=following-sibling::p"),
      ).toHaveText("Formato inválido");
    });
  }
});
