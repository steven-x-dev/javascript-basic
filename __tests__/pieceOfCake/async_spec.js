describe('for asynchronous', () => {
  it('should return immediately and later trigger the callback', (done) => {
    const logs = [];
    setTimeout(() => {
      logs.push('async callback triggered');

      // <--start
      // Please write down the correct value. You should write the final result directly.
      const expected = ['after calling setTimeout', 'async callback triggered'];
      // --end->

      expect(logs).toEqual(expected);
      done();
    }, 500);
    logs.push('after calling setTimeout');
  });

  it('should return immediately and later trigger the callback using promise', (done) => {
    function setTimeoutUsingPromise(ms) {
      return new Promise(resolve => setTimeout(() => resolve(), ms));
    }

    const logs = [];
    setTimeoutUsingPromise(500)
      .then(() => {
        logs.push('async callback triggered');

        // <--start
        // Please write down the correct value. You should write the final result directly.
        const expected = ['after calling setTimeout', 'async callback triggered'];
        // --end->

        expect(logs).toEqual(expected);
        done();
      });

    logs.push('after calling setTimeout');
  });

  it('should trigger failure using reject', (done) => {
    function asyncOperationThatWillFail() {
      return new Promise((_, reject) => reject(new Error('>_<')));
    }

    const logs = [];
    asyncOperationThatWillFail()
    // return value after the line above: Uncaught (in promise) Error: >_<

      .then(() => logs.push('Success!'), error => logs.push(`Failed! ${error.message}`))
      // return value after the line above:
      // Promise {<fulfilled>: `${logs.length}`}
      // [[PromiseState]]: "fulfilled", [[PromiseResult]]: `${logs.length}`

      /*
       * TODO question:
       * The return value from the line above is also a Promise,
       * and calling then(onFulfilled, onReject) on it requires
       * the same construct as the line above: it takes in two
       * parameters of type function, the first for onFulfilled
       * and the second for onReject.
       *
       * In this case, although onFulfilled will never be triggered,
       * how will the onReject callback be identified and executed
       * when it is supplied as a single parameter
       *
       * According to tests on Chrome, no matter whether resolved
       * or rejected, if there is only one parameter, the one will
       * be executed, and if there are two parameters, the first
       * one will always be executed, it contradicts the documentation:
       * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
       */
      .then(() => {
        // <--start
        // Please write down the correct value. You should write the final result directly.
        const expected = ['Failed! >_<'];
        // --end->

        expect(logs).toEqual(expected);
        done();
      });
    // return value after the line above:
    // Promise {<fulfilled>: undefined}:
    // [PromiseState]]: "fulfilled", [[PromiseResult]]: `${logs.length}`
  });

  it('should trigger failure using reject and handle using catch', (done) => {
    function asyncOperationThatWillFail() {
      return new Promise((_, reject) => reject(new Error('>_<')));
    }

    const logs = [];
    asyncOperationThatWillFail()
      .then(() => logs.push('Success!'))
      .catch(reason => logs.push(`Caught! ${reason.message}`))
      .then(() => {
        // <--start
        // Please write down the correct value. You should write the final result directly.
        const expected = ['Caught! >_<'];
        // --end->

        expect(logs).toEqual(expected);
        done();
      });
  });

  it('should propagate the error as the way of the sync code', (done) => {
    function asyncOperationThatWillFail() {
      return new Promise((_, reject) => reject(new Error('>_<')));
    }

    const logs = [];
    asyncOperationThatWillFail()
      .then(() => logs.push('Success!'))
      .catch(reason => logs.push(`Caught! ${reason.message}`))
      .then(() => logs.push('Continued'))
      .then(() => logs.push('Another continued'))
      .then(() => { throw new Error('Holy ~'); })
      .then(() => logs.push('After error happened'))
      .catch(reason => logs.push(`Error handled: ${reason.message}`))
      .then(() => {
        // <--start
        // Please write down the correct value. You should write the final result directly.
        const expected = ['Caught! >_<', 'Continued', 'Another continued', 'Error handled: Holy ~'];
        // --end->
        expect(logs).toEqual(expected);
        done();
      });
  });
});
