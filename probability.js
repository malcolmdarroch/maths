var totalQuestions = 10;
var score = 0;
var answer = new Array(totalQuestions);
var studentsFinalAnswer = new Array(totalQuestions);
var MQ = MathQuill.noConflict().getInterface(2);
var ielement = 0;
var element;
var pTable = [
    //z     0      1      2      3      4      5      6      7      8      9    0  1  2   3   4   5   6   7   8   9
    [0.0, .0000, .0040, .0080, .0120, .0160, .0199, .0239, .0279, .0319, .0359, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36],
    [0.1, .0398, .0438, .0478, .0517, .0557, .0596, .0636, .0675, .0714, .0754, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36],
    [0.2, .0793, .0832, .0871, .0910, .0948, .0987, .1026, .1064, .1103, .1141, 0, 4, 8, 12, 15, 19, 22, 27, 31, 35],
    [0.3, .1179, .1217, .1255, .1293, .1331, .1368, .1406, .1443, .1480, .1517, 0, 4, 8, 11, 15, 19, 22, 26, 30, 34],
    [0.4, .1554, .1591, .1628, .1664, .1700, .1736, .1772, .1808, .1844, .1879, 0, 4, 7, 11, 14, 18, 22, 25, 29, 32],
    
    [0.5, .1915, .1950, .1985, .2019, .2054, .2088, .2123, .2157, .2190, .2224, 0, 3, 7, 10, 14, 17, 21, 24, 27, 31],
    [0.6, .2258, .2291, .2324, .2357, .2389, .2422, .2454, .2486, .2518, .2549, 0, 3, 6, 10, 13, 16, 19, 23, 26, 29],
    [0.7, .2580, .2612, .2642, .2673, .2704, .2734, .2764, .2794, .2823, .2852, 0, 3, 6, 9,  12, 15, 18, 21, 24, 27],
    [0.8, .2881, .2910, .2939, .2967, .2996, .3023, .3051, .3078, .3106, .3133, 0, 3, 6, 8,  11, 14, 17, 19, 22, 25],
    [0.9, .3159, .3186, .3212, .3238, .3264, .3289, .3315, .3340, .3365, .3389, 0, 3, 5, 8,  10, 13, 15, 18, 20, 23],
    
    [1.0, .3413, .3438, .3461, .3485, .3508, .3531, .3554, .3577, .3599, .3621, 0, 2, 5, 7,   9, 12, 14, 16, 18, 21],
    [1.1, .3643, .3665, .3686, .3708, .3729, .3749, .3770, .3790, .3810, .3830, 0, 2, 4, 6,   8, 10, 12, 14, 16, 19],
    [1.2, .3849, .3869, .3888, .3907, .3925, .3944, .3962, .3980, .3997, .4015, 0, 2, 4, 5,   7,  9, 11, 13, 15, 16],
    [1.3, .4032, .4049, .4066, .4082, .4099, .4115, .4131, .4147, .4162, .4177, 0, 2, 3, 5,   6,  8, 10, 11, 13, 14],
    [1.4, .4192, .4207, .4222, .4236, .4251, .4265, .4279, .4292, .4306, .4319, 0, 1, 3, 4,   6,  7,  8, 10, 11, 13],
    
    [1.5, .4332, .4345, .4357, .4370, .4382, .4394, .4406, .4418, .4429, .4441, 0, 1, 2, 4,   5,  6,  7,  8, 10, 11],
    [1.6, .4452, .4463, .4474, .4484, .4495, .4505, .4515, .4525, .4535, .4545, 0, 1, 2, 3,   4,  5,  6,  7,  8, 9],
    [1.7, .4554, .4564, .4573, .4582, .4591, .4599, .4608, .4616, .4625, .4633, 0, 1, 2, 3,   3,  4,  5,  6,  7, 8],
    [1.8, .4641, .4649, .4656, .4664, .4671, .4678, .4686, .4693, .4699, .4706, 0, 1, 1, 2,   3,  4,  4,  5,  6, 6],
    [1.9, .4713, .4719, .4726, .4732, .4738, .4744, .4750, .4756, .4761, .4767, 0, 1, 1, 2,   2,  3,  4,  4,  5, 5],
    
    [2.0, .4772, .4778, .4783, .4788, .4793, .4798, .4803, .4808, .4812, .4817, 0, 0, 1, 1,   2,  2,  3,  3,  4, 4],
    [2.1, .4821, .4826, .4830, .4834, .4838, .4842, .4846, .4850, .4854, .4857, 0, 0, 1, 1,   2,  2,  2,  3,  3, 4],
    [2.2, .4861, .4864, .4868, .4871, .4875, .4878, .4881, .4884, .4887, .4890, 0, 0, 1, 1,   1,  2,  2,  2,  3, 3],
    [2.3, .4893, .4896, .4898, .4901, .4904, .4906, .4909, .4911, .4913, .4916, 0, 0, 0, 1,   1,  1,  2,  2,  2, 2],
    [2.4, .4918, .4920, .4922, .4925, .4927, .4929, .4931, .4932, .4934, .4936, 0, 0, 0, 1,   1,  1,  1,  1,  2, 2],
    
    [2.5, .4938, .4940, .4941, .4943, .4945, .4946, .4948, .4949, .4951, .4952, 0, 0, 0, 0,   1,  1,  1,  1,  1, 1],
    [2.6, .4953, .4955, .4956, .4957, .4959, .4960, .4961, .4962, .4963, .4964, 0, 0, 0, 0,   0,  1,  1,  1,  1, 1],
    [2.7, .4965, .4966, .4967, .4968, .4969, .4970, .4971, .4972, .4973, .4974, 0, 0, 0, 0,   0,  0,  1,  1,  1, 1],
    [2.8, .4974, .4975, .4976, .4977, .4977, .4978, .4979, .4979, .4980, .4981, 0, 0, 0, 0,   0,  0,  0,  0,  0, 1],
    [2.9, .4981, .4982, .4982, .4983, .4984, .4984, .4985, .4985, .4986, .4986, 0, 0, 0, 0,   0,  0,  0,  0,  0, 1],
    
    [3.0, .4987, .4987, .4987, .4988, .4988, .4989, .4989, .4989, .4990, .4990, 0, 0, 0, 0,   0,  0,  0,  0,  0, 0],
    [3.1, .4990, .4991, .4991, .4991, .4992, .4992, .4992, .4992, .4993, .4993, 0, 0, 0, 0,   0,  0,  0,  0,  0, 0],
    [3.2, .4993, .4993, .4994, .4994, .4994, .4994, .4994, .4995, .4995, .4995, 0, 0, 0, 0,   0,  0,  0,  0,  0, 0],
    [3.3, .4995, .4995, .4995, .4996, .4996, .4996, .4996, .4996, .4996, .4997, 0, 0, 0, 0,   0,  0,  0,  0,  0, 0],
    [3.4, .4997, .4997, .4997, .4997, .4997, .4997, .4997, .4997, .4998, .4998, 0, 0, 0, 0,   0,  0,  0,  0,  0, 0],
    
    [3.5, .4998, .4998, .4998, .4998, .4998, .4998, .4998, .4998, .4998, .4998, 0, 0, 0, 0,   0,  0,  0,  0,  0, 0],
    [3.6, .4998, .4998, .4999, .4999, .4999, .4999, .4999, .4999, .4999, .4999, 0, 0, 0, 0,   0,  0,  0,  0,  0, 0],
    [3.7, .4999, .4999, .4999, .4999, .4999, .4999, .4999, .4999, .4999, .4999, 0, 0, 0, 0,   0,  0,  0,  0,  0, 0],
    [3.8, .4999, .4999, .4999, .4999, .4999, .4999, .4999, .5000, .5000, .5000, 0, 0, 0, 0,   0,  0,  0,  0,  0, 0],
    [3.9, .5000, .5000, .5000, .5000, .5000, .5000, .5000, .5000, .5000, .5000, 0, 0, 0, 0,   0,  0,  0,  0,  0, 0]];
    
function getProbability (z)
{
    var absZ = Math.abs(z);
    var sign = (absZ / z).toFixed(0); 
    absZ = absZ.toString().length < 3 ? absZ.toFixed(1) : absZ;
    var i = Number(absZ.toString().charAt(0) + absZ.toString().charAt(2));
    var j = Number(absZ.toString().charAt(3)) + 1;
    var k = Number(absZ.toString().charAt(4)) + 11;

    return sign * ((Number(pTable[i][j]) + Number(pTable[i][k]) / 10000).toFixed(4));
}
    
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
        var attempted = answerVisible;
        if (!answerVisible)
        {
            var studentsAnswer = MQ.MathField(document.getElementById(i)).latex();
            attempted = studentsAnswer.length == answer[i].length;
        }

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

const Variable = {Z1:0, Z2:1, MU:2, SIGMA:3, X:4}
Object.freeze(Variable);

var zValues = new Array(totalQuestions);
var variableValues = new Array(totalQuestions).fill(0).map(row => Array(Variable).fill(0));
function alreadyUsed(variable, value)
{
  for (i=0; i<totalQuestions; i++)
  {
    //if (z == zValues[i]) return true;
    if (value == variableValues[i][variable]) return true;
  }
  return false;
}
function genRand(i, min, max, decimalPlaces, variable = Variable.Z1) {  
    var value = 0;
    while (value == 0 || alreadyUsed(variable, value))
    {
        var rand = Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);  // could be min or max or anything in between
        var power = Math.pow(10, decimalPlaces);
        value = (Math.floor(rand*power) / power).toFixed(decimalPlaces);
    }
    zValues[i] = value;
    variableValues[i][variable];
    return value;
}

function newSheet(betweenZeroAnd = true, lessThan = false, negative = false, mixed = false, 
                  between = false, negativeAndPositive = false, formula = false, lookup = false) {
    var questions = "";
    score = 0;
    for (var i = 0; i < totalQuestions; i++) {
        if (mixed)
        {
            betweenZeroAnd = i < 2;
            lessThan = i > 1 && i < 6;
            negative = i == 4 || i == 5 || i == 8 || i == 9;
        }
        questions += "<tr><td>" + (i + 1) + ".</td>";
        var level = 1 + Math.floor(i/totalQuestions * 3);
        var max = negative ? -1.999 : 1.999;
        var z = genRand(i, 0.0, max.toFixed(level), level, Variable.Z1);
        if (betweenZeroAnd) {
            answer[i] = getProbability(z).toFixed(4);
            questions += "<td>The probability that a random value is between zero and </td>";
        } 
        else if (lessThan) {
            answer[i] = parseFloat((parseFloat("0.5") + parseFloat(getProbability(z)))).toFixed(4);
            questions += "<td>The probability that a random value is less than </td>";
        }
        else if (between) {
            max1 = negative || negativeAndPositive ? -0.999 : 0.999;
            min2 = negative ? -1.0 : 1.0;
            z1 = genRand(i, 0.0, max1.toFixed(level), level, Variable.Z1);
            z2 = genRand(i, min2, max.toFixed(level), level, Variable.Z2);
            z  = z2;
            p1 = parseFloat(getProbability(z1)).toFixed(4);
            p2 = parseFloat(getProbability(z2)).toFixed(4);
            answer[i] = Math.abs(p2 - p1).toFixed(4);
            questions += "<td>The probability that a random value is between </td>";
            questions += "<td><span style=\"font-size: 11pt\">" + z1 + " and </span></td>";
        }
        else if (formula) {
            var neg    = i == 5 || i == 7 || i == 9 ? -1 : 1;
            var deltaX = negative ? -5 : 5;
            var mu     = parseInt(genRand(i, level, level + 25, 0, Variable.MU) * 100);
            var sigma  = parseInt(genRand(i, level, level +  5, 0, Variable.SIGMA) * 10);
            var x      = parseInt(genRand(i, level, level *  5, 0, Variable.X) * neg + mu);
            if (lookup) {
                z = parseFloat((x - mu)/sigma).toFixed(4);
                answer[i] = parseFloat(Math.abs(getProbability(z))).toFixed(4);
                questions += "<td>The probability that a random value " + "X".italics() + ", is greater than zero and less than </td>";
                questions += "<td><span style=\"font-size: 11pt\">" + x + ", if &mu; = </span></td>";
                questions += "<td><span style=\"font-size: 11pt\">" + mu + ", and &sigma; = </span></td>";
                z = sigma;
            }
            else {
                answer[i]  = parseFloat((x - mu)/sigma).toFixed(4);
                questions += "<td>The value of " + "Z".italics() + ", if &mu; = </td>";
                questions += "<td><span style=\"font-size: 11pt\">" + mu + ", &sigma; = </span></td>";
                questions += "<td><span style=\"font-size: 11pt\">" + sigma + ", and " + "X".italics() + " = </span></td>";
                z = x;
            }
        }
        else {
            answer[i] = parseFloat((parseFloat("0.5") - parseFloat(getProbability(z)))).toFixed(4);
            questions += "<td>The probability that a random value is greater than </td>";
        }
        
        questions += "<td><span style=\"font-size: 11pt\">" + z + " is: </span></td>";
        questions += "<td><span id='" + i + "' style=\"font-weight: bold;font-size: 11pt\">0.</span></td>";
        questions += "<td><span>    </span></td>";
        questions += "<td><span id='" + (answerId(i)) + "' style=\"font-weight: bold;font-size: 11pt\"> " + answer[i] + "</span></td></tr>";
    }
    
    document.getElementById('questions').innerHTML = "<table>" + questions + "</table>";
    for (var i = 0; i < totalQuestions; i++) {
        element = document.getElementById(i);
        document.getElementById(answerId(ielement)).readOnly = false;
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

                    var filled = studentsAnswer.length == answer[ielement].length;
                    if (filled) {
                        markAnswers();
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

