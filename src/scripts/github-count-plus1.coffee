# Description
#   A Hubot script that counts :+1: on the issue
#
# Configuration:
#   None
#
# Commands:
#   hubot count+1 <owner>/<repo>#<number> - counts :+1: on the issue
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  robot.respond /count\+1 ([^\/]+)\/([^\s#]+)\s*#(\d+)$/i, (res) ->
    owner = res.match[1]
    repo = res.match[2]
    number = res.match[3]
    baseUrl = 'https://api.github.com'
    url = "#{baseUrl}/repos/#{owner}/#{repo}/issues/#{number}/comments"
    res.http(url).get() (err, _, body) ->
      return res.send(err) if err?
      json = JSON.parse body
      res.send json.filter((c) -> c.body.match(/:\+1:/)).length
