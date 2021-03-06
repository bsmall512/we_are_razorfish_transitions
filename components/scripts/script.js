
$(document).ready(function()
{
  init();
  reset();
  // transitionOnActiveImage();
  

  TweenLite.to("#loader", 0, {rotation:270, opacity:1});

})

///// INIT vars
init = function() {
  imageCount = $("div.image_group").length;
  i = 1;
  $.getJSON( "../peopleData.json", onLoadedJSON);
  setWidth();
}

var currentNum = 0,
    nextNum = 1,
    people = [],
    person1 = $('#person1'),
    person2 = $('#person2'),
    activeperson,
    activeVideo = $('.person-video', '#person1'),
    pageWidth = $(window).width();
    

setWidth = function() {
  pageWidth = $(window).width();
  console.log("pageWidth: ", pageWidth);

  TweenLite.set($('.person'), {width:pageWidth});
}
$(window).resize(setWidth);

onLoadedJSON = function( data ) {
  console.log("DATA SUCCESS");
  console.log("data: ", data.people);
  people = $.each( data.people, function( key, val ) {
  
  });

  advanceNextImage();
  
}

///// INIT build
reset = function() {
  
}

timerStart = function() {
  TweenLite.to("#loader_path", 0, {drawSVG:"100%"});
  TweenLite.from("#loader_path", 7, {drawSVG:"0%", delay:0.5, onComplete:timerComplete});
}

timerComplete = function() {
  console.log("activeVideo: ", activeVideo.get(0));
  // if(activeVideo.get(0) != undefined) activeVideo.get(0).pause();

  // transition out the videos
  if(person1.active == false) {
    activeVideo = $('.person-video', '#person2');
    TweenLite.to($('.details', '#person1'), 0.75, {x:-360, ease:Power4.easeInOut});
    TweenLite.to($('#person1'), 0.75, {x:pageWidth * -1, ease:Power4.easeInOut, delay:0.25});
    TweenLite.to($('#person2'), 0.75, {x:0, ease:Power4.easeInOut, onComplete:advanceNextImage, delay:0.25});
    person1.active = true;
    person2.active = false;
    // animate the details on
    TweenLite.to($('.details', '#person2'), 0.55, {width:350, ease:Power4.easeOut, delay:0.75});
    TweenLite.to($('.details h1', '#person2'), 0.75, {alpha:1, delay:0.85});
    TweenLite.to($('.details h2', '#person2'), 1, {alpha:1, delay:1.1});
  } else {
    activeVideo = $('.person-video', '#person1');
    TweenLite.to($('.details', '#person2'), 0.75, {x:-360, ease:Power4.easeInOut});
    TweenLite.to($('#person2'), 0.75, {x:pageWidth * -1, ease:Power4.easeInOut, delay:0.25});
    TweenLite.to($('#person1'), 0.75, {x:0, ease:Power4.easeInOut, onComplete:advanceNextImage, delay:0.25});
    person1.active = false;
    person2.active = true;
    // animate the details on
    TweenLite.to($('.details', '#person1'), 0.55, {width:350, ease:Power4.easeOut, delay:0.75});
    TweenLite.to($('.details h1', '#person1'), 0.75, {alpha:1, delay:0.85});
    TweenLite.to($('.details h2', '#person1'), 1, {alpha:1, delay:1.1});
  }

  if(activeVideo.get(0) != undefined) activeVideo.get(0).play();
}

advanceNextImage = function() {
  currentNum = nextNum;

  if(nextNum >= people.length - 1) {
    nextNum = 0;
  } else {
    nextNum++;
  }

  // figure out what one is inactive and then update data
  if(person1.active == false) {
    TweenLite.set($('#person2'), {x:pageWidth});
    TweenLite.set($('.details h1', '#person2'), {alpha:0});
    TweenLite.set($('.details h2', '#person2'), {alpha:0});
    TweenLite.set($('.details', '#person2'), {width:pageWidth, x:0});
    $('.details h1', '#person2').text(people[nextNum].name);
    $('.details h2', '#person2').text(people[nextNum].title);
    $('.person-video', '#person2').attr( "src", people[nextNum].video);
  } else {
    TweenLite.set($('#person1'), {x:pageWidth});
    TweenLite.set($('.details h1', '#person1'), {alpha:0});
    TweenLite.set($('.details h2', '#person1'), {alpha:0});
    TweenLite.set($('.details', '#person1'), {width:pageWidth, x:0});
    $('.details h1', '#person1').text(people[nextNum].name);
    $('.details h2', '#person1').text(people[nextNum].title);
    $('.person-video', '#person1').attr( "src", people[nextNum].video);
  }
  
  timerStart();
}
