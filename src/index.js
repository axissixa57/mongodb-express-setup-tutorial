import "dotenv/config";
import express from "express";
// Express related imports
// other node package imports
//...
import models, { connectDb } from "./models";
const app = express();
// additional Express stuff: middleware, routes, ...
//...
const eraseDatabaseOnSync = true;

app.get('/test/:id', (req, res) => {
    const id = req.params.id;

    models.User.findById(id, function (err, doc) {
        if (err) {
            return res.json(err);
        }

        doc.remove(); // кроме того что это метод удаляет документ, в модели можено указать hook someSchema.pre("remove", callback), в кот. можно допусти удалить в другом объекте все объекты связанные по его ид
    });

    res.send('user deleted and his messages as well');
});

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({})
    ]);

    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: "rwieruch"
  });

  const user2 = new models.User({
    username: "ddavids"
  });

  const message1 = new models.Message({
    text: "Published the Road to learn React",
    user: user1.id
  });

  const message2 = new models.Message({
    text: "Happy to release ...",
    user: user2.id
  });
  const message3 = new models.Message({
    text: "Published a complete ...",
    user: user2.id
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();
};
