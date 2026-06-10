# 🚀 Extrator Inteligente

Sistema de análise textual desenvolvido com **FastAPI**, **React**, **spaCy**, **MySQL** e **Docker**.

O projeto permite cadastrar textos, extrair palavras-chave automaticamente, armazenar os resultados em banco de dados e visualizar análises através de uma interface web moderna.

---

## 📖 Sobre o Projeto

O Extrator Inteligente foi criado com o objetivo de estudar e integrar diferentes tecnologias utilizadas no desenvolvimento Full Stack moderno.

Ao receber um texto, o sistema realiza:

* Extração automática de palavras-chave
* Processamento de linguagem natural (NLP)
* Armazenamento dos resultados em banco de dados
* Histórico completo das análises realizadas
* Edição e exclusão de registros
* Dashboard com estatísticas gerais

---

## 🛠️ Tecnologias Utilizadas

### Backend

* Python
* FastAPI
* SQLAlchemy
* spaCy
* PyMySQL
* MySQL

### Frontend

* React
* TypeScript
* Bootstrap
* Vite

### DevOps

* Docker
* Docker Compose

### Controle de Versão

* Git
* GitHub

---

## 🏗️ Arquitetura do Projeto

```text
Frontend React
       │
       ▼
FastAPI REST API
       │
       ▼
Processamento NLP (spaCy)
       │
       ▼
MySQL Database
```

---

## ✨ Funcionalidades

### 📄 Cadastro de Texto

Permite inserir textos para análise automática.

### 🏷️ Extração de Palavras-chave

O spaCy processa o conteúdo e identifica os termos mais relevantes.

### 📚 Histórico de Análises

Exibe todas as análises já realizadas.

### ✏️ Edição

Permite atualizar textos previamente cadastrados.

### 🗑️ Exclusão

Remove análises do banco de dados.

### 📊 Dashboard

Apresenta:

* Total de análises
* Total de palavras-chave encontradas
* Última análise realizada
* Palavra mais frequente

### 🔍 Busca Local

Filtra análises diretamente no frontend sem necessidade de nova consulta à API.

---

## 🐳 Executando com Docker

### Clonar o repositório

```bash
git clone https://github.com/seu-usuario/extrator_inteligente.git
```

### Entrar na pasta

```bash
cd extrator_inteligente
```

### Subir os containers

```bash
docker compose up --build
```

---

## 🌐 Acessos

Frontend:

```text
http://localhost:5173
```

API:

```text
http://localhost:8000
```

Documentação Swagger:

```text
http://localhost:8000/docs
```

---

## 📚 Aprendizados

Durante o desenvolvimento deste projeto foram estudados:

* APIs REST com FastAPI
* Integração React + Backend
* Processamento de Linguagem Natural (NLP)
* Banco de Dados MySQL
* ORM SQLAlchemy
* Dockerização de aplicações
* Containers e Docker Compose
* Controle de versão com Git e GitHub

---

## 🚀 Próximos Passos

* Autenticação de usuários
* Dashboard avançado
* Estatísticas em gráficos
* Deploy em nuvem
* Testes automatizados
* Exportação de análises

---

## 👨‍💻 Autor

Pedro Henrique

Projeto desenvolvido como parte dos estudos em desenvolvimento Full Stack, integração de APIs, processamento de linguagem natural e conteinerização com Docker.
