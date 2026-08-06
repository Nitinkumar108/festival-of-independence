/**
 * One-off script: creates tables and a first SuperAdmin account
 * from the SEED_ADMIN_* values in .env.
 *
 * Run with: npm run db:sync
 */
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { sequelize, Admin, College } = require("../models");

async function run() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  // Seed default colleges
  const { DEFAULT_COLLEGES } = require("../controllers/collegeController");
  for (const name of DEFAULT_COLLEGES) {
    const [college, created] = await College.findOrCreate({ where: { name } });
    if (created) {
      console.log(`Seed college created: ${name}`);
    }
  }

  const email = process.env.SEED_ADMIN_EMAIL;
  const existing = await Admin.findOne({ where: { email } });

  if (!existing) {
    const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, 10);
    await Admin.create({
      name: process.env.SEED_ADMIN_NAME,
      email,
      passwordHash,
      role: "SuperAdmin",
    });
    console.log(`Seed admin created: ${email}`);
  } else {
    console.log("Seed admin already exists, skipping.");
  }

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
