# Cenários de Testes - BugBank

## 1. Cadastro

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT-CAD-001 a CT-CAD-011 | Cenários de criação de conta e validação dos dados cadastrais | A aplicação deve criar contas com dados válidos e apresentar validações adequadas para dados inválidos. |

## 2. Login

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT-LOG-001 a CT-LOG-005 | Cenários de autenticação com diferentes condições de entrada | A aplicação deve permitir o acesso com credenciais válidas e rejeitar credenciais inválidas. |

## 3. Transferência

| ID | Cenário | Resultado esperado | Resultado obtido |
|---|---|---|---|
| CT-TRF-001 a CT-TRF-004 | Transferências com diferentes condições e dados de entrada | Processar transferências válidas e apresentar os resultados esperados. | Conforme execução individual dos cenários. |
| CT-TRF-005 | Envio com todos os campos vazios | Impedir o envio e apresentar validações adequadas. | Falhou: aplicação apresenta mensagem técnica relacionada ao tipo do valor. |
| CT-TRF-006 | Transferência sem descrição | Permitir a operação sem descrição, conforme comportamento observado. | Aprovado. |
| CT-TRF-007 | Transferência sem conta e dígito | Impedir a operação e preservar o saldo de origem. | Falhou: validação do saldo não encontrou o valor esperado. |
| CT-TRF-008 | Transferência sem número da conta | Impedir a operação e preservar o saldo de origem. | Falhou: validação do saldo não encontrou o valor esperado. |
| CT-TRF-009 a CT-TRF-010 | Validações adicionais da transferência | Rejeitar dados inválidos e preservar a integridade da operação. | Conforme execução individual dos cenários. |

## 4. Extrato

| ID | Cenário | Resultado esperado | Resultado obtido |
|---|---|---|---|
| CT-EXT-001 | Conta criada sem saldo inicial | Apresentar o saldo inicial corretamente. | Aprovado. |
| CT-EXT-002 | Conta criada com saldo inicial | Apresentar o saldo inicial corretamente. | Aprovado. |
| CT-EXT-003 | Transferência recebida | Exibir a movimentação recebida no extrato. | Aprovado. |
| CT-EXT-004 | Transferência enviada | Exibir a movimentação enviada no extrato. | Aprovado. |

## 5. Resultado geral

A suíte de regressão contemplou 31 execuções:

- 28 testes aprovados.
- 3 testes reprovados.
- As três falhas estão relacionadas ao módulo de Transferência e foram mantidas para investigação, sem alteração das validações automatizadas para mascarar os problemas encontrados.

**Observação:** os resultados representam o comportamento observado durante a execução dos testes e não uma certificação de ausência de defeitos nos módulos avaliados.