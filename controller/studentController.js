const { ObjectId } = require("mongodb");
const db = require("../data/database");

// GET ALL
const getAllStudents = async (req, res) => {
    //#swagger.tags = ['Students']
    try {
        const students = await db.getDb().collection("students").find().toArray();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ONE
const getSingleStudent = async (req, res) => {
    //#swagger.tags = ['Students']
    try {
        const student = await db.getDb().collection("students").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE 
const createStudent = async (req, res) => {
    //#swagger.tags = ['Students']
    try {
        const { firstName, lastName, email, age, department, level, gpa } = req.body;

        if (!firstName || !email || !lastName) {
            return res.status(400).json({
                message: "firstName, lastName and email are required"
            });
        }

        const student = {
            firstName,
            lastName,
            email,
            age,
            department,
            level,
            gpa
        };

        const response = await db.getDb().collection("students").insertOne(student);

        if (response.acknowledged) {
            res.status(201).json(response);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE 
const updateStudent = async (req, res) => {
    //#swagger.tags = ['Students']
    try {
        if(!req.body.firstName ||
            !req.body.lastName ||
            !req.body.email) {
            return res.status(400).json({message: 'Firstname, Lastname and email are required'});
        }
        if(!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message:'Valid ID is required'});
        }
        const id = new ObjectId(req.params.id);

        const updateData = {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
                department: req.body.department,
                level: req.body.level,
                gpa: req.body.gpa
            }
        };

        const response = await db.getDb().collection("students").updateOne(
            { _id: id },
            updateData
        );

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student updated successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE 
const deleteStudent = async (req, res) => {
    //#swagger.tags = ['Students']
    try {
        const response = await db.getDb().collection("students").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (response.deletedCount > 0) {
            return res.status(200).json({ message: "Student deleted" });
        }

        res.status(404).json({ message: "Student not found" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllStudents,
    getSingleStudent,
    createStudent,
    updateStudent,
    deleteStudent
};