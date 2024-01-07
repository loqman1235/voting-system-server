import dotenv from "dotenv";

dotenv.config();

interface Config {
  mongo: {
    url: string;
  };
  server: {
    port: string;
    host: string;
  };
}

const config: Config = {
  mongo: {
    url: process.env.MONGO_URL || "",
  },
  server: {
    port: process.env.PORT || "3000",
    host: process.env.HOST || "localhost",
  },
};

export default config;
