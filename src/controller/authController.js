const prisma = require("../prisma");
const admin = require("../config/firebaseAdmin");
// const firebase = require('firebase');
// require('firebase/auth');

//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   } else {
//     firebase.app();
//   }

//   const register = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//       const userRecord = await admin.auth().createUser({ email, password });
//       res.status(201).json({ message: 'User registered successfully', uid: userRecord.uid });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//       const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
//       const idToken = await userCredential.user.getIdToken();
//       res.status(200).json({ token: idToken });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

const register = async (req, res) => {
	const { email, password } = req.body;

	try {
		const userRecord = await admin.auth().createUser({
			email,
			password,
		});

		res.status(201).json({
			message: "User registered successfully",
			user: userRecord,
		});
	} catch (error) {
		res.status(400).json({
			message: "Error registering user",
			error: error.message,
		});
	}
};

//   const login = async (req, res) => {
//     const { email, password } = req.body;

//     // Implementasikan logika autentikasi sesuai dengan kebutuhan Anda
//     // Firebase tidak memiliki API login di sisi server, biasanya dilakukan di sisi client

//     res.status(200).json({
//       message: 'Login route is not implemented in server-side, use client-side Firebase Auth',
//     });
//   };

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Di sisi klien, Anda akan mendapatkan token ID setelah login
		// Kirim token ID ini ke server melalui header Authorization
		const token = req.headers.authorization.split("Bearer ")[1];

		if (!token) {
			return res.status(403).json({
				message: "No token provided",
			});
		}

		const decodedToken = await admin.auth().verifyIdToken(token);
		const user = await admin.auth().getUser(decodedToken.uid);

		res.status(200).json({
			message: "User logged in successfully",
			user: user,
		});
	} catch (error) {
		res.status401().json({
			message: "Invalid token",
			error: error.message,
		});
	}
};

module.exports = { register, login };
