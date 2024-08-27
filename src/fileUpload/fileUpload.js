import multer from 'multer';
import { v4 as uuidv4 } from "uuid"

export let fileUpload = (folderName) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + '-' + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {
        console.log(file);
        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted

        // To accept the file pass `true`, like so:
        if (file.mimetype.startsWith('image')) {

            cb(null, true)
        } else {

            cb(Error("Please use images only!"), false)
        }
        // To reject this file pass `false`, like so:

    }
    const upload = multer({
        storage, fileFilter, limits: {
            fileSize: 15000000 // 15MB
        }
    })

    return upload
}

export let signleFileUpload = (fieldName, folderName) => fileUpload(folderName).single(fieldName)


export let MultiFileUpload = (arrayOfFields, folderName) => fileUpload(folderName).fields(arrayOfFields)