const PhoneMaxSize = 820;

export function isPhoneSizedWindow() {
  return window.innerWidth < PhoneMaxSize;
}