const calculateTip = (totalBill, tipPercent = .2) => {
    const tip = totalBill * tipPercent
    return totalBill + tip
}

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit
}
