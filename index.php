<html>
    <head>
    <link rel="stylesheet" href="style3.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    if (isset($_COOKIE['cookie'])){
        ?>
    <script>
    var grades = eval(<?php echo $_COOKIE['cookie']?>)
    var grades_str = JSON.stringify(<?php echo $_COOKIE['cookie']?>)
    grades_str = grades_str.substring(1, grades_str.length - 1)
    </script>
    <?php
    }
    else{
        ?>
        <script>var grades_str = ""
        var grades = []
        var t_grade = 0
        var t_weight = 0
        </script>
    <?php
    }?>
    <script type="text/javascript" src="script3.js" defer></script>
    </head>
    <body>
            <div class="banner">
                <h2 class="text"></h2>
            </div>
            <section class="section1">
                <div class="bar">
                    <div class="progression" id="progression"></div>
                    <div class="goal_checkpoint" id="goal_checkpoint"></div>
                    <div class="checkpoint"></div>
                    <div class="checkpoint"></div>
                    <div class="checkpoint"></div>
                    <div class="checkpoint"></div>
                    <div class="checkpoint"></div>
                </div>

                <div class="main">
                    <div class="main-content-conteiner">
                        <h4 class="text weighted-average-text">Średnia ważona:<p id="actual_exp" class="text">0</p> </h4>
                    </div>
                    <div class="main-content-conteiner">
                        <label class="text">Średnia do osiągnięcia: </label>
                         <input placeholder="średnia" type="number" id="goal_exp" class="input-style" onkeyup="calc_more_exp(t_grade, t_weight)">
                    </div>
                    <div class="main-content-conteiner">
                            <p class="text">Podaj swoje oceny:</p>
                            <div class="main-input-conteiner">
                                <input type="number" min="0" placeholder="ocena" class="input-style small" id="grade_exp" onkeydown="append_grade_enter(this, event)">
                                <input type="number" min="0" placeholder="waga" class="input-style small" id="weight_exp" onkeydown="append_grade_enter(this, event)">
                            </div> 
                    </div>
                    <div class="main-content-conteiner">
                        <button id="adding_grade" onclick="append_grade()" class="button-style">Dodaj</button>
                        <div id="buttons" class="main-grade-conteiner"></div>
                    </div>
            </div>

            <div class="simulation">
                <ul class="simulation-ul">
                    <li class="simulation-li simulation-li-on" id="simulationLi1" onclick="simulationSelect(1);">Symulacja ocen</li>
                    <li class="simulation-li" id="simulationLi2"  onclick="simulationSelect(2);">Tutaj coś będzie 1</li>
                    <li class="simulation-li" id="simulationLi3"  onclick="simulationSelect(3);">Tutaj coś będzie 2</li>
                    <li class="simulation-li" id="simulationLi4"  onclick="simulationSelect(4);">Tutaj coś będzie 3</li>
                </ul>
                <div class="simulation-div simulation-div-on" id="simulationDiv1">
                    <h4 class="text">Symulacja ocen:</h4>
                <p class="test text" id="final_exp"></p>
                </div>
                <div class="simulation-div" id="simulationDiv2"></div>
                <div class="simulation-div" id="simulationDiv3"></div>
                <div class="simulation-div" id="simulationDiv4"></div>
                
            </div>
        </section>
        <footer class="calculations">
            <a href="https://github.com/elkamill0" target="_blank" class="link"><img style="height: 80%;" alt="github logo" calss="link-image" src="https://cdn-icons-png.flaticon.com/512/25/25231.png">
            </a>
        </footer>
    </body>
</html>
