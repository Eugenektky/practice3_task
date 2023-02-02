const math =  require('../src/math')

test('Calculating total amount + tips', () => {
    const total = math.calculateTip(10, 0.1)
    expect(total).toBe(11)

})

test('Calculating total amount + tips', () => {
    const total = math.calculateTip(10)
    expect(total).toBe(12)
})

test('Converting celsius to fahrenheit', () =>{
    const degreeCelsius = math.fahrenheitToCelsius(32)
    expect(degreeCelsius).toBe(0)
})

test('Converting fahrenheit to celsius', () => {
    const fahrenheit = math.celsiusToFahrenheit(0)
    expect(fahrenheit).toBe(32)
})