class EMF {
  constructor(sound) {
    this.sound = sound;
    this.amplitude = new p5.Amplitude();
    this.delay = new p5.Delay();
    this.filter = new p5.Filter();
    this.reverb = new p5.Reverb();

    /*

  delay = new p5.Delay();
  filter = new p5.Filter();
  reverb = new p5.Reverb();

  sound.loop();
  sound.amp(0.8);
  //sound.disconnect();

  // Source, time, feedback, LPF freq
  delay.process(sound, 0.8, 0.8, 20000);
  delay.drywet(1.0);
  delay.amp(0.6);

  // Source, time, decay
  reverb.process(delay, 5, 2);
  reverb.drywet(1.0);
  reverb.amp(0.7);
  */
  }

  setupEMF() {
    this.sound.loop();
    this.amplitude.setInput(this.sound);
  }

  updateEMF() {
    this.rmsAmplitude = map(this.amplitude.getLevel(), 0.0, 0.5, 0.0, 1.0);
  }
}
