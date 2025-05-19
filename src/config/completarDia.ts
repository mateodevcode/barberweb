interface dia {
    [key: number]: string;
}


export const completarDia = (dia: number) => {
    const dias: dia = {
    1: "01",
    2: "02",
    3: "03",
    4: "04",
    5: "05",
    6: "06",
    7: "07",
    8: "08",
    9: "09",
  };
    return dias[dia] || dia.toString();
}