var reader = require("synchronous-user-input")

const digitosEspeciaisBaseHexadecimal = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15
}

const validadoresPorNomeDaBase = {
    "HEXA": validarNumeroEmBaseHexadecimal,
    "OCTAL": validarNumeroEmBaseOctal,
    "BINARIO": validarNumeroEmBaseBinaria
}

const valoresPorNomeDaBase = {
    "HEXA": 16,
    "OCTAL": 8,
    "BINARIO": 2
}

function obterValidadorPorNomeDaBase(nomeDaBase) {
    return validadoresPorNomeDaBase[nomeDaBase]
}

function obterValorPorNomeDaBase(nomeDaBase) {
    return valoresPorNomeDaBase[nomeDaBase]
}

function validarNumeroEmBaseHexadecimal(digito, validacoes) {
    const digitoComumValido = !isNaN(digito)
    const digitoEspecialValido = !!digitosEspeciaisBaseHexadecimal[digito]

    if (!digitoComumValido && !digitoEspecialValido)
        validacoes.push(`Dígito ${digito} não é válido na base hexadecimal`)
}

function validarNumeroEmBaseOctal(digito, validacoes) {
    const digitoValido = !isNaN(digito) && parseInt(digito) < 8

    if (!digitoValido)
        validacoes.push(`Dígito ${digito} não é válido na base octal`)
}

function validarNumeroEmBaseBinaria(digito, validacoes) {
    const digitoValido = digito === "0" || digito === "1"

    if (!digitoValido)
        validacoes.push(`Dígito ${digito} é inválido, valores permitidos na base binária: 0,1`)
}

function validarNumero(numeroComoLista, validador) {
    const validacoes = []

    if (numeroComoLista.length < 1)
        validacoes.push('Número não pode estar vazio')

    numeroComoLista.forEach(digito => {
        validador(digito, validacoes)
    })

    return validacoes
}

function converterParaDecimal(numeroComoLista, base) {
    let numeroDecimal = 0
    let descricao = ""

    numeroComoLista.forEach((digito, posicao) => {
        const expoente = obterExpoente(numeroComoLista.length, posicao)
        const valor = obterValorDigito(digito)

        descricao += `(${valor} * ${base} ^ ${expoente})`

        if (!eUltimoDigitoDaLista(numeroComoLista.length, posicao))
            descricao += " + "

        numeroDecimal += valor * base ** expoente
    })

    return {
        descricao,
        numeroDecimal
    }
}

function obterValorDigito(digito) {
    if (isNaN(digito))
        return parseInt(digitosEspeciaisBaseHexadecimal[digito])

    return parseInt(digito)
}

function obterExpoente(tamanho, posicao) {
    return tamanho - 1 - posicao
}

function eUltimoDigitoDaLista(tamanho, posicao) {
    return posicao === tamanho - 1
}

function obterDadosParaConversao() {
    let numeroASerConvertido = ""
    let nomeDaBase = ""

    numeroASerConvertido = reader("Qual número deseja converter? ")
        .toString()
        .trim()
        .toUpperCase()
    if (verificarSaida(numeroASerConvertido))
        return {
            solicitouSaida: true
        }

    nomeDaBase = reader("Qual é a base dele? (BINARIO, OCTAL, HEXA) ")
        .toUpperCase()
        .trim()
    if (verificarSaida(nomeDaBase))
        return {
            solicitouSaida: true
        }

    return {
        numeroASerConvertido,
        nomeDaBase,
        solicitouSaida: false
    }
}

function verificarSaida(entradaDoUsuario) {
    return entradaDoUsuario.includes("SAIR")
}

function inicializador() {
    console.log("Bem-vindo ao conversor de n base para decimal!\nCaso deseje sair digite 'SAIR'")
    calcular()
}

function calcular() {
    console.log('\n')
    const entradaDoUsuario = obterDadosParaConversao()
    const nomeDaBase = entradaDoUsuario.nomeDaBase
    const numeroASerConvertido = entradaDoUsuario.numeroASerConvertido

    if (entradaDoUsuario.solicitouSaida)
        return

    const validador = obterValidadorPorNomeDaBase(nomeDaBase)

    if (!validador) {
        console.log(`Base ${nomeDaBase} não está disponível.`)
        calcular()
        return
    }

    const numeroComoLista = numeroASerConvertido.split("")
    const valorBase = obterValorPorNomeDaBase(nomeDaBase)
    const validacoes = validarNumero(numeroComoLista, validador)

    if (validacoes.length < 1) {
        const resultado = converterParaDecimal(numeroComoLista, valorBase)

        console.log(`O número ${numeroASerConvertido} em base decimal é ${resultado.numeroDecimal}`)
        console.log(`O processo para conversão do número foi: ${resultado.descricao}`)
    } else {
        console.log("Número inválido! Os seguintes erros foram encontrados:")

        validacoes.forEach(v => {
            console.log(v)
        })
    }

    calcular()
}

inicializador()