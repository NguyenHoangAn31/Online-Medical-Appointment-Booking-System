export const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
}

export const formatDateFromJs = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
export const formatDateFromArray = (dateArray) => {
    if (!dateArray || dateArray.length !== 3) return '';
    const [year, month, day] = dateArray;
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    return `${formattedDay}-${formattedMonth}-${year}`;
  }
  

  