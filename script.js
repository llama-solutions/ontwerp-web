// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all service items and sections
document.addEventListener('DOMContentLoaded', () => {
    const serviceItems = document.querySelectorAll('.service-item');
    const sections = document.querySelectorAll('section');
    
    serviceItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    sections.forEach(section => {
        const content = section.querySelector('.section-title, .about-text, .contact-info');
        if (content) {
            content.classList.add('fade-in');
            observer.observe(content);
        }
    });
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'var(--color-gold)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'var(--color-gold)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Add active class to current navigation item
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Slideshow gallery
document.addEventListener('DOMContentLoaded', () => {
    const slideshow = document.querySelector('.slideshow');
    if (!slideshow) return;

    const track = slideshow.querySelector('.slideshow-track');
    const slides = slideshow.querySelectorAll('.slideshow-slide');
    const dotsContainer = slideshow.querySelector('.slideshow-dots');
    const prevBtn = slideshow.querySelector('.slideshow-prev');
    const nextBtn = slideshow.querySelector('.slideshow-next');

    let currentIndex = 0;
    const total = slides.length;

    function goToSlide(index) {
        currentIndex = (index + total) % total;
        slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
        dotsContainer.querySelectorAll('.slideshow-dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slideshow-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    let autoplay = setInterval(() => goToSlide(currentIndex + 1), 5000);
    slideshow.addEventListener('mouseenter', () => clearInterval(autoplay));
    slideshow.addEventListener('mouseleave', () => { autoplay = setInterval(() => goToSlide(currentIndex + 1), 5000); });
});

// Translation system
const translations = {
    nl: {
        title: "SP Ontwerp - Alu Gevels Engineering en Technisch Advies",
        "nav.home": "Home",
        "nav.services": "Diensten",
        "nav.projects": "Projecten",
        "nav.about": "Over Ons",
        "nav.contact": "Contact",
        "hero.subtitle": "UW PARTNER VOOR GEVEL ENGINEERING",
        "hero.description": "Freelance bouwkundig tekenaar en BIM-Revit modelleur voor<br>schetsontwerpen, vergunningen en technische uitwerkingen.",
        "hero.cta": "Ontdek Onze Diensten",
        "services.title": "Alu Gevels Engineering en Technisch Advies",
        "services.subtitle": "Wat kan SP Ontwerp voor u verzorgen:",
        "services.item1": "Het afstemmen van de principe details met behulp van 2D tekenprogramma's Autocad en BricsCAD",
        "services.item2": "Het maken van het 3D productiemodel met behulp van 3D tekenprogramma Solidworks",
        "services.item3": "Het in stand houden van de communicatie met de klant via verschillende BIM omgevingen (dockstream, BIM360, Dalux, ACC)",
        "services.item4": "De specificaties maken",
        "services.item5": "De montage tekeningen maken",
        "services.item6": "De engineeringsplanning afstemmen",
        "services.item7": "Het 3D productiemodel omzetten naar de cnc machines middels step files en dxf files",
        "services.item8": "Werkvoorbereider CNC machine 5 axis",
        "services.item9": "Maken van de STEP files van uw bestaande 2D tekening",
        "services.item10": "2D 3D engineering van uw plaatwerk (composiet, vlakke aluminium, RVS, honingraad)",
        "services.item11": "2D 3D engineering van uw geperst aluminium gevel",
        "services.item12": "2D 3D engineering van uw stalen roosters",
        "services.item13": "2D 3D engineering van uw vliesgevels",
        "services.item14": "2D 3D engineering van uw geventileerde gevels (eternit, trespa)",
        "projects.title": "Projecten",
        "about.title": "Over SP Ontwerp",
        "about.intro": "In 20 jaar ervaring heb ik gewerkt met verschillende materialen/producten. Zoals: lichte staalconstructie, stalen roosters, vlakke aluminium plaat, geperst aluminium, aluminium balkons, RVS, RVS composiet, composiet (Alucobond, Larson), honingraad, eternit, vliesgevels.",
        "about.mission": "Onze missie is om hoogwaardige engineering en technisch advies te leveren voor alu gevels en gevelsystemen. Met jarenlange ervaring en expertise in BIM-modellering, 3D engineering en productie, zijn wij uw betrouwbare partner voor complexe gevelprojecten.",
        "contact.title": "Contact en Adres",
        "contact.address": "Adres",
        "contact.vat": "BTW nr.",
        "contact.phone": "Telefoon",
        "contact.email": "E-mail",
        "contact.note": "Afspraak op adres is mogelijk.",
        "footer.copyright": "© 2026 SP Ontwerp. Alle rechten voorbehouden."
    },
    en: {
        title: "SP Ontwerp - Aluminum Facades Engineering and Technical Advice",
        "nav.home": "Home",
        "nav.services": "Services",
        "nav.projects": "Projects",
        "nav.about": "About Us",
        "nav.contact": "Contact",
        "hero.subtitle": "YOUR PARTNER FOR FACADE ENGINEERING",
        "hero.description": "Freelance architectural draftsman and BIM-Revit modeler for<br>sketch designs, permits and technical elaborations.",
        "hero.cta": "Discover Our Services",
        "services.title": "Aluminum Facades Engineering and Technical Advice",
        "services.subtitle": "What can SP Ontwerp provide for you:",
        "services.item1": "Coordinating principle details using 2D drawing programs Autocad and BricsCAD",
        "services.item2": "Creating the 3D production model using 3D drawing program Solidworks",
        "services.item3": "Maintaining communication with the client via various BIM environments (dockstream, BIM360, Dalux, ACC)",
        "services.item4": "Creating the specifications",
        "services.item5": "Creating the assembly drawings",
        "services.item6": "Coordinating the engineering planning",
        "services.item7": "Converting the 3D production model to CNC machines via step files and dxf files",
        "services.item8": "Work preparer CNC machine 5 axis",
        "services.item9": "Creating STEP files from your existing 2D drawing",
        "services.item10": "2D 3D engineering of your sheet metal (composite, flat aluminum, stainless steel, honeycomb)",
        "services.item11": "2D 3D engineering of your pressed aluminum facade",
        "services.item12": "2D 3D engineering of your steel gratings",
        "services.item13": "2D 3D engineering of your curtain walls",
        "services.item14": "2D 3D engineering of your ventilated facades (eternit, trespa)",
        "projects.title": "Projects",
        "about.title": "About SP Ontwerp",
        "about.intro": "In 20 years of experience, I have worked with various materials/products. Such as: light steel construction, steel gratings, flat aluminum sheet, pressed aluminum, aluminum balconies, stainless steel, stainless steel composite, composite (Alucobond, Larson), honeycomb, eternit, curtain walls.",
        "about.mission": "Our mission is to deliver high-quality engineering and technical advice for aluminum facades and facade systems. With years of experience and expertise in BIM modeling, 3D engineering and production, we are your reliable partner for complex facade projects.",
        "contact.title": "Contact and Address",
        "contact.address": "Address",
        "contact.vat": "VAT no.",
        "contact.phone": "Phone",
        "contact.email": "Email",
        "contact.note": "Appointment at address is possible.",
        "footer.copyright": "© 2026 SP Ontwerp. All rights reserved."
    }
};

// Get current language from localStorage or default to Dutch
let currentLang = localStorage.getItem('language') || 'nl';

// Function to change language
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update page title
    document.title = translations[lang].title;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLang);
    
    // Add event listeners to language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
});
