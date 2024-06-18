// Naive sum
const sum_to_n_a = (n) => {
  if (n < 1) return undefined;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

const sum_to_n_b = (n) => {
  if (n < 1) return undefined;
  return (n * (n + 1)) / 2;
};

const sum_to_n_c = (n) => {
  if (n < 1) return undefined;
  if (n == 1) return 1;
  return n + sum_to_n_c(n - 1);
};

module.exports = {
  sum_to_n_a: sum_to_n_a,
  sum_to_n_b: sum_to_n_b,
  sum_to_n_c: sum_to_n_c,
};
