const db = require("../db/data-helpers");
const assert = chai.assert;

describe("database functions", () => {
  it("should receive an event object", () => {
    const event = getEvent("8jhf7ksdn5dsfn8a");

    assert.equal(event, {
      event: {
        name: "holiday",
        creator: "sdfdfnnn355ndjfnsdfn8ksfnsdfnn32nnsdjnjsdfn"
      },
      votes: {
        "1": {
          id: "sdfdfnnn355ndjfnsdfn8ksfnsdfnn32nnsdjnjsdfn",
          name: "Billy Bob Thornten",
          days: { 
            "2017-10-26": true, 
            "2017-10-27": true, 
            "2017-10-28": true 
          }
        },
        "2": {
          id: "sdfdsdkfskdlf8fnnn3n8ksfnsdfnn32nnsdjnjsdfn",
          name: "Billy Joel",
          days: {
            "2017-10-26": false,
            "2017-10-27": false,
            "2017-10-28": false
          }
        }
      }
    });
  });
});
