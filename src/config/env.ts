// biome-ignore assist/source/organizeImports: <explanation>
import { config } from "dotenv";
config();

const ENVIROINMENT_VARIABLES = {
	PORT: process.env.PORT,
	DB: {
		CONNECTION_URL: process.env.DATABASE_URL,
	},
} as const;

export default ENVIROINMENT_VARIABLES;
