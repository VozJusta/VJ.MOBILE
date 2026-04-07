

export const forgotPasswordData = [
  {
    screen: "EMAIL",
    title: "Esqueci minha senha",
    description:
      "Não se preocupe! Informe seu e-mail cadastrado para receber as instruções de recuperação.",
    inputOTP: false,
    nameButton: "Enviar código",
    subButton: "Voltar para o login",
  },
  {
    screen: "CODE",
    title: "Verificação de Email",
    description: "Enviamos um código de 6 dígitos para seu email",
    inputOTP: true,
    nameButton: "Verificar Email",
  },
  { 
    screen: "UPDATE",
    title: "Nova senha",
    inputOTP: false,
    description: "Crie uma nova senha forte para proteger sua conta",
    label1: "Nova senha",
    label2: "Confirme a nova senha",
    nameButton: "Redefinir senha"
   },
];
