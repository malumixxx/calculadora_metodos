console.log("bairstow");

const calcularCoeficientes = (coeficientes, r, s) => {
  let coeficientesACalcular = [];

  for (
    let coeficienteACalcular = 0;
    coeficienteACalcular < coeficientes.length;
    coeficienteACalcular++
  ) {
    if (coeficienteACalcular === 0) {
      coeficientesACalcular.push(coeficientes[0]);
    }
    if (coeficienteACalcular === 1) {
      coeficientesACalcular.push(
        coeficientes[1] + r * coeficientesACalcular[0]
      );
    }

    if (coeficienteACalcular >= 2) {
      coeficientesACalcular.push(
        coeficientes[coeficienteACalcular] +
          r * coeficientesACalcular[coeficienteACalcular - 1] +
          s * coeficientesACalcular[coeficienteACalcular - 2]
      );
    }
  }

  return coeficientesACalcular;
};

const dividirPolinomios = (polinomio, polinomioRS) => {
  let polynomial = new Polynomial(polinomio.reverse());
  let factorCuadratico = new Polynomial(polinomioRS);

  console.log(polynomial.toString());
  console.log(factorCuadratico.toString());
  console.log(polynomial.div(factorCuadratico).toString());

  return polynomial.div(factorCuadratico).toString();
};

export const metodoBairstow = (polinomio, r, s, tolerancia) => {
  
  const table =[['i', 'polinomio']]

  let funcRationalized = math.rationalize(polinomio, {}, true);
  let coeficientesA = funcRationalized.coefficients.reverse();

  coeficientesA.forEach((_, index)=>{
    table[0].push(`b${coeficientesA.length- (index+1)}`)
  })
  coeficientesA.forEach((_, index)=>{
    table[0].push(`c${coeficientesA.length- (index+1)}`)
  })

  table[0].push('deltaR', 'deltaS', 'r', 's','errorR', 'errorS')

  let cantidad_raices = coeficientesA.length - 1;
  let cantidad_total_raices = cantidad_raices;

  let coeficientesB;
  let coeficientesC;
  let deltaR;
  let deltaS;
  let errorR = 1;
  let errorS = 1;

  let lengthB;
  let lengthC;

  let c1;
  let c2;
  let c3;
  let b0;
  let b1;

  let raices = [];

  let iteracion = 1;

  while (cantidad_raices > 0) {


    while (errorR > tolerancia && errorS > tolerancia) {

  
      table.push([iteracion, polinomio])
      
      if (cantidad_raices === 1 ){
        raices.push(-coeficientesA[1] / coeficientesA[0]);
        cantidad_raices -= 1;
        break
      }

      coeficientesB = calcularCoeficientes(coeficientesA, r, s);

      coeficientesC = calcularCoeficientes(coeficientesB, r, s);

      // console.log(coeficientesA);
      // console.log(coeficientesB);
      // console.log(coeficientesC);

      let auxCoeficientesB;
      let auxCoeficientesC;

      if(cantidad_total_raices > (coeficientesB.length-1)){
        // console.log('entre')
        let diferencia = cantidad_total_raices - (coeficientesB.length-1)
        let array = new Array(diferencia).fill(0)

        auxCoeficientesB = [...array, ...coeficientesB]
        auxCoeficientesC = [...array, ...coeficientesC]


        table[iteracion].push( ...auxCoeficientesB, ...auxCoeficientesC)

      }else{
        table[iteracion].push(...coeficientesB, ...coeficientesC)
      }



      lengthC = coeficientesC.length;
      lengthB = coeficientesB.length;


      c1 = coeficientesC[lengthC - 2];
      c2 = coeficientesC[lengthC - 3];
      c3 = coeficientesC[lengthC - 4];
      b0 = coeficientesB[lengthB - 1];
      b1 = coeficientesB[lengthB - 2];

      deltaR = (c3 * b0 - c2 * b1) / (math.pow(c2, 2) - c1 * c3);
      deltaS = (c1 * b1 - c2 * b0) / (math.pow(c2, 2) - c1 * c3);

      r = r + deltaR;
      s = s + deltaS;

      errorR = math.abs(deltaR / r);
      errorS = math.abs(deltaS / s);

      table[iteracion].push(deltaR, deltaS, r, s, errorR, errorS)

      iteracion++;
    }

    r = math.round(r, 4);
    s = math.round(s, 4);

    errorR = 1
    errorS = 1

    //calcular raices

    if (coeficientesA.length >= 3) {
      // Calcula las raíces complejas
      const discriminante = math.complex(math.pow(r, 2) + 4 * s, 0);
      const sqrtDiscriminante = math.sqrt(discriminante);
  
      const calcRaiz = math.divide(math.subtract(r, sqrtDiscriminante), 2);
      const calcRaiz2 = math.divide(math.add(r, sqrtDiscriminante), 2);
  
      // Agrega las raíces complejas al arreglo raices
      raices.push(calcRaiz.toString());
      raices.push(calcRaiz2.toString());
  
      cantidad_raices -= 2;
    }

    polinomio = dividirPolinomios(coeficientesA, [-s, -r, 1]);
    funcRationalized = math.rationalize(polinomio, {}, true);
    coeficientesA = funcRationalized.coefficients.reverse();
  }

  console.log(table)

  return {
    raices,
    table
  };
};

// let polinomio = "x^5-3.5x^4+2.75x^3+2.125x^2-3.875x+1.25";

// const { raices } = metodoBairstow(polinomio, -1, -1, 0.01);

// console.log(raices);
