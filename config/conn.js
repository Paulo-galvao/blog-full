import mongoose from "mongoose";

async function main() {
    try {
        await mongoose.connect("mongodb://localhost:27017/blog");
        console.log("DB connected");
    } catch (error) {
        console.log(error.message);
    }
}

main();
export default mongoose;