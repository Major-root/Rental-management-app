const dotenv = require('dotenv');
const app = require('./app');
const { dB } = require('./src/database/authDataBase');

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
} else {
  dotenv.config({ path: '.env' });
}

const PORT = process.env.PORT || 2024;
dB.auth();

app.listen(PORT, () => {
  console.log(`App is running 🚀 on ${PORT}.`);
});
