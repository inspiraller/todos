// TODO: get from .env
const url = "/api/todos/get";

module.exports = {
  url,
  get: ({app, myCache}) =>
    app.get(url, (req, res) => {
      return res.send(myCache.mget(['pending', 'completed']));
    })
}
