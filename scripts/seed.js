import { pool } from "../config/db.js";

async function seed() {
  try {
    // Clear the table before inserting (prevents duplicates if you run multiple times)
    await pool.query("TRUNCATE users RESTART IDENTITY CASCADE");

    // List of fake users
    const users = [
      { name: "William Smith", email: "william@example.com" },
      { name: "Mary Johnson", email: "mary.johnson@example.com" },
      { name: "John Brown", email: "john.brown@example.com" },
      { name: "Anna Davis", email: "anna.davis@example.com" },
      { name: "Peter Wilson", email: "peter.wilson@example.com" },
      { name: "Sophia Moore", email: "sophia.moore@example.com" },
      { name: "Charles Taylor", email: "charles.taylor@example.com" },
      { name: "Julia Anderson", email: "julia.anderson@example.com" },
      { name: "Richard Thomas", email: "richard.thomas@example.com" },
      { name: "Emily Jackson", email: "emily.jackson@example.com" },
      { name: "Brian White", email: "brian.white@example.com" },
      { name: "Laura Harris", email: "laura.harris@example.com" },
      { name: "Matthew Martin", email: "matthew.martin@example.com" },
      { name: "Patricia Thompson", email: "patricia.thompson@example.com" },
      { name: "Lucas Garcia", email: "lucas.garcia@example.com" },
      { name: "Rachel Martinez", email: "rachel.martinez@example.com" },
      { name: "Andrew Robinson", email: "andrew.robinson@example.com" },
      { name: "Beatrice Clark", email: "beatrice.clark@example.com" },
      { name: "Edward Rodriguez", email: "edward.rodriguez@example.com" },
      { name: "Paula Lewis", email: "paula.lewis@example.com" },
      { name: "Daniel Lee", email: "daniel.lee@example.com" },
      { name: "Catherine Walker", email: "catherine.walker@example.com" },
      { name: "Philip Hall", email: "philip.hall@example.com" },
      { name: "Amanda Allen", email: "amanda.allen@example.com" },
      { name: "George Young", email: "george.young@example.com" },
      { name: "Sophie King", email: "sophie.king@example.com" },
      { name: "Gabriel Wright", email: "gabriel.wright@example.com" },
      { name: "Melissa Scott", email: "melissa.scott@example.com" },
      { name: "Robert Green", email: "robert.green@example.com" },
      { name: "Alice Adams", email: "alice.adams@example.com" },
    ];

    // Insert into database
    for (const user of users) {
      await pool.query(
        "INSERT INTO users (name, email, created_at) VALUES ($1, $2, $3)",
        [user.name, user.email, new Date()]
      );
    }

    console.log("✅ Seed executed successfully!");
  } catch (err) {
    console.error("❌ Error running seed:", err);
  } finally {
    pool.end();
  }
}

seed();
