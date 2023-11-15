export const falsaPosicion = (func, xi, xf, tolerancia) => {
  let iteracion = 1

  const table = [['i', 'Xi', 'Xf', 'Xr', 'f(xi)', 'f(xf)', 'f(xr)', 'Ea']]

  let x; let xr; let errorAproximado = 1; let arregloIteracion

  while (errorAproximado > tolerancia) {
    arregloIteracion = []

    arregloIteracion.push(iteracion)

    arregloIteracion.push(xi)
    arregloIteracion.push(xf)

    const fxi = math.round(math.evaluate(func, { x: xi }), 4)
    const fxf = math.round(math.evaluate(func, { x: xf }), 4)
    
    xr = math.round(xf - ( (fxf * (xi - xf)) / (fxi - fxf)), 4)
    arregloIteracion.push(xr)
    arregloIteracion.push(fxi)
    arregloIteracion.push(fxf)

    const fxr = math.round(math.evaluate(func, { x: xr }), 4)
    arregloIteracion.push(fxr)


    if (fxi * fxr < 0) {
      xf = xr
    }
    if (fxi * fxr > 0) {
      xi = xr
    }

    if (iteracion > 1) {
      errorAproximado = Math.abs((xr - x) / xr)
    } else {
      errorAproximado = 1
    }
    arregloIteracion.push(math.round(errorAproximado, 6))

    table.push(arregloIteracion)

    if (fxi * fxr === 0) {
      break
    }

    x = xr
    iteracion++
  }

  const totalX = table.map((item) => item[3])

  return { table, root: xr, totalX }
}

// console.log(math.evaluate('2x^3',{x:2})