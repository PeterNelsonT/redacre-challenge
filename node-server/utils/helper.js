const fs = require("fs");

/**
 * Function to create geojson data from json files
 */
export const createGeojsonData = async () => {
  const data1 = await fs.promises.readFile(
    "./data/popeye-village-balluta.geojson",
    "utf8"
  );
  const data1R = JSON.parse(data1);
  const data1C = data1R.features[0].geometry.coordinates;
  data1R.features[0].geometry.coordinates = data1C.reverse();
  const data2 = await fs.promises.readFile("./data/lunch.geojson", "utf8");
  const data = [
    {
      code: "villageToBalluta",
      description: "Popeye Village - Balluta",
      value: JSON.parse(data1),
      icon: {
        name: "my-car",
        url: "https://react-peter.s3.us-east-2.amazonaws.com/images/car.png",
      },
    },
    {
      code: "ballutaToVillage",
      description: "Balluta - Popeye Village",
      value: data1R,
      icon: {
        name: "my-car",
        url: "https://react-peter.s3.us-east-2.amazonaws.com/images/car.png",
      },
    },
    {
      code: "lunch",
      description: "Balluta - Lunch - Balluta",
      value: JSON.parse(data2),
      icon: {
        name: "my-man",
        url: "https://react-peter.s3.us-east-2.amazonaws.com/images/man.png",
      },
    },
  ];
  return data;
};

/**
 * This function will gets data and stores in mongo if it doesn't exist
 */
export const initialiseDB = async (dbo) => {
  const data = await createGeojsonData();
  let db_connect = dbo.getDb("movement");
  db_connect
    .collection("paths")
    .find({})
    .toArray(function (err, result) {
      if (result?.length === 0) {
        db_connect.collection("paths").insertMany(data, function (err, res) {
          if (err) {
            console.log("Failed to Initialize Data");
          }
          console.log("Initialized Data");
        });
      }
    });
};

/**
 * This function will send the data to the new ws client
 * data comes from mongo if it exists
 * incase of any setback data is send from files
 */
export const initialiseClient = async (ws, dbo) => {
  let db_connect = dbo.getDb("movement");
  db_connect
    .collection("paths")
    .find({})
    .toArray(function (err, result) {
      if (err || result?.length === 0) {
        createGeojsonData().then((data) => {
          ws.send(JSON.stringify(data));
        });
      } else {
        ws.send(JSON.stringify(result));
      }
    });
};
