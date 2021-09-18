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
        var studentsAnswer = MQ.MathField(document.getElementById(i)).latex();
        var answerVisible = document.getElementById(answerId(i)).style.display == 'block';
        var attempted      = answerVisible || studentsAnswer != "\\frac{ }{ }";
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
function HCF(x, y) {
    // Returns the highest common factor of a pair of numbers.
    var temp;
    if (x < 0) {
        x *= -1
    }
    if (y < 0) {
        y *= -1
    }
    if (x == y) {
        return x
    }
    while (x != 0) {
        y = y % x;
        temp = x;
        x = y;
        y = temp;
    }
    return y;
}
function newSheet(commonD, type) {
    var a,b,c,d;
    var stored_a = new Array(totalQuestions);
    var stored_b = new Array(totalQuestions);
    var stored_c = new Array(totalQuestions);
    var stored_d = new Array(totalQuestions);
    var num = 0, den = 0;
    var questions = "";
    var level = 2;
    var thisType;
    score = 0;
    for (var i = 0; i < totalQuestions; i++) {
        while (num == den || den == 1) {
            thisType = type == 0 ? Math.random() : type;
            var isDuplicate = false;
            while (num == 0 || num % den == 0 || isDuplicate) {
                a = 1 + Math.floor(Math.random() * level);
                b = 1 + a + Math.floor(Math.random() * level);
                c = 1 + Math.floor(Math.random() * level);
                d = commonD ? b : 1 + c + Math.floor(Math.random() * level);
                stored_a[i] = a;
                stored_b[i] = b;
                stored_c[i] = c;
                stored_d[i] = d;
                for (var j = 0; j < i; j++) {
                    isDuplicate = (a == stored_a[j]) && (b == stored_b[j]) && (c == stored_c[j]) && (d == stored_d[j]);
                    if (isDuplicate) break;
                }

                if (thisType < 0.5) {
                    num = a * d + c * b;
                }
                else {
                    num = a * d - c * b;
                }
                den = b * d;
            }
            var hcf = HCF(num, den);
            num /= hcf;
            den /= hcf;
            answer[i] = "\\frac{" + num + "}" + "{" + den + "}";
        }
        
        questions += "<tr><td>" + (i + 1) + ".</td>";
        if (thisType < 0.5) {
            questions += "<td>\\( \\frac{" + a + "}{" + b + "} + \\frac{" + c + "}{" + d + "} = \\)</td>";
        }
        else {
            questions += "<td>\\( \\frac{" + a + "}{" + b + "} - \\frac{" + c + "}{" + d + "} = \\)</td>";
        }
        questions += "<td><span id='" + i + "' style=\"font-weight: bold;font-size: 9pt\">\\frac{}{}</span></td>";
        questions += "<td><span>    </span></td>";
        questions += "<td><span id='" + (answerId(i)) + "' style=\"font-weight: bold;font-size: 9pt\">" + answer[i] + "</span></td></tr>";
        level += 1;
        num = den = 0;
    }
    
    document.getElementById('questions').innerHTML = "<table>" + questions + "</table>";
    var answer0  = document.getElementById(answerId(0));
    var keyboard = document.getElementById('keyboard');
    keyboard.style.top = answer0.getBoundingClientRect().top - 4;
    keyboard.style.left = answer0.getBoundingClientRect().left - 180;

    for (var i = 0; i < totalQuestions; i++) {
        element = document.getElementById(i);
        var elementMathField = MQ.MathField(element, {
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

                    var filled = studentsAnswer.indexOf('{ }') == -1;
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
    MQ.MathField(element).focus();
    MQ.MathField(element).keystroke('Up');   

    var element10 = document.getElementById(10);
    var keyboard = document.getElementById('keyboard');
    keyboard.style.top = element10.parentElement.getBoundingClientRect().top;
    keyboard.style.left = element10.parentElement.getBoundingClientRect().left;
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
    //keyboard.style.visibility = "hidden";
}
function input(str) {
    var mathField = MQ.MathField(element);
    mathField.cmd(str)
    mathField.keystroke('Down');   
}
