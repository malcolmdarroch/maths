var totalQuestions = 10;
var score = 0;
var answer = new Array(totalQuestions);
var studentsFinalAnswer = new Array(totalQuestions);
var MQ = MathQuill.noConflict().getInterface(2);
var ielement = 0;
var element;
    
function answerId(i)
{
    return i + totalQuestions;
}

function showAnswer() {
    document.getElementById(answerId(ielement)).readOnly = true;
    document.getElementById(answerId(ielement)).style.display = 'block';
    studentsFinalAnswer[ielement] = MQ.MathField(document.getElementById(ielement)).latex();
    markAnswers();
}

function markAnswers(){
    score = 0;
    numAttempts = 0;
    for (i = 0; i < totalQuestions; i++) {
        var answerVisible = document.getElementById(answerId(i)).style.display == 'block';
        var studentsAnswer = MQ.MathField(document.getElementById(i)).latex();
        var attempted = answerVisible || studentsAnswer.length == answer[i].length;
        if (attempted)
        {
            numAttempts++;
            if (studentsAnswer == answer[i]) {
                document.getElementById(i).style.background = '#bbffbb';
                score += 1;
            }
            else {
                document.getElementById(i).style.background = '#ffbbbb';
            }
        }
    }
    document.getElementById('score').value = score;
    document.getElementById('numAttempts').value = numAttempts;
    showTotal();
}

const Coefficient = {A:0, B:1, C:2, D:3}
Object.freeze(Coefficient);

var zValues = new Array(totalQuestions);
var coefficientValues = new Array(totalQuestions).fill(0).map(row => Array(Coefficient).fill(0));
function alreadyUsed(coefficient, value)
{
  for (i=0; i<totalQuestions; i++)
  {
    //if (z == zValues[i]) return true;
    if (value == coefficientValues[i][coefficient]) return true;
  }
  return false;
}
function genRand(i, coefficient = Coefficient.A) {  
    var value = 0;
    while (value == 0 || alreadyUsed(coefficient, value))
    {
        var power = 0;
        var max = 12; 
        switch (coefficient)
        {
            case Coefficient.A: power = 3; break;
            case Coefficient.B: power = 2; break;
            case Coefficient.C: power = 1; break;
            case Coefficient.D: power = 0; break;
        }
        var min = 1;
        var v = Math.random();
        //console.log("In genRand(): i     = " + i);
        //console.log("In genRand(): v     = " + v);
        //console.log("In genRand(): max   = " + max);
        //console.log("In genRand(): min   = " + min);
        //console.log("In genRand(): power = " + power);
        //console.log("In genRand(): value = Math.floor(v * (max-min) + min) * (power+1);");
        //console.log("In genRand():       = Math.floor(" + v + " * " + (max-min) + " + " + min + ") * " + (power+1));
        //console.log("In genRand():       = Math.floor(" + (v * (max-min) + min) + ")  * " + (power+1));
        //value = Math.floor(v * (max-min) + min) * (power+1);
        //console.log("In genRand(): value = " + value);
    }
    coefficientValues[i][coefficient] = value;
    return value;
}

function toCoefficientString(coefficient)
{
    var flooredCoefficient = Math.floor(coefficient);
    return coefficient == 1 ? "" : coefficient;
}

function newSheet() {
    var questions = "";
    score = 0;
    for (var i = 0; i < totalQuestions; i++) {
        questions += "<tr><td>" + (i + 1) + ".</td>";
        var a = genRand(i, Coefficient.A);
        var b = genRand(i, Coefficient.B);
        var c = genRand(i, Coefficient.C);
        var d = genRand(i, Coefficient.D);
        answer[i] = toCoefficientString(a/4) + "x^4+" + toCoefficientString(b/3) + "x^3+" + toCoefficientString(c/2) + "x^2+" + toCoefficientString(d) + "x+c";
        //console.log("In newSheet(): a = " + a + ", b = " + b + ", c = " + c + ", d = " + d);
        //console.log("In newSheet(): answer[i] = " + answer[i]);
        //console.log("In newSheet(): Math.floor(a/4) = " + Math.floor(a/4));
            
        questions += "<td><span style=\"font-size: 11pt\">\\( \\int_{}^{} " + a + "x^3 +" + b + "x^2 + " + c + "x + " + d + " \\,dx =\\)</span></td>";
        questions += "<td><span id='" + i + "' style=\"font-size: 11pt\">{}x^4 + { }x^3 + { }x^2 + { }x { }</span>";
        questions += "<td><span>  </span>";
        questions += "<td><span id='" + (answerId(i)) + "' style=\"font-weight: bold;font-size: 9pt\">" + answer[i] + "</span></td></tr>";
    }
    
    document.getElementById('questions').innerHTML = "<table>" + questions + "</table>";
    for (var i = 0; i < totalQuestions; i++) {
        element = document.getElementById(i);
        var elementMathField = MQ.MathField(element, {
            spaceBehavesLikeTab: true,
            handlers: {
                edit: function() {
                    var elementMathField = MQ.MathField(document.getElementById(ielement));
                    var studentsAnswer = elementMathField.latex();
                    if (document.getElementById(answerId(ielement)).readOnly) {
                        if (studentsAnswer != studentsFinalAnswer[ielement]){
                            elementMathField.latex(studentsFinalAnswer[ielement]);
                        }
                        return;
                    }

                    var filled = studentsAnswer.length == answer[ielement].length;
                    //console.log("In edit: studentsAnswer.length   = " + studentsAnswer.length);
                    //console.log("In edit: answer[ielement]        = " + answer[ielement]);
                    //console.log("In edit: answer[ielement].length = " + answer[ielement].length);
                    //console.log("In edit: filled                  = " + filled);
                    if (filled) {
                        markAnswers();
                        showTotal();
                        if (studentsAnswer == answer[ielement])
                        {
                            elementMathField.blur();
                            ielement++;
                            element = document.getElementById(ielement);
                            elementMathField = MQ.MathField(element);
                            elementMathField.focus();
                            elementMathField.keystroke('Up');
                        }
                    }
                    else
                    {
                        //element.style.background = '#ffffff';
                    }                   
                }
            }
        });
        answerElement = document.getElementById(answerId(i));
        answerElement.style.display = "none";
        var elementMathField = MQ.MathField(answerElement, {
            handlers: {}
        });
        document.getElementById(i).addEventListener("focus", function(){
            ielement = Number(this.id);
            element = document.getElementById(ielement);
        }, true);                   
    }

    element = document.getElementById(ielement);
    //MQ.MathField(element).focus();
    //MQ.MathField(element).keystroke('Up');   

    // var element10 = document.getElementById(10);
    // var keyboard = document.getElementById('keyboard');
    // keyboard.style.top = element10.parentElement.getBoundingClientRect().top - 4;
    // keyboard.style.left = element10.parentElement.getBoundingClientRect().left + 10;

    // var answer0  = document.getElementById(answerId(0));
    // var keyboard = document.getElementById('keyboard');
    // keyboard.style.top = answer0.getBoundingClientRect().top - 4;
    // keyboard.style.left = answer0.getBoundingClientRect().left - 180;
    keyboard.style.visibility = "hidden";

    //console.log("Malcolm element10.getBoundingClientRect().left   = " + element10.getBoundingClientRect().left);
    //console.log("Malcolm element10.getBoundingClientRect().right  = " + element10.getBoundingClientRect().right);
    //console.log("Malcolm element10.getBoundingClientRect().width  = " + element10.getBoundingClientRect().width);
    //console.log("Malcolm element10.getBoundingClientRect().height = " + element10.getBoundingClientRect().height);
    var questions = document.getElementById('questions');
    //console.log("Malcolm questions.getBoundingClientRect().left   = " + questions.getBoundingClientRect().left);
    //console.log("Malcolm questions.getBoundingClientRect().right  = " + questions.getBoundingClientRect().right);
    //console.log("Malcolm questions.getBoundingClientRect().width  = " + questions.getBoundingClientRect().width);
    //console.log("Malcolm questions.getBoundingClientRect().height = " + questions.getBoundingClientRect().height);
    //console.log("Malcolm questions.right - element10.right        = " + (questions.getBoundingClientRect().right - element10.getBoundingClientRect().right));
    //console.log("Malcolm element10.parentElement                  = " + element10.parentElement);
    //console.log("Malcolm element10.parentElement.left             = " + element10.parentElement.getBoundingClientRect().left);
    //console.log("Malcolm keyboard.parentElement                   = " + keyboard.parentElement);
    //console.log("Malcolm keyboard.parentElement.left              = " + keyboard.parentElement.getBoundingClientRect().left);
    //console.log("Malcolm element10                                = " + element10);
    //console.log("Malcolm element10.innerHTML                      = " + element10.innerHTML);
    //console.log("Malcolm element10.innerHTML.getBoundingClientRect().left = " + element10.innerHTML.getBoundingClientRect().left);
    //console.log("Malcolm keyboard.left                            = " + keyboard.style.left);
    //console.log("Malcolm keyboard.top                             = " + keyboard.style.top);
    //console.log("Malcolm getProbability(2.257)                    = " + getProbability(2.257));
    // for (var i = 0; i < 1000; i++) {
    //     var level = 1 + Math.floor(i/1000 * 3);
    //     var z = genRand(0.0, (3.999).toFixed(level), level);
    //     if (isNaN(getProbability(z))) {
    //         var error = "getProbability(" + z + ") = NaN";
    //         throw new Error(error);
    //     }
    // }
    //console.log("Malcolm getProbability(0.9)   = " + parseFloat((parseFloat("0.5") + parseFloat(getProbability(0.9)))).toFixed(4));   
}
function input(str) {
    var mathField = MQ.MathField(element);
    mathField.cmd(str)
    mathField.keystroke('Down');   
}

