import { missingField } from "./utils/email-validator";
import { test } from "vitest";

test("should return an empty array if all fields are defined", async () => {
  const obj = {
    field1: "value1",
    field2: "value2",
  };
  const missing = missingField(obj);
  expect(missing).toEqual([]);
});

test("should return missing fields if some fields are undefined", async () => {
  const obj = {
    field1: undefined,
    field2: "value2",
  };
  const missing = missingField(obj);
  expect(missing).toEqual(["field1"]);
});

test("should return all fields if all fields are undefined", async () => {
  const obj = {
    field1: undefined,
    field2: undefined,
  };
  const missing = missingField(obj);
  expect(missing).toEqual(["field1", "field2"]);
});
