
export const CATALOGO = [
    { id: "pasta-lisa-blanca", nombre: "Pasta Lisa Blanca (bolsa 10 kg)", tipo: "pasta",
    precios:{ unidad:13500, pack10:12500, pack20:12000 } },
    { id: "pasta-blanca-con-chamote", nombre: "Pasta Blanca con Chamote (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:10000, pack10:9500, pack20:9000 } },
    { id: "pasta-roja", nombre: "Pasta Roja (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:10000, pack10:9500, pack20:9000 } },
    { id: "pasta-roja-con-chamote", nombre: "Pasta Roja con Chamote (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:10000, pack10:9500, pack20:9000 } },
    { id: "pasta-roja-fuego-directo", nombre: "Pasta Roja Fuego Directo (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:10000, pack10:9500, pack20:9000 } },
    { id: "pasta-gres-tostado-claro", nombre: "Pasta Gres Tostado Claro (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:10000, pack10:9500, pack20:9000 } },
    { id: "pasta-gres-tostado-oscura", nombre: "Pasta Gres Tostado Oscura (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:10000, pack10:9500, pack20:9000 } },
  
    { id: "barbotina", nombre: "Barbotina bidón 9 kg", tipo: "barbotina", precios:{unidad:12000, pack10:10000, pack20:10000} },
    { id: "barbotina-canje", nombre: "Barbotina Canje bidón 9 kg", tipo: "barbotina", precios:{unidad:9500, pack10:8500, pack20:8500} },
    { id: "barbotina-gres-tostado-oscuro", nombre: "Barbotina Gres Tostado Oscuro bidón 9 kg", tipo: "barbotina", precios:{unidad:14000, pack10:12000, pack20:12000} },
  ];
  
  export const PRODUCT_INFO = {
    "pasta-lisa-blanca": {
      resumen: "Utilitaria y artística fina. Torneado, modelado y placas.",
      coccion: "1020–1040 °C",
      pdf: "/fichas/Pasta Lisa Blanca.pdf",
      img: "/img/Pasta Lisa Blanca.jpg"
    },
    "pasta-blanca-con-chamote": {
      resumen: "Piezas medianas/grandes, escultura, relieves.",
      coccion: "1020–1040 °C",
      pdf: "/fichas/Pasta Blanca con Chamote.pdf",
      img: "/img/Pasta Blanca con Chamote.jpg"
    },
    "pasta-roja": {
      resumen: "Versátil para modelado y placas; look cálido.",
      coccion: "1020–1040 °C",
      pdf: "/fichas/Pasta Roja.pdf",
      img: "/img/Pasta Roja.jpg"
    },
    "pasta-roja-con-chamote": {
      resumen: "Textura + estabilidad para piezas medianas y escultura.",
      coccion: "1020–1040 °C",
      pdf: "/fichas/Pasta Roja con Chamote.pdf",
      img: "/img/Pasta Roja con Chamote.jpg"
    },
    "pasta-fuego-directo": {
      resumen: "Cazuelas / hornallas. Buena resistencia térmica.",
      coccion: "1020–1040 °C",
      pdf: "/fichas/Pasta Roja Fuego Directo.pdf",
      img: "/img/Pasta Roja Fuego Directo.jpg"
    },
    "pasta-gres-tostado-claro": {
      resumen: "Alta resistencia para utilitario. Cone 6–7.",
      coccion: "1240–1250 °C",
      pdf: "/fichas/Pasta Gres Tostado Claro.pdf",
      img: "/img/Pasta Gres Tostado Claro.jpg"
    },
    "pasta-gres-tostado-oscuro": {
      resumen: "Base cálida para esmaltes de alta.",
      coccion: "1240–1250 °C",
      pdf: "/fichas/Pasta Gres Tostado Oscuro.pdf",
      img: "/img/Pasta Gres Tostado Oscuro.jpg"
    },
    "barbotina": {
      resumen: "Lista para colada. Agitar antes de usar.",
      coccion: "Según pasta final",
      pdf: "/fichas/Barbotina bidon 9 kg.pdf",
      img: "/img/Barbotina bidon 9 kg.jpg"
    },
    "barbotina-canje": {
      resumen: "Opción económica para series (colada).",
      coccion: "Según pasta final",
      pdf: "/fichas/Barbotina bidon 9 kg.pdf",
      img: "/img/Barbotina bidon 9 kg.jpg"
    },
    "barbotina-gres-tostado-oscuro": {
      resumen: "Colada para gres. Curva de alta.",
      coccion: "1240–1250 °C",
      pdf: "/fichas/Barbotina para Gres bidon 9 kg.pdf",
      img: "/img/Barbotina para Gres bidon 9 kg.jpg"
    }
  };
  
  export const money = (n) =>
    n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 2 });
  