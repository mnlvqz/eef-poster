class Sound {
  constructor(sample) {
    this.sample = sample;
    this.amplitude = new p5.Amplitude();
    this.delay = new p5.Delay();
    this.filter = new p5.Filter();
    this.reverb = new p5.Reverb();

    /*

  delay = new p5.Delay();
  filter = new p5.Filter();
  reverb = new p5.Reverb();

  sample.loop();
  sample.amp(0.8);
  //sample.disconnect();

  // Source, time, feedback, LPF freq
  delay.process(sample, 0.8, 0.8, 20000);
  delay.drywet(1.0);
  delay.amp(0.6);

  // Source, time, decay
  reverb.process(delay, 5, 2);
  reverb.drywet(1.0);
  reverb.amp(0.7);
  */
  }

  setupEMF() {
    this.sample.loop();
    this.sample.setVolume(0.0);
    this.sample.disconnect();

    this.delay.process(this.sample, 0.1, 0.8);
    this.delay.drywet(0.5);
    this.delay.amp(0.6);

    this.reverb.process(this.delay, 5, 2);
    this.reverb.drywet(1.0);
    this.reverb.amp(0.8);

    this.amplitude.setInput(this.delay);
    this.amplitude.toggleNormalize(true);
  }
}
