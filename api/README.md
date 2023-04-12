A maior parte do codigo desta aplicação vem do meu projeto:
https://github.com/smag-dev/edit/tree/main/backend/api

O primeiro passo é adicionar algumas configurações ao ficheiro .env:
MONGO_URI = "" link para conexão a uma mongodb
JWT_ACCESS_SECRET_KEY = "" chave para o JWT

A aplicação RestApi possui 6 endpoints(existem outros que complementam a Api) :
1-Para registo de user:
POST http://localhost:3000/users/register
Para testar passa-se no body o email e a password e este retorna o novo user e o accessToken(só é valido por 15min) para o caso de login direto
Exemplo:imagem1.png

2-Para login de user:
POST http://localhost:3000/users/login
Para testar passa-se no body o email e a password e este retorna o novo user e o accessToken(só é valido por 15min)
Exemplo:imagem2.png

3-Para listagem de produtos:
GET http://localhost:3000/products
Para testar basta chamar o endpoint.
Exemplo: imagem3.png

4-Para adicionar um produto ao carrinho de compras:
POST http://localhost:3000/cart
Para testar passa-se no body o userId, productId, price e quantity, retorna o shoppingCartId criado e a mensagem que foi adicionado com sucesso
Exemplo: imagem4.png
Se passar o shoppingCartId no bofy adiciona/atualiza o productId(imagem5.png), considerei esta situação porque o teste só fala num endpoint, mas eu criei o endpoint 4.1 que acho mais apropriado para esta situação

4.1-Para adicionar/atualizar um produto ao carrinho de compras existente:
PATCH http://localhost:3000/cart/:shoppingCartId
Para testar passa-se o shoppingCartId no link e no body userId, productId, price e quantity, retorna a mensagem que o carrinho foi atualizado com sucesso
Exemplo: imagem6.png

5-Para remover um produto do carrinho de compras:
DELETE http://localhost:3000/cart/:shoppingCartId/:productId
Para testar passa-se o shoppingCartId e o productId no link e retorn uma mensagem a dizer que o produto foi eliminado
Exemplo: imagem7.png

6-Para obter os produtos de um carrinho de compras:
GET http://localhost:3000/cart/:shoppingCartId
Para testar passa-se o shoppingCartId no link e retorna o carrinho e seus produtos
Exemplo: imagem8.png

Os exemplos acima foram supondo que o user já estava autenticado e autorizado. Para fazer a validação se está autorizado é aplicado middleware nas rotas que faz a validação do accesToken(imagem9.png)
Para testar colocar o accesToken na autorização Bearer Token, exemplo imagem10.png
