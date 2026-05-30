const { ObjectId } = require("mongodb");
const db = require("../data/database");

// GET ALL
const getAllCourses = async (req, res) => {
    //#swagger.tags = ['Hello world']
    try {
        const courses = await db.getDb().collection("courses").find().toArray();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ONE
const getSingleCourse = async (req, res) => {
    //#swagger.tags = ['Hello world']
    try {
        const course = await db.getDb().collection("courses").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE
const createCourse = async (req, res) => {
    //#swagger.tags = ['Hello world']
    try {
        const { courseCode, courseTitle, lecturer, creditUnit } = req.body;

        if (!courseCode || !courseTitle || !lecturer || !creditUnit) {
            return res.status(400).json({ message: "All fields required" });
        }

        const response = await db.getDb().collection("courses").insertOne({
            courseCode,
            courseTitle,
            lecturer,
            creditUnit
        });

        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
const updateCourse = async (req, res) => {
    //#swagger.tags = ['Hello world']
    try {
        const response = await db.getDb().collection("courses").updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    courseCode: req.body.courseCode,
                    courseTitle: req.body.courseTitle,
                    lecturer: req.body.lecturer,
                    creditUnit: req.body.creditUnit
                }
            }
        );

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
const deleteCourse = async (req, res) => {
    //#swagger.tags = ['Hello world']
    try {
        const response = await db.getDb().collection("courses").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (response.deletedCount > 0) {
            return res.status(200).json({ message: "Course deleted" });
        }

        res.status(404).json({ message: "Course not found" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse
};