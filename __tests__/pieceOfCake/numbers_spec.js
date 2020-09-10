describe('for numbers', () => {
  it('should use real number calculation rather than integer in some languages', () => {
    const dividingResult = 3 / 4;

    // <--start
    // Please write down the correct value. You should write the final result directly.
    const expected = 0.75;
    // --end->

    expect(dividingResult).toEqual(expected);
  });

  it('should be able to check if the number is NaN', () => {
    const notNumber = 0 / 0;

    // <--start
    // Please write an expression determine if `notNumber` is NaN.

    // TODO other ways to avoid 'eslint-disable-next-line no-restricted-globals'?
    // eslint-disable-next-line no-restricted-globals
    const isNan = isNaN(notNumber);
    // --end->

    expect(isNan).toBeTruthy();
  });
});
