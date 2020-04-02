function createNewCourse(){


}

document.getElementById("button").addEventListener('click', function () {
    var course_container = document.getElementById("courses-container");
    var input_name = document.createElement("input");
    input_name.addEventListener("keyup", function(event){
      if(event.keyCode === 13 ){
        var name = input_name.value;
        var course = document.createElement("a");
        course.innerHTML = name;
        course.href = "http://127.0.0.1:3000/courses/" + name;
        course_container.removeChild(input_name);
        course_container.appendChild(course);
      }
    });
    course_container.appendChild(input_name);
});


