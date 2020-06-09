// var url = "/lesson/file";

// fetch(url)
//     .then(response => response.json())
//     .then(data =>{    
//         console.log(data);
// });

var l = document.getElementsByClassName("lessons");
console.log(l[0]);
for(let i = 0; i < l.length; i++){
    l[i].addEventListener("click", function(){
        let name = this.id;
        showLesson(name);
    });
}

function showLesson(name){
        var url = "/lesson/file";
        fetch(url, {method: 'POST',body: name})
        .then(response => response.json())
        .then(data =>{   

            document.getElementById("lesson-container").innerHTML = JSON.stringify(data);
            console.log(data);
    });

    // console.log(name);
}

document.getElementById("translate").addEventListener("click", function(){
        var text = document.getElementById("lesson-container").innerText;
        console.log(text);
        var url = "/translate";
        fetch(url, {method: 'POST',body: text})
        .then(response => response.json())
        .then(data =>{   

            // document.getElementById("lesson-container").innerHTML = JSON.stringify(data);
            console.log(data);
    });

})