const Gravity = artifacts.require("Gravity");

contract("Gravity", async accounts => {
  let gravity;
  const displayName = "Mutex";
  const id = 1

  before(async () => {
    gravity = await Gravity.deployed();
    await gravity.createGravatar(
      displayName,
      {from:accounts[0]}); 
  }); 

  it('Should deploy smart contract properly', async() => {
      const gravity = await Gravity.deployed();
      assert(gravity.address !== '');
  });

  it("Should assign the name correctly", async () => {
    const name = await gravity.getGravatar(accounts[0],{from: accounts[0]});
    assert.equal(displayName, name, "The name was incorrectly assigned");
  });

  it("Should assign the id correctly", async () => {
    const idTest = await gravity.getId({from: accounts[0]});
    const ownerTest = await gravity.getOwner(idTest);

    assert.equal(id, idTest.toNumber(), "The ids are not equal");
    assert.equal(accounts[0], ownerTest, "It is not the same owner");
  });

  // In this test we want to test the fail case. We use try catch to test the fail case.
  it("Shouldn't let a user have more than one gravatar", async () => {
    const newDisplayName = "Timex";
    try {
        await gravity.createGravatar(newDisplayName, {from:accounts[0]});
        assert(false);
    } catch (err) {
        assert(err.message.includes("Address already has a gravatar"));
    }
  });

    it("Should update the name of the gravatar", async () => {
        const newDisplayName = "Timex";
        await gravity.updateGravatarName(newDisplayName, {from:accounts[0]});

        const updatedName = await gravity.getGravatar(accounts[0]);

        assert.equal(newDisplayName, updatedName, "Names aren't equal after update");
    });

  it("Shouldn't let a user update if it doesn't have gravatars", async () => {
    const newDisplayName = "Timex";
    try {
        await gravity.updateGravatarName(newDisplayName, {from:accounts[2]});
        assert(false);
    } catch (err) {
        assert(err.message.includes("User doesn't have gravatars"));
    }
  });
});
