const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class User {
  constructor(title, emg) {
    this.emg = emg;
    this.title = title;
    this.id = uuidv4();
  }

  toJSON() {
    return {
      emg: this.emg,
      title: this.title,
      id: this.id,
    };
  }

//   static async update(User) {
//     const notebooks = await User.getAll();

//     const idx = notebooks.findIndex((c) => c.id === User.id);
//     notebooks[idx] = User;

//     return new Promise((resolve, reject) => {
//       fs.writeFile(
//         path.join(__dirname, "..", "data", "notebooks.json"),
//         JSON.stringify(notebooks),
//         (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve();
//           }
//         }
//       );
//     });
//   }

  async save() {
    const notebooks = await User.getAll();
    notebooks.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "db", "database.json"),
        JSON.stringify(notebooks),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "db", "database.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getById(id) {
    const notebooks = await User.getAll();
    return notebooks.find((c) => c.id === id);
  }

  static async deleted(id) {
    const notebooks = await User.getAll();
   const newNotebooks = notebooks.filter((c) => c.id != id);
    console.log(newNotebooks);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "db", "database.json"),
        JSON.stringify(newNotebooks),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}

module.exports = User;
