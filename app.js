// Konfigurasi Firebase dari project Anda
const firebaseConfig = {
    apiKey: "AIzaSyDR-MFqDC9cM1pg1m0KClzRbyZ3QvmoWV8",
    authDomain: "testprogweb-8e80f.firebaseapp.com",
    projectId: "testprogweb-8e80f",
    storageBucket: "testprogweb-8e80f.appspot.com",
    messagingSenderId: "1046471077933",
    appId: "1:1046471077933:web:4a9207c4be43b77afb88a4",
    measurementId: "G-ZTKKJHZPP0"
};

// Inisialisasi Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Referensi elemen dari HTML
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

// Fungsi untuk menambahkan task baru ke Firestore
addTaskButton.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        db.collection("tasks").add({
            task: task
        }).then(() => {
            taskInput.value = ""; // Reset input setelah menambahkan
            loadTasks(); // Muat ulang daftar task
        }).catch(error => {
            console.error("Error adding task: ", error);
        });
    }
});

// Fungsi untuk memuat task dari Firestore
function loadTasks() {
    taskList.innerHTML = ""; // Kosongkan daftar sebelum memuat ulang
    db.collection("tasks").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const taskData = doc.data().task;
            const taskId = doc.id;
            const li = document.createElement("li");

            // Isi teks task
            li.textContent = taskData;

            // Tombol delete di setiap task
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => {
                deleteTask(taskId);
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }).catch(error => {
        console.error("Error loading tasks: ", error);
    });
}

// Fungsi untuk menghapus task dari Firestore
function deleteTask(taskId) {
    db.collection("tasks").doc(taskId).delete().then(() => {
        loadTasks(); // Muat ulang daftar task setelah penghapusan
    }).catch(error => {
        console.error("Error deleting task: ", error);
    });
}

// Memuat task ketika halaman pertama kali dibuka
window.onload = function() {
    loadTasks();
};
