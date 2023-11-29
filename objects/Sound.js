class Sound {
  constructor(sample) {
    this.sample = sample;
    this.histogram = Array.from({ length: 128 }, () => 0);
    this.amplitude = new p5.Amplitude();
    this.delay = new p5.Delay();
    this.filter = new p5.Filter();
    this.reverb = new p5.Reverb();

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

  updateSound() {
    this.histogram.shift();
    this.histogram.push(this.amplitude.getLevel());
  }
}
