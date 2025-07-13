import express from 'express'
import { addFoodItems, listFoodItems , removeFoodItems} from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router()

// multer configuration for file uploads
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage})

foodRouter.post('/add', upload.single('image'), async (req, res, next) => {
    try {
        await addFoodItems(req, res, next);
    } catch (error) {
        console.error('Error adding food item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

foodRouter.get('/list', listFoodItems)

foodRouter.post('/remove/', removeFoodItems)

export default foodRouter