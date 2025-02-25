// بيانات المستخدمين (سيتم تخزينها في localStorage)
let users = JSON.parse(localStorage.getItem('users')) || [];

// تسجيل الدخول
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('login-id').value;
    const password = document.getElementById('login-password').value;

    // البحث عن المستخدم
    const user = users.find(u => u.id === id && u.password === password);

    if (user) {
        alert('تم تسجيل الدخول بنجاح!');
        // توجيه المستخدم إلى صفحة البطاقة (يمكنك إضافة الرابط هنا)
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
    const newUser = { name, id, password, gender, nationality, birthdate };
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
