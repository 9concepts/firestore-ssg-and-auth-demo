import { LoginButton } from "@/components/LoginButton";
import { LogoutButton } from "@/components/LogoutButton";
import { RenderingCounter } from "@/components/RenderingCounter";
import { useFirebase } from "@/hooks/useFirebase";
import { Todo, useGetTodoQuery } from "@/hooks/useGetTodoQuery";
import { FirebaseProvider } from "@/providers/FirebaseProvider";
import { useEffect, useState } from "react";

const Main = () => {
  const { currentUser } = useFirebase();
  const [_, setTodo] = useState<Todo>();

  useEffect(() => {
    useGetTodoQuery({ id: 1 }).then((res) => {
      setTodo(res);
      console.log(res);
    });
  }, [currentUser]);

  return (
    <div className="m-auto max-w-xl">
      <RenderingCounter />
      <h1 className="text-xl">Handle a current user with the context API</h1>
      <p>{currentUser?.email}</p>
      <p>{currentUser?.displayName}</p>
      {currentUser && <LogoutButton />}
      {!currentUser && <LoginButton />}
    </div>
  );
};

const ContextDemo = () => {
  return (
    <FirebaseProvider>
      <Main />
    </FirebaseProvider>
  );
};

export default ContextDemo;
