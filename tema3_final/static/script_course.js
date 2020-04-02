document.getElementById("convert").addEventListener('click', function () {
    const file = document.getElementById('inpFile').files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
        var res = reader.result.split(',')[1];
        var data = {'img':res};
        
        var functionEndpoint = "https://us-central1-firstpython1996.cloudfunctions.net/imgToTxt";
        fetch(functionEndpoint, {
            method: "POST",
            body: JSON.stringify(data)
        }).then(data=>data.text()).then(function(data){
            var text = data;
            document.getElementById('text').innerHTML=text;

            // do stufff
        }).catch(function(error){
            console.log("xErr is: "+error);
        });

     }
    
});

document.getElementById("translate").addEventListener('click', function(){
    var text = {"text":document.getElementById('text').innerText};
    console.log(text);

    var endpoint = "https://us-central1-firstpython1996.cloudfunctions.net/function-1";
    fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(text)
    }).then(data=>data.text()).then(function(data){
        var translated = data;
        document.getElementById('translated').innerHTML = translated;

        // do stufff
    }).catch(function(error){
        console.log("xErr is: "+error);
    });

});


document.getElementById("tts").addEventListener('click', function(){
    var text = {"text":document.getElementById('text').innerText};
    console.log(text);

    var endpoint = "https://us-central1-firstpython1996.cloudfunctions.net/function-2";
    fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(text)
    }).then(data=>data.blob()).then(function(data){
        console.log(data);
        var audio = document.getElementById("audio");
        audio.src = URL.createObjectURL(data);

    }).catch(function(error){
        console.log("xErr is: "+error);
    });

});


document.getElementById("stt").addEventListener('click', function(){
    const file = document.getElementById('audioFile').files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
        var res = reader.result.split(',')[1];
        var data = {'audio':res};
        
        var functionEndpoint = "https://us-central1-firstpython1996.cloudfunctions.net/function-3";
        fetch(functionEndpoint, {
            method: "POST",
            body: JSON.stringify(data)
        }).then(data=>data.text()).then(function(data){
            var text = data;
            document.getElementById('stt-text').innerHTML=text;

            // do stufff
        }).catch(function(error){
            console.log("xErr is: "+error);
        });

     }

});