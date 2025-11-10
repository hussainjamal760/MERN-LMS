import {app} from './app';
require("dotenv").config();
import connectDB from './utils/db'

app.listen(process.env.PORT , ()=>{
    console.log(`Server running at PORT : ${process.env.PORT}`);
    connectDB();
}
)