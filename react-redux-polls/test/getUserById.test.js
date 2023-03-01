const getUserById = require("./getUserById");

describe("getUserById", () => {
  it("will return the user if the user is found", async () => {
    var id = 1;
    var result = await getUserById(id);
    expect(result).toEqual({
      id: 1,
      firstName: "Kevin",
      lastName: "Chung",
    });
  });

  it("will return an error if the user is not found", async () => {
    var invalidId = "NA";
    await expect(getUserById(invalidId)).rejects.toEqual(
      "User with ID NA not found."
    );
  });
});
