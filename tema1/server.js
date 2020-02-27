var http = require('http'); //create a server object:
var fs = require('fs');
var string = [];
const server = http.createServer(function (req, res) {

    if( req.method === "POST" && req.url === '/updateDocs'){
       
        string = [];
        req.on('data', (chunk) => {
            string.push(chunk)
        }).on('end', () => {
            string = Buffer.concat(string).toString();
            string = JSON.parse(string);

            var start = new Date().getTime();
            main("11L6aLY9ONXPNhSn1iksYhTqLoAxL8p0l6K6F-rUV4fk");
            var end = new Date().getTime() - start;
            res.writeHead(200, {'Content-Type': 'Application/JSON'});
            res.write(end.toString());
            res.end();
        })
       
        
    }else if(req.method ==="GET" && req.url === '/metrics'){
        fs.readFile('metrics.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }else{
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }
}).listen(3000); //the server object listens on port 8080


const { google } = require("googleapis");
const token = require("./token.json");
// console.log(token);
const credentials = require("./credentials.json");

function authorize() {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

async function main(YOUR_DOCUMENT_ID) {
 
    const auth = await authorize();
    const docs = google.docs({
      version: "v1",
      auth
    });
    await docs.documents.batchUpdate({
      auth,
      documentId: YOUR_DOCUMENT_ID,
      requestBody: {
        requests: [
          {
            insertText: {
              location: {
                index: 1
              },
              text: string["article"] + "\n" + string["img"] + "\n"
            }
          }
        ]
      }
    });
   
}




