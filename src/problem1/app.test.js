import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./app";

test("n less than 1", () => {
  expect(sum_to_n_a(0)).toEqual(undefined);
  expect(sum_to_n_b(0)).toEqual(undefined);
  expect(sum_to_n_c(0)).toEqual(undefined);
});

test("n equal 1", () => {
  expect(sum_to_n_a(1)).toEqual(1);
  expect(sum_to_n_b(1)).toEqual(1);
  expect(sum_to_n_c(1)).toEqual(1);
});

test("n equal some integer", () => {
  expect(sum_to_n_a(5)).toEqual(15);
  expect(sum_to_n_b(5)).toEqual(15);
  expect(sum_to_n_c(5)).toEqual(15);
});


test("n equal some integer", () => {
  expect(sum_to_n_a(25)).toEqual(325);
  expect(sum_to_n_b(25)).toEqual(325);
  expect(sum_to_n_c(25)).toEqual(325);
});

test("n equal some integer", () => {
  expect(sum_to_n_a(50)).toEqual(1275);
  expect(sum_to_n_b(50)).toEqual(1275);
  expect(sum_to_n_c(50)).toEqual(1275);
});

test("n equal Number.MAX_SAFE_INTEGER", () => {
  // *** Should NOT uncomment, calculation cost too high
  // expect(sum_to_n_a(Number.MAX_SAFE_INTEGER)).toEqual(4.0564819207303336e+31);
  expect(sum_to_n_b(Number.MAX_SAFE_INTEGER)).toEqual(4.0564819207303336e+31);
  // expect(sum_to_n_c(Number.MAX_SAFE_INTEGER)).toEqual(4.0564819207303336e+31);
});