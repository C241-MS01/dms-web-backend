const prisma = require("../prisma");

const getAllUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.json({
			status: 200,
			message: "Success get all users",
			data: users,
		});
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await prisma.user.findUnique({
			where: { id: parseInt(id) },
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json({
			status: 200,
			message: "Success get user by ID",
			data: user,
		});
	} catch (error) {
		console.error("Error fetching user by ID:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { username, email, password } = req.body;
		const updatedUser = await prisma.user.update({
			where: { id: parseInt(id) },
			data: { username, email, password },
		});

		res.json({
			status: 200,
			message: "Success update user",
			data: updatedUser,
		});
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.user.delete({
			where: { id: parseInt(id) },
		});

		res.json({
			status: 200,
			message: "Success delete user",
		});
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
};
