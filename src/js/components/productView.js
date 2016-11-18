

require.config(requireConfig);
require(["jquery", "LazyLoader", "fastClick","swiper"],function($, LazyLoader, FastClick) {

    FastClick.attach(document.body);
    var swiper = new Swiper ('.wui_header .swiper-container', {
        pagination : '.wui_header .swiper-pagination',
        paginationClickable : true,
        autoplay : 2000,
        autoplayDisableOnInteraction : false
    });

    var lazyLoader = new LazyLoader(".products");
        lazyLoader.render();

    var isClick = false;
    var $categories = $(".menu_list_item");
    var $products = $(".product_classify");
    var $productsBox= $(".products");
    var $categoryContainer = $('.menu_list');
    var $currentClassify = $(".current_classify");
    var $discountInfo = $(".discount_info");
    var $product_imgs = $('.product_message');
    var product_img_swiper = new Swiper('.product_img_swiper .swiper-container',{
            loop : false ,
            pagination : '.swiper-pagination',
            nextButton : '.swiper-button-next',
            prevButton : '.swiper-button-prev',
            paginationClickable : true,
            autoplay : false,
            autoplayDisableOnInteraction : false,
            observer : true,
            observeParents : true,
            lazyLoading : true,
            updateOnImagesReady : true,
            lazyLoadingInPrevNext : true,
            lazyLoadingInPrevNextAmount : 1,
        });

    $product_imgs.on('click',function insertData() {
        var _index = $product_imgs.index($(this));
        console.log("current index :" + _index);
        product_img_swiper.slideTo(_index, 10, false);
        isClick = true;
        var html = "";
        var img_srcs = [];
        $('.product_img_swiper').removeClass().addClass("product_img_swiper show");
        $.ajax({
            type : "GET",
            url : "../../js/common/debug/img_data.json",
            dataType : "json",
            success : function (data) {
                $.each(data,function (index,item) {
                    img_srcs.push(item.img_data);
                });
                $.each(img_srcs, function(index, pic) {
                    html += '<div class="swiper-slide">' +
                                 '<img class="swiper-lazy" data-src="' + pic + '">' +
                                  '<div class="swiper-lazy-preloader"></div>' +
                            '</div>';
                });
                // console.log(html);
                $(".product_img_swiper .swiper-container .swiper-wrapper").html(html);
            }
        });
    });

    var btn_procudts_img_swiper = $('.btn_procudts_img_swiper');
    btn_procudts_img_swiper.on('click',function () {
        $('.product_img_swiper').removeClass().addClass("product_img_swiper hide");
    });


    //$discountInfo.hide();
    var changeTop = $products.eq(0).offset().top;

    // 处理产品视图的调试和宽度
    $(".product_list").css("height", calcsize());
    window.onresize = function() {
        $(".product_list").css("height", thisHeight);
    };
    var thisHeight = calcsize();
    function calcsize() {
        return $(window).height() - $(".wui_header").height() - $(".wui_footer").height() + "px";
    }

    if($products.find($discountInfo).length > 0){
        $currentClassify.html($products.html());
    }

    $categories.eq(0).addClass('active');
    $productsBox.on("touchmove",function(e){
        e && e.stopPropagation();

        lazyLoader.render();

        if(isClick){
            return;
        };
        if($products.eq(0).position().top > 0){
            $currentClassify.css("display","none");
        }else{
            $currentClassify.css("display","block");
        }
        $boxright = $(this);
        $products.each(function(index){
            if( $(this).offset().top >= 0){
                //左侧当前菜品类别距离顶部位置
                var aTop = $categories.eq(index).position().top;
                //右侧当前标题距离顶部的高度
                //var pTop=$products.eq(index).offset().top;
                var pTop=$(this).offset().top;

                //判断当左侧隐藏时，显示被隐藏菜单

                if (aTop >= $categoryContainer.height() || aTop <= 0) {
                    $categoryContainer.stop().animate({scrollTop: aTop}, 350, function () {
                        return false;
                    });
                }
                //更换悬浮导航条的内容及左侧选中状态
                if (pTop <= changeTop + $(this).height()) {
                    $currentClassify.html($(this).html());
                    $categories.eq(index).addClass("active").siblings().removeClass("active");
                } else{
                    $currentClassify.html($products.eq(index-1).html());
                    $categories.eq(index - 1).addClass("active").siblings().removeClass("active");
                }
                return false;
            }
        });
    });
    $categories.on("touchend",function(){
        isClick = true;
        var _index = $categories.index($(this));
        $currentClassify.html($products.eq(_index).html());
        $(this).addClass("active").siblings().removeClass("active");

        //右侧菜品滚动到对应位置
        var distance = $products.eq(_index).position().top;
        $productsBox.stop(true,true).animate({scrollTop:$productsBox.scrollTop()+distance},300,function(){
            lazyLoader.render();
            isClick = false;
        });
        return false;
    });
});