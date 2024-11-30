import SignInButton from "../components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className=" text-2xl text-center sm:text-3xl font-semibold text-primary-700">
        SIGN IN TO ACCESS OUR SERVICES
      </h2>
      <SignInButton />
    </div>
  );
}
