Sistema de Cadastro e Login Seguro com Email

Este projeto implementa um sistema completo de autenticação de usuários com validação por e-mail, segurança e boas práticas de desenvolvimento fullstack.

deploy: https://luminus-book.vercel.app/

💡 Funcionalidades

Cadastro de usuários com validação de campos.

Login com verificação via código enviado por e-mail (tempo limitado de expiração).

Senhas criptografadas com bcrypt.

Gerenciamento do estado do usuário com Context API + UserContext.

CRUD de usuários no backend.

Frontend moderno com React.js + Tailwind CSS.

Backend robusto com Node.js + Sequelize + MySQL.

🔐 Segurança

Cada usuário precisa validar o login através de um código enviado diretamente para o e-mail.

Código expira em tempo limitado, garantindo que somente o dono da conta tenha acesso.

Senhas nunca são armazenadas em texto plano (hash com bcrypt).

🖥️ Tecnologias Utilizadas

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express, Sequelize, MySQL

Autenticação: JWT, bcrypt

Envio de e-mails: Nodemailer

Gerenciamento de estado: Context API + UserContext
