import AuthForm from "../../components/AuthForm";

export const SignIn = () => {
  const inputs = [
    { type: "text", placeholder: "Email", id: "email" },
    { type: "password", placeholder: "Password", id: "password" },
  ];

  return (
    <AuthForm
      inputs={inputs}
      title={"sign in"}
      actionUrl={"/api/auth/sign-in"}
    />
  );
};
