const cron = require("node-cron");
const schedular = require("./schedular");

cron.schedule("0 18 * * *", async () => {
  try {
    console.log("Running daily reminder cron job at 6 PM");
    await schedular.schedulingLogic();
    console.log("Reminder job completed successfully.");
  } catch (err) {
    console.error("Error running daily reminder cron job:", err);
    throw err;
  }
});
