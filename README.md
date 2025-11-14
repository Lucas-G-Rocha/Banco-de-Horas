# 🕒 Sistema de Registro de Horas de Trabalho

Este projeto nasceu de uma necessidade real dentro do ambiente de trabalho: acompanhar facilmente as horas trabalhadas, horas extras, atrasos e faltas sem depender do RH para consultas simples.  
A ideia surgiu para facilitar o dia a dia meu e de meus colegas — por isso desenvolvi este sistema web que registra e organiza os períodos trabalhados por cada colaborador.

Embora o sistema ainda não esteja completo, **ele já é totalmente funcional no essencial**, permitindo o registro, consulta e edição de horas trabalhadas.

---

## ✨ Funcionalidades

- **Registro de períodos trabalhados** por colaborador.  
- **Cálculo automático** de:
  - Horas trabalhadas do dia  
  - Horas extras  
  - Horas em atraso  
- **Edição de registros existentes**  
- **Remoção de registros** caso necessário  
- **Dashboard com índices gerais**:
  - Total de horas trabalhadas  
  - Horas extras acumuladas  
  - Estatísticas sobre todos os registros cadastrados  

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** – Backend da aplicação  
- **Express.js** – Estrutura base do servidor  
- **Handlebars (hbs)** – Template engine para renderização das páginas  
- **MongoDB + Mongoose** – Banco de dados e modelagem dos registros  

---

## 🚀 Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/SEU-REPO.git
   cd SEU-REPO

2. **Instale as dependências:**

`npm install`


Crie um arquivo .env com suas variáveis de ambiente:

MONGODB_URI=sua_string_de_conexão
PORT=3000


3. **Inicie o servidor:**

`npm start`


Acesse em:

`http://localhost:3000`

## 📌 Status do Projeto

🔧 Em desenvolvimento, mas funcional nas principais operações de registro e consulta.
Futuramente serão adicionadas novas features, como: relatórios completos, filtros avançados e autenticação de usuários.

## 📄 Licença

Este projeto é de uso pessoal, mas você pode adaptar ou utilizar partes conforme desejar.
