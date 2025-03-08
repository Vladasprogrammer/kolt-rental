export function vKilometers(kilometers) {

  if (!kilometers) {
    return { valid: false, message: 'Užpildyk kilometrus (leidžiami tik skaičiai)!'}
  }
// something isn't working here with isNaN...
  if (isNaN(kilometers) || kilometers === '') {
    return { valid: false, message: 'Kilometrai turi būti tik skaičius!' };
  }

  if (kilometers < 0) {
    return { valid: false, message: 'Kilometrai negali būti neigiami! (Nice try)' };
  }

  return { valid: true };
}
