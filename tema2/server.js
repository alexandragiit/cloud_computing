var http = require('http'); //create a server object:
var fs = require('fs');
const server = http.createServer(function (req, res) {
    var url = req.url.split("/")
    var content, ret = [];
    
    if( req.method === "GET"){

        if(req.url === "/notes"){
            ret = []
            var notes;
            fs.readFile('data.json', function(err, data) {
             
                    content = JSON.parse(data)["data"]["authors"];

                    // pune in variabila ret lista cu toti autorii din json 
                    for(var i = 0; i<content.length; i++){
                        for(var j = 0; j < content[i].notes.length; j++){
                            ret.push([content[i].notes[j]["text"], content[i].name]);
                        }
                    }

                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.write(JSON.stringify(ret));
                    res.end();
                }
            );
        }else if(url.length >= 2 && url[1] === 'notes' && url[2] === 'authors'){

            if(url.length == 4){
                fs.readFile('data.json', function(err, data){
                    content = JSON.parse(data)["data"]["authors"];

                    // cauta in json daca exista autor cu numele dat in url[3]
                    // daca exista pune toate notile lui in variabila ret
                    var found = 0
                    for(var i = 0; i<content.length; i++){
                        if(content[i].name == url[3]){
                            found = 1;
                                ret.push(content[i]["notes"]);
                        }
                    } 
                    if(found == 1){
                        // returneaza json toate notitele autorului
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.write(JSON.stringify(ret));
                        res.end();
                    }else{
                        // verifica validitatea numelui autorului (404 not found)
                        res.writeHead(404);
                        res.end();
                    }
                })
                
             
            }else if(url.length == 3){
                // retruneaza json cu lista de autori
                fs.readFile('data.json', function(err, data){
                    content = JSON.parse(data)["data"]["authors"];
                    for(var i = 0; i<content.length; i++){
                        ret.push(content[i].name);
                    } 
                    
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.write(JSON.stringify(ret));
                    res.end();
                 
                })
            }else if(url.length == 5){

                fs.readFile('data.json', function(err, data){
                    content = JSON.parse(data)["data"]["authors"];

                    // cauta in json daca exista autor cu numele dat in url[3]
                    // daca exista pune notita cu id-ul url[4] in ret
                    var found = 0
                    for(var i = 0; i<content.length; i++){
                        if(content[i].name == url[3]){
                            for(var j = 0; j<content[i].notes.length; j++){
                                if(content[i].notes[j].id == url[4]){
                                    found = 1;
                                    ret = {"text":content[i].notes[j].text, "date":content[i].notes[j].date};
                                    break;
                                }
                            }
                        }
                    } 
                    if(found == 1){
                        // returneaza json toate notitele autorului
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.write(JSON.stringify(ret));
                        res.end();
                    }else{
                        // verifica validitatea numelui autorului (404 not found)
                        res.writeHead(404);
                        res.end();
                    }
                })

            }else{
                res.writeHead(400);
                res.end();
                // request invalid (400 bad request)
            }
        }else{
            res.writeHead(400);
            res.end();
            // request invalid (400 bad request)
        }
    }
    
    if( req.method === "POST"){
        if(req.url === "/notes"){

            var body = "";
            req.on('data', function (chunk) {
                body += chunk;
            });

            req.on('end', function () {
                
                body = JSON.parse(body);
                // console.log(body.naame);
                if(body.name != undefined && body.text != undefined){


                    var allData;
                    fs.readFile('data.json', function(err, data){
                        allData = JSON.parse(data);
                        content = JSON.parse(data)["data"]["authors"];
                        found = 0;
                        for(var i = 0; i<content.length; i++){
                            if(content[i].name == body.name){
                                // daca gasesc deja autor, pun notita la el 
                                found = 1;
                                var id = 0;
                                for(var j = 0; j < content[i].notes.length; j++){
                                    if(id < content[i].notes[j].id){
                                        id = content[i].notes[j].id;
                                    }
                                }
                                content[i].notes.push({"text":body.text, "date": new Date().toLocaleString(), "id":id+1});
                                
                            }
                        }

                        if(found == 0){
                            // daca nu gasesc acest autor fac unul nou
                            content.push({ 
                                "name":body.name,
                                "notes": [{"text":body.text, "date": new Date().toLocaleString(), "id" : 1}] 
                            });
                        }
                            allData["data"]["authors"] = content;
                            fs.writeFile('data.json', JSON.stringify(allData),function(err){
                                if (err) return console.log("eroare" + err);
                                res.writeHead(201);
                                res.end();
                            });
                            
                        
                        
                    })
                    
                    
                    res.writeHead(201);
                    res.end();
                }else{
                    res.writeHead(400); //bad rerquest
                    res.end();
                }
                    
            });
   
        }else{
            // 400 bad request
            res.writeHead(400);
            res.end();
        }
       

    }

    if(req.method === "PUT"){
        
        if(url.length == 5){
            if(url[1] == "notes" && url[2] == "authors"){
               
                // verifica validitatea id-ului url[2] (404 not found authorid)
                // fa update-ul 
                // returneaza succes sau nimic 
                var body = "";
                req.on('data', function (chunk) {
                    body += chunk;
                });

                req.on('end', function(){
                    body = JSON.parse(body);
                    if(body.text != undefined){
                        var allData;
                        fs.readFile('data.json', function(err, data){
                            allData = JSON.parse(data);
                            content = JSON.parse(data)["data"]["authors"];
                            found = 0;
                            for(var i = 0; i<content.length; i++){
                                if(content[i].name == url[3]){
                                    // daca authorul exista
                                    // tb sa mai verific body-ul sa fie ok   
                                                            
                                    for(var j = 0; j < content[i].notes.length; j++){
                                    
                                        if(url[4] == content[i].notes[j].id){
                                            found = 1;
                                            // schimb textul 
                                            content[i].notes[j].text = body.text;
                                            content[i].notes[j].date = new Date().toLocaleString();
                                        
                                            allData.data.authors = content; 
                                            fs.writeFile('data.json', JSON.stringify(allData),function(err){
                                                if (err) return console.log("eroare" + err);
                                                res.writeHead(200);
                                                res.end();
                                            });
                                            break;
                                        }
                                        
                                    }
                                    if(found == 1){
                                        break;
                                    } 
                                }else{
                                    res.writeHead(404);
                                    res.end();
                                }
                            }
                            if(found == 0){
                                
                                res.writeHead(404);
                                res.end();
                            }
                            
                        
                        })
                    }else{
                        res.writeHead(400)
                        res.end();
                    }
                });

            }else{
                // 400 bad request
                res.writeHead(400);
                res.end();
            }
        }else{
            res.writeHead(400);
            res.end();
        }
    }

    if(req.method === "DELETE"){

        if(req.url == "/notes" || req.url == "/notes/authors"){
            res.writeHead(403);
            res.end();
        } // nu ai autorizatie sa stergi toate notitele

        if((url.length == 4 ||  url.length == 5 ) && url[1] == "notes" && url[2] == "authors"){
           
               console.log("test");
                // verifica validitatea id-ului url[2] (404 not found authorid)
                // fa update-ul 
                // returneaza succes sau nimic 
                var body = "";
                req.on('data', function (chunk) {
                    body += chunk;
                });

                req.on('end', function(){
                    // body = JSON.parse(body);
                    var allData;
                    fs.readFile('data.json', function(err, data){
                        allData = JSON.parse(data);
                        content = JSON.parse(data)["data"]["authors"];
                        found = 0;
                        for(var i = 0; i<content.length; i++){
                            if(content[i].name == url[3]){
                                // daca authorul exista
                                if(url.length == 5){                    
                                    for(var j = 0; j < content[i].notes.length; j++){
                                    
                                        if(url[4] == content[i].notes[j].id){
                                            found = 1;
                                            // sterg postarea
                                            content[i].notes.splice(j,1);
                                        
                                            allData.data.authors = content; 
                                            fs.writeFile('data.json', JSON.stringify(allData),function(err){
                                                if (err) return console.log("eroare" + err);
                                                res.writeHead(200);
                                                res.end();
                                            });
                                            break;
                                        }
                                        
                                    }
                                }else{
                                    found = 1;
                                    content.splice(i, 1);

                                    allData.data.authors = content; 
                                    fs.writeFile('data.json', JSON.stringify(allData),function(err){
                                        if (err) return console.log("eroare" + err);
                                        res.writeHead(200);
                                        res.end();
                                    });
                                    break;
                                }
                                if(found == 1){
                                    break;
                                } 
                            }
                        }
                        if(found == 0){
                            
                            res.writeHead(404);
                            res.end();
                        }
                        
                       
                    })
                });

        }else{
            res.writeHead(400);
            res.end();
        }   
    }
}).listen(3000); //the server object listens on port 3000