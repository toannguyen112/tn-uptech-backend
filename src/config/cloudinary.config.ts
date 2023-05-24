const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: "dkxssmluy",
    api_key: "448582698327699",
    api_secret: "BECDaqHUJBALetDFgnAiBQmH3xk"
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: (req, file) => {
            return '/Uptech'
        },
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});

const uploadCloud = multer({ storage });

export default uploadCloud
