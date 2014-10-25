// Description
//   A Hubot script that counts :+1: on the issue
//
// Configuration:
//   None
//
// Commands:
//   hubot count+1 <owner>/<repo>#<number> - counts :+1: on the issue
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  return robot.respond(/count\+1 ([^\/]+)\/([^\s#]+)\s*#(\d+)$/i, function(res) {
    var baseUrl, number, owner, repo, url;
    owner = res.match[1];
    repo = res.match[2];
    number = res.match[3];
    baseUrl = 'https://api.github.com';
    url = "" + baseUrl + "/repos/" + owner + "/" + repo + "/issues/" + number + "/comments";
    return res.http(url).get()(function(err, _, body) {
      var json;
      if (err != null) {
        return res.send(err);
      }
      json = JSON.parse(body);
      return res.send(json.filter(function(c) {
        return c.body.match(/:\+1:/);
      }).length);
    });
  });
};
