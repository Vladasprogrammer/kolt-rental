export function vDate(date) {
  const today = new Date();
  const fifteenDaysAgo = new Date(today);
  fifteenDaysAgo.setDate(today.getDate() - 15);

  const selectedDate = new Date(date);
  

  if (!date) {
    return { valid: false, message: 'Pasirink data!'}
  }
  
  if (selectedDate > today) {
    return { valid: false, message: 'Data negali būti ateityje!' };
  }

  if (selectedDate < fifteenDaysAgo) {
    return { valid: false, message: 'Data negali būti senesnė nei 15 dienų!' };
  }


  return { valid: true };
}
