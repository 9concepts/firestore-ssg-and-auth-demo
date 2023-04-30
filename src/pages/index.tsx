import { ClientSideLotin } from "@/components/ClientSideLotin";
import { GetServerSideProps } from "next";

const verify = async (idToken: string) => {
  const apiKey = process.env.FIREBASE_WEB_API_KEY;
  const body = JSON.stringify({ idToken });

  return await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_REST_API_URL}/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const idToken = req.cookies.session || "";
  const response = await verify(idToken);

  if (!response.ok) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <ClientSideLotin />
    </main>
  );
}
