<div align="center">

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
  </div>

  <h3 align="center">Um sistema de gerenciamento de assistência médica</h3>
</div>


## 📋 <a name="table">Índice</a>

1. 🤖 [Introdução](#introdução)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Recursos](#recursos)
4. 🤸 [Início rápido](#início-rápido)


## <a name="introduction">🤖 Introdução</a>

Um aplicativo de gerenciamento de pacientes de saúde que permite que os pacientes registrem, reservem e gerenciem facilmente suas consultas com médicos, apresentando ferramentas administrativas para agendamento, confirmação e cancelamento de consultas, juntamente com notificações por SMS, tudo criado usando Next.js.

## <a name="tech-stack">⚙️  Tech Stack</a>

- Next.js
- Appwrite
- Typescript
- TailwindCSS
- ShadCN
- Twilio

## <a name="features">🔋 Recursos</a>

👉 **Registre-se como paciente**: os usuários podem se inscrever e criar um perfil pessoal como paciente.

👉 **Agende uma nova consulta com o médico**: os pacientes podem agendar consultas com médicos quando for conveniente para eles e podem agendar várias consultas.

👉 **Gerencie consultas no lado do administrador**: os administradores podem visualizar e gerenciar com eficiência todas as consultas agendadas.

👉 **Confirme/agende consultas no lado do administrador**: os administradores podem confirmar e definir horários para garantir que sejam agendadas corretamente.

👉 **Cancele uma consulta no lado do administrador**: os administradores podem cancelar qualquer consulta conforme necessário.

👉 **Envie SMS na confirmação da consulta**: os pacientes recebem notificações por SMS para confirmar os detalhes da consulta.

👉 **Responsividade completa**: o aplicativo funciona perfeitamente em todos os tipos de dispositivos e tamanhos de tela.

👉 **Upload de arquivo usando o armazenamento Appwrite**: os usuários podem carregar e armazenar arquivos com segurança no aplicativo usando os serviços de armazenamento Appwrite.

👉 **Gerencie e acompanhe o desempenho do aplicativo usando o Sentry**: O aplicativo usa o Sentry para monitorar e acompanhar seu desempenho e detectar quaisquer erros.

e muito mais, incluindo arquitetura de código e reutilização

## <a name="quick-start">🤸 Início rápido</a>

Siga estas etapas para configurar o projeto localmente em sua máquina.

**Pré-requisitos**

Certifique-se de ter o seguinte instalado em sua máquina:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Clonando o Repositório**

```bash
git clone https://github.com/adrianhajdin/healthcare.git
cd healthcare
```

**Instalação**

Instale as dependências do projeto usando npm:

```bash
npm install
```

**Configurar Variáveis ​​de Ambiente**

Crie um novo arquivo chamado `.env.local` na raiz do seu projeto e adicione o seguinte conteúdo:

```env
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=111111
```

Substitua os valores do espaço reservado pelas suas credenciais reais do Appwrite. Você pode obter essas credenciais inscrevendo-se no [site do Appwrite](https://appwrite.io/).

**Executando o projeto**

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar o projeto.
