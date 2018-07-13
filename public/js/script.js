$('#schedule .toggle-btn').click(function() {
  if ($(this).hasClass('selected')) {
  } else {
    $('.toggle-btn.selected').removeClass('selected');
    $(this).addClass('selected');
  }
  var dayInfo = $(this).attr('id');
  var tableid = '#' + dayInfo;
  $('#schedule table.selected').removeClass('selected');
  $('#schedule').find('table' + tableid).addClass('selected');
});

$('#faqs dt').click(function() {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(this).next().slideUp();
    return false;
  }
  $(this).siblings('dt').removeClass('active');
  $(this).addClass('active');
  $(this).next().slideDown().siblings('dd').slideUp();
});

$('header i#open').click(function() {
  $('ul#mobile-menu').addClass('active');
  $('html').css('overflow', 'hidden');
  $('body').bind('touchmove', function(e) {
      e.preventDefault()
  });
});

$('header i#close').click(function() {
  $('ul#mobile-menu').removeClass('active');
  $('html').css('overflow', 'scroll');
  $('body').unbind('touchmove');
});

$('header i#close').click(function() {
  $('ul#mobile-menu').removeClass('active');
  $('html').css('overflow', 'scroll');
  $('body').unbind('touchmove');
});

$('.slack').mouseenter(function() {
  $('input#transform').prop('type', 'text');
}).mouseleave(function() {
  $('input#transform').prop('type', 'password');
});

$('button.copy').click(function() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(this).prev().val()).select();
  document.execCommand("copy");
  $temp.remove();
});

$('ul#logsList li').each(function() {
  var raw = $(this).children('p').children('span.logTime').text();
  minutes = Math.floor(raw/60000);
  hours = Math.floor(minutes/60);
  days = Math.round(hours/24);
  if(days > 1) {
    raw = days + ' days ago';
  } else if (days == 1) {
    raw = days + ' day ago';
  } else if (hours > 1) {
    raw = hours + ' hrs ago';
  } else if (hours == 1) {
    raw = hours + ' hrs ago';
  } else {
    raw = minutes + ' min ago';
  }
  $(this).children('p').children('span.logTime').text(raw);
});

$('.form.manage #menu button').click(function() {
  $('.form.manage #menu').css('display', 'none');
  if($(this).is('#results-button')) {
    $('form#results').css('display', 'block');
  } else if($(this).is('#manual-button')) {
    $('form#manual').css('display', 'block');
  } else if($(this).is('#dq-button')) {
    $('form#dq').css('display', 'block');
  }
});
