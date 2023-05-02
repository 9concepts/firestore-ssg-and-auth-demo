import { z } from "zod";

type Params = {
  id: number;
};

const Todo = z.object({
  id: z.number(),
  todo: z.string(),
  completed: z.boolean(),
  userId: z.number(),
});

export type Todo = z.infer<typeof Todo>;

export const useGetTodoQuery = async ({ id }: Params): Promise<Todo> => {
  return await fetch(`https://dummyjson.com/todos/${id}`)
    .then((res) => res.json())
    .then((res) => Todo.parse(res));
};
