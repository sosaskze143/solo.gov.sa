// تهيئة jsPDF
const { jsPDF } = window.jspdf;

// إنشاء رقم تعريف تلقائي غير مكرر
function generateUniqueId() {
    return Math.floor(100000 + Math.random() * 900000); // رقم عشوائي مكون من 6 أرقام
}

// إنشاء تواريخ تلقائية
function generateDates(duration) {
    const issueDate = new Date(); // تاريخ الإصدار هو اليوم
    const expiryDate = new Date(issueDate);
    expiryDate.setMonth(issueDate.getMonth() + duration); // تاريخ الانتهاء بعد فترة محددة

    return {
        issueDate: issueDate.toLocaleDateString('en-GB'), // تنسيق التاريخ بالإنجليزية
        expiryDate: expiryDate.toLocaleDateString('en-GB'),
    };
}

// إنشاء رقم بطاقة تلقائي
let cardNumber = JSON.parse(localStorage.getItem('cardNumber')) || 1;

// عرض بيانات المستخدم
window.onload = function () {
    const user = JSON.parse(localStorage.getItem('currentUser')); // بيانات المستخدم الحالي

    if (user) {
        // إنشاء رقم تعريف وتواريخ تلقائية
        const uniqueId = generateUniqueId();
        const duration = 12; // فترة الانتهاء الافتراضية (12 شهرًا)
        const { issueDate, expiryDate } = generateDates(duration);

        // عرض البطاقة
        document.getElementById('preview-name').textContent = user.name;
        document.getElementById('unique-id').textContent = user.id;
        document.getElementById('gender').textContent = user.gender === 'male' ? 'ذكر' : 'أنثى';
        document.getElementById('nationality').textContent = user.nationality;
        document.getElementById('birthdate').textContent = user.birthdate;
        document.getElementById('issue-date').textContent = issueDate;
        document.getElementById('expiry-date').textContent = expiryDate;
        document.getElementById('identifier').textContent = uniqueId;
        document.getElementById('card-number').textContent = cardNumber;

        // إنشاء باركود لرقم التعريف
        JsBarcode("#barcode", uniqueId, {
            format: "CODE128",
            displayValue: true,
            fontSize: 16,
            lineColor: "#000",
            width: 2,
            height: 50,
        });

        // إضافة علامة مائية
        const cardElement = document
