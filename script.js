// بيانات المستخدمين (سيتم تخزينها في localStorage)
let users = JSON.parse(localStorage.getItem('users')) || [];

// بيانات المدير (يمكن تعديلها)
const admin = {
    id: "admin",
    password: "admin123",
    role: "admin"
};

// تسجيل الدخول
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('login-id').value;
    const password = document.getElementById('login-password').value;

    // التحقق من تسجيل الدخول كمدير
    if (id === admin.id && password === admin.password) {
        alert('تم تسجيل الدخول كمدير بنجاح!');
        window.location.href = 'admin.html'; // توجيه المدير إلى صفحة الإدارة
        return;
    }

    // البحث عن المستخدم
    const user = users.find(u => u.id === id && u.password === password);

    if (user) {
        alert('تم تسجيل الدخول بنجاح!');
        // حفظ المستخدم الحالي في localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        // توجيه المستخدم إلى صفحة إنشاء البطاقة
        window.location.href = 'card.html'; // تغيير الرابط إلى صفحة البطاقة
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
});

// إنشاء حساب
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const id = document.getElementById('register-id').value;
    const password = document.getElementById('register-password').value;
    const gender = document.getElementById('register-gender').value;
    const nationality = document.getElementById('register-nationality').value;
    const birthdate = document.getElementById('register-birthdate').value;

    // التحقق من عدم تكرار رقم الهوية
    const existingUser = users.find(u => u.id === id);
    if (existingUser) {
        document.getElementById('register-error').textContent = 'رقم الهوية مسجل مسبقًا!';
        document.getElementById('register-error').classList.remove('hidden');
        return;
    }

    // إضافة المستخدم الجديد
    const newUser = { name, id, password, gender, nationality, birthdate, identifier: null }; // رقم التعريف يبدأ كـ null
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('تم إنشاء الحساب بنجاح!');
    showLoginSection();
});

// التبديل بين تسجيل الدخول وإنشاء الحساب
document.getElementById('register-link').addEventListener('click', function (e) {
    e.preventDefault();
    showRegisterSection();
});

document.getElementById('login-link').addEventListener('click', function (e) {
    e.preventDefault();
    showLoginSection();
});

function showLoginSection() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('register-section').classList.add('hidden');
}

function showRegisterSection() {
    document.getElementById('register-section').classList.remove('hidden');
    document.getElementById('login-section').classList.add('hidden');
}
