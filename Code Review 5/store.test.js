// require("jest-fetch-mock").enableMocks();
//const store = require("./store");
// test("testing app js", () => {
//   console.log("Hello tests world");
// });
const store = require("./store");
describe("test suite", () => {
  it("it should check whether the order button works fine or not", () => {
    expect(
      store.orderClicked().toBe(function () {
        return;
        window.location = "requestDeleivery.html";
      })
    );
    //expect(hw.sayHi('anil')).toBe('helloanil');
  });
});
