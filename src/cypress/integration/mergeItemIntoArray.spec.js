import mergeItemIntoArray from "../../utils/mergeItemIntoArray";

describe("Unit Test mergeItemIntoArray", function () {
  it("simple case", function () {
    expect(mergeItemIntoArray("test", ["one", "two"])).to.eql(["test", "one", "two"]);
  });
  it("empty array", function () {
    expect(mergeItemIntoArray("test", [])).to.eql(["test"]);
  });
  it("long array", function () {
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
  it("repeated item", function () {
    expect(mergeItemIntoArray("test", ["one", "test"])).to.eql(["test", "one"]);
  });
});
