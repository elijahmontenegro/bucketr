const { performance } = require('perf_hooks');

module.exports = async (resolve, root, args, ctx, info) => {
  const start = performance.now();

  const result = await resolve(root, args, ctx, info);

  const time = performance.now() - start;

  // probs a good idea to implement some kind of devops logging here
  // console.log(
  //   `Request: ${time.toFixed(2)}ms`,
  //   '-',
  //   `Result: ${JSON.stringify(result, null, 2)}`,
  // );

  return result;
};
