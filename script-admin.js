// عرض قائمة المستخدمين
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userList = document.getElementById('users');

    userList.innerHTML = ''; // مسح القائمة الحالية

    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${user.name} (${user.id}) - رقم التعريف: ${user.identifier || 'غير متوفر'}</span>
            <button onclick="editUser(${index})">تعديل</button>
            <button onclick="deleteUser(${index})">حذف</button>
        `;
        userList.appendChild(li);
    });
}

// بحث عن المستخدم باستخدام رقم التعريف
document.getElementById('search-button').addEventListener('click', function () {
    const searchId = document.getElementById('search-id').value.trim(); // إزالة المسافات الزائدة
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const searchResults = document.getElementById('search-results');

    searchResults.innerHTML = ''; // مسح نتائج البحث السابقة

    if (!searchId) {
        searchResults.innerHTML = '<li>الرجاء إدخال رقم تعريف للبحث.</li>';
        return;
    }

    const foundUser = users.find(user => user.identifier === searchId);

    if (foundUser) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${foundUser.name} (${foundUser.id}) - رقم التعريف: ${foundUser.identifier}</span>
            <button onclick="editUser(${users.indexOf(foundUser)})">تعديل</button>
            <button onclick="deleteUser(${users.indexOf(foundUser)})">حذف</button>
        `;
        searchResults.appendChild(li);
    } else {
        searchResults.innerHTML = '<li>لم يتم العثور على مستخدم بهذا الرقم.</li>';
    }
});

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
