# Análise de Testes - BugBank

## 1. Objetivo

Analisar os principais fluxos da aplicação BugBank, identificando comportamentos esperados, condições de teste e pontos que merecem atenção antes e durante a execução dos testes.

O trabalho contempla quatro módulos: Cadastro, Login, Transferência e Extrato. A análise serviu como base para a definição dos cenários e para a implementação da automação com Playwright.

## 2. Escopo

Foram considerados os seguintes módulos e funcionalidades:

| Módulo | Funcionalidades analisadas |
|---|---|
| Cadastro | Criação de conta e opção de saldo inicial |
| Login | Autenticação e acesso à conta |
| Transferência | Envio de valores entre contas |
| Extrato | Consulta de saldo e histórico de movimentações |

O escopo priorizou os fluxos funcionais principais e situações de entrada válida e inválida. Não contempla uma avaliação completa de segurança, acessibilidade ou desempenho.

## 3. Análise por módulo

### 3.1 Cadastro

**Objetivo:** avaliar o processo de criação de uma nova conta.

Pontos analisados:
- Preenchimento dos dados necessários para cadastro.
- Validação dos campos obrigatórios.
- Confirmação de senha.
- Opção de criação de conta com saldo inicial.
- Retorno apresentado após a criação da conta.

**Ponto de atenção:** verificar se os dados informados são validados adequadamente e se a aplicação apresenta um retorno compreensível ao usuário.

### 3.2 Login

**Objetivo:** avaliar a autenticação e o acesso à conta cadastrada.

Pontos analisados:
- Acesso com credenciais válidas.
- Tentativa de acesso com credenciais inválidas.
- Preenchimento dos campos de autenticação.
- Comportamento da aplicação diante de dados incorretos.

**Ponto de atenção:** garantir que o usuário receba informações claras quando não conseguir realizar a autenticação.

### 3.3 Transferência

**Objetivo:** avaliar o fluxo de transferência entre contas e as validações envolvidas na operação.

Pontos analisados:
- Informações da conta de destino.
- Número e dígito da conta.
- Valor da transferência.
- Descrição da movimentação.
- Comportamento diante de dados incompletos ou inválidos.
- Confirmação da operação e atualização do saldo.

**Pontos de atenção identificados durante a execução:**
- Envio do formulário com todos os campos vazios apresenta uma mensagem técnica relacionada ao tipo do valor da transferência.
- A aplicação permite avançar com a transferência sem informar o número e o dígito da conta de destino.
- É importante avaliar se as mensagens de validação são compreensíveis e se as regras de negócio são aplicadas antes da efetivação da operação.

### 3.4 Extrato

**Objetivo:** avaliar a apresentação do saldo e do histórico de movimentações da conta.

Pontos analisados:
- Exibição do saldo de uma conta recém-criada.
- Exibição do saldo quando a conta possui valor inicial.
- Registro de transferências recebidas.
- Registro de transferências enviadas.
- Apresentação das informações das movimentações.

**Ponto de atenção:** verificar a consistência das informações apresentadas no extrato em relação às operações realizadas.

## 4. Pontos de atenção e riscos identificados

Durante a análise e execução, foram observados aspectos que merecem atenção:

- Validações de campos obrigatórios no fluxo de transferência.
- Clareza das mensagens apresentadas ao usuário.
- Consistência entre a operação realizada, o saldo e o extrato.
- Necessidade de esclarecer algumas regras de negócio durante a exploração da aplicação.

Os comportamentos identificados como problemas foram registrados separadamente no documento de bugs e evidências.

## 5. Estratégia de cobertura

A cobertura foi organizada por módulo, priorizando os fluxos principais e suas condições alternativas.

A automação foi implementada com Playwright e TypeScript, buscando:
- Validar os comportamentos esperados.
- Identificar comportamentos inesperados.
- Reutilizar funções auxiliares quando aplicável.
- Executar os testes individualmente e em conjunto, por meio de regressão.

A estratégia considera a automação como apoio à validação funcional, sem substituir a análise crítica do comportamento da aplicação.