// TASK1

const filter_list = (list) => {
  return list.filter((el) => typeof el === "number");
};

console.log(filter_list([1, 2, "a", "b"]));
console.log(filter_list([1, "a", "b", 0, 15]));
console.log(filter_list([1, 2, "aasf", "1", "123", 123]));

// TASK2

const first_non_repeating_letter = (input) => {
  input = input.replaceAll(" ", "");
  for (let i = 0; i < input.length; i++) {
    const regex = new RegExp(
      `${input[i].toLowerCase()}|${input[i].toUpperCase()}`,
      "g"
    );
    const modified_input = input.replaceAll(regex, "");
    if (modified_input.length === input.length - 1) {
      return input[i];
    }
  }
  return "";
};
console.log(first_non_repeating_letter("stress"));
console.log(first_non_repeating_letter("sTreSS"));

// TASK3

const digital_root = (N) => {
  const N_string = N.toString();
  let suma = 0;
  for (let i = 0; i < N_string.length; i++) {
    suma += parseInt(N_string[i]);
  }
  if (suma < 10) {
    return suma;
  }
  return digital_root(suma);
};
console.log(digital_root(16));
console.log(digital_root(942));
console.log(digital_root(132189));
console.log(digital_root(493193));

// TASK4

const n_pairs = (A, target) => {
  let n = 0;
  for (let i = 0; i < A.length; i++) {
    for (let j = i + 1; j < A.length; j++) {
      if (A[i] + A[j] === target) {
        n++;
      }
    }
  }
  return n;
};
console.log(n_pairs([1, 3, 6, 2, 2, 0, 4, 5], 5));

// TASK5

const meet_list = (list) =>
  list
    .toUpperCase()
    .split(";")
    .map((person) => person.split(":").reverse())
    .sort()
    .reduce((acc, person) => (acc += `(${person[0]}, ${person[1]})`), "");
console.log(
  meet_list(
    "Fred:Corwill;Wilfred:Corwill;Barney:TornBull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill"
  )
);
