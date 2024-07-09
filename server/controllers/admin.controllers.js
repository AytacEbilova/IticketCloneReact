
const Admin = require('../models/admin.model')
const admin_controllers = {
    getAll: async (req, res) => {
        try {
            const admin = await Admin.find({});
            if (admin.length > 0) {
                res.status(200).send({
                    message: "success",
                    data: admin,
                });
            } else {
                res.status(204).send({
                    message: "empty data",
                    data: null,
                });
            }
        } catch (error) {
            res.status(204).send({
                message: error.message,
                error: true,
            });
        }
    },
    post: async (req, res) => {
        console.log("Received request with body:", req.body);
        try {
            const newAdmin = new Admin(req.body);
            await newAdmin.save();
            console.log("User created successfully:", newAdmin);
            res.status(201).send({ error: false, message: "User created", newAdmin });
        } catch (error) {
            console.error("Error saving user:", error);
            res.status(500).send({ error: true, message: error.message });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const admin = await Admin.findOne({ email });
            if (admin) {
                const isMatch = await bcrypt.compare(password, admin.password);
                if (isMatch) {
                    res.status(200).json({ success: true, message: "Login successful" });
                } else {
                    res.status(401).json({ success: false, message: "Invalid credentials" });
                }
            } else {
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};



module.exports = admin_controllers;