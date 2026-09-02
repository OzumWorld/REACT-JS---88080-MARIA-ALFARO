
import { getProductDocumentPath } from "../config/productDocuments.js";
import { BARBOTINA_CANJE_CONDITION } from "../config/commercialConditions.js";

export const CATALOGO = [
    { id: "pasta-lisa-blanca", nombre: "Pasta Lisa Blanca (bolsa 10 kg)", tipo: "pasta",
    precios:{ unidad:17500, pack10:17000, pack20:16500 } },
    { id: "pasta-blanca-con-chamote", nombre: "Pasta Blanca con Chamote (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:14500, pack10:14000, pack20:13500 } },
    { id: "pasta-roja", nombre: "Pasta Roja (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:14500, pack10:14000, pack20:13500 } },
    { id: "pasta-roja-con-chamote", nombre: "Pasta Roja con Chamote (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:14500, pack10:14000, pack20:13500 } },
    { id: "pasta-roja-fuego-directo", nombre: "Pasta Roja Fuego Directo (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:14500, pack10:14000, pack20:13500 } },
    { id: "pasta-gres-tostado-claro", nombre: "Pasta Gres Tostado Claro (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:14500, pack10:14000, pack20:13500 } },
    { id: "pasta-gres-tostado-oscura", nombre: "Pasta Gres Tostado Oscura (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:14500, pack10:14000, pack20:13500 } },
    { id: "pasta-gres-blanco", nombre: "Pasta Gres Blanco (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:14500, pack10:14000, pack20:13500 } },
    { id: "pasta-raku", nombre: "Pasta Raku (bolsa 5 kg)", tipo: "pasta",
      precios:{ unidad:17000, pack10:16500, pack20:16000 } },

    { id: "barbotina", nombre: "Barbotina con bidón 9 kg", tipo: "barbotina", precios:{unidad:16500, pack10:15500, pack20:null} },
    { id: "barbotina-canje", nombre: "Barbotina sin bidón con canje 9 kg", tipo: "barbotina", precios:{unidad:15000, pack10:14000, pack20:null} },
    { id: "barbotina-gres-tostado-oscuro", nombre: "Barbotina para Gres bidón 9 kg", tipo: "barbotina", precios:{unidad:20000, pack10:19000, pack20:null} },
  ];
  
  export const PRODUCT_INFO = {
    "pasta-lisa-blanca": {
      resumen: "Utilitaria y artística fina. Torneado, modelado y placas.",
      coccion: "1020–1040 °C",
      pdf: getProductDocumentPath("pasta-lisa-blanca"),
      img: "/img/Ry0cc3fxkSio5IBTbbtfdKJsdfFi5gvFbgYRmJVz.jpg"
    },
    "pasta-blanca-con-chamote": {
      resumen: "Piezas medianas/grandes, escultura, relieves.",
      coccion: "1020–1040 °C",
      pdf: getProductDocumentPath("pasta-blanca-con-chamote"),
      img: "/img/babjs0Ks0AvgSWQnwBJaHMCk0Gsz0TCMrfO2XXuK.jpg"
    },
    "pasta-roja": {
      resumen: "Versátil para modelado y placas; look cálido.",
      coccion: "1020–1040 °C",
      pdf: getProductDocumentPath("pasta-roja"),
      img: "/img/S2L3H182VNh8KmSgLLMIKCNNgvb62WjVyvu0qSxZ.jpg"
    },
    "pasta-roja-con-chamote": {
      resumen: "Textura + estabilidad para piezas medianas y escultura.",
      coccion: "1020–1040 °C",
      pdf: getProductDocumentPath("pasta-roja-con-chamote"),
      img: "/img/ZHySGnePKhP4rdckhrwc0VcMhd0t8ivS5i8hK0mg.jpg"
    },
    "pasta-fuego-directo": {
      resumen: "Cazuelas / hornallas. Buena resistencia térmica.",
      coccion: "1020–1040 °C",
      pdf: getProductDocumentPath("pasta-roja-fuego-directo"),
      img: "/img/ARtb8X5sKj6eKZybZTsHWJmI9bgEF4vAPe2pspEj.jpg"
    },
    "pasta-gres-tostado-claro": {
      resumen: "Alta resistencia para utilitario. Cono 5 1/2.",
      coccion: "1225-1230 °C (cono 5 1/2)",
      pdf: getProductDocumentPath("pasta-gres-tostado-claro"),
      img: "/img/KAnQ3tOUwH2DUS3hPozWPyO9BkBcuJvzWpkmGz0k.jpg"
    },
    "pasta-gres-tostado-oscuro": {
      resumen: "Base cálida para esmaltes de alta.",
      coccion: "1225-1230 °C (cono 5 1/2)",
      pdf: getProductDocumentPath("pasta-gres-tostado-oscura"),
      img: "/img/AtYHdHjt1DDQ8KJ11lafBVuxOYtO01KdbmBhkqJP.jpg"
    },
    "pasta-gres-blanco": {
      resumen: "Gres blanco para cono 5 1/2. Contracción 12%, absorción 2,33% y compatibilidad confirmada con esmaltes DpColors.",
      coccion: "1225-1230 °C (cono 5 1/2)",
      pdf: getProductDocumentPath("pasta-gres-blanco"),
      img: "/img/RARKNAgWgJnNhlVqoSlc8sw5EAPB4u5zyoVdwGA4-2.jpg"
    },
    "pasta-raku": {
      resumen: "Pasta para técnicas de Raku en presentación de 5 kg. Temperatura 1300 °C.",
      coccion: "1300 °C",
      pdf: getProductDocumentPath("pasta-raku"),
      img: "/img/lFQej9H0B67Y18F6s7Ney1i5emJP9rtceXqgTMHU.jpg"
    },
    "barbotina": {
      resumen: "Lista para colada. Agitar antes de usar.",
      coccion: "1020-1040 °C",
      pdf: getProductDocumentPath("barbotina"),
      img: "/img/Q543gzgDz8YSZG2YsSJQFqGQLwPwKZtkiygGL0FB.jpg"
    },
    "barbotina-canje": {
      resumen: "Barbotina Canje en presentación de 9 kg.",
      coccion: "1020-1040 °C",
      commercialCondition: BARBOTINA_CANJE_CONDITION,
      pdf: null,
      img: "/img/Q543gzgDz8YSZG2YsSJQFqGQLwPwKZtkiygGL0FB.jpg"
    },
    "barbotina-gres-tostado-oscuro": {
      resumen: "Colada para gres. Curva de alta.",
      coccion: "1240–1250 °C",
      pdf: getProductDocumentPath("barbotina-gres-tostado-oscuro"),
      img: "/img/qIMurfX4CeA3F0Pufc2FYYVMnBs0DkUMho65yZpG.jpg"
    }
  };

  export const money = (n) =>
    n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 2 });
