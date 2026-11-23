# Bugs e Evidências - BugBank QA

## 1. Objetivo

Registrar os comportamentos inesperados identificados durante a execução dos testes automatizados no módulo de Transferência.

Os registros incluem o cenário relacionado, o comportamento observado, o resultado esperado e as evidências disponíveis.

## 2. BUG-001 - Mensagem técnica ao enviar formulário vazio

**Cenário:** CT-TRF-005 - Deve validar os campos quando todos estiverem vazios.

**Comportamento esperado:**
A aplicação deve impedir o envio do formulário e apresentar mensagens de validação compreensíveis, indicando os campos obrigatórios.

**Comportamento observado:**
Ao enviar o formulário sem preencher os campos, a aplicação apresenta uma mensagem técnica:

`transferValue must be a number type`

**Resultado:** Falha na validação automatizada.

**Evidência:**
- Captura de tela da mensagem apresentada.
- Relatório de execução do Playwright.

**Observação:**
A mensagem apresentada parece estar relacionada a uma validação técnica, em vez de orientar o usuário sobre como corrigir o preenchimento.

---

## 3. BUG-002 - Transferência sem conta e dígito informados

**Cenário:** CT-TRF-007 - Não deve efetivar transferência sem conta e dígito.

**Comportamento esperado:**
A aplicação deve impedir a operação quando os dados da conta de destino não forem informados e preservar o saldo da conta de origem.

**Comportamento observado:**
A validação automatizada não encontrou o texto esperado `Saldo em conta R$ 1.000,00` após a tentativa de transferência.

**Resultado:** Falha na validação automatizada.

**Evidência:**
- Relatório de execução do Playwright.
- Error context gerado durante a execução.

**Observação:**
É necessário investigar o estado da aplicação após a tentativa para confirmar se houve alteração de saldo ou outro comportamento inesperado.

---

## 4. BUG-003 - Transferência sem número da conta

**Cenário:** CT-TRF-008 - Não deve efetivar transferência sem número da conta.

**Comportamento esperado:**
A aplicação deve impedir a operação quando o número da conta de destino não for informado, mesmo que o dígito esteja preenchido.

**Comportamento observado:**
A validação automatizada não encontrou o texto esperado `Saldo em conta R$ 1.000,00` após a tentativa de transferência.

**Resultado:** Falha na validação automatizada.

**Evidência:**
- Relatório de execução do Playwright.
- Error context gerado durante a execução.

**Observação:**
É necessário investigar o estado da aplicação após a tentativa para confirmar o comportamento efetivo da operação.

---

## 5. Considerações finais

Os problemas registrados foram identificados durante a execução dos testes automatizados.

As falhas foram mantidas na suíte para preservar a capacidade de detectar os comportamentos inesperados. Os registros não representam, por si só, uma confirmação da causa técnica dos problemas, que depende de investigação adicional.

A documentação das evidências permite comunicar os resultados de forma objetiva e apoiar uma eventual análise pelo time de desenvolvimento.