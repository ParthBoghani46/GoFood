const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoURL =
  "mongodb+srv://boghanipart:parth%40boghani%402004@cluster0.qn3kkyt.mongodb.net/Gofood?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(
    mongoURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    async (err, result) => {
      if (err) {
        console.log("---", err);
      } else {
        console.log("Connected Successfully");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        );
        fetched_data.find({}).toArray(async function(err, data) {
          const foodCategory = await mongoose.connection.db.collection(
            "foodCategory"
          );
          foodCategory.find({}).toArray(function(err, catData) {
            if (err) {
              console.log(err);
            } else {
              global.food_items = data;
              global.foodCategory = catData;
            }
          });
          // if (err) {
          //   console.log(err);
          // } else {
          //   global.food_items = data;
          // }
        });
      }
    }
  );
};
module.exports = mongoDB;
