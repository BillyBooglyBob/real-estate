import AuthForm from "../../components/AuthForm";

export const SignUp = () => {
  const inputs = [
    { type: "text", placeholder: "Username", id: "username" },
    { type: "text", placeholder: "Email", id: "email" },
    { type: "password", placeholder: "Password", id: "password" },
  ];

  return (
    <AuthForm
      inputs={inputs}
      title={"sign up"}
      actionUrl={"/api/auth/sign-up"}
    />
  );
};
