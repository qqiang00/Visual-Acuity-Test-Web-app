

if (typeof Orientation == "undefined") {
    var Orientation = {};
    Orientation.up = 0;
    Orientation.right = 1;
    Orientation.down = 2;
    Orientation.left = 3;
    Orientation.unknown = -1;
}

function Random(min, max) {
    return rand = min + (Math.round(Math.random() * 1000)) % (max - min);
}
//获取一个和当前方向不同的随机方向值
function getNextDifferentOrientation(o) {
    var newo;
    do{
        newo=RandomOrientation();
    }while(o==newo);
    return newo;
}
function RandomOrientation() {
    var rand = Random(0, 4);
    switch (rand) {
        case 0: return Orientation.up;
        case 1: return Orientation.right;
        case 2: return Orientation.down;
        case 3: return Orientation.left;
        default: return Orientation.unknown;
    }
}

var eChar = new Object();
eChar.orient = Orientation.up;
eChar.linewidth = 20;

//总的旋转度数，以90度为1个单位计算
var totalRotated = 0;
var oldOrient = eChar.orient;
//用身份证大小来校准，长宽分别为85.6mm和54.0mm，对应428px和270px
var stdWidth = 428;
var stdHeight = 270;
//缺省的绘图区域大小，数值随后可以设置。
var drawAreaWidth = 550;
var drawAreaHeight = 550;
var corHor = 1.0;//根据显示器的设置和校准水平方向，设置E字符的校准系数
var corVer=1.0//垂直方向，简单点的情况下可以只设置一个校准系数。
//绘图上下文
var cxt;

function InitBackGround() {
    //alert("In init");
    var c = document.getElementById("myCanvas");
    //添加代码设置c的背景为白色
    cxt = c.getContext("2d");
    cxt.fillStyle = c.style.backgroundColor;
    //cxt.fillRect(c.x, c.y, c.width, c.height);
    drawAreaWidth = c.width;
    darwAreaHeight = c.height;
    cxt.translate(drawAreaWidth / 2, drawAreaHeight / 2);
    //DrawCorrectionRect();
    ShowStep(0);
}
//清除绘图区域
function ClearDrawArea() {
    if (cxt != null) {
        cxt.clearRect(-drawAreaWidth / 2, -drawAreaHeight/2, drawAreaWidth, drawAreaHeight);
    }
}
function initAreaForDrawEChar() {
    ClearDrawArea();
}
//绘制校准矩形区域
function DrawCorrectionRect()
{
    ClearDrawArea();
    if (cxt != null) {
        cxt.rotate(( -1 * totalRotated) * Math.PI / 2);
        cxt.fillStyle = "#999999";
        cxt.fillRect(-stdWidth * corHor / 2, -stdHeight * corVer / 2, stdWidth * corHor, stdHeight * corVer);
        totalRotated = 0;
        eChar.orient = Orientation.up;
        oldOrient = Orientation.up;
    }
}
//绘制E字符
function DrawEChar() {
    cxt.fillStyle = "#000000";//黑色
    cxt.linewidth = 1;
    cxt.beginPath();
    cxt.lineJoin = "round";
    cxt.moveTo(-eChar.linewidth * 2.5, -eChar.linewidth * 2.5),
    cxt.lineTo(-eChar.linewidth * 2.5, eChar.linewidth * 2.5),
    cxt.lineTo(eChar.linewidth * 2.5, eChar.linewidth * 2.5),
    cxt.lineTo(eChar.linewidth * 2.5, -eChar.linewidth * 2.5),
    cxt.lineTo(eChar.linewidth * 1.5, -eChar.linewidth * 2.5),
    cxt.lineTo(eChar.linewidth * 1.5, eChar.linewidth * 1.5),
    cxt.lineTo(eChar.linewidth * 0.5, eChar.linewidth * 1.5),
    cxt.lineTo(eChar.linewidth * 0.5, -eChar.linewidth * 2.5),
    cxt.lineTo(-eChar.linewidth * 0.5, -eChar.linewidth * 2.5),
    cxt.lineTo(-eChar.linewidth * 0.5, eChar.linewidth * 1.5),
    cxt.lineTo(-eChar.linewidth * 1.5, eChar.linewidth * 1.5),
    cxt.lineTo(-eChar.linewidth * 1.5, -eChar.linewidth * 2.5)
    cxt.rotate(GetRotationValue());
    cxt.closePath();
    cxt.stroke();
    cxt.fill();
}
//直接利用线宽来绘制E字符
function DrawEChar2()
{
    cxt.strokeStyle = "#000000";//黑色
    cxt.lineWidth = eChar.linewidth;
    //alert("new o:" + eChar.orient + "\n" + "old o:" + oldOrient);
    cxt.rotate(GetRotationValue());
    cxt.beginPath();
    //cxt.lineJoin = "round";
    var unit = eChar.linewidth / 2;
    //if (unit < 1) { unit = 1; }

    cxt.moveTo(-4 * unit, -5 * unit);
    cxt.lineTo(-4 * unit, 4 * unit);
    cxt.lineTo(4 * unit, 4 * unit);
    cxt.lineTo(4 * unit, -5 * unit);
    cxt.moveTo(0, -5 * unit);
    cxt.lineTo(0, 4 * unit);
    cxt.stroke();
}
//获取不同的E字符方向对应的旋转角度（以弧度计算）
function GetRotationValue() {
    var dif = eChar.orient - oldOrient;
    totalRotated = (totalRotated + dif) % 4;
    return dif * Math.PI / 2;
}
function EnableDrawPanel() {
    var c = document.getElementById("DrawPanel");
    c.style.visibility = "visible";
}
function DisableDrawPanel() {
    var c = document.getElementById("DrawPanel");
    c.style.visibility = "hidden";
}
//显示合适的距离，在距离<1时，显示为××厘米，当距离>1时，显示为××米
function getStringFormatedDistance() {
    if (examDis < 1) { return Math.round(examDis * 100) + "厘米"; }
    else { return examDis + "米"; }
}
function adjustImageRect() {
    var c = document.getElementById("corImage");
    c.style.position = "absolute";
    c.style.width = stdWidth * corHor+"px";
    c.style.height = stdHeight * corHor+"px";
    c.style.left = (130 - stdWidth * (corHor - 1) / 2) + "px";
    c.style.top = (110 - stdHeight * (corHor - 1) / 2) + "px";

}
$(document).ready(function () {
    $('#slideHor').slider({
        value: '50',
        onChange:function(nvalue,ovalue){
            corHor = nvalue * 2 / 100.00
            corVer = corHor;
            //ClearDrawArea();
            //DrawCorrectionRect();
            adjustImageRect();
        },
        tipFormatter: function (value) {
            return Math.round(corHor * 100 ) + "%";
        }
    })
    $('#slideDis').slider({
        value: '100',
        onChange: function (nvalue, ovalue) {
            examDis = 5 * nvalue / 100.0;//单位为米
            updateDisTextBox();
        },
        tipFormatter:function(value){
            return getStringFormatedDistance();
        }
    })
    $('#cbVAGrades').combobox({
            
            data:vagrades,
            valueField:'index',
            textField: 'text',
            onSelect: function (record) {
                if (record.index == 0)
                    record.index = 1;
                initExamVAIndex = record.index;
                initExamVA = vagrades[record.index].value;
                updateInitVA();
            },
            width:'120px'
    })
});

function updateDisTextBox() {
    $('#tbVADis').textbox({ value: getStringFormatedDistance() });
    $('#tbVADis2').textbox({ value: getStringFormatedDistance() });
}
function updateInitVA() {
    $('#tbInitVA').textbox({ value: vagrades[initExamVAIndex].value });
}

//更新水平方向校准系数
/*
function UpdateSlideHorValue(nvalue,ovalue)
{
    var c = document.getElementById("slideHor");
    var oldcorhor = corHor;
    corHor = c.value * 1.00 / 50.00;
    //alert("scale:" + corHor);
    corVer = corHor;
    //corVer *=corHor/oldcorhor;
    ClearDrawArea();
    DrawCorrectionRect();
    //UpdateSlideVerStatus();
}*/
//刷行垂直slide控件的状态
function UpdateSlideVerStatus() {
    var c = document.getElementById("slideVer");
    c.value = corVer * 50;
}
//更新垂直方向校准系数
/*
function UpdateSlideVerValue() {
    var c = document.getElementById("slideVer");
    corVer = c.value * 1.00 / 50.00;
    if (corVer >= 1.2*corHor) {
        corVer = 1.2*corHor;

    } else if (corVer <= 0.8 * corHor) {
        corVer = 0.8 * corHor;
    }
    else {
        
    }
    c.value = corVer * 50;
    //alert("scale:" + corHor);
    ClearDrawArea();
    DrawCorrectionRect();
}
*/
var stepPages = [
    { "id": "Introduction", "title": "视力检查-介绍" ,"title_en":"Visual Acuity Test - Introduction"},
    { "id": "Correction", "title": "视力检查-尺寸校准", "title_en": "Visual Acuity Test - Display Correction" },
    { "id": "Setting", "title": "视力检查-参数设置", "title_en": "Visual Acuity Test - Settings" },
    { "id": "PreExamInfo", "title": "视力检查-检查前提示", "title_en": "Visual Acuity Test - Prompt before Test" },
    { "id": "Examing", "title": "视力检查-进行中", "title_en": "Visual Acuity Test - Proceeding" }//,
//    { "id": "Result", "title": "视力检查-结果" }
];


var curStep = 0;
var totalpageNum = 5;
function SetMainPanelTitle()
{
    $('#MainPanel').panel({ title: stepPages[curStep].title });
}
function NextStep() {
    if (curStep == totalpageNum - 1) {
        curStep = 2;
    } else {
        curStep += 1;
    }
    ShowStep(curStep);
}
function PreStep() {
    if (curStep == 0)
        return;
    curStep -= 1;
    ShowStep(curStep);
}
function ShowStep(stepIndex) {
    if (stepIndex < 0 || stepIndex > totalpageNum-1) {
        return;
    }
    curStep = stepIndex;
    for (var i = 0; i < totalpageNum; i++) {
        var c = document.getElementById(stepPages[i].id);
        if (i == curStep) {
            c.style.visibility = "visible";
        } else {
            c.style.visibility = "hidden";
        }
    }
    var pagetitle=stepPages[curStep].id
    if (pagetitle == "Correction" || pagetitle == "Examing") {
        //EnableDrawPanel();
        if(pagetitle=="Examing")
        {
            EnableDrawPanel();
            preExamSetting();
        }
        else {
            //ClearDrawArea();
            //DrawCorrectionRect();
        }
    } else { DisableDrawPanel(); }
    UpdateFooterButtonStatus();
    SetMainPanelTitle();
}

function UpdateFooterButtonStatus() {
    var prebtn = document.getElementById("preStepBtn");
    var nextbtn = document.getElementById("nextStepBtn");
    if (curStep == 0) {
        prebtn.style.visibility="hidden";
    } else { prebtn.style.visibility = "visible"; }
    if(curStep==4){
        nextbtn.innerText = "重新开始";
    } else { nextbtn.innerText = "下一步";}
}

var vagrades = [
    { "index": "0", "value": "<0.1", "logvalue": "<4.0", "text": "低于 0.10（4.0）" },
    { "index":"1","value": "0.1", "logvalue": "4.0", "text": "0.10  - 4.0" },
    { "index":"2","value": "0.12", "logvalue": "4.1", "text": "0.12 - 4.1" },
    { "index":"3", "value": "0.15", "logvalue": "4.2", "text": "0.15 - 4.2" },
    { "index":"4","value": "0.2", "logvalue": "4.3", "text": "0.20  - 4.3" },
    { "index":"5","value": "0.25", "logvalue": "4.4", "text": "0.25 - 4.4" },
    { "index":"6","value": "0.3", "logvalue": "4.5", "text": "0.30  - 4.5" },
    { "index":"7","value": "0.4", "logvalue": "4.6", "text": "0.40  - 4.6" },
    { "index":"8","value": "0.5", "logvalue": "4.7", "text": "0.50  - 4.7" },
    { "index":"9","value": "0.6", "logvalue": "4.8", "text": "0.60  - 4.8" },
    { "index":"10","value": "0.8", "logvalue": "4.8", "text": "0.80  - 4.9" },
    { "index":"11","value": "1.0", "logvalue": "5.0", "text": "1.00  - 5.0" }
];
//计算在先前校准条件下的形式描述的E字符的笔画宽度，距离单位是米，字符笔画宽度是mm
function getPXELineWidth(dis,va){
    //先找出在确定的距离和视力表下对应的以mm为单位的字符宽度
    //公式:linewidth*va*5.0=1.5*1.0*distance
    var mmlinewidth=1.5*1.0*dis/(5.0*va);
    //根据mm单位的宽度计算所需要的像素值
    //85.6mm长的身份证对应的矩形宽度为428*corHor.
    var pxlinewidth = 428.0 * corHor * mmlinewidth / 85.6;
    return Math.round(pxlinewidth);
}
var initExamVAIndex=1;//初始视力检查索引，对应于vagrades数组内的索引
var initExamVA = 0.1;//初始视力设定值，以0.1-1.0计算
var examDis = 5;//检查距离单位为cm
var infoText = "";//检查过程中的提示信息
if (typeof Eyes == "undefined") {
    var Eyes = {};
    Eyes.left = 0;
    Eyes.right = 1;
    Eyes.unknown = -1;
}
var examrecord = new Object();
examrecord.examingEye = Eyes.unknown;
examrecord.distance = examDis;
examrecord.va = initExamVA;
examrecord.vaindex=initExamVAIndex;


//生成一个新的E字符数据
function CreateNewEChar() {
    
    eChar.linewidth = getPXELineWidth(examrecord.distance, vagrades[examrecord.vaindex].value);
    oldOrient = eChar.orient;
    eChar.orient = getNextDifferentOrientation(oldOrient);
}
//按钮我准备好了的点击事件。
function ReadyForExaming()
{
    NextStep();
}
function UpdateExamingVA() {
    var va = document.getElementById("ExamingVA");
    va.innerText = vagrades[examrecord.vaindex].text;
}
function UpdateExamingDis() {
    var dis = document.getElementById("ExamingDis");
    dis.innerText = getStringFormatedDistance(examrecord.distance);
}

function MouseOverFunction(o) {
    alert("MouseOver");
    o.style.border = "1px solid #CCCCCC";
}

//当前答错次数
var wrongtimes = 0;
//连续答对次数
var correcttimes = 0;
//最大允许答错次数
var maxwrongtimes = 3;
//最大连续答对次数
var maxcorrecttimes = 5;
//当前E字符的朝向
var curgivencharorient = Orientation.unknown;
//用户给出的回答朝向
var userorient = Orientation.unknown;
//设定一个视力检查方向的变量，当该变量为0时，表示方向未确定；当＝1时，表示患者可以看清当前视力代表的字符大小，并倾向于提供更高的视力字符；当＝－1时表示患者无法看清当前视力登记代表的字符，检查方向转为提供较低视力的字符。检查方向一旦确定不为0，则不再更改。
var examdirection = 0;
//用户回答是否正确，初始设定为不正确
var isAnswerRight = false;
//检查结束是否结束
var isExamFinished = false;
//是否正在分析本次应答
var isAnalysising = false;

function initPreExamData() {
    examrecord.examingEye = Eyes.unknown;
    examrecord.distance = examDis;
    examrecord.vaindex = initExamVAIndex;
    examrecord.va = vagrades[initExamVAIndex].value;
    wrongtimes = 0;
    correcttimes = 0;
    maxwrongtimes = 3;
    maxcorrecttimes = 5;
    curgivencharorient = Orientation.unknown;
    userorient = Orientation.unknown;
    examdirection = 0;
    isAnswerRight = false;
    isExamFinished = false;
    isAnalysising = false;
}
    
//在正式检查视力时应调用该函数对检查进行设置，此后检查过程中均只对examrecord进行修改。
function preExamSetting() {
    //根据参数设定初始检查记录
    $("#fbImage").fadeTo(0, 0);
    initPreExamData();
    UpdateExamingVA();
    UpdateExamingDis();
    //准备画布
    ClearDrawArea();
    //准备新字符
    CreateNewEChar();
    //绘制字符
    DrawEChar2();
}


//以图片的方式显示用户回答的结果是否正确，在场景内放置图片
function displayResultImage(isanswerright) {
    var c=document.getElementById("fbImage")
    if(isanswerright)
    {
        c.src = "Images/right.png";
    }
    else {
        c.src = "Images/wrong.png";
    }
    $("#fbImage").fadeTo('fast', 1);
    $("#fbImage").fadeTo('fast',0);
}

//分析处理用户应答的核心程序
function ProcessAfterUserAnswer(){
    //如果检查已经结束，则不运行后续代码，直接返回跳出本函数
    if(isExamFinished==true){
        //println("检查结束")
        return
    }
    //如果用户的朝向与E字符实际朝向一致
    if(userorient == eChar.orient){
        //表示用户答对了
        isAnswerRight=true;
        //正确回答的次数增加1次
        correcttimes++;
        //当此行视力检查连续正确回答次数达到一定数量，并且总的检查方向是朝着差的视力进行的，或者已达到最高视力
        //检查结束，当前视力为最佳视力
        if((correcttimes >= maxcorrecttimes && examdirection == -1) ||
            (correcttimes >= maxcorrecttimes && examrecord.va >= 1.0)){
            isExamFinished=true;
        }
            //当检查方向不确定或者是朝着更好的视力等级进行时
        else if ( correcttimes >= maxcorrecttimes && examdirection != -1 ){
            if(examdirection==0){
                //设定检查朝向更好的视力等级进行
                examdirection = 1;
            }
            //打算提高一个视力等级继续检查，并设定在该行的一些判断数据，检查并未结束
            examrecord.vaindex++;
            if (examrecord.vaindex >= vagrades.length - 1)
            { examrecord.vaindex = vagrades.length - 1; }
            examrecord.va = vagrades[examrecord.vaindex].value;
            correcttimes=0;
            wrongtimes=0;
            isExamFinished=false;
        }
    }
        //用户指出的方向与实际方向不一致
    else{
        //回答错了
        isAnswerRight=false;
        wrongtimes++;
        //一旦回答错误，则先前在此行的正确回答次数被清零，表明正确回答次数是连续正确回答次数
        correcttimes = 0;
        //如果此行回答错误次数达到设定值，并且是朝着视力较好的等级方向检查或者已经到达最低检查视力，表明检查应该结束
        if((wrongtimes >= maxwrongtimes && examdirection == 1) ||
            (wrongtimes >= maxwrongtimes && examrecord.va <= 0.1)){
            //此时的实际视力应比当前低一级
            if (examrecord.vaindex > 0)
            { examrecord.vaindex--; }
            examrecord.va=vagrades[examrecord.vaindex].value;
            isExamFinished=true;
            //return;
        }
            //如果虽然错误回答此处达到设定次数，但检查的方向不确定或者是一直提供较高视力等级给用户（也就是说用户还没能有一个确定的视力级别）检查
            //则表明检查方向应设定为朝着更低等级的视力进行
        else if ( wrongtimes >= maxwrongtimes && examdirection != 1 ){
            if(examdirection==0){
                examdirection = -1;
            }
            //同时下调视力等级继续检查
            if (examrecord.vaindex > 0)
            { examrecord.vaindex--; }
            examrecord.va = vagrades[examrecord.vaindex].value;
            isExamFinished=false;
            wrongtimes=0;
        }
    }
    //将当前用户回答情况以图片的形式在界面上反映出来
    displayResultImage(isAnswerRight)
    //根据检查是否结束决定是否在场景内布置新的E字符
    if (isExamFinished == false) {
        CreateNewEChar();
        UpdateExamingVA();
        ClearDrawArea();
        DrawEChar2();
        //重置用户的判断为unknow，表明用户还没有判断新的E字符朝向
        userorient=Orientation.unknown
        //更新下界面数据

    }
        //如果检查结束
    else{
        //则不让用户继续点击“看不清”按钮
        //uiBtnWrong.enabled=false
        //显示检查结束的一些信息（显示最终得到的视力）
        displayExamResult()
        //用户可以点击导航条右上角的按钮返回上一个视图
        //nextBarButtonItem.enabled=true
        //uiBtnCorrect.enabled=false
    }
}

function displayExamResult() {
    $('#ResultWindow').window('open');
    var c = document.getElementById("ExamedVA");
    c.innerText = vagrades[examrecord.vaindex].text;
}
function CloseResultWindow() {
    $('#ResultWindow').window('close');
}
function userClicked(o) {
    if (isAnalysising == true) {
        return;
    }
    else {
        isAnalysising = true;
        userorient = o;
        ProcessAfterUserAnswer();
        isAnalysising = false;
    }
}
function wrongBtnClicked() {
    if(isAnalysising==true){
        return;
    }
    else{
        isAnalysising = true;
        userorient=Orientation.unknown;
        ProcessAfterUserAnswer();
        isAnalysising = false;
    }
}
function rightBtnClicked(){
    if(isAnalysising==true){
        return;
    }
    else{
        isAnalysising = true;
        userorient=eChar.orient;
        ProcessAfterUserAnswer();
        isAnalysising = false;
    }
}
