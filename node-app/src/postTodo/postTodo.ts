import {Express, Request, Response} from "express";
import NodeCache from "node-cache";

// TODO: get from .env
const url = "/api/todos/post";

interface Props {
  url: string;
  post: (props: {
    app: Express;
    myCache: NodeCache;
  }) => Express;
}
const postTodo: Props = {
  url,
  post: ({ app, myCache }) =>
    app.post(url, (req: Request, res: Response) => {
      const title = req.body?.title;
      // TODO: capture error handling, hacking etc...
      if (title) {
        const pending = myCache.get("pending") as string[];
        pending.push(title);
        myCache.set("pending", pending);
        return res.send(myCache.get("pending"));
      }
      return res.send(false); // TODO: handle error
    }),
};
export default postTodo;
