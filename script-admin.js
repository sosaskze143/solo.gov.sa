// عرض قائمة المستخدمين
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userList = document.getElementById('users');

    userList.innerHTML = ''; // مسح القائمة الحالية

    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${user.name} (${user.id})</span>
            <button onclick="editUser(${index})">تعديل</button>
            <button onclick="deleteUser(${index})">حذف</button>
        `;
        userList.appendChild(li);
    });
}

// تعديل مستخدم
function editUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];

    const newName = prompt('أدخل الاسم الجديد:', user.name);
    const newId = prompt('أدخل رقم الهوية الجديد:', user.id);
    const newPassword = prompt('أدخل كلمة المرور الجديدة:', user.password);

    if (newName && newId && newPassword) {
        user.name = newName;
        user.id = newId;
        user.password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers(); // تحديث القائمة
    }
}

// حذف مستخدم
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1); // حذف المستخدم
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers(); // تحديث القائمة
}

// تحميل جميع البطاقات
document.getElementById('download-all-cards').addEventListener('click', function () {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.open('card.html', '_blank'); // فتح صفحة البطاقة في نافذة جديدة
    });
});

// عرض المستخدمين عند تحميل الصفحة
window.onload = displayUsers;
