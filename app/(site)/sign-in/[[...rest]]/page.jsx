import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <SignIn routing="path" path="/sign-in" forceRedirectUrl="/" />
    </div>
  );
}
