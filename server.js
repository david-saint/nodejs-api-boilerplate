import dotenv from 'dotenv';
import app from './app';

dotenv.config();

// set the port for the server
app.set('port', process.env.PORT || 7777);

// start listening on the port
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
