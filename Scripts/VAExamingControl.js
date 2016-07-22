
    
    //数据结构，记录视力检查记录
    var vaexamrecord:VAExamRecord=VAExamRecord()
    //默认的初始检查视力等级
    var initexamva:Float=0.1;
    //当前答错次数
    var wrongtimes:Int=0;
    //连续答对次数
    var correcttimes:Int=0;
    //最大允许答错次数
    let maxwrongtimes:Int=3;
    //最大连续答对次数
    let maxcorrecttimes:Int=5;
    //当前E字符的朝向
    var curgivencharorient:Orientation=Orientation.unknown
    //用户给出的回答朝向
    var userorient:Orientation=Orientation.unknown
    //设定一个视力检查方向的变量，当该变量为0时，表示方向未确定；当＝1时，表示患者可以看清当前视力代表的字符大小，并倾向于提供更高的视力字符；当＝－1时表示患者无法看清当前视力登记代表的字符，检查方向转为提供较低视力的字符。检查方向一旦确定不为0，则不再更改。
    var examdirection = 0
    //用户回答是否正确，初始设定为不正确
    var isAnswerRight=false;
    //检查结束是否结束
    var isExamFinished=false;
    //是否正在分析本次应答
    var isAnalysising=false;
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //在检查结束前，应让导航条上的“继续”按钮变得不可用
        nextBarButtonItem.enabled=false
        //初始检查视力设定为从检查记录里保存的视力
        initexamva=vaexamrecord.visualacuity
        //更新视图面板上的一些控件信息（检查距离、当前视力等级、左右眼等）
        updatePanelInfo()
        //设置一些背景和前景颜色
        thirdTableViewCell.backgroundColor=UIColor.appMainBackgroundColor()
        uiBtnWrong.tintColor=UIColor.applicationDefaultTextColor()
        //正式检查前弹出一个框给以用户提示
        notification()
        //产生初始E字符所在的场景
        createInitScene()
        //在场景内产生一个随机朝向的E字符
        createEcharInScene()
        //初始化一些数据
        initData()
        //注册四个主要方向滑动的手势
        registerHandleSwipeGesture()
    }
    
    override func viewWillAppear(animated: Bool) {
        // Do any additional setup after loading the view, typically from a nib.
    }
    //初始化数据
    func initData(){
        //在声明的时候已经初始化了
        //correcttimes=0;
        //wrongtimes=0;
        notiImageCtrl.image=nil;
    }
    //注册手势
    func registerHandleSwipeGesture(){
        var swipeGesture = UISwipeGestureRecognizer(target: self, action: "handleSwipeGesture:")
        self.view.addGestureRecognizer(swipeGesture)
        //注册左滑手势
        var swipeLeftGesture = UISwipeGestureRecognizer(target: self, action: "handleSwipeGesture:")
        swipeLeftGesture.direction = UISwipeGestureRecognizerDirection.Left //不设置是右
        self.view.addGestureRecognizer(swipeLeftGesture)
        //注册上划手势
        var swipeUpGesture = UISwipeGestureRecognizer(target: self, action: "handleSwipeGesture:")
        swipeUpGesture.direction = UISwipeGestureRecognizerDirection.Up//不设置是右
        self.view.addGestureRecognizer(swipeUpGesture)
        //注册下划手势
        var swipeDownGesture = UISwipeGestureRecognizer(target: self, action: "handleSwipeGesture:")
        swipeDownGesture.direction = UISwipeGestureRecognizerDirection.Down //不设置是右
        self.view.addGestureRecognizer(swipeDownGesture)
    }
    //设置提示信息
    func notification(){
        var alert = UIAlertView()
        //直接这样创建有bug
        //var alert = UIAlertView(title: "alert", message: "this is an alert", delegate: self, cancelButtonTitle: "cancel")
        alert.title = "提示"
        alert.delegate = self
        alert.addButtonWithTitle("我准备好了")
        var inform=""
        switch (vaexamrecord.vatype){
        case VAType.naked:
            inform="请不要佩戴任何眼镜，将手机移至\(vaexamrecord.distance)米远准备检查"
        case VAType.withglasses,VAType.corrected:
            inform="请佩戴上您的眼镜（如果有），将手机移至\(vaexamrecord.distance)米远准备检查"
        case VAType.near:
            inform="将手机移至0.5米以内任意您觉得看东西最清楚的距离，检查过程中您可以随时调整检查距离直到您觉得最清楚。如果您觉得佩戴任何类型的眼镜比较清楚，您随时可以带上眼镜。但请不要使用放大镜。"
        case VAType.unknown:
            inform="将手机移至\(vaexamrecord.distance)米,准备检查"
        default:
            inform="将手机移至\(vaexamrecord.distance)米,准备检查"
        }
        alert.message = inform
        alert.show()
    }
    //更新控件信息
    func updatePanelInfo(){
        lbdis.text=vaexamrecord.distance.description
        lbeyeclass.text=vaexamrecord.examingeye.rawValue
        lbinitva.text=vaexamrecord.visualacuity.description
    }
    //设置放置E字符的场景
    func createInitScene(){
        let skView=self.eview// as SKView
        //skView.backgroundColor=SKColor.greenColor()
        let scene=SKScene()
        scene.size=CGSize(width: skView.frame.width,height: skView.frame.height);
        //scene.alpha=1.0
        scene.anchorPoint=CGPointMake(1/2,1/2)
        scene.backgroundColor=UIColor.whiteColor()
        skView.presentScene(scene)
        vaexamrecord.visualacuity=initexamva
    }
    //在场景内放置一个E字符
    func createEcharInScene(){
        let scene=self.eview.scene!
        if(scene.children.count>0){
            for var i=scene.children.count-1;i>=0;i-- {
            scene.children[i].runAction(SKAction.fadeOutWithDuration(0.3))
            }
        }
        //println(scene.children[0].description)
        let neworient=self.generateNewOrientation()
        let e:ECharNode=ECharNode(orientation: neworient, examdistance: vaexamrecord.distance, visualacuity: vaexamrecord.visualacuity)
        e.position=CGPoint(x:0,y:0)
        let hover = SKAction.sequence([
            SKAction.fadeInWithDuration(0.5)
            ])
        scene.addChild(e)
        e.runAction(hover)
        curgivencharorient=e.orient
    }
    //在场景内放置检查结束时提供的视力结果信息
    func displayExamFinishedInScene(){
        let scene=self.eview.scene!
        scene.removeAllChildren()
        let infoLabel = SKLabelNode (fontNamed: "Arial")
        infoLabel.text = "检查结束"
        infoLabel.fontSize = 20
        infoLabel.fontColor = UIColor.applicationSecondColor()
        infoLabel.position = CGPoint(x:CGRectGetMidX(scene.frame), y:CGRectGetMidY(scene.frame) + 30)
        let infoLabel2 = SKLabelNode (fontNamed: "Airal")
        if(vaexamrecord.visualacuity<0.1){
            infoLabel2.text = "您的视力低于0.1"
            vaexamrecord.visualacuity=0.1
        }else{
        infoLabel2.text="您的视力约是:\(vaexamrecord.visualacuity) (\(vamapping[vaexamrecord.visualacuity]!.description))"
        }
        infoLabel2.fontSize=20
        infoLabel2.fontColor=UIColor.applicationSecondColor()
        infoLabel2.position=CGPoint(x:CGRectGetMidX(scene.frame), y:CGRectGetMidY(scene.frame) )
        scene.addChild(infoLabel)
        scene.addChild(infoLabel2)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
        
    }
    //获取一个新的E字符朝向，这个朝向与之前的朝向不同
    func generateNewOrientation()->Orientation{
        var neworient:Orientation;
        do{
            neworient=Orientation.RandomOrientation()
        }while(neworient==curgivencharorient)
        return neworient
    }
    //以图片的方式显示用户回答的结果是否正确，在场景内放置图片
    func displayResultImage(isUserAnswerRight isright:Bool){
        let skView=self.eview
        let scene=skView.scene!
        var resultImage:SKSpriteNode
        if ( isright == true){
            resultImage=SKSpriteNode(imageNamed: "correct")
        } else {
            resultImage=SKSpriteNode(imageNamed: "wrong")
        }
        let x:CGFloat=1/2;
        let y:CGFloat = resultImage.size.height-scene.size.height/2
        resultImage.position=CGPointMake(x, y)
        scene.addChild(resultImage)
    }
    //分析处理用户应答的核心程序
    func ProcessAfterUserAnswer(){
        //如果检查已经结束，则不运行后续代码，直接返回跳出本函数
        if(isExamFinished==true){
            println("检查结束")
            return
        }
        //如果用户的朝向与E字符实际朝向一致
        if(userorient == curgivencharorient){
            //表示用户答对了
            isAnswerRight=true;
            //正确回答的次数增加1次
            correcttimes+=1;
            //当此行视力检查连续正确回答次数达到一定数量，并且总的检查方向是朝着差的视力进行的，或者已达到最高视力
            //检查结束，当前视力为最佳视力
            if((correcttimes >= maxcorrecttimes && examdirection == -1) ||
                (correcttimes >= maxcorrecttimes && vaexamrecord.visualacuity >= 1.0)){
                    isExamFinished=true;
            }
            //当检查方向不确定或者是朝着更好的视力等级进行时
            else if ( correcttimes >= maxcorrecttimes && examdirection != -1 ){
                if(examdirection==0){
                    //设定检查朝向更好的视力等级进行
                    examdirection=1
                }
                //打算提高一个视力等级继续检查，并设定在该行的一些判断数据，检查并未结束
                vaexamrecord.visualacuity=self.getHigherVAValue(curVA: vaexamrecord.visualacuity)
                correcttimes=0;
                wrongtimes=0;
                isExamFinished=false;
            }
        }
        //用户指出的方向与实际方向不一致
        else{
            //回答错了
            isAnswerRight=false;
            wrongtimes+=1;
            //一旦回答错误，则先前在此行的正确回答次数被清零，表明正确回答次数是连续正确回答次数
            correcttimes=0
            //如果此行回答错误次数达到设定值，并且是朝着视力较好的等级方向检查或者已经到达最低检查视力，表明检查应该结束
            if((wrongtimes >= maxwrongtimes && examdirection == 1) ||
                (wrongtimes >= maxwrongtimes && vaexamrecord.visualacuity <= 0.1)){
                    //此时的实际视力应比当前低一级
                    vaexamrecord.visualacuity=self.getLowerVAVlaue(curVA: vaexamrecord.visualacuity)
                    isExamFinished=true;
                    //return;
            }
            //如果虽然错误回答此处达到设定次数，但检查的方向不确定或者是一直提供较高视力等级给用户（也就是说用户还没能有一个确定的视力级别）检查
            //则表明检查方向应设定为朝着更低等级的视力进行
            else if ( wrongtimes >= maxwrongtimes && examdirection != 1 ){
                if(examdirection==0){
                    examdirection = -1
                }
                //同时下调视力等级继续检查
                vaexamrecord.visualacuity=self.getLowerVAVlaue(curVA: vaexamrecord.visualacuity)
                isExamFinished=false;
                wrongtimes=0;
            }
        }
        //将当前用户回答情况以图片的形式在界面上反映出来
        displayResultImage(isUserAnswerRight: isAnswerRight)
        //根据检查是否结束决定是否在场景内布置新的E字符
        if(isExamFinished==false){
            createEcharInScene()
            //重置用户的判断为unknow，表明用户还没有判断新的E字符朝向
            userorient=Orientation.unknown
            //更新下界面数据
            updatePanelInfo()
        }
        //如果检查结束
        else{
            //则不让用户继续点击“看不清”按钮
            uiBtnWrong.enabled=false
            //显示检查结束的一些信息（显示最终得到的视力）
            displayExamFinishedInScene()
            //用户可以点击导航条右上角的按钮返回上一个视图
            nextBarButtonItem.enabled=true
            //uiBtnCorrect.enabled=false
        }
    }
    //如果用户点击了导航条上右上角的按钮，触发此方法
    @IBAction func DoAfterExamFinished(sender:UIBarButtonItem){
        //让实现该委托的类调用相应的方法，将检查得到的视力结果传递给相应的类
        self.delegate?.getVisualAcuity(vaexamrecord)
        //弹出该视图，返回到先前调用该视图的视图。
        self.navigationController?.popViewControllerAnimated(true)
    }
    //用户点击看不清按钮时
    @IBAction func UIBtnWrongTouchUpInside(sender: UIButton) {
        //如果正在分析，则不要重复分析，主要避免用户频繁快速的点击看不清按钮
        if(isAnalysising==true){
            return
        }
        else{
            isAnalysising=true
            //用户看不清，将用户的朝向设定为未知，并不直接设定isAnswerRight＝false
            userorient==Orientation.unknown
            //分析一次应答
            ProcessAfterUserAnswer()
            isAnalysising=false
        }

    }
    
//    @IBAction func UIbtnCorrectTouchUpInside(sender: UIButton) {
//       userorient=curgivencharorient
//       ProcessAfterUserAnswer()
//    }
    //获取一个比当前视力级别好一级视力的视力级别
    func getLowerVAVlaue(curVA cva:Float)->Float{
        switch cva{
        case 1.0:return 0.8;
        case 0.8:return 0.6;
        case 0.6:return 0.5;
        case 0.5:return 0.4;
        case 0.4:return 0.3;
        case 0.3:return 0.2;
        case 0.2:return 0.15;
        case 0.15:return 0.12;
        case 0.12:return 0.1;
        case 0.1: return 0.02;
        default:return 0.02;
        }
    }
    //获取一个比当前视力级别差一级视力的视力级别
    func getHigherVAValue(curVA cva:Float)->Float{
        switch cva{
        case 0..<0.1:return 0.1;
        case 0.1..<0.12:return 0.12;
        case 0.12..<0.15:return 0.15;
        case 0.15..<0.2:return 0.2;
        case 0.2..<0.3:return 0.3;
        case 0.3..<0.4:return 0.4;
        case 0.4..<0.5:return 0.5;
        case 0.5..<0.6:return 0.6;
        case 0.6..<0.8:return 0.8;
        case 0.8..<1.0:return 1.0;
        default:return 0.1;
        }
    }

    //处理手势，判断给出的E方向是否与划动的手势方向一致
    func handleSwipeGesture(sender: UISwipeGestureRecognizer){
        //与点击“看不清”按钮一样，放置频繁的手势
        if(isAnalysising==true){
            return
        }
        else{
        isAnalysising=true;
        //划动的方向
        var direction = sender.direction
        //println("User Direction\(direction)")
        //判断是上下左右
        switch (direction){
        case UISwipeGestureRecognizerDirection.Left:
            //println("Left")
            userorient=Orientation.left
            //imageIndex++;//下标++
            break
        case UISwipeGestureRecognizerDirection.Right:
            //println("Right2")
            userorient=Orientation.right
            //imageIndex--;//下标--
            break
        case UISwipeGestureRecognizerDirection.Up:
            //println("Up")
            userorient=Orientation.up
            break
        case UISwipeGestureRecognizerDirection.Down:
            //println("Down")
            userorient=Orientation.down
            break
        default:
            userorient=Orientation.unknown
            break;
        }
        ProcessAfterUserAnswer()
        isAnalysising=false;
        }
