<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Visual Acuity Test</title>
    <link href="../Css/layout.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
    </style>
    <link rel="stylesheet" type="text/css" href="../JQuery-easyui/themes/bootstrap/easyui.css" />
    <link rel="stylesheet" type="text/css" href="../JQuery-easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../JQuery-easyui/demo/demo.css" />
    <script type="text/javascript" src="../JQuery-easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../JQuery-easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../en/Scripts/DrawECharacter.js"></script>
</head>
<body onload ="InitBackGround()">
    <div style="text-align:right;vertical-align:central">
        <a href="../default.asp">中文</a>&nbsp;&nbsp;English
    </div>
    <div class="Container" style="width:800px;height:660px;top:0px;text-align:center;">
        <div id="MainPanel" class="easyui-panel" title="Visual Acuity Test - Start From Here"
             style="position:relative;width:800px;height:660px;margin:0 auto;padding:0px"
             data-options="footer:'#ft'">
            <div id="DrawPanel" class="easyui-draggable" style="position:absolute;width:550px;height:550px;left:5px;top:5px;border:1px dashed #CCCCCC;visibility:visible;z-index:0;">
                <canvas id="myCanvas" width="550" height="550" style="left:0px;top:0px">
                    Your browser does not support the canvas element.
                </canvas>
                <div id="ImageDiv" class="easyui-draggable" style="border:0px solid #CCCCCC;position:absolute;width:240px;height:240px;left:160px;top:160px">
                    <Img id="fbImage" src="../Images/right.png" style="width:240px;height:240px;opacity:0.8" />
                </div>
            </div>
            <div id="Introduction" class="Content" style="visibility:visible">
                <div id="p" style="width:760px;height:400px;padding:10px;line-height:200%">
                    <p style="font-size:14px">Visual Acuity (VA) Test can be <B>PRECISELY</B> done at home.See how this be done:</p>
                    <ul>
                        <li>Take it easy.The design of the program is based on professional optometry knowledge.</li>
                        <li>The principle of VA test is the same as the traditional one. The procedure is just moved to the computer in front of you.</li>
                        <li>Certain size and orientation of a 'E' Character will be displayed on the screen for you to tell.</li>
                        <li>Display correction is the priority during the whole test,because the PRECISE size of 'E' characters are supposed to display.</li>
                        <li>As there are so many display types for display devices,the correction has to be done mannually.</li>
                        <li>The following Instructions will help you to accomplish the CORRECTION:</li>
                        <ul>
                            <li>1.Prepare a card (trafic card,bank card,etc.) with the size 856mm*540mm(most of the cards in pocket are of such size).</li>
                            <li>2.A rectangle will displayed in the screen.</li>
                            <li>3.Place the card on the surface of the screen(Be careful not to scratch the screen).</li>
                            <li>4.Zoom in(out) the rectangle by sliding the slider at the bottom, try to Match the size of the card.(you may need to move the card meanwhile.)</li>
                            <li>5.Once the border of the card and the rectangle are overlaped,correction is DONE.</li>
                            <li>The overlap for just length of the card and rectangle is also OK, if the length and the width can not be overlaped at the same time due to the different type of display devices.</li>
                        </ul>
                        <li>Are you ready? Prepare a card and click: <a href="#" onclick="NextStep()">Next Step</a>.</li>
                    </ul>
                </div>
            </div>
            <div id="Correction" class="Content">
                <div id="q" style="width:760px;height:200px;padding:10px;line-height:200%">
                    After the correction, <b>Not to adjust: display density of the screen,zoom scale of the browser and the orientation of Pad.</b>
                    <ul>
                        <li>Place the card on your computer or pad screen(Be careful not to scratch the screen).</li>
                        <li>Zoom in(out) the rectangle by sliding the slider at the bottom, try to Match the size of the card.(you may need to move the card slightly)</li>
                        <li>Once the border of the card and the rectangle are overlaped,DONE.</li>
                        <li>Click <a href="#" onclick="NextStep()">Next Step</a> if the correction is done.</li>
                    </ul>
                </div>
                <div class="easyui-draggable">
                    <div id="ImagePanel" style="position:absolute;left:50px;top:5px;z-index:0;">
                        <img id="corImage" width="428" height="270" style="position:absolute;width:428px;
                            height:270px;left:130px;top:110px;border:2px" src="../Images/card.png"/>
                    </div>
                </div>

                <div style="border:0px solid #CCCCCC;position:absolute;width:300px;height:10px;left:240px;top:500px;vertical-align:central;">
                    <input id="slideHor" class="easyui-slider" style="width:300px" data-options="
                            showTip:true,
                            rule: [0.0,'|',0.5,'|',1.0,'|',1.5,'|',2.0]">
                </div>
            </div>
            <div id="Setting" class="Content" style="width:500px;left:160px;top:20px;text-align:center">
                <div class="easyui-panel" style="border:1px solid #CCCCCC;position:relative;width:500px;left:0px;top:0px;" data-options="noheader:true,border:true">
                    <div style="padding:10px 20px 20px 20px">
                        <form id="ff" method="post">
                            <table cellpadding="5">
                                <tr>
                                    <td style="text-align:left">
                                        Slide to change the distance for test（30cm-5m）:
                                        <input id="tbVADis" class="easyui-textbox" value="5M" type="text" name="name" style="width:60px" data-options="editable:false">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:60px;vertical-align:top">
                                        <div style="position:relative;height:10px;left:20px;top:2px;vertical-align:top;">
                                            <input id="slideDis" class="easyui-slider" style="width:350px"
                                                   data-options="showTip:true,
                                                              rule: [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align:left;width:400px">
                                        Select the initial VA grade:
                                        <input id="cbVAGrades" name="dept" width="120" value="0.10  - 4.0" style="width:120px;text-align:left">
                                    </td>
                                </tr>
                            </table>
                        </form>
                        <div style="position:relative;text-align:right;padding:5px">
                            <a href="javascript:void(0)" class="easyui-linkbutton" onclick="NextStep()">Next Step</a>
                        </div>
                    </div>
                </div>
                <div class="easyui-draggable" style="border:1px solid #CCCCCC;position:relative;width:500px;height:250px;left:0px;top:20px;" data-options="noheader:true,border:true">
                    <div style="padding:10px 20px 5px 0px;text-align:left;font-size:10px;line-height:200%">
                        <ul>
                            <li>
                                Select Proper Distance for test:
                                VAs under different test distances have different meanings. The most common used distances are :30cm and 5m,and the results represent near and far VA seperatively.
                                Both of them are meaningful for opthalmologist. people less than 40 years are recommended the 30cm - 2m distance,while elders are recommended 2m - 5m distance,if one doesn't want to do the tests under the two distances.
                            </li>
                            <li>
                                Select Porper Initial Test VA Grades: it will help saveing time if the initial VA grade is near to your real VA.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="PreExamInfo" class="Content" style="left:10px;top:20px;text-align:center">
                <div class="easyui-draggable" style="border:1px solid #CCCCCC;position:absolute;width:700px;height:400px;left:30px;top:20px;" data-options="noheader:true,border:true">
                    <div style="padding:10px 20px 5px 0px;text-align:left;font-size:10px;line-height:220%">
                        <ul id="PreExamInfoList">
                            <li>
                                the Distance you selected is：
                                <input id="tbVADis2" class="easyui-textbox" value="5M" type="text" name="name" style="width:60px" data-options="editable:false">
                                ,the initial VA grades for test is：
                                <input id="tbInitVA" class="easyui-textbox" value="0.1" type="text" name="name" style="width:60px" data-options="editable:false">
                            </li>
                            <li>Adjust the display ligntness to the top level, put the display screen to a proper height and orientation so that the line between the screen center and the eyes are vertical to the surface of the display device.</li>
                            <li>If the distance you select is over 50cm, you need a friend to help you to respond to the computer.</li>
                            <li>If you just want to test one of the eyes, pleas just mask another eye with an opaque object and keep both eyes open naturally. </li>
                            <li>You can wear or wear not glasses, also you can test one of the eyes or both of them at the same time. Whatever you select,note them (distance,eye type,with or without glasses) after the VA results.</li>
                            <li>Different size and orientation of "E" character will be displayed in the screen, if you can see it clearly, click (or let your friend to click) “CORRECT/CLEAR” button;if you can't, the "WRONG/NOT CLEAR" button is supposed to be clicked.Or just click the button titled with the orientation
                                you answered.
                            </li>
                            <li>if you are well prepared，Clicked the "I am Ready" button to start the test.</li>
                        </ul>
                    </div>
                    <div style="position:absolute;text-align:right;right:5px;bottom:5px;padding:5px">
                        <a href="javascript:void(0)" class="easyui-linkbutton" style="width:100px;height:40px" onclick="ReadyForExaming()">I am Ready</a>
                    </div>
                </div>
            </div>
            <div id="Examing" class="Content" style="text-align:center">
                <div class="easyui-draggable" style="border:1px dashed #CCCCCC;position:absolute;width:140px;height:140px;left:600px;top:5px;">
                    <table style="width:140px">
                        <tr>
                            <td style="text-align:left;vertical-align:central;width:100px;font-size:15px">DISTANCE：</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;vertical-align:central">
                                <big id="ExamingDis" style="font-size:20px">DISTANCE</big>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:left;vertical-align:central;font-size:15px">
                                CUR VA GRADE：
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:center;vertical-align:central">
                                <big id="ExamingVA" style="height:60px;vertical-align:central;font-size:20px">CUR VA GRADE</big>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="easyui-draggable" style="border:0px solid #CCCCCC;position:absolute;width:140px;height:200px;left:600px;top:340px;vertical-align:central">
                    <table style="width:140px;text-align:center">
                        <tr>
                            <td style="height:90px;vertical-align:central;text-align:center">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:130px;height:60px" onclick="rightBtnClicked()">CORRECT/CLEAR</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:90px;vertical-align:central;text-align:center">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:130px;height:60px" onclick="wrongBtnClicked()">WRONG/NOT CLEAR</a>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="easyui-draggable" style="border:0px solid #CCCCCC;position:absolute;width:160px;height:160px;left:600px;top:180px;vertical-align:central">
                    <table style="width:140px;text-align:center;font-size:20px">
                        <tr style="height:40px">
                            <td style="width:40px"></td>
                            <td style="height:40px;vertical-align:bottom;text-align:center">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:40px;height:40px;font-size:20px" onclick="userClicked(0)">U</a>
                            </td>
                            <td style="width:40px"></td>
                        </tr>
                        <tr style="height:40px">
                            <td style="height:40px;vertical-align:central;text-align:right">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:40px;height:40px;font-size:20px" onclick="userClicked(3)">L</a>
                            </td>
                            <td style="width:40px"></td>
                            <td style="height:40px;vertical-align:central;text-align:left">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:40px;height:40px;font-size:20px" onclick="userClicked(1)">R</a>
                            </td>

                        </tr>
                        <tr style="height:40px">
                            <td style="width:40px"></td>
                            <td style="height:40px;vertical-align:top;text-align:center">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:40px;height:40px;font-size:20px" onclick="userClicked(2)">D</a>
                            </td>
                            <td style="width:40px"></td>
                        </tr>
                    </table>
                </div>
                <div id="ResultWindow" class="easyui-window" title="Test Finished - VA Report" data-options="modal:true,closed:true" style="width:350px;height:200px;padding:10px;">
                    <div style="height:100px;text-align:center;vertical-align:central;">
                        <br />
                        <big style="font-size:25px;">Your Visual Acuity is：</big><big id="ExamedVA" ; style="font-size:25px;">Value</big>
                    </div>
                    <div style="position:relative;text-align:center;right:5px;bottom:5px;padding:5px">
                        <a href="javascript:void(0)" class="easyui-linkbutton" style="width:100px;height:40px" onclick="CloseResultWindow()">Close</a>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    <div id="ft" style="padding:5px;text-align:right">
        <table width="100%" style="font-size:12px">
            <tr>
                <td style="text-align:left">Author:<a href="mailto:qqiangye@gmail.com">Qiang YE</a>. Last Updated at 08-30-2015,Montreal,Canada. PoweredBy JEasyUI. 
                </td>
                <td style="text-align:center;width:80px">
                     <a id="preStepBtn" onclick="PreStep()" href="#" class="easyui-linkbutton" data-options="plain:true"><u>Last Step</u></a>
                </td>      
                <td style="text-align:center;width:80px">
                    <a id="nextStepBtn" onclick="NextStep()" href="#" class="easyui-linkbutton" data-options="plain:true"><u>Next Step</u></a>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>

