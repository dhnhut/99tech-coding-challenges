// Naive sum
export const sum_to_n_a = (n: number): number | void => {
  if (n < 1) return undefined;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

export const sum_to_n_b = (n: number): number | void => {
  if (n < 1) return undefined;
  return (n * (n + 1)) / 2;
};

export const sum_to_n_c = (n: number): number | void => {
  if (n < 1) return undefined;
  if (n == 1) return 1;
  return +sum_to_n_c(n - 1) + n;
};
