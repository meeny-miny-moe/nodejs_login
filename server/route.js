exports.route = function(app, fs, dir) {
  route('/', 'main.html');
  route('/matching', 'matching.html');
  route('/my', 'my.html');
  route('/login', 'login.html');
  route('/chat', 'chat.html');
  route('/test', 'test.html');
  route('/register','join.html');

  function route(path, fileName) {
    app.get(`${path}`, function(req, res) {
      fs.readFile(`${dir}` + '/html/' + `${fileName}`, function(error, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    });
  }
}
