import app from './app';
import { sequelize } from './config/database';

const PORT = process.env.PORT || 5000;

sequelize.authenticate().then(() => {
  console.log('Database connected');
  return sequelize.sync({ alter: true }); // Use sync({ force: true }) for dev reset
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
        console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
  });
}).catch((err) => {
  console.error('Unable to connect to DB:', err);
});
