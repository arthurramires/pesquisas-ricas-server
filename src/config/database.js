require('dotenv/config');

module.exports = {
  dialect: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "postgres",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
};
