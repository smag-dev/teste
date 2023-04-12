O primeiro passo é adicionar algumas configurações ao ficheiro .env:
DB_TYPE - nome do gestor de base de dados que neste projeto tem de ser mysql pois é que foi instalado
DB_HOST - host da bd
DB_PORT - porta da bd
DB_USERNAME - nome do utilizador para acesso à bd
DB_PASSWORD - password do utilizador para acesso à bd
DB_NAME - nome da bd

O microserviço possui 4 endpoints:
1-Para adicionar um produto ao carrinho de compras:
POST http://localhost:7000/
Para testar passa-se no body o userId, productId, price e quantity, retorna o shoppingCartId criado e a mensagem que foi adicionado com sucesso
Se passar o shoppingCartId no body adiciona/atualiza o productId(imagem5.png), considerei esta situação porque o teste só fala num endpoint, mas eu criei o endpoint 2 que acho mais apropriado para esta situação

2-Para adicionar/atualizar um produto ao carrinho de compras existente:
PATCH http://localhost:7000/:shoppingCartId
Para testar passa-se o shoppingCartId no link e no body userId, productId, price e quantity, retorna a mensagem que o carrinho foi atualizado com sucesso

3-Para remover um produto do carrinho de compras:
DELETE http://localhost:7000/:shoppingCartId/:productId
Para testar passa-se o shoppingCartId e o productId no link e retorna uma mensagem a dizer que o produto foi eliminado

4-Para obter os produtos de um carrinho de compras:
GET http://localhost:7000/:shoppingCartId
Para testar passa-se o shoppingCartId no link e retorna o carrinho e seus produtos
