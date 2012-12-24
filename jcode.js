$(document).ready(function(){

  var clock = {

    imageStore: null,

    checkTime: function() {
      var date = new Date();
      var time = {
        date: date,
        milliseconds: date.getMilliseconds(),
        seconds: date.getSeconds(),
        minutes: date.getMinutes(),
        hours: date.getHours(),
        timeToNextSecond: 1000 - date.getMilliseconds(),
        timeToNextMinute: 60 - date.getSeconds(),
        // pm: time.hours > 12 ? 'pm' : 'am',
        // timeString: (time.hours > 12 ? time.hours - 12 : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes) + (time.hours > 12 ? 'pm' : 'am')
      };

      return time;
    },

    moveSecondHand: function(seconds) {
      $('.seconds').css('transform','rotate('+ (seconds * 6) +'deg)');
    },

    preloadMinuteImage: function (timeString) {
      var url = 'http://chart.googleapis.com/chart?chf=a,s,000000&chs=280x280&cht=qr&choe=UTF-8&chld=%7C0&chl=';
      var image = new Image();
      image.src = url+timeString;
      console.log('preloadMinuteImage called with ', timeString);
      return image;
    },

    updateMinuteImage: function(imageObj) {
      $('img').replaceWith(imageObj);
      console.log('updateMinuteImage called with ', imageObj);
    },

    tick: function(time, force) {
      var offset = force ? 0 : 1;
      var time = this.checkTime();
      this.moveSecondHand(time.seconds);
      if(time.seconds > 55 || force) {
        console.log('sec:mils ', time.seconds +':'+ time.milliseconds);
        // this.imageStore = this.preloadMinuteImage(time.hours +':'+ (time.minutes + offset));


        var pm = (time.hours > 12 ? true : false);
        var stringHours = ( pm ? time.hours - 12 : time.hours);

        if(time.hours == 0) {
          stringHours = 12;
        }

        var stringMinutes = time.minutes + offset;

        if(stringMinutes < 10) {
          stringMinutes = '0' + stringMinutes;
        }

        var timeString = stringHours + ':' + stringMinutes + (pm ? 'pm' : 'am')
        this.imageStore = this.preloadMinuteImage(timeString);

      }

      if(time.seconds == 0 || force) {
        this.updateMinuteImage(this.imageStore);
      }
    },

    run: function(force) {
      var self = this;
      var time = this.checkTime();
      setTimeout(function(){
          self.tick(null,force);
          self.run();
        },

        time.timeToNextSecond
      );
      console.log('timeToNextSecond: ',time.timeToNextSecond);
    },

    init: function() {
      this.tick(this.checkTime());
      this.run();
    }

  };

  window.clock = clock;

  clock.run(true);
});

