$(window).scroll(function() {
    var $height = $(window).scrollTop();
    console.log($height);
    if($height < 10) {
        $('.nav *').addClass('defu');
        $('#laptop path').removeClass('fuller');
    } 
    if($height > 10){
        $('.nav *').removeClass('defu');
        $('#laptop path').addClass('fuller');
    }
    if($height > 600 ){
        $('#laptop path').removeClass('fuller');
    }
    if($height=>730 || $height < 1110){
        $('.skills svg path').addClass('anima');
    }
    if($height < 629 || $height > 1210){
        $('.skills svg path').removeClass('anima');
    }
    if($height=>1220 || $height < 1500){
        $('.work svg path').addClass('anima1');
    }
    if($height < 1210 || $height > 1610){
        $('.work svg path').removeClass('anima1');
    }
    if($height=>1780 || $height < 1980){
        $('.contact svg path').addClass('anima2');
    }
    if($height < 1770 || $height > 2390){
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
   $('#skillsvg').mouseover(()=>{
    $('#skillsvg').addClass('rotater')
})
$('#skillsvg').mouseout(()=>{
    $('#skillsvg').removeClass('rotater');
})
// work
    $('.sub-work').mouseover(function(){
        // console.log('yeo')
       // $('.sub-work .worknav').show(2000);
    })
    $('.sub-work').mouseout(function(){
       // $('.sub-work .worknav').hide(1000);
    })
 var firebaseConfig = {
    apiKey: "AIzaSyDfKSdCFXn77z8pj0zWnWGLD-h0J4-9guk",
    authDomain: "myresume-e939a.firebaseapp.com",
    databaseURL: "https://myresume-e939a.firebaseio.com",
    projectId: "myresume-e939a",
    storageBucket: "myresume-e939a.appspot.com",
    messagingSenderId: "87139879444",
    appId: "1:87139879444:web:12c899d976f6b1e2527501",
    measurementId: "G-HHY53HS5CX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
var playersRef = firebase.database().ref().child("person");
$('#send').click(function(){
    let =email=$('#email').val(),
        mess=$('#message').val();
        let mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if(email !=''&& mess != ''){
        if(email.match(mailformat))
        {
            playersRef.push ({
            date:data(),
            email:email,
            message:mess
        });
        $('#send-mess').text("Thanks for contact me");
        }else $('#send-mess').text("Enter vaild email");  
    }else{
        $('#send-mess').text("Fill all field");  
    }
     
})


});