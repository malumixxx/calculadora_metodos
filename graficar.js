function quitarImaginarios(arr) {
  // Expresión regular para encontrar partes imaginarias
  const regexImaginario = /[+-]?\s*\d*\.?\d*i/;

  // Filtrar el arreglo para mantener solo los elementos que no contienen partes imaginarias
  const resultado = arr.filter(el => !regexImaginario.test(el));

  return resultado;
}


export const graficarBairstow = (funcion, raices)=>{

  raices = quitarImaginarios(raices)
  let points = []

  raices.forEach((item)=>{
    points.push([item, 0])
  })
 
  functionPlot({
    width: 776,
    target: '#grafica',
    data: [{
      fn: `${funcion}`,
    },
    {
      points,
      fnType: 'points',
      graphType: 'scatter',
      color: 'green',
      attr: {
        r: 4
      }
  
    }],
    tip: {
      xLine: true, yLine: true
    }
  })

}

export const graficar = (funcion, raiz) => {

  functionPlot({
    width: 776,
    target: '#grafica',
    data: [{
      fn: `${funcion}`,
    },
    {
      points: [[raiz, 0]],
      fnType: 'points',
      graphType: 'scatter',
      color: 'green',
      attr: {
        r: 4
      }
  
    }],
    tip: {
      xLine: true, yLine: true
    }
  })


}