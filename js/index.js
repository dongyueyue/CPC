$(function () {
    // var url = "http://v1.qzone.cc/avatar/201406/08/11/24/5393d75e32fa4612.jpg%21200x200.jpg"
    var photos=[];
    photos = [
        "img/1.jpg",
        "img/3.jpg",
        "img/4.jpg",
        "img/5.jpeg",
        "img/6.jpg",
        "img/8.jpg",
        "img/9.jpg",
        // "img/10.jpg",
        // "img/11.jpg",
        // "img/12.jpg",
        // "img/13.jpg",
        // "img/14.jpg",
        // "img/15.jpg",
        // "img/16.jpg",
        // "img/17.jpg",
        // "img/19.jpg",
        // "img/20.jpg",
        // "img/21.jpg",
        // "img/22.jpg",
        // "img/23.jpeg",
        // "img/24.jpg",
        "img/25.jpg"
    ];
    // for(var i = 0;i<105;i++){
    //     photos.push(url);
    // }
    var a = [];
    icpcPosition.init();
    //$.ajax({
    //    type: "GET",
    //    url: "test.json",
    //    dataType: "json",
    //    success: function(data){
    //
    //    }
    //});
    setInterval(function () {
        icpcPosition.randomAddPhoto(photos,true)
    },1000)

})
var icpcPosition = {
    "coord":["I","Love","C1","P","C2"],
    "leaveCoord":{},
    "init":function () {
        this.curIndex = 0;
        this.curLetter = "I";
        this.curLetterIndex = 0;
        this.leaveCoord = WordConfig;
    },
    createView:function (photos) {
        var photoViewList = [];
        for(var i = 0;i<photos.length;i++){
            photoViewList.push(this.createPhotoView(photos[i]));
        }
        this.createCoordView(photoViewList)
    },
    //直接根据数组生成
    createCoordView:function (photoviews) {
        var photolength = photoviews.length,wrap = $("<div></div>");
        for(var i = 0;i<photolength;i++){
            var curviewPosition = this.getCurCoord();
            if(!curviewPosition){
                break ;
            }
            this.setPhotoPosition(photoviews[i],curviewPosition[1],curviewPosition[0])
            wrap.append(photoviews[i])
            this.changeLetter();
        }
        $(".cpc-background").html(wrap);
    },
    getCurCoord:function () {
        var curCoord = WordConfig[this.curLetter];
        return curCoord[this.curIndex];
    },
    //随机位置追加图片
    randomAddPhoto:function (photos,isanimate) {
        var photoViewList = [];
        for(var i = 0;i<photos.length;i++){
            photoViewList.push(this.createPhotoView(photos[i]));
        }
        this.randomAddPhotoView(photoViewList,isanimate)
    },
    randomAddPhotoView:function (photoViews,isanimate) {
        if(this.isOver()){
            return false;
        }
        var photolength = photoViews.length;
        for(var i = 0;i<photolength;i++){
            var curviewPosition = this.getRandomCoord();
            if(!curviewPosition){
                break ;
            }
            // this.setPhotoPosition(photoViews[i],curviewPosition[1],curviewPosition[0]);
            // $(".cpc-background").append(photoViews[i]);
            isanimate ? this.animationToPosition(photoViews[i],curviewPosition[1],curviewPosition[0]):this.addPosition(photoViews[i],curviewPosition[1],curviewPosition[0])
        }

    },
    isOver:function () {
        for(var i in this.leaveCoord){
            if(this.leaveCoord[i].length>0){
                return false;
            }
        }
        return true;
    },
    getRandomCoord:function () {
      var randomLetter = this.getRandomLetter(),
       randomCoord = this.randomCoordByLetter(randomLetter);
        return randomCoord;
    },
    getRandomLetter:function () {
        var randomIndex = Math.floor(Math.random()*this.coord.length),randomLetter=this.coord[randomIndex];
        if(this.leaveCoord["randomLetter"]&&this.leaveCoord["randomLetter"].length==0){
            return this.getRandomLetter();
        }
        return randomLetter;
    },
    randomCoordByLetter:function (letter) {
        var leaveCoord = this.leaveCoord[letter],letterCoord=WordConfig[letter],randomIndex = Math.floor(Math.random()*letterCoord.length),returnCoord;
        if(leaveCoord.length>0){
            returnCoord =  letterCoord[randomIndex];
            leaveCoord.splice(randomIndex,1);
        }else if(leaveCoord.length == 0){
            returnCoord =  false;
        }else{
            returnCoord = this.randomCoordByLetter(letter);
        }
        return returnCoord;

    },
    setPhotoPosition:function (dom,x,y) {
        dom.css({
            "left":x+"px",
            "top":y+"px"
        })
    },
    changeLetter:function () {
        var curCoord = WordConfig[this.curLetter];
        if(this.curIndex+1<curCoord.length){
            this.curIndex++;
        }else{
            this.curIndex = 0;
            this.curLetterIndex = this.curLetterIndex+1<this.coord.length?this.curLetterIndex+1:0;
            this.curLetter = this.coord[this.curLetterIndex];
        }
    },
    createPhotoView:function (url) {
        var template = '<a class="photo"><img src="'+url+'"></a>'
        return $(template);
    },
    animationToPosition:function(photo,x,y){
        this.setPhotoPosition(photo,x,y);
        photo.addClass("inPage");
        $(".cpc-background").append(photo);
        setTimeout(function () {
            photo.addClass("inPage");
        },100)
    },
    addPosition:function(photo,x,y){
        this.setPhotoPosition(photo,x,y);
        $('.cpc-background').append(photo);
    }
}