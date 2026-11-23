# Decisões do Projeto - BugBank QA

## 1. Escolha da aplicação

Foi escolhida a aplicação BugBank por oferecer fluxos bancários que permitem explorar diferentes comportamentos funcionais, como cadastro, autenticação, transferência e consulta de extrato.

Esses fluxos possibilitam trabalhar com cenários positivos e negativos, além de observar a consistência das informações entre diferentes funcionalidades.

## 2. Escolha do Playwright

O Playwright foi escolhido como ferramenta de automação por sua relevância no mercado de testes de software e por oferecer recursos para automação de aplicações web.

A escolha também teve como objetivo desenvolver conhecimentos práticos em automação com TypeScript, incluindo localização de elementos, interações, asserções e organização dos testes.

## 3. Escolha do TypeScript

O TypeScript foi utilizado para implementar os testes, permitindo trabalhar com tipagem, organização de funções e reutilização de código.

## 4. Estratégia de automação

A automação foi organizada por módulos funcionais:

- Cadastro
- Login
- Transferência
- Extrato

Essa divisão facilita a manutenção e a identificação de falhas por funcionalidade.

Foram utilizados helpers compartilhados para evitar duplicação de operações recorrentes, como criação de contas, autenticação e preenchimento do formulário de transferência.

## 5. Estratégia de execução

Os testes foram executados individualmente durante o desenvolvimento e, posteriormente, em conjunto para avaliar a regressão da suíte.

A execução foi configurada para utilizar Chromium e um worker por vez, reduzindo interferências entre testes que dependem do estado da aplicação.

## 6. Tratamento de falhas

As falhas encontradas foram mantidas na automação quando representavam comportamentos inesperados da aplicação.

Não foram alteradas as asserções apenas para obter um resultado positivo na execução. Os problemas identificados foram registrados para análise e comunicação.

## 7. Decisões de escopo

O projeto priorizou a automação funcional dos quatro módulos selecionados.

Os testes de performance com k6 foram deixados fora deste projeto, com a intenção de explorá-los separadamente e aprofundar o conhecimento sobre essa ferramenta.

## 8. Visão sobre o papel de QA

A automação foi utilizada como ferramenta de apoio à validação da aplicação, mas o trabalho não se limitou à implementação dos testes.

Durante a exploração e execução, surgiram dúvidas relacionadas às regras de negócio, comportamentos que mereciam investigação e oportunidades de melhoria para discussão com o time de desenvolvimento.

O projeto reforçou a importância de combinar conhecimento técnico, entendimento do produto e pensamento crítico para contribuir com a qualidade do software.