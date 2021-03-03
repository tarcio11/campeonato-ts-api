# Cadastro

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/signup**
2. ✅ Valida dados obrigatórios **name**, **email** e **password** 
4. ✅ Valida que o campo **email** é um e-mail válido
5. ⛔️ **Valida** se já existe um usuário com o email fornecido
6. ✅ Gera uma senha **criptografada** (essa senha não pode ser descriptografada)
7. ✅ **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptorafada
10. ✅ Retorna **200** com um boolean true

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se name, email ou password não forem fornecidos pelo client
4. ✅ Retorna erro **400** se o campo email for um e-mail inválido
5. ⛔️ Retorna erro **403** se o email fornecido já estiver em uso
6. ✅ Retorna erro **500** se der erro ao tentar gerar uma senha criptografada
7. ✅ Retorna erro **500** se der erro ao tentar criar a conta do usuário