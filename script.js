$('document').ready(function(){
  animateText("Hi there!");
  showDescriptionText();
});

function animateText(text){
  // Wrap every letter in a span
  $('.ml9 .letters').each(function(){
  $(this).html(text.replace(/([^\x00-\x20]|\w)/g, "<span class='letter'>$&</span>"));
  });

  anime.timeline({loop: false})
  .add({
    targets: '.ml9 .letter',
    scale: [0, 1],
    opacity: [0,1],
    duration: 350,
    elasticity: 300,
    delay: function(el, i) {
      return 45 * (i+1)
    }
  });
}
function showDescriptionText(){
  $('#description').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x20]|\w)/g, "<span class='letterdes'>$&</span>"));
});

anime.timeline({loop: false})
  .add({
    targets: '.letterdes',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 250,
    delay: function(el, i) {
      return 40 * (i+1)
    }
  });
}

function hideDescriptionText(){
  anime.timeline({loop: false})
  .add({
      targets: '.letterdes',
      scale: [1,0.3],
      opacity: 0,
      duration: 250,
      easing: "easeOutExpo",delay: function(el, i) {
        return 25 * (i+1)
      }
    });
}

//Hanlde scrolling on non-touchscreen devices
var scroll_bit = -1;
document.addEventListener("wheel", function (e) {
  hideDescriptionText();
  if(scroll_bit == -1 && e.deltaY < 0){
    scroll_bit = -1
  }
  else if((scroll_bit == lines.length - 1) && e.deltaY > 0){
    scroll_bit = lines.length - 1;
  }
  else{
    scroll_bit += e.deltaY/100;
  }
    console.log(scroll_bit);
    if(scroll_bit == -1){
      animateText("Hi there!");
    }
    else{
      animateText(lines[scroll_bit]);
    }
}, true);

//Hanlde swiping on touchscreen devices
document.addEventListener('touchstart', handleTouchStart, true);
document.addEventListener('touchmove', handleTouchMove, true);

var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    var firstTouch = getTouches(evt)[0];
    yDown = firstTouch.clientY;
    hideDescriptionText();
};



var touchAnimated = true;
var oldPosition = -1;
function handleTouchMove(evt) {
    if (!yDown ) {
        return;
    }

    var yUp = evt.touches[0].clientY;
    var yDiff = yDown - yUp;
    //console.log(yDiff);

    // if(scroll_bit == -1 && yDiff < 0){
    //   scroll_bit = -1;
    // }
    // else if((scroll_bit == lines.length - 1) && yDiff > 0){
    //   scroll_bit = lines.length - 1;
    // }
    // else{
    //   if ( parseInt(yDiff/10) > 0 ) {
    //       scroll_bit += 1;
    //   } else if (parseInt(yDiff/10) < 0 ) {
    //       scroll_bit -= 1;
    //   }
    // }




    var swipeY = parseInt(yDiff/50);
    console.log(Math.abs(bigger(scroll_bit,swipeY) - smaller(scroll_bit,swipeY)));
    if(swipeY >=1){
      scroll_bit++;
      yDown = yUp;
    }
    else if(swipeY <= -1){
      scroll_bit--;
      yDown = yUp;
    }

    if(scroll_bit <= -1 ){
      scroll_bit = -1;
    }
    else if (scroll_bit >= lines.length - 1) {
      scroll_bit = lines.length - 1;
    }
    //console.log(swipeY + "," + scroll_bit);
    //console.log(scroll_bit);
    if(scroll_bit != oldPosition){
      if(scroll_bit == -1){
        animateText("Hi there!");
      }
      else{
        animateText(lines[scroll_bit]);
      }
      touchAnimated = true;
      oldPosition = scroll_bit;
    }



    /* reset values */
    //yDown = null;
};

function bigger(a,b){
  if(a > b){
    return a;
  }
  return b;
}
function smaller(a,b){
  if(a < b){
    return a;
  }
  return b;
}

var lines = [
  "once upon a time,",
  "there is this website",
  "the end!"
];
