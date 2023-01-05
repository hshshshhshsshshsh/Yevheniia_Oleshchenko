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
