export class Avatar {
  pelo?: number;
  cejas?: number;
  ojos?: number;
  nariz?: number;
  boca?: number;
  cara?: number;
  torso?: number;
  selected?: boolean;

  constructor() {
    this.pelo = 1;
    this.cejas = 1;
    this.ojos = 1;
    this.nariz = 1;
    this.boca = 1;
    this.cara = 1;
    this.torso = 1;
    this.selected = false;
  }
}