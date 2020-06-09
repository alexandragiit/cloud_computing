function get_courses(){

    var functionEndpoint = "/courses";
    fetch(functionEndpoint)
    .then(response => response.json())
    .then(data =>{ 
        
        
        create_courses(data);

    
    });

}
class courses{
    constructor(nume_fisier, ID_profesor, an, descriere, facultate, titlu_lectie, id) {
        this.id = id,
        this.nume_fisier = nume_fisier;
        this.ID_profesor = ID_profesor;
        this.an = an;
        this.descriere = descriere;
        this.facultate = facultate;
        this.titlu_lectie = titlu_lectie;
      }

}

function create_courses(data){
    var main = document.getElementById("courses-container");
    var num_courses = data.length;
    console.log(num_courses)
    var curs_obj = new courses();
    for(var i =0; i<num_courses; i++){
        let curs = JSON.parse(data[i]);
        let x = new Array();
        for(let val in curs){
            // console.log(val);
            // console.log(curs[val]);
            x.push(curs[val]);
            
        }
        curs_obj = new courses(x[0], x[1], x[2], x[3], x[4], x[5], x[6]);
        
        console.log(curs_obj)

        let a = document.createElement("div");
        a.className = "course";

        let b = document.createElement("p");
        b.className = "desc";
        b.textContent = curs.descriere;

        let c = document.createElement("p");
        c.className = "titlu";
        c.textContent = curs.titlu_lectie;

        let but = document.createElement("button");
        but.innerText = "View Class"; 

        but.addEventListener("click", function(){
            window.location.pathname =  '/lesson';  //?id=' + curs_obj["ID_profesor"];
            
            console.log(window.location);
        });

        a.appendChild(c);
        a.appendChild(b);
        a.appendChild(but);

        main.appendChild(a);
    }

}


get_courses();
console.log("works");