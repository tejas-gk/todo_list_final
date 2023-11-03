
//=====================GET METHOD=================================================
const getStudent = async function (req, res) {
    try {
        const stu = await studentModel.find()
        res.send({ status: true, data: stu });
    }
    catch (error) {
        console.log(error)
        res.send({ status: false, error: 'Internal Server Error' });
    }
};
//======================UPDATE METHOD===============================================
const updateStudent = async function (req, res) {
    try {
        const { stuid } = req.params;
        const { fname, lname, email, password, mobile, address } = req.body;//postman params are loaded
        const updateFields = {};

        const student = await studentModel.findOne(
            { _id: stuid, isDeleted: false },
            { $set: { fname, lname, email, password, mobile, address } },
            { new: true }
        );

        if (!student) {
            return res.send({ status: false, message: "student not found" });
        }
        return res.send({ status: true, message: "Student data updated Successfully", data: student });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
};