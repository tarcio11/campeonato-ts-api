# Update-Avatar

> ## Caso de sucesso:
1. ✅ Recebe uma requisição do tipo **PATCH** na rota **/api/users/avatar**
2. ✅ Valida dados obrigatórios **name (avatar)** 
3. ✅ Valida se a requisição foi feita por um usuário
4. ✅ Fazer upload do arquivo para nuvem (aws)
5. ✅ Criar um registro avatar com o name fornecido caso não tenha um registo
6. ✅ Atualiza um avatar com o name fornecido caso já tenha um registro
7. ✅ Retorna 200 com o caminho do avatarUrl

> ## Exceções:
1. ✅ Retorna erro 404 se a API não existir
2. ✅ Retorna erro 400 se **name** não for fornecidos pelo client
3. ✅ Retorna erro 403 se não for um usuário
4. ✅ Retorna erro 500 se der erro ao fazer upload na aws
5. ✅ Retorna erro 500 se der erro ao tentar atualizar o usuário com avatar fornecido
6. ✅ Retorna erro 500 se der erro ao tentar carregar o usuário.