<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>视力检查</title>
    <link href="Css/layout.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
    </style>
    <link rel="stylesheet" type="text/css" href="JQuery-easyui/themes/bootstrap/easyui.css" />
    <link rel="stylesheet" type="text/css" href="JQuery-easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="JQuery-easyui/demo/demo.css" />
    <script type="text/javascript" src="JQuery-easyui/jquery.min.js"></script>
    <script type="text/javascript" src="JQuery-easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="Scripts/DrawECharacter.js"></script>
</head>
<body onload ="InitBackGround()">
    <div style="text-align:right;vertical-align:central">
        中文&nbsp;&nbsp;<a href="en/default.asp">English</a>
    </div>
    <div class="Container" style="width:800px;height:660px;top:0px;text-align:center;">
        <div id="MainPanel" class="easyui-panel" title="视力检查-从这里开始"
             style="position:relative;width:800px;height:660px;margin:0 auto;padding:0px"
             data-options="footer:'#ft'">
            <div id="DrawPanel" class="easyui-draggable" style="position:absolute;width:550px;height:550px;left:5px;top:5px;border:1px dashed #CCCCCC;visibility:visible;z-index:0;">
                <canvas id="myCanvas" width="550" height="550" style="left:0px;top:0px">
                    Your browser does not support the canvas element.
                </canvas>
                <div id="ImageDiv" class="easyui-draggable" style="border:0px solid #CCCCCC;position:absolute;width:240px;height:240px;left:160px;top:160px">
                    <Img id="fbImage" src="Images/right.png" style="width:240px;height:240px;opacity:0.8" />
                </div>
            </div>
            <div id="Introduction" class="Content" style="visibility:visible">
                <div id="p" style="width:600px;height:200px;padding:10px;line-height:200%">
                    <p style="font-size:14px">没错，在家就可以进行专业的视力检查啦，看看我们是如何做到的吧</p>
                    <ul>
                        <li>请放心，我们拥有专业的眼科和视光学知识，我们需要的只是您耐心的配合</li>
                        <li>我们和传统的视力检查原理一样，只是把这个过程搬到您的家里、您的电脑前</li>
                        <li>我们会在电脑屏幕上显示出不同大小的E字符，由您来辨认</li>
                        <li>您身边最好能有一个朋友帮助您操作电脑，这样会节省很多时间</li>
                        <li>由于视力检查是一项对尺寸和距离要求较高的检查，我们需要显示尽可能准确大小的E字符。但是不同的显示设备的尺寸以及显示分辨率的不同，并且程序无法一一判断获知此类信息
                        所以，我们需要您的协助来帮助我们完成校准工作。不要着急，这很简单：</li>
                        <ul>
                            <li>1.请准备一张身份证卡片或银行卡，这些卡片的长宽基本上是固定的（856mm*540mm)</li>
                            <li>2.我们将会在屏幕上显示一张卡片的图片或一块矩形区域</li>
                            <li>3.请把您的卡片靠近屏幕上的图片区域（注意不要划伤屏幕）</li>
                            <li>4.调整下方的滑块来放大或缩小图片的大小，使得它尽量与您的卡片重合</li>
                            <li>5.当您觉得两者非常重合的时候，校准工作就完成了</li>
                            <li>有时候，也许您无论怎么调整都无法使矩形的长和宽同时重合，没关系，请优先照顾长度的重合就可以了</li>
                        </ul>
                        <li>准备好了吗？请从您的钱包里拿出一张卡片，然后请点击<a href="#" onclick="NextStep()">下一步</a></li>
                    </ul>
                </div>
            </div>
            <div id="Correction" class="Content">
                <div id="q" style="width:600px;height:200px;padding:10px;line-height:200%">
                    <ul>
                        <li>请取出一张尺寸为856mm×540mm的卡片（口袋里的大多数卡片都是这个尺寸）</li>
                        <li>滑动下方的滑块来缩放矩形区域，同时调整卡片位置使得它与卡片重合</li>
                        <li>完全重合后即表示校准已完成，此后的操作中请不要滑动滑块，也不要调整屏幕分辨率以及缩放浏览器</li>
                        <li>完成后请点击<a href="#" onclick="NextStep()">下一步</a></li>
                    </ul>
                </div>
                <div class="easyui-draggable">
                    <div id="ImagePanel" style="position:absolute;left:50px;top:5px;z-index:0;">
                        <img id="corImage" width="428" height="270" style="position:absolute;width:428px;
                            height:270px;left:130px;top:110px;border:2px" src="Images/card.png"/>
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
                                        请滑动滑块选择检查距离（30厘米-5米）:
                                        <input id="tbVADis" class="easyui-textbox" value="5米" type="text" name="name" style="width:60px" data-options="editable:false">
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
                                        请下拉选择视力初始检查等级:
                                        <input id="cbVAGrades" name="dept" width="120" value="0.10  - 4.0" style="width:120px;text-align:left">
                                    </td>
                                </tr>
                            </table>
                        </form>
                        <div style="position:relative;text-align:right;padding:5px">
                            <a href="javascript:void(0)" class="easyui-linkbutton" onclick="NextStep()">好　了</a>
                        </div>
                    </div>
                </div>
                <div class="easyui-draggable" style="border:1px solid #CCCCCC;position:relative;width:500px;height:200px;left:0px;top:20px;" data-options="noheader:true,border:true">
                    <div style="padding:10px 20px 5px 0px;text-align:left;font-size:10px;line-height:200%">
                        <ul>
                            <li>
                                选择合适的检查距离:
                                不同距离下测得的视力有着不同的意义，其中最具代表性的是在5米、以及30cm处的视力，他们分别
                                代表的是看远和看近时的视力，他们对于眼科医生来说都是非常有意义的数据。如果您不想两种
                                距离下都检查，我们建议老年人检查远视力，而年龄低于40岁左右的检查近视力（当然这不是绝对的）
                            </li>
                            <li>
                                选择合适的初始检查视力:选择与您实际视力接近的视力值开始检查有助于缩短检查时间
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="PreExamInfo" class="Content" style="left:160px;top:20px;text-align:center">
                <div class="easyui-draggable" style="border:1px solid #CCCCCC;position:absolute;width:500px;height:350px;left:0px;top:60px;" data-options="noheader:true,border:true">
                    <div style="padding:10px 20px 5px 0px;text-align:left;font-size:10px;line-height:220%">
                        <ul id="PreExamInfoList">
                            <li>
                                您选择的检查距离是：
                                <input id="tbVADis2" class="easyui-textbox" value="5米" type="text" name="name" style="width:60px" data-options="editable:false">
                                ,初始检查视力是：
                                <input id="tbInitVA" class="easyui-textbox" value="0.1" type="text" name="name" style="width:60px" data-options="editable:false">
                            </li>
                            <li>请尽可能的把显示器亮度调到最佳，将电脑放在合适的高度，显示器竖直摆放，受检者与显示器保持“检查距离”，同时做到受检者观察显示器字符时视线处于水平状态</li>
                            <li>如果您选择的距离超过50cm，建议您找一个朋友帮您操作电脑。检查一眼时，请使用不透明的物体遮住另一只眼睛，但请保持双眼自然充分睁开</li>
                            <li>您也可以使用双眼进行检查，同时您也可以选择戴或者不戴眼镜进行检查，无论怎样，请在您最后获得的视力后注明检查条件（检查距离、眼别、是否戴镜等）</li>
                            <li>您将会在屏幕上看到不同朝向的“E”字符，如果您能看清朝向请（或让您的朋友）点击“正确/能看清”按钮，
                                如果您看不清或者是被检查者回答错误，则点击“错误/看不清”按钮
                            </li>
                            <li>如果您准备好了，就可以点击下方按钮开始检查</li>
                        </ul>
                    </div>
                    <div style="position:absolute;text-align:right;right:5px;bottom:5px;padding:5px">
                        <a href="javascript:void(0)" class="easyui-linkbutton" style="width:100px;height:40px" onclick="ReadyForExaming()">准备好了</a>
                    </div>
                </div>
            </div>
            <div id="Examing" class="Content" style="text-align:center">
                <div class="easyui-draggable" style="border:1px dashed #CCCCCC;position:absolute;width:140px;height:140px;left:600px;top:5px;">
                    <table style="width:140px">
                        <tr>
                            <td style="text-align:left;vertical-align:central;width:100px;font-size:15px">检查距离：</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;vertical-align:central">
                                <big id="ExamingDis" style="font-size:20px">检查距离</big>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:left;vertical-align:central;font-size:15px">
                                当前视力：
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:center;vertical-align:central">
                                <big id="ExamingVA" style="height:60px;vertical-align:central;font-size:20px">当前视力</big>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="easyui-draggable" style="border:0px solid #CCCCCC;position:absolute;width:140px;height:200px;left:600px;top:340px;vertical-align:central">
                    <table style="width:140px;text-align:center">
                        <tr>
                            <td style="height:90px;vertical-align:central;text-align:center">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:130px;height:60px" onclick="rightBtnClicked()">正确/能看清</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:90px;vertical-align:central;text-align:center">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:130px;height:60px" onclick="wrongBtnClicked()">错误/看不清</a>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="easyui-draggable" style="border:0px solid #CCCCCC;position:absolute;width:160px;height:160px;left:600px;top:180px;vertical-align:central">
                    <table style="width:140px;text-align:center;font-size:20px">
                        <tr style="height:40px">
                            <td style="width:40px"></td>
                            <td style="height:40px;vertical-align:bottom;text-align:center">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:40px;height:40px;font-size:20px" onclick="userClicked(0)">上</a>
                            </td>
                            <td style="width:40px"></td>
                        </tr>
                        <tr style="height:40px">
                            <td style="height:40px;vertical-align:central;text-align:right">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:40px;height:40px;font-size:20px" onclick="userClicked(3)">左</a>
                            </td>
                            <td style="width:40px"></td>
                            <td style="height:40px;vertical-align:central;text-align:left">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:40px;height:40px;font-size:20px" onclick="userClicked(1)">右</a>
                            </td>

                        </tr>
                        <tr style="height:40px">
                            <td style="width:40px"></td>
                            <td style="height:40px;vertical-align:top;text-align:center">
                                <a href="javascript:void(0)" class="easyui-linkbutton" style="width:40px;height:40px;font-size:20px" onclick="userClicked(2)">下</a>
                            </td>
                            <td style="width:40px"></td>
                        </tr>
                    </table>
                </div>
                <div id="ResultWindow" class="easyui-window" title="检查结束-视力报告" data-options="modal:true,closed:true" style="width:350px;height:200px;padding:10px;">
                    <div style="height:100px;text-align:center;vertical-align:central;">
                        <br />
                        <big style="font-size:25px;">您的视力：</big><big id="ExamedVA" ; style="font-size:25px;">视力值</big>
                    </div>
                    <div style="position:relative;text-align:center;right:5px;bottom:5px;padding:5px">
                        <a href="javascript:void(0)" class="easyui-linkbutton" style="width:100px;height:40px" onclick="CloseResultWindow()">关闭窗口</a>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    <div id="ft" style="padding:5px;text-align:right">
        <table width="100%" style="font-size:12px">
            <tr>
                <td style="text-align:left">作者:<a href="mailto:qqiangye@gmail.com">叶强</a>. 最后更新日期 08-30-2015. 页面引擎:JEasyUI. 
                </td>
                <td style="text-align:center;width:80px">
                     <a id="preStepBtn" onclick="PreStep()" href="#" class="easyui-linkbutton" data-options="plain:true">上一步</a>
                </td>      
                <td style="text-align:center;width:80px">
                    <a id="nextStepBtn" onclick="NextStep()" href="#" class="easyui-linkbutton" data-options="plain:true">下一步</a>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>

