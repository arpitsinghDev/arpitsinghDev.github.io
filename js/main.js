let box=document.body.clientHeight/4;
$(window).scroll(function() {
    let $height = $(window).scrollTop();
   // console.log($height);
    if($height < 10) {
        $('.nav *').addClass('defu');
        $('#laptop path').removeClass('fuller');
        $('#proname span').addClass('proname-hover')
        $('.contants p').addClass('index-move')
    } 
    if($height > 10){
        $('.nav *').removeClass('defu');
        $('#laptop path').addClass('fuller');
        $('#proname span').addClass('proname-hover')
        $('.contants p').addClass('index-move')
    }
    if($height > 600 ){
        $('#laptop path').removeClass('fuller');
        $('#proname span').removeClass('proname-hover')
        $('.contants p').removeClass('index-move')
    }
    if($height>=box || ($height < box+300 && $height>=box)){
        $('.skills svg path').addClass('anima');
    }
    if($height < box || $height > box*2){
        $('.skills svg path').removeClass('anima');
    }
    if($height < (box*3)-box/2 && $height > (box*2)){
        $('.work svg path').addClass('anima1');
    }
    if($height>=box*3 || $height<box*2){
        $('.work svg path').removeClass('anima1');
    }
    if($height>=(box*3)-300 || ($height < (box*3)+110 && $height > (box*3))){
        $('.contact svg path').addClass('anima2');
    }
    if($height >= box*4 || $height < box*3){
        $('.contact svg path').removeClass('anima2');
    }
});
$(document).ready(function(){
   $('#js svg path').css({
    'strokeDasharray': parseInt(($('#js #va').html()))+7
   });
   $('#ht svg path').css({
    'strokeDasharray': parseInt($('#ht #va').html())+7
   });
   $('#ph svg path').css({
    'strokeDasharray': parseInt($('#ph #va').html())+7
   });
   $('#cs svg path').css({
    'strokeDasharray': parseInt($('#cs #va').html())+7
   });
   $('#ms svg path').css({
    'strokeDasharray': parseInt($('#ms #va').html())+7
   });
   for(let i = 0;i <= $('#skillsvg path').length;i++){
       $('#skillsvg path:nth-child('+i+')').css({
       'animationDelay':'0.'+i+'s'
    });
    
   
   }
 

// work
    $('.sub-work').mouseover(function(){
        // console.log('yeo')
       // $('.sub-work .worknav').show(2000);
    })
    $('.sub-work').mouseout(function(){
       // $('.sub-work .worknav').hide(1000);
    })

$('#send').click(function(){
    let =email=$('#email').val(),
        mess=$('#message').val();
 let mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(email !=''&& mess != ''){
        if(email.match(mailformat))
        {
            $.ajax({
                method:"POST",
                url:"https://arpitsingh.herokuapp.com/send",
                //url:"http://localhost:5000/send",
                data:{email:email,message:mess},
                context: document.body
            }).done(res=>{
                console.log(res);
                $('#send-mess').text("Thanks for contact me");
            }).fail(function() {
                console.log( "error" );
              })
        }else $('#send-mess').text("Enter vaild email");  
    }else{
        $('#send-mess').text("Fill all field");  
    }
     
})


});
let delay=5000, setTimeoutConst;
$("#skillsvg").on('mouseover', function(){
    $("#skillsvg").addClass("rotater") 
})
$("#skillsvg").on('mouseleave', debounce(function(){
    $("#skillsvg").removeClass("rotater") 
},4000))

function debounce(fn,d){
    let timeId;
    return function(...argu){
        clearTimeout(timeId)
       timeId= setTimeout(()=>fn(...argu),d)
    }
}
$(document).ready(function(){

   // document.querySelector('#displacementFilter').firstElementChild.attributes.baseFrequency.value=0.2;
animation()

})
let frames = 0;
let rad = Math.PI / 180;

function animation(){
    bfx = .01;
    frames += .55
    bfx += 0.005 * Math.sin(frames * rad);
    bf = bfx.toString()
    //console.log(bf);
    document.querySelector('#displacementFilter').firstElementChild.attributes.baseFrequency.value=bf;
    requestAnimationFrame(animation);
}