# Listar usuários

> ## Caso de sucesso

1. ⛔️ Recebe uma requisição do tipo **GET** na rota **/api/users**
2. ⛔️ Valida se a requisição foi feita por um **usuário**
3. ✅ Retorna **204** se não tiver nenhum usuário
4. ✅ Retorna **200** com uma lista de usuários

> ## Exceções

1. ⛔️ Retorna erro **404** se a API não existir
2. ⛔️ Retorna erro **403** se não for um usuário
3. ✅ Retorna erro **500** se der erro ao tentar carregar uma lista de usuários