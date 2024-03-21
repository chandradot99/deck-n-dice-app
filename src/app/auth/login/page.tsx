import Image from "next/image";
import LoginForm from "./components/loginForm";

interface UserData {
  username: string;
  password: string;
}

function Login(): JSX.Element {
  return (
    <main className="flex w-screen h-screen">
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/banner.jpeg"
          alt=""
          width={1500}
          height={1500}
          priority
        />
      </div>
      <LoginForm></LoginForm>
    </main>
  )
}

export default Login;
