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

        // حفظ رقم التعريف في بيانات المستخدم
        user.identifier = uniqueId;
        localStorage.setItem('currentUser', JSON.stringify(user));

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
        const cardElement = document.querySelector('.card');
        const watermark = document.createElement('div');
        watermark.textContent = 'VALID';
        watermark.classList.add('watermark');
        cardElement.appendChild(watermark);

        // إضافة شرطات على الزوايا
        const cornerStripes = document.createElement('div');
        cornerStripes.classList.add('corner-stripes');
        cardElement.appendChild(cornerStripes);
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

// تجديد البطاقة
document.getElementById('renew-card').addEventListener('click', function () {
    const user = JSON.parse(localStorage.getItem('currentUser')); // بيانات المستخدم الحالي
    if (!user) return;

    cardNumber++; // زيادة رقم البطاقة
    localStorage.setItem('cardNumber', JSON.stringify(cardNumber)); // حفظ رقم البطاقة
    const uniqueId = generateUniqueId(); // إنشاء رقم تعريف جديد
    const duration = 12; // فترة الانتهاء الافتراضية (12 شهرًا)
    const { issueDate, expiryDate } = generateDates(duration);

    // تحديث بيانات المستخدم
    user.identifier = uniqueId;
    localStorage.setItem('currentUser', JSON.stringify(user));

    // تحديث البطاقة
    document.getElementById('identifier').textContent = uniqueId;
    document.getElementById('issue-date').textContent = issueDate;
    document.getElementById('expiry-date').textContent = expiryDate;
    document.getElementById('card-number').textContent = cardNumber;

    // تحديث الباركود
    JsBarcode("#barcode", uniqueId, {
        format: "CODE128",
        displayValue: true,
        fontSize: 16,
        lineColor: "#000",
        width: 2,
        height: 50,
    });
});

// زر تسجيل الدخول
document.getElementById('login-button').addEventListener('click', function () {
    window.location.href = 'index.html'; // توجيه المستخدم إلى صفحة تسجيل الدخول
});
