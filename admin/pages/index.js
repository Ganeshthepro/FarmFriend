import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  return(
    <Layout>
      <div className="flex text-green-900 flex justify-between">
        <h2>
          Welcome, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-grey-900 gap-1 text-black rounded-lg">
         <img src={session?.user?.image} alt="" className="w-6 h-6" />
         {session?.user?.name}
        </div>
      </div>
    </Layout>
  );
}
