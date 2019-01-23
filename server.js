const net = require('net');
const fs = require('fs');

let theDate = new Date().toUTCString();
let contentType = ' ';
let contentLength = 0;
let body = '';

function response(contentType, contentLength, body, theDate) {
  return `HTTP/1.1 200 OK
          Server: jatinku/1.0.0 
          Date: ${theDate}
          Content-Type: ${contentType}
          Content-Length: ${contentLength}

          ${body}
          `;
}

const server = net.createServer(socket => {
    socket.setEncoding('utf8');
    socket.on('data', data => {

      let dataIndex = data.slice(0, data.indexOf('H') - 1);

      if (dataIndex === 'GET /index.html') {
        contentType = 'text/html; charset=8';
        fs.readFile('./index.html', function read(err, data) {
          if (err) {
            throw err;
          }
          contentLength = data.length
          socket.write(response(contentType, contentLength, data, theDate));
          socket.end();
        });
      }

      if (dataIndex === 'GET /hydrogen.html') {
        contentType = 'text/html; charset=8';
        fs.readFile('./hydrogen.html', function read(err, data) {
          if (err) {
            throw err;
          }
          contentLength = data.length
          socket.write(response(contentType, contentLength, data, theDate));
          socket.end();
        });
      }

      if (dataIndex === 'GET /helium.html') {
        contentType = 'text/html; charset=8';
        fs.readFile('./helium.html', function read(err, data) {
          if (err) {
            throw err;
          }
          contentLength = data.length
          socket.write(response(contentType, contentLength, data, theDate));
          socket.end();
        });
      }

      if (dataIndex === 'GET /error.html') {
        contentType = 'text/html; charset=8';
        fs.readFile('./error.html', function read(err, data){
          if(err){
            throw err;
          }
          contentLength = data.length;
          socket.write(response(contentType, contentLength, data, theDate))
          socket.end();
        })
      }

      if (dataIndex === 'GET /styles.css') {
        contentType = 'text/css; charset=utf-8';
        fs.readFile('./styles.css', function read(err, data){
          if(err){
            throw err
          }
          contentLength = data.length
          socket.write(response(contentType, contentLength, data, theDate))
          socket.end();
        })
      }

    });
  })

  .on('error', err => {
    console.log(err);
  });


server.listen(8080, () => {
  console.log('Sesrver is UP');
});
