const animationDuration = 400;
const letterAnimationDelay = 40
const colorWhite = "#ffffff";
const defaultTextColor = "#636b6f";

$('document').ready(function(){
  generateRandomBackgroundColor();
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
    color: function(){
      if(scroll_bit != -1){
        return invertColor(colors[scroll_bit],true);
      }
      return defaultTextColor;
    },
    duration: animationDuration,
    elasticity: 300,
    delay: function(el, i) {
      return letterAnimationDelay * (i+1)
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
    duration: animationDuration,
    delay: function(el, i) {
      return letterAnimationDelay * (i+1)
    }
  });
}

function hideDescriptionText(){
  anime.timeline({loop: false})
  .add({
      targets: '.letterdes',
      scale: [1,0.3],
      opacity: 0,
      duration: animationDuration,
      easing: "easeOutExpo",delay: function(el, i) {
        return letterAnimationDelay * (i+1)
      }
    });
}

function changeBg(color){
  anime.timeline({loop: false})
  .add({
    targets: 'body',
    background: color,
    easing: 'easeOutQuad',
    duration: function(){
      if(scroll_bit != -1){
        if(scroll_bit == lines.length - 1){
          generateRandomBackgroundColor();
        }
        return letterAnimationDelay * lines[scroll_bit].length;
      }
      return animationDuration;
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
    if(scroll_bit == -1){
      animateText("Hi there!");
      changeBg(colorWhite);
    }
    else{
      animateText(lines[scroll_bit]);
      changeBg(colors[scroll_bit]);
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
}



var touchAnimated = true;
var oldPosition = -1;
function handleTouchMove(evt) {
    if (!yDown ) {
        return;
    }

    var yUp = evt.touches[0].clientY;
    var yDiff = yDown - yUp;

    var swipeY = parseInt(yDiff/50);
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

    if(scroll_bit != oldPosition){
      if(scroll_bit == -1){
        animateText("Hi there!");
        changeBg(colorWhite);
      }
      else{
        animateText(lines[scroll_bit]);
        changeBg(colors[scroll_bit]);
      }
      touchAnimated = true;
      oldPosition = scroll_bit;
    }
}

function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomBackgroundColor(){
  colors = [];
  lines.forEach(function(){
    colors.push(randomColor());
  });
}

var lines = [
  "once upon a time,",
  "there is this website",
  "It has a colorful background",
  "and a single line of text",
  "that changes when you scroll",
  "the end!",
  "...",
  "well,",
  "you can scroll up now",
  "or you can keep scrolling down",
  "there might be something waiting for ya",
  "keep scrolling",
  "keep scrolling",
  "just keep scrolling",
  "just keep scrolling",
  "just keep scrolling",
  "just keep scrolling",
  "just keep scrolling",
  "just keep scrolling",
  "dad? daaad?",
  "huh?",
  "suh..sy.. Sydney..",
  "huh!!",
  "p sherman 42 wallaby way sydney",
  "arrgghhh! Nemo!",
  "Fin"
];

var colors = [];
