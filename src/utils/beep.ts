const audioContext = new AudioContext();
export const beep = ({
  duration = 100,
  freq = 800,
}: {
  duration?: number;
  freq?: number;
}) => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = freq;
  oscillator.connect(audioContext.destination);
  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
  }, duration);
};
