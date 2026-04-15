#  VozJusta - Mobile App

<div align="center">

### **Acesso à Justiça na Palma da Mão**

Aplicativo mobile desenvolvido para permitir que cidadãos iniciem casos jurídicos, enviem documentos e acompanhem o andamento de seus processos de forma simples, segura e acessível.

</div>

---

#  Sobre o Aplicativo

O **VozJusta Mobile** é a interface principal utilizada pelos cidadãos para interagir com a plataforma.  

A aplicação permite que qualquer pessoa possa:

- Descrever seu problema jurídico em linguagem simples
- Enviar documentos e evidências
- Receber diagnósticos preliminares
- Acompanhar o andamento do caso
- Receber notificações em tempo real

O aplicativo se conecta à **API VozJusta**, que processa dados, executa o pipeline de IA e coordena a comunicação com advogados.

---

#  Arquitetura Mobile

O aplicativo foi desenvolvido utilizando **React Native**, garantindo uma experiência nativa tanto para **Android** quanto para **iOS**.

A arquitetura segue princípios de:

- **Separação de responsabilidades**
- **Componentização reutilizável**
- **Integração direta com APIs REST e WebSockets**

Isso permite que a aplicação seja **rápida, escalável e fácil de manter**.

---

#  Stack Tecnológica

## Core Mobile

- **React Native**
- **TypeScript**
- **Expo / CLI (dependendo do ambiente)**
- **Flexbox Layout System**

---

## Comunicação com Backend

- **REST API** para operações principais
- **WebSockets** para atualizações em tempo real
- **Axios / Fetch API** para requisições HTTP

---

## Gerenciamento de Estado

- **React Query** – gerenciamento de dados assíncronos
- **Zustand** – estado global leve para sessões e dados do usuário

---

## Interface e UX

- **Componentes nativos** do Android e iOS
- **Flexbox** para layouts responsivos
- **Componentização reutilizável**

---

#  Como Iniciar

## Pré-requisitos

- Node.js **>= 20**
- pnpm **>= 8**
- Android Studio (para Android)
- Xcode (para iOS – macOS)

---

#  Instalação

```bash
git clone https://github.com/xsalles/vozjusta-mobile.git
cd vozjusta-mobile
pnpm install
```

---

#  Configuração do Ambiente

Crie um arquivo `.env`:

```env
API_URL=http://localhost:3000
WEBSOCKET_URL=ws://localhost:3000
```

---

#  Executar Aplicação

### Android

```bash
pnpm android
```

### iOS

```bash
pnpm ios
```

### Desenvolvimento

```bash
pnpm start
```

---

# Funcionalidades Principais

### Cadastro e Autenticação

- Registro de cidadãos
- Login seguro via API
- Gerenciamento de sessão

---

### Abertura de Caso

O usuário pode:

- Descrever seu problema jurídico
- Inserir detalhes adicionais
- Selecionar categoria do caso

Essas informações são enviadas para o backend, onde o pipeline de IA analisa os dados.

---

### Upload de Documentos

O aplicativo permite:

- Envio de PDFs
- Upload de imagens
- Organização de evidências do caso

Os documentos são armazenados com segurança na infraestrutura cloud.

---

### Acompanhamento do Caso

O usuário pode acompanhar:

- Status atual do processo
- Atualizações feitas por advogados
- Notificações importantes

---

### Notificações

O sistema envia alertas para:

- Atualizações de status
- Revisão de documentos
- Aprovação de petições
- Mensagens do advogado responsável

---

# Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
├── screens/           # Telas principais da aplicação
├── services/          # Integração com API
├── hooks/             # Hooks customizados
├── store/             # Estado global (Zustand)
├── utils/             # Funções auxiliares
└── App.tsx            # Entry point da aplicação
```

---

# Características Técnicas

## Experiência Nativa

Diferente de soluções híbridas antigas, o React Native renderiza **componentes nativos reais**, garantindo:

- Scroll fluido
- Animações suaves
- Experiência consistente com o sistema operacional

---

## Code Push (OTA Updates)

Atualizações críticas de interface ou lógica podem ser enviadas **sem necessidade de nova submissão na App Store ou Play Store**, permitindo:

- Correções rápidas de bugs
- Atualizações de UX
- Ajustes em fluxos da aplicação

---

## Isomorfismo de Lógica

Parte das regras de negócio utilizadas no **frontend web** pode ser reutilizada no mobile:

- Validação de dados
- Hooks de API
- Formatação de informações

Isso garante **consistência entre Web e Mobile**.

---

# Integração com o Ecossistema VozJusta

O aplicativo mobile funciona integrado com:

- **API VozJusta (NestJS)** – gerenciamento de dados e autenticação
- **Banco PostgreSQL** – armazenamento de casos e usuários
- **Infraestrutura Azure** – armazenamento e deploy
- **Pipeline de IA (RAG)** – geração de diagnósticos jurídicos

---

# Segurança

- Comunicação segura via **HTTPS**
- Tokens **JWT** para autenticação
- Validação de dados no backend
- Armazenamento seguro de documentos

---

# Roadmap Mobile

- [x] Estrutura inicial React Native
- [x] Integração com API VozJusta
- [ ] Upload de documentos
- [ ] Notificações em tempo real
- [ ] Histórico de casos
- [ ] Chat cidadão ↔ advogado

---

# Equipe e Orientação

**Desenvolvedor:** Felipe Vieira e Thiago Menezes 
**Orientação:** Prof. Lucas Correa  
**Instituição:** SENAI Suíço Brasileiro (TCC 2026)

---

<div align="center">

### Projeto VozJusta

API • Web • Mobile

</div>
