<h1 align="center">
	Foodfy
</h1>

<p align="center">
	<img alt="Author" src="https://img.shields.io/badge/Author-Jean%20Fernandes%20de%20Macedo-6558c3?style=plastic" />
	<img alt="License" src="https://img.shields.io/badge/license-MIT-6558C3?style=plastic" />
	<img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/JFMacedo/foodfy-final?color=6558C3&style=plastic" />
	<img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/JFMacedo/foodfy-final?color=6558C3&style=plastic" />
	<img alt="License" src="https://img.shields.io/badge/status-Conclu%C3%ADdo-6558C3?style=plastic" />
</p>

<div align="center">
	<span>
		<p>Site</p>
		<img src="https://media.giphy.com/media/k3kha2nr5K7vY6LFFj/giphy.gif" />
	</span>
	<span>
		<p>Área Restrita</p>
		<img src="https://media.giphy.com/media/Q1G3bOPXX2IzXixR5h/giphy.gif" />
	</span>
</div>

## Sobre

O projeto **Foodfy** é um site de receitas que foi criado como desafio do curso **Bootcamp LaunchBase** da **Rocketseat** com o intuito de colocar em prática todo conteúdo estudado durante o curso.

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [NodeJS](https://nodejs.org/pt-br/)
- [Express](https://expressjs.com/pt-br/)
- [Nodemon](https://nodemon.io/)
- [Nodemailer](https://nodemailer.com/about/)
- [BcryptJS](https://github.com/dcodeIO/bcrypt.js)
- [Multer](https://github.com/expressjs/multer)
- [Faker.js](https://github.com/Marak/Faker.js)
- [PostgreSQL](https://www.postgresql.org/)

## Como baixar o projeto e rodar em ambiente de desenvolvimento

Para rodas o projeto você precisa antes ter instalado:
- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/pt-br/)
- [PostgreSQL](https://www.postgresql.org/)

Você vai precisar também ter uma conta do [mailtrap](https://mailtrap.io/).

```zsh
#No terminal rode o seguinte comando
$ git clone http://github.com/JFMacedo/foodfy-final.git

#Entre na pasta do projeto
$ cd foodfy-final

#Instale as pedendências
$ npm install
```

Para rodar o projeto será necessário criar o banco de dadps as tabelas, para isso utilize o arquivo `database.sql` que está na raiz do projeto.

Para realizar a conexão com o banco de dados e o mailtrap é necessário criar um arquivo `.env` na raiz do projeto e inserir suas credenciais entre as aspas do exemplo abaixo:
```zsh
#Usuário do banco de dados
DB_USER=''
#Senha do banco de dados
DB_PASSWORD=''
#Porta do banco de dados
DB_PORT=''
#Nome de banco de daods
DB_DATABASE=''
#Senha para as sessões (Pode ser qualqueer coisa)
SESSION_SECRET=''
#Usuário para conexão com o mailtrap
MAILER_USER=''
#Senha para conexão com o mailtrap
MAILER_PASS=''
```

Após realizar todos os passos anterios será possivel popular o banco de dados com o comando:
```zsh
$ node seed.js
```

Agora é só rodar o projeto:
```zsh
$ npm run dev
```

## Acesso a área restrita

Todos os usuários criados no `seed.js` são administrativos, então todos tem acesso total a parte administrativa, a senha padrão de acesso para eles é `111`.

---

Desenvolvido por [Jean Fernandes de Macedo](https://github.com/JFMcacedo)

[![Linkedin Badge](https://img.shields.io/badge/-Jean%20Fernandes%20de%20Macedo-0077B5?style=plastic&logo=Linkedin&link=https://www.linkedin.com/in/jean-fernandes-de-macedo-b843a3194/)](https://www.linkedin.com/in/jean-fernandes-de-macedo-b843a3194/) 
[![Gmail Badge](https://img.shields.io/badge/-jfmacedo91@gmail.com-c14438?style=plastic&logo=Gmail&logoColor=white&link=mailto:jfmacedo91@gmail.com)](mailto:jfmacedo91@gmail.com)