import { getCoordinatesFromInput } from "../utils";

describe("Проверка функции обработки координат", () => {
  test.each([
    {
      str: "51.50851, −0.12572",
      expected: { latitude: "51.50851", longitude: "−0.12572" },
    },
    {
      str: "51.50851,−0.12572",
      expected: { latitude: "51.50851", longitude: "−0.12572" },
    },
    {
      str: "[51.50851, −0.12572]",
      expected: { latitude: "[51.50851", longitude: "−0.12572]" },
    },
  ])("demo($str)", ({ str, expected }) => {
    expect(getCoordinatesFromInput(str)).toEqual(expected);
  });
});
