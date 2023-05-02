import { ClientSideLogin } from "@/components/ClientSideLogin";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <ClientSideLogin />

      <div>
        <Link href={"/context-demo"}>context-demo</Link>
      </div>
    </main>
  );
}
