const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock("fs");

test("creates an zookeeper object", () => {
    const zookeeper = createNewZookeeper(
      { name: "ZooSteve", id: "99999" },
      zookeepers
    );
  
    expect(zookeeper.name).toBe("ZooSteve");
    expect(zookeeper.id).toBe("99999");
});

test("filters by query", () => {
    const startingZookeepers = [
      {
        id: "99999",
        name: "ZooSteve",
        age: 99,
        favoriteAnimal: "anteater"
      },
      {
        id: "88888",
        name: "ZooMary",
        age: 88,
        favoriteAnimal: "chameleon"
      },
    ];
  
    const updatedZookeepers = filterByQuery({ age: 99 }, startingZookeepers);
  
    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
          id: "88888",
          name: "ZooSteve",
          age: 88,
          favoriteAnimal: "anteater"
        },
        {
          id: "99999",
          name: "ZooMary",
          age: 99,
          favoriteAnimal: "chameleon"
        },
      ];
  
    const result = findById("88888", startingZookeepers);
  
    expect(result.name).toBe("ZooSteve");
});

test("validates age", () => {
    const zookeeper = {
          id: "88888",
          name: "ZooSteve",
          age: 88,
          favoriteAnimal: "anteater"
    };
  
    const invalidZookeeper = {
        id: "88888",
        name: "ZooSteve",
        age: "88",
        favoriteAnimal: "anteater"
    };
  
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);
  
    expect(result).toBe(true);
    expect(result2).toBe(false);
});