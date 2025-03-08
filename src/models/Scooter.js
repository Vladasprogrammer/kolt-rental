export class Scooter {
  constructor(id, code, isBusy, date, kilometers) {
    this.id = id;
    this.registrationCode = code;
    this.isBusy = isBusy;
    this.lastUseTime = date;
    this.totalRideKilometers = parseFloat(kilometers) || '';
  }

  updateData(newDate, newKilometers) {
    this.lastUseTime = newDate;
    this.totalRideKilometers = parseFloat(newKilometers);
  }
  
  markAsBusy() {
    this.isBusy = true;
  }

  markAsFree() {
    this.isBusy = false;
  }
}
