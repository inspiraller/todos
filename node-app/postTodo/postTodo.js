// TODO: get from .env
const url = "/api/todos/post";

module.exports = {
  url,
  post: ({ app, myCache }) =>
    app.post(url, (req, res) => {
      const title = req.body?.title;
      // TODO: capture error handling, hacking etc...
      if (title) {
        const pending = myCache.get("pending");
        pending.push(title);
        myCache.set("pending", pending);
        return res.send(myCache.get('pending'));
      }
      return res.send(false); // TODO: handle error
    })
}
