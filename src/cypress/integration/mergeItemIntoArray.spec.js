import mergeItemIntoArray from "../../utils/mergeItemIntoArray";

describe("Unit Test mergeItemIntoArray", () => {
  it("simple case", () => {
    expect(mergeItemIntoArray("test", ["one", "two"])).to.eql(["test", "one", "two"]);
  });
  it("empty array", () => {
    expect(mergeItemIntoArray("test", [])).to.eql(["test"]);
  });
  it("long array", () => {
    expect(
      mergeItemIntoArray("test", [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
      ])
    ).to.eql(["test", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]);
  });
  it("repeated item", () => {
    expect(mergeItemIntoArray("test", ["one", "test"])).to.eql(["test", "one"]);
  });
});
