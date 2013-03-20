$(document).ready(function(){

  var clock = {

    imageStore: null,
    timer: null,
    $secondHand: $('.seconds'),
    $faceImg: $('.face img'),
    imgBaseSrc: 'http://chart.googleapis.com/chart?chf=a,s,000000&chs=280x280&cht=qr&choe=UTF-8&chld=%7C0&chl=',

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
        stringMinutes: '',
        stringHours: ''
        // pm: time.hours > 12 ? 'pm' : 'am',
        // timeString: (time.hours > 12 ? time.hours - 12 : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes) + (time.hours > 12 ? 'pm' : 'am')
      };

      return time;
    },

    moveSecondHand: function(seconds) {
      var r = 'rotate('+ (seconds * 6) +'deg)';
      this.$secondHand.css({
                  '-webkit-transform': r,
                     '-moz-transform': r,
                      '-ms-transform': r,
                          'transform': r
                        });
    },

    preloadMinuteImage: function (timeString) {
      // var url = 'http://chart.googleapis.com/chart?chf=a,s,000000&chs=280x280&cht=qr&choe=UTF-8&chld=%7C0&chl=';
      var image = new Image();
      image.src = this.imgBaseSrc+timeString;
      console.log('preloadMinuteImage called with ', timeString);
      return image;
    },

    updateMinuteImage: function(imageObj) {
      if(!imageObj){console.log('imageObj failed somehow')}
      // it must be found each time because the previous element has been replaced
      // $('.face img').replaceWith(imageObj);
      this.$faceImg.attr('src',imageObj.src);
      console.log('updateMinuteImage called with ', imageObj);
    },

    tick: function(time, force) {
      var offset = force ? 0 : 1;
      var time = this.checkTime();
      this.moveSecondHand(time.seconds);
      if(time.seconds > 55 || force) {
      // TODO: prevent if img is already loaded
      // TODO: remove the 'side effect of manipulating this.imageStore, pass it in'
        console.log('sec:mils ', time.seconds +':'+ time.milliseconds);
        // this.imageStore = this.preloadMinuteImage(time.hours +':'+ (time.minutes + offset));

        // var rawHour = time.hours || 12, /* will always equal a positive number between one and twenty-three. this handles 12:34am displaying as 0:34am */
        //     maxHour = Math.max(0, rawHour-12), /* will always return zero or a positive number less than twelve */
        //     minHour = Math.min(12, rawHour), /* will always return a positive number between twelve and twenty-three */
        //     meridian = maxHour - 1 ? 'pm' : 'am', /* if maxHour is zero than the rawHour must be larger than twelve. therefore its pm */
        //     rawMinute = time.minutes + offset,
        //     strMinute = '0' + rawMinute, /* adding a leading zero */
        //     truncStrMinute = strMinute.slice(-2), /* will return the last two digits of the minute string so we will never have 12:3 only 12:03 */
        //     timeString = (maxHour || minHour) +':'+ truncStrMinute + meridian;

        var rawHour = time.hours, /* will return zero through twenty-three */
            nonZeroTwentyFourHour = rawHour || 12, /* will always equal a positive number between one and twenty-three. this handles 12:34am displaying as 0:34am */
            maxHour = Math.max(0, nonZeroTwentyFourHour-12), /* will always return zero or a positive number less than twelve */
            minHour = Math.min(12, nonZeroTwentyFourHour), /* will always return a positive number between twelve and twenty-three */
            meridian = rawHour < 12 ? 'am' : 'pm',  /* if rawHour is less than twelve then its in the AM */
            rawMinute = time.minutes + offset,
            strMinute = '0' + rawMinute, /* adding a leading zero for display */
            truncStrMinute = strMinute.slice(-2), /* will return the last two digits of the minute string so we will never have 12:3 only 12:03 */
            timeString = (maxHour || minHour) +':'+ truncStrMinute + meridian;

        this.imageStore = null; /* do i need this? */
        this.imageStore = this.preloadMinuteImage(timeString);
      }

      if(time.seconds == 0 || force) {
        this.updateMinuteImage(this.imageStore);
      }
    },

    run: function(force) {
      var self = this;
      var time = this.checkTime();
      this.timer = setTimeout(function(){
          self.tick(null,force);
          self.run();
        },

        time.timeToNextSecond
      );
      console.log('timeToNextSecond: ',time.timeToNextSecond);
    },

    stop: function() {
      clearTimeout(this.timer);
      this.timer = null;
    },

    init: function() {
      this.tick(this.checkTime());
      this.run();
    }

  };

  window.clock = clock;

  clock.run(true);
});

