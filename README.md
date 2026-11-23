# BugBank - Automação de Testes Web

## Sobre o projeto

Projeto de automação de testes funcionais desenvolvido sobre a aplicação web [BugBank](https://bugbank.netlify.app/), com o objetivo de validar fluxos bancários, identificar comportamentos inesperados e exercitar práticas de Quality Assurance (QA).

A automação foi desenvolvida com Playwright e TypeScript, contemplando quatro módulos principais: Cadastro, Login, Transferência e Extrato.

Mais do que automatizar cenários, o projeto busca demonstrar a aplicação do pensamento crítico de QA durante a análise e execução dos testes.

## Objetivos

- Planejar e executar testes funcionais.
- Identificar comportamentos inesperados e possíveis problemas de negócio.
- Desenvolver habilidades em automação com Playwright.
- Organizar testes de forma reutilizável e sustentável.
- Documentar resultados, decisões e problemas encontrados.

## Escopo dos testes

| Módulo | Cobertura |
|---|---|
| Cadastro | Criação de contas e validações cadastrais |
| Login | Autenticação e validação de credenciais |
| Transferência | Operações entre contas e validações dos dados |
| Extrato | Consulta de saldo e histórico de movimentações |

## Tecnologias utilizadas

- **Playwright:** automação de testes web.
- **TypeScript:** linguagem utilizada na implementação.
- **Node.js:** ambiente de execução.
- **Git:** controle de versão.

## Estratégia de automação

Os testes foram organizados por módulos funcionais, com separação entre arquivos de especificação e funções auxiliares.

Foram implementados helpers compartilhados para operações recorrentes, como criação de contas, autenticação e preenchimento de transferências.

A execução contempla testes individuais e regressão da suíte completa.

### Configuração do ambiente

- Navegador: Chromium.
- Plataforma: Desktop.
- Execução: Playwright Test.
- Paralelismo por arquivo: desabilitado (`fullyParallel: false`).

## Resultados da execução

A suíte de regressão contemplou 31 execuções.

| Resultado | Quantidade |
|---|---:|
| Aprovados | 28 |
| Reprovados | 3 |
| Total | 31 |

As três falhas estão concentradas no módulo de Transferência e correspondem a comportamentos inesperados identificados durante a execução.

## Problemas identificados

Durante os testes foram observados problemas relacionados a:

- Mensagem técnica apresentada ao enviar o formulário de transferência vazio.
- Ausência de validação adequada quando a conta e o dígito de destino não são informados.
- Comportamento a investigar quando somente o dígito da conta de destino é informado.

Os cenários foram mantidos na suíte para preservar a identificação desses comportamentos.

## Documentação

A documentação complementar está disponível na pasta `docs/`:

| Documento | Descrição |
|---|---|
| `test-analysis.md` | Análise dos quatro módulos e pontos de atenção |
| `test-scenarios.md` | Cenários de testes funcionais |
| `project-decisions.md` | Decisões técnicas e estratégias adotadas |
| `bugs-and-evidence.md` | Registro dos problemas identificados |

## Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.

### Instalação

Clone o repositório e acesse a pasta do projeto.

Instale as dependências:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install chromium
```

### Executar os testes

Para executar toda a suíte:

```bash
npx playwright test
```

Para executar um módulo específico:

```bash
npx playwright test tests/cadastro
```

Substitua `cadastro` pelo nome do módulo desejado.

### Visualizar o relatório

Após a execução:

```bash
npx playwright show-report
```

## Aprendizados e visão sobre QA

A escolha pelo Playwright foi motivada pela relevância do framework no contexto de automação de testes e pela oportunidade de desenvolver habilidades técnicas com TypeScript.

Entretanto, durante o projeto, ficou evidente que o trabalho de QA não se limita à implementação de testes automatizados.

Ao explorar os fluxos da aplicação, surgiram dúvidas sobre regras de negócio, comportamentos que mereciam investigação e oportunidades de melhoria que poderiam ser discutidas com o time de desenvolvimento.

A experiência reforçou a percepção de que a automação é uma ferramenta de apoio ao trabalho de QA. O conhecimento do produto, o pensamento crítico e a capacidade de questionar comportamentos são fundamentais para contribuir com a qualidade do software.

---

**Projeto desenvolvido para fins de estudo e construção de portfólio em Quality Assurance.**