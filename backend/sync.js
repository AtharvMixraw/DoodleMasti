const { sequelize } = require("./config/db");
const User = require("./models/userModel");

(async () => {
  try {
    await sequelize.sync({ force: true }); // This will recreate the table
    console.log("Table synced successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error syncing table:", error);
    process.exit(1);
  }
})();
