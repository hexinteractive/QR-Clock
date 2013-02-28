describe("clock", function() {
  // var clock = window.clock;

  beforeEach(function() {
    clock.stop();
    clock.run(true);
  });


  describe("when calling the run method", function() {
    // I don think i need these
    // var checkTime;
    // var tick;
    // var run;

    beforeEach(function(){
      clock.stop();
      spyOn(clock, 'checkTime').andCallThrough();
      spyOn(clock, 'tick').andCallThrough();
      spyOn(clock, 'run').andCallThrough();
      jasmine.Clock.useMock();
      clock.run(true);
    });

    it("should call checkTime() immediately", function() {
      expect(clock.checkTime).toHaveBeenCalled();
    });

    xit("should call tick() after a timeout", function() {
      expect(clock.tick).not.toHaveBeenCalled();
      var delay = (clock.checkTime()).timeToNextSecond + 10;
      jasmine.Clock.tick(delay);
      expect(clock.tick.callCount).toEqual(1);
    });

    xit("should call run() after a timeout", function() {
      expect(clock.run.callCount).toEqual(1);
      var delay = (clock.checkTime()).timeToNextSecond + 10;
      jasmine.Clock.tick(delay);
      expect(clock.run.callCount).toEqual(2);
    });

    it("should set timer to the value of the callTimeout", function(){
      expect(typeof clock.timer).toEqual('number');
    });

    it("should call tick() and run() after a timeout", function() {
      expect(clock.tick).not.toHaveBeenCalled();
      expect(clock.run.callCount).toEqual(1);
      var delay = (clock.checkTime()).timeToNextSecond + 10;
      jasmine.Clock.tick(delay);
      expect(clock.tick.callCount).toEqual(1);
      expect(clock.run.callCount).toEqual(2);
    });

  });


  describe("when calling the stop method", function() {
    it("should clear the timeout", function(){

      spyOn(window, 'clearTimeout').andCallThrough();
      var timerID = clock.timer;
      clock.stop();
      expect(clearTimeout).toHaveBeenCalledWith(timerID);
    });

    it("should set clock.timer to null", function(){
      clock.stop();
      expect(clock.timer).toEqual(null);
    });
  });


  describe("when calling the checkTime method", function() {
    var time;
    var date;
    beforeEach(function() {
      time = clock.checkTime();
      date = new Date();
    });

    //NOTE: it is unlikely but possible for theses tests to fail if checkTime is called too near 1000ms
    it("should return a time object with 'hours' equal to the current hour", function() {
      expect(time.hours).toEqual(date.getHours());
    });

    it("should return a time object with 'minutes' equal to the current minute", function() {
      expect(time.minutes).toEqual(date.getMinutes());
    });

    it("should return a time object with 'seconds' equal to the current seconds", function() {
      expect(time.seconds).toEqual(date.getSeconds());
    });

    it("should return a time object with 'milliseconds' equal to the current milliseconds", function() {
      expect(time.milliseconds).toEqual(date.getMilliseconds());
    });

    //TODO: .timeToNextSecond
    //      .timeToNextMinute
    //      .stringMinutes
    //      .stringHours

  });




  describe("when calling the moveSecondHand method", function() {
    beforeEach(function() {

    });
    // i need a fixture for this...
    xit("should ", function() {

    });
  });

  describe("when calling the preloadMinuteImage method", function() {
    // beforeEach(function() {
    //   spyOn(window, 'Image').andCallThrough();
    // });
    it("should instantiate a new Object with a constructor of 'HTMLImageElement'", function() {
      var img = clock.preloadMinuteImage('12:34pm');
      // expect(window.Image).toHaveBeenCalled();
      // I seem to be having problems spying on window.Image, so instead of checking if that has been called Im checking to see if the constructor of the newly created img is the HTMLImageElement
      expect(img.constructor).toMatch('HTMLImageElement');
    });

    it("should instantiate a new Object which defines a 'src' member ", function() {
      var img = clock.preloadMinuteImage('12:34pm');
      // expect(typeof img.src).toBe('string');
      expect(img.src).toBeDefined();
    });

    it("should instantiate a new Object whose 'src' member is a string", function() {
      var img = clock.preloadMinuteImage('12:34pm');
      expect(typeof img.src).toBe('string');
    });

    it("should instantiate a new Object whose 'src' member contains 'http://chart.googleapis.com/chart?chf=a,s,000000&chs=280x280&cht=qr&choe=UTF-8&chld=%7C0&chl='", function() {
      var img = clock.preloadMinuteImage('12:34pm');
      expect(img.src).toContain('http://chart.googleapis.com/chart?chf=a,s,000000&chs=280x280&cht=qr&choe=UTF-8&chld=%7C0&chl=');
    });

    it("should instantiate a new Object whose 'src' member contains '12:34pm'", function() {
      var img = clock.preloadMinuteImage('12:34pm');
      expect(img.src).toContain('12:34pm');
    });



  });

  describe("when calling the tick method", function() {
    beforeEach(function() {

    });

    xit("should ", function() {

    });
  });

  describe("when the init method", function() {
    beforeEach(function() {

    });

    xit("should ", function() {

    });
  });


  afterEach(function() {
    clock.stop();
  });


});