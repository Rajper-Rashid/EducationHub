// firebase.js

// ✅ Firebase config – isse apne Firebase console se replace karo
const firebaseConfig = {
  apiKey: "AIzaSyAst0D_TTLNV8z5aDI6f9ygbDkTdjMn6sM",
  authDomain: "education-hub-dff77.firebaseapp.com",
  projectId: "education-hub-dff77",
  storageBucket: "education-hub-dff77.appspot.com",
  messagingSenderId: "60385674016",
  appId: "1:60385674016:web:b33272f86fef00f7204d45"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ✅ Signup Form Submit
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const userCred = await auth.createUserWithEmailAndPassword(email, password);
    const uid = userCred.user.uid;

    // ✅ User data Firestore me save karein
    await db.collection("users").doc(uid).set({
      name,
      email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    localStorage.setItem("loginUser", JSON.stringify({ uid, email }));
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("Signup Failed: " + err.message);
  }
});

// ✅ Login Form Submit
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCred = await auth.signInWithEmailAndPassword(email, password);
    const uid = userCred.user.uid;

    localStorage.setItem("loginUser", JSON.stringify({ uid, email }));
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("Login Failed: " + err.message);
  }
});