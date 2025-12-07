
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

if (menu) {
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navlist.classList.toggle('open');
    };
}


document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navlist.classList.remove('open');
    });
});

var typed = new Typed(".typing", {
    strings: ["Backend Engineer", "Full Stack Developer", "Computer Engineer"],
    typeSpeed: 100,
    backSpeed: 80,
    loop: true
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


function animateProgressRings() {
    const progressRings = document.querySelectorAll('.progress-ring');
    
    progressRings.forEach(ring => {
        const value = ring.getAttribute('data-value');
        const circumference = 2 * Math.PI * 40; 
        const offset = circumference - (value / 100) * circumference;
        
        ring.innerHTML = `
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e0e0e0" stroke-width="8"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#4a6fa5" stroke-width="8" 
                        stroke-dasharray="${circumference}" 
                        stroke-dashoffset="${circumference}"
                        stroke-linecap="round"
                        transform="rotate(-90 50 50)"/>
                <text x="50" y="55" text-anchor="middle" font-size="16" fill="#333" font-weight="bold">${value}%</text>
            </svg>
        `;
        
      
        setTimeout(() => {
            const circle = ring.querySelector('circle:nth-child(2)');
            circle.style.transition = 'stroke-dashoffset 1.5s ease';
            circle.style.strokeDashoffset = offset;
        }, 300);
    });
}


const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressRings();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


const softSkillsSection = document.querySelector('.soft-skills-section');
if (softSkillsSection) {
    observer.observe(softSkillsSection);
}


const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
  
        const submitBtn = this.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.loading-spinner');
        const formResult = document.getElementById('form-result');
        
   
        const originalText = btnText.textContent;
        btnText.textContent = 'SENDING...';
        spinner.style.display = 'inline-block';
        submitBtn.disabled = true;
        
   
        if (formResult) {
            formResult.innerHTML = '';
            formResult.className = 'form-message';
        }
        
  
        const botcheck = this.querySelector('input[name="botcheck"]');
        if (botcheck) botcheck.checked = false;
        
        try {
            const formData = new FormData(this);
            
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            
            const json = await response.json();
            
            if (json.success) {
              
                if (formResult) {
                    formResult.innerHTML = " Thank you! Your message has been sent successfully. I'll get back to you soon.";
                    formResult.className = 'form-message success';
                }
                
              
                this.reset();
                
             
                setTimeout(() => {
                    if (formResult) {
                        formResult.innerHTML = '';
                        formResult.className = 'form-message';
                    }
                }, 5000);
            } else {
              
                if (formResult) {
                    formResult.innerHTML =  (json.message || "Please try again.");
                    formResult.className = 'form-message error';
                }
            }
        } catch (error) {
         
            console.error("Form submission error:", error);
            
            if (formResult) {
                formResult.innerHTML = "Network error. Please check your connection and try again.";
                formResult.className = 'form-message error';
            }
        } finally {
            
            btnText.textContent = originalText;
            spinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}


    
  
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.style.display = 'none';
    }



window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});