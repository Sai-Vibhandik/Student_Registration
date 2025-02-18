
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const tableBody = document.querySelector('#studentTable tbody');

    // Loading data from local storage
    loadStudents();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const studentName = document.getElementById('studentName').value.trim();
        const studentID = document.getElementById('studentID').value.trim();
        const email = document.getElementById('email').value.trim();
        const contactNo = document.getElementById('contactNo').value.trim();

        // Validate inputs
        if (!studentName || !studentID || !email || !contactNo) {
            alert('All fields are required!');
            return;
        }

        if (!/^[A-Za-z\s]+$/.test(studentName)) {
            alert('Student name should contain only letters.');
            return;
        }

        if (!/^\d+$/.test(studentID)) {
            alert('Student ID should contain only numbers.');
            return;
        }

        if (!/^\d+$/.test(contactNo)) {
            alert('Contact number should contain only numbers.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Adding student to table and local storage
        addStudent(studentName, studentID, email, contactNo);
        form.reset();
    });

    function addStudent(name, id, email, contact) {
        const student = { name, id, email, contact };
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }

    function renderStudents() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        tableBody.innerHTML = '';

        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.editStudent = (index) => {
        const students = JSON.parse(localStorage.getItem('students'));
        const student = students[index];

        document.getElementById('studentName').value = student.name;
        document.getElementById('studentID').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contactNo').value = student.contact;

        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    };

    window.deleteStudent = (index) => {
        const students = JSON.parse(localStorage.getItem('students'));
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    };

    function loadStudents() {
        renderStudents();
    }
});
