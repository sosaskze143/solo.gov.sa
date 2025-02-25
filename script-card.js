// تهيئة jsPDF
const { jsPDF } = window.jspdf;

// إنشاء رقم تعريف تلقائي غير مكرر
function generateUniqueId() {
    return Math.floor(100000 + Math.random() * 900000); // رقم عشوائي مكون من 6 أرقام
}

// إنشاء تواريخ تلقائية
function generateDates() {
    const issueDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(issueDate.getFullYear() + 1); // تاريخ الانتهاء بعد سنة من تاريخ الإصدار

    return {
        issueDate: issueDate.toLocaleDateString('ar-SA'), // تنسيق التاريخ بالعربية
        expiryDate: expiryDate.toLocaleDateString('ar-SA'),
    };
}

// عرض بيانات المستخدم
window.onload = function () {
    const user = JSON.parse(localStorage.getItem('currentUser')); // بيانات المستخدم الحالي

    if (user) {
        // إنشاء رقم تعريف وتواريخ تلقائية
        const uniqueId = generateUniqueId();
        const { issueDate, expiryDate } = generateDates();

        // عرض البطاقة
        document.getElementById('preview-name').textContent = user.name;
        document.getElementById('unique-id').textContent = user.id;
        document.getElementById('gender').textContent = user.gender === 'male' ? 'ذكر' : 'أنثى';
        document.getElementById('nationality').textContent = user.nationality;
        document.getElementById('birthdate').textContent = user.birthdate;
        document.getElementById('issue-date').textContent = issueDate;
        document.getElementById('expiry-date').textContent = expiryDate;
    } else {
        alert('لم يتم تسجيل الدخول!');
        window.location.href = 'index.html'; // توجيه المستخدم إلى صفحة تسجيل الدخول
    }
};

// تحميل البطاقة كصورة
document.getElementById('download-png').addEventListener('click', function () {
    html2canvas(document.querySelector('.card')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'card.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

// تحميل البطاقة كPDF
document.getElementById('download-pdf').addEventListener('click', function () {
    const cardElement = document.querySelector('.card');
    html2canvas(cardElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        doc.addImage(imgData, 'PNG', 10, 10, 180, 100);
        doc.save('card.pdf');
    });
});
