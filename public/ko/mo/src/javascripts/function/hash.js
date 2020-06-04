function hash() {
    var dataHash = [];
    var $hashval=0;
    $(".dataHash").each(function() {
        if($(this).attr("id")){
            var ahref = $(this).attr("id");
            dataHash.push("#"+ahref);
        }
    });
    //스크롤 기능
    $(window).scroll(function(){
        //변수 설정
        var windowPos = $(window).scrollTop();
        //header
        if(windowPos > 10){
            TweenMax.to($("header") , 0.3 , {backgroundColor : "#fff"});
        }else{
            TweenMax.to($("header") , 0.3 , {backgroundColor : "transparent"});
        }
        //hash 적용
        for (var i=0; i < dataHash.length; i++) {
            var theID = dataHash[i];
            var divPos = $(theID).offset().top;
            var divHeight = $(theID).height();
            if (windowPos >= (divPos) && windowPos < (divPos + divHeight)) {
                if($hashval !== (i)){
                    history.replaceState("","",theID);
                    $hashval=i;
                    console.log(dataHash[$hashval]);
                    if(dataHash[$hashval] === "#workInfo"){
                        counter();
                    }
                }
            }
        }
    });
    // 이동 버튼 클릭
    var pageNum = 0;
    $(".page_btn button").on("click" , function () {
        if($(this).hasClass("prev_con") ){
            pageNum = --$hashval;
            if(pageNum  === -1 ) pageNum = 0 ;
            console.log(pageNum)
        }else{
            pageNum = ++$hashval;
        }
        var headerH = $("header").height()+20;
        var scrollPosition = $(dataHash[pageNum]).offset().top;
        TweenMax.to($("html"), 0.5 , {scrollTop: scrollPosition-headerH});
    })
    // count
    function counter() {
        function numberCounter(target_frame) {

            this.count = 0;
            this.diff = 0;
            this.target_frame = document.querySelector(target_frame);
            // text 값 문자열 받아서 숫자만 남기기
            this.target_Number_Text = this.target_frame.innerText;
            this.target_Number_Text = this.target_Number_Text.replace(/[^0-9]/g,"");
            this.target_Number_Text = Number(this.target_Number_Text);
            this.target_count = parseInt(this.target_Number_Text);
            this.timer = null;
            this.counter();

        };
        numberCounter.prototype.counter = function () {
            var self = this;
            this.diff = this.target_count - this.count;
            if (this.diff > 0) {
                self.count += Math.ceil(this.diff / 5);
            }
            this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            if (this.count < this.target_count) {
                this.timer = setTimeout(function () {
                    self.counter();
                }, 20);
            } else {
                clearTimeout(this.timer);
            }
        };
        new numberCounter(".counter3");
        new numberCounter(".counter2");
        new numberCounter(".counter1");
    }

}