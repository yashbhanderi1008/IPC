import app from './app';
import { ConnectDB } from '@db';

const database = new ConnectDB(process.env.MONGODB_URL!);

database.connect().then(() => {
    console.log("Database succesfully connected");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})