const { Schema, model } = require("mongoose");
// Створити таблицю БД “Export”, що містить інформацію про дані з полями:
// код;
// найменування товару;
// країна, що експортує товар;
// об’єм товару в одиницях; ///кількість
// ціна.

const ExportSchema = new Schema(
  {
    itemName: {
      type: String,
      trim: true,
    },
    itemCountryExport: {
      type: String,
      trim: true,
    },
    itemAmount: {
      type: Number,
    },
    itemPrice: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("exports", ExportSchema);
