// Wrap every letter in a span
$('.ml9 .letters').each(function(){
$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline({loop: false})
.add({
  targets: '.ml9 .letter',
  scale: [0, 1],
  duration: 1200,
  elasticity: 600,
  delay: function(el, i) {
    return 45 * (i+1)
  }
});
