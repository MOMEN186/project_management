
export function formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear(),
      H = d.getHours(),
      M = d.getMinutes(),
      S = d.getSeconds();
  
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (H.length < 2) H = "0" + H;
    if (M.length < 2) M = "0" + M;
    if (S.length < 2) S = "0" + S;
    return [year, month, day].join("-") + " " + [H, M].join(":");
  }
  
  export function formatDateISO(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month (0-11)
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}




// export  {formatDate,formatDateISO}