 import { configDotenv } from "dotenv";
import ImageKit from "imagekit";

configDotenv({})
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT
})

export default imagekit;
