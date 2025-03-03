export class Scooter {
  constructor(id, date, kilometers) {
    this.id = id;
    this.registrationCode = Math.random().toString(36).substr(2, 8).toUpperCase();
    this.isBusy = false;
    this.lastUseTime = date;
    this.totalRideKilometers = parseFloat(kilometers);
  }

  updateData(newDate, newKilometers) {
    this.lastUseTime = newDate;
    this.totalRideKilometers = parseFloat(newKilometers);
  }
}
