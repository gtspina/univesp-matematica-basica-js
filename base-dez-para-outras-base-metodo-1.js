function obterPotenciaMaisProxima(numeroDecimal, base) {
    if (numeroDecimal === 0)
        return 0

    let expoente = 0

    while (base ** expoente <= numeroDecimal)
        expoente += 1

    return expoente - 1
}

function obterDigito(numeroDecimal, base, expoente) {
    if (base ** expoente > numeroDecimal)
        return 0

    let digito = 1

    while (base ** expoente * digito <= numeroDecimal)
        digito += 1

    return digito - 1
}

function obterResto(numeroDecimal, base, expoente, digito) {
    return numeroDecimal - (base ** expoente * digito)
}

function formatarDescricao(base, expoente, digito) {
    return `(${digito} * ${base} ^ ${expoente})`
}

function calcular(numeroDecimal, base) {
    let expoente = obterPotenciaMaisProxima(numeroDecimal, base)
    let digito = obterDigito(numeroDecimal, base, expoente)
    let resto = obterResto(numeroDecimal, base, expoente, digito)
    let numeroConvertido = digito.toString()
    let descricao = [
        formatarDescricao(base, expoente, digito)
    ]

    while (expoente > 0) {
        expoente -= 1
        digito = obterDigito(resto, base, expoente)
        numeroConvertido += digito.toString()

        descricao.push(formatarDescricao(base, expoente, digito))

        if (digito > 0)
            resto = obterResto(resto, base, expoente, digito)
    }

    console.log(`O número na base ${base} é igual a: ${numeroConvertido}`)
    console.log(`O processo para conversão do número foi: ${descricao.join(' + ')}`)
}

console.log(calcular(9876573, 3))
