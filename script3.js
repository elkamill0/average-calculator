if(document.getElementById('goal_exp') == '')
{
    document.getElementById('goal_exp').focus()
}
else{
    document.getElementById('grade_exp').focus()
}


var values = calc_more1(grades)
var t_grade = values[0]
var t_weight = values[1]

function calc_more1(tab_with_grades){
    var final = ""
    var t_grade = 0
    var t_weight = 0
    
    
    var goal = document.getElementById('goal_exp').value
    for(i = 0; i<Object.keys(tab_with_grades).length; i++){
        grade = tab_with_grades[i][0]
        weight = tab_with_grades[i][1]
        t_grade = t_grade + grade * weight;
        t_weight = t_weight + weight;
        create_button(grade, weight)
    }
    for(j = 1; j<=10; j++){
        var a = (goal * t_weight + goal * j - t_grade)/j
        final = final + "waga: " + j + "; ocena: " + a.toFixed(2) + "<br>"
    }
    //calc_more_exp(t_grade, t_weight)
    document.getElementById('final_exp').innerHTML = final
    if(t_weight){
    document.getElementById("actual_exp").innerHTML =(t_grade/t_weight).toFixed(2)
    }
    else{
        document.getElementById("actual_exp").innerHTML = 0
    }
    update_checkpoints(t_grade/t_weight)
    return [t_grade, t_weight]
}

function append_grade_enter(el, e){
    
    /*if(e.keyCode == 107)
    {
        var value = parseFloat(document.getElementById('grade_exp').value)
        document.getElementById("grade_exp").value = value + 0.5
        var a = document.getElementById('grade_exp')
        var last = String(a).slice(-1);
        
    }*/
    if (e.keyCode == 13){
        if(el == document.activeElement)
        {
            document.getElementById('grade_exp').focus()
        }
        
        append_grade()
    }
    if(e.keyCode == 9){
        if(el == document.getElementById('weight_exp')){
            document.getElementById('goal_exp').focus()
        }
    }
    
    
}

function append_grade(){
    var append_grade = document.getElementById("grade_exp").value
    var append_weight = document.getElementById("weight_exp").value

    if (append_grade == '' && append_weight == '' || append_grade < 0 || append_weight < 0){
        document.getElementById("grade_exp").value = ''
    }
    else if (append_grade != '' && append_weight == ''){
        document.getElementById('weight_exp').focus()
    }
    else if (append_grade == '' && append_weight != ''){
        document.getElementById('grade_exp').focus()
    }
    else{
        parse_grades_add(append_grade, append_weight)
        t_grade += parseFloat(append_grade) * parseInt(append_weight)
        t_weight += parseInt(append_weight)
        create_button(append_grade, append_weight)
    }

}
function create_button(grade, weight){
    var buttons = document.getElementById("buttons")
    let btn = document.createElement("button");
    grade = parseFloat(grade)
    weight = parseInt(weight)
    btn.innerHTML = grade
    btn.name = weight
    btn.value = grade
    btn.classList.add("created-button")

    if(weight==1){
        btn.style.borderColor="#00FF00";
    }else if(weight==2){
        btn.style.borderColor="#FFFF00";
    }else if(weight==3){
        btn.style.borderColor="#FF0000";
    }
    btn.onclick = function(){
        t_grade -= parseFloat(btn.value) * parseInt(btn.name)
        t_weight -= parseInt(btn.name)
        parse_grades_remove(parseFloat(btn.value), parseInt(btn.name))
        if (t_weight == 0){
            document.getElementById("actual_exp").innerHTML = 0.0
        }
        else{
            document.getElementById("actual_exp").innerHTML = (t_grade/t_weight).toFixed(2)
        }
        var a = calc_more_exp(t_grade, t_weight)
        document.getElementById("final_exp").innerHTML = a
        this.remove();
    }
    calc_more_exp(t_grade, t_weight)
    buttons.appendChild(btn)
}

function remove_divs(){
    var el = document.getElementById('buttons')
    while(el.firstChild) el.removeChild(el.firstChild)
    t_grade = 0
    t_weight = 0

}
function calc_more_exp(t_grade, t_weight){
    console.log(t_grade)
    console.log(t_weight)
    var final = ""
    var goal = parseFloat(document.getElementById("goal_exp").value)
    for(j = 1; j<=10; j++){
        var a = (goal * t_weight + goal * j - t_grade)/j
        final = final + "waga: " + j + "; ocena: " + a.toFixed(2) + "<br>"
    }
    if(t_weight == 0){
        document.getElementById("actual_exp").innerHTML = 0.0
    }
    else{
        if (t_grade/t_weight < 1.75){
            document.getElementById("actual_exp").innerHTML = (t_grade/t_weight).toFixed(2)
            document.getElementById("actual_exp").setAttribute("style", "color: red")
        }
        else{
            document.getElementById("actual_exp").innerHTML = (t_grade/t_weight).toFixed(2)
            document.getElementById("actual_exp").setAttribute("style", "color: black")
        }
    }
    document.getElementById("final_exp").innerHTML = final
    document.getElementById("grade_exp").value = ''
    document.getElementById("weight_exp").value = ''
    update_checkpoints(t_grade/t_weight)

    return final
}
function update_checkpoints(actual){
    var grade_height = parseInt(parseFloat(actual) * 100) - 100
    var goal_height = parseInt((parseFloat(document.getElementById("goal_exp").value)*100)-100)
    
    document.getElementById("progression").setAttribute("style", "height:"+grade_height+"px")
    document.getElementById("goal_checkpoint").setAttribute("style", "margin-top:"+goal_height+"px")
}

function parse_grades_add(x, y){
    if(grades_str != ""){
        grades_str+=","
    }
    grades_str+= "["+x+","+y+"]"
    grades.push([x,y])
    document.cookie = 'cookie='+"["+grades_str+"]"
    var reach = document.getElementById('goal_exp').value
    document.cookie = "reach="+reach
    
}

function parse_grades_remove(x, y){
    for(var i = 0; i<grades.length; i++){
        if(grades[i][0]== x && grades[i][1] == y){
            grades.splice(i, 1)
            try{
                grades_str = grades_str.replace(",["+x+","+y+"]", "")
                
            }
            catch{
                grades_str = grades_str.replace("["+x+","+y+"]", "")
            }
            document.cookie = 'cookie='+"["+grades_str+"]"
            var reach = document.getElementById('goal_exp').value
            document.cookie = "reach="+reach
            return 0
        }
    }
}
//nowa funkcja która obsługuje te menu w simulation
function simulationSelect (newId){
    document.getElementsByClassName("simulation-li-on")[0].classList.toggle("simulation-li-on");
    document.getElementsByClassName("simulation-div-on")[0].classList.toggle("simulation-div-on");
    document.getElementById("simulationLi" + newId).classList.toggle("simulation-li-on");
    document.getElementById("simulationDiv" + newId).classList.toggle("simulation-div-on");
}
