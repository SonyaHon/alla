const http = require('http');
const fs = require('fs');
const URL = require('url');

const port = 3001;

const username = "123";
const password = "qwerty";

var logined = "true";

//TODO create normal thing to user logined

var server = http.createServer((req, res) => {
		if(req.url === '/') {
			fs.readFile('/Users/sonyahon/workspace/AllaServer/index.html', (err, data) => {
				if(err) {
					return console.log('Error: ', err);
				}
				res.end(data);
			})
		}
		else if(req.url === '/admin') {
			fs.readFile('/Users/sonyahon/workspace/AllaServer/admin.html', (err, data) => {
				if(err) {
					return console.log('Error: ', err);
				}
				res.end(data);
			})
		}
		else if (req.url === '/sendPost') {
			var dat = '';
			req.on('data', (chunk) => {
				dat += chunk.toString();
			});
			req.on('end', () => {
				dat = dat.split('\r\n');
				var post = {
					title: dat[3],
					date: dat[7],
					message: dat[11]
				};
				
				fs.readFile('/Users/sonyahon/workspace/AllaServer/data.json', (err, data) => {
					if(err) return console.log(err);
					var newObj = JSON.parse(data);
					newObj.blog.push(post);
					console.log(JSON.stringify(newObj));
					var buffer = new Buffer(JSON.stringify(newObj));
					fs.writeFile('/Users/sonyahon/workspace/AllaServer/data.json', buffer, () => {
					
					});
				});
				
				res.end();
			});
		}
		else if(req.url === '/checkforLog') {
			res.end(logined);
		}
		else if(req.url.match(/\/submitLoginForm\?/)) {
			var args = URL.parse(req.url);
			args = args.query.split('&');
			var obj = {
				login: args[0].split('=')[1],
				pass: args[1].split('=')[1]
			}
			if(obj.login === username && obj.pass === password) {
				logined = "true";
				res.end('logined');
			}
			else {
				res.end('bad');
			}
		}
		else {
			fs.readFile('/Users/sonyahon/workspace/AllaServer' + req.url, (err, data) => {
				if(err) {
					return console.log('Error: ', err);
				}
				res.end(data);
			})
		}
	});

server.listen(port, (err) => {
	if(err) {
		return console.log('Error: ', err);
	}
	
	console.log('server is on : ', port, ' port');
});
