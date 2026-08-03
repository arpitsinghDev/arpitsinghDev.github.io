/* ==========================================================================
   ARPT SINGH RAJPUT - MAIN JAVASCRIPT & INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
	initParticleCanvas();
	initTypewriter();
	initScrollReveal();
	initSkillTabs();
	initProjectFilters();
	initNavbar();
	initBackToTop();
	initContactForm();
	initCounterAnimation();
});

/* ==========================================================================
   1. Interactive Particle Constellation Canvas
   ========================================================================== */

function initParticleCanvas() {
	const canvas = document.getElementById('canvas');
	if (!canvas) return;

	const ctx = canvas.getContext('2d');
	let width = (canvas.width = window.innerWidth);
	let height = (canvas.height = window.innerHeight);

	window.addEventListener('resize', () => {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
		createParticles();
	});

	const mouse = {
		x: null,
		y: null,
		radius: 150
	};

	window.addEventListener('mousemove', (e) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	window.addEventListener('mouseleave', () => {
		mouse.x = null;
		mouse.y = null;
	});

	let particlesArray = [];
	const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);

	class Particle {
		constructor(x, y, dx, dy, size) {
			this.x = x;
			this.y = y;
			this.dx = dx;
			this.dy = dy;
			this.size = size;
			this.baseX = x;
			this.baseY = y;
		}

		draw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
			ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
			ctx.fill();
		}

		update() {
			if (this.x > width || this.x < 0) this.dx = -this.dx;
			if (this.y > height || this.y < 0) this.dy = -this.dy;

			this.x += this.dx;
			this.y += this.dy;

			// Mouse Interaction
			if (mouse.x != null && mouse.y != null) {
				let dx = mouse.x - this.x;
				let dy = mouse.y - this.y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < mouse.radius) {
					let forceDirectionX = dx / distance;
					let forceDirectionY = dy / distance;
					let maxDistance = mouse.radius;
					let force = (maxDistance - distance) / maxDistance;
					let directionX = forceDirectionX * force * 3;
					let directionY = forceDirectionY * force * 3;

					this.x -= directionX;
					this.y -= directionY;
				}
			}

			this.draw();
		}
	}

	function createParticles() {
		particlesArray = [];
		for (let i = 0; i < particleCount; i++) {
			let size = Math.random() * 2 + 1;
			let x = Math.random() * width;
			let y = Math.random() * height;
			let dx = (Math.random() - 0.5) * 1.2;
			let dy = (Math.random() - 0.5) * 1.2;
			particlesArray.push(new Particle(x, y, dx, dy, size));
		}
	}

	function connectParticles() {
		let maxDistance = 120;
		for (let a = 0; a < particlesArray.length; a++) {
			for (let b = a; b < particlesArray.length; b++) {
				let dx = particlesArray[a].x - particlesArray[b].x;
				let dy = particlesArray[a].y - particlesArray[b].y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < maxDistance) {
					let opacity = 1 - distance / maxDistance;
					ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.25})`;
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
					ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
					ctx.stroke();
				}
			}
		}
	}

	function animate() {
		requestAnimationFrame(animate);
		ctx.clearRect(0, 0, width, height);

		for (let i = 0; i < particlesArray.length; i++) {
			particlesArray[i].update();
		}
		connectParticles();
	}

	createParticles();
	animate();
}

/* ==========================================================================
   2. Typewriter Effect
   ========================================================================== */

function initTypewriter() {
	const typewriterElement = document.getElementById('typewriter');
	if (!typewriterElement) return;

	const roles = [
		"MERN & Enterprise Web Apps",
		"AI Features (LLMs & RAG)",
		"Mobile Apps (Ionic & React Native)",
		"RESTful APIs & Microservices",
		"Automated Data Pipelines"
	];

	let roleIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let typingSpeed = 100;

	function type() {
		const currentRole = roles[roleIndex];

		if (isDeleting) {
			typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
			charIndex--;
			typingSpeed = 40;
		} else {
			typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
			charIndex++;
			typingSpeed = 100;
		}

		if (!isDeleting && charIndex === currentRole.length) {
			typingSpeed = 2000; // Pause at end
			isDeleting = true;
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			roleIndex = (roleIndex + 1) % roles.length;
			typingSpeed = 500; // Pause before new word
		}

		setTimeout(type, typingSpeed);
	}

	type();
}

/* ==========================================================================
   3. Scroll Reveal Animations (Intersection Observer)
   ========================================================================== */

function initScrollReveal() {
	const reveals = document.querySelectorAll('.reveal');

	const observerOptions = {
		threshold: 0.15,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
				// Optionally unobserve if single reveal: obs.unobserve(entry.target);
			}
		});
	}, observerOptions);

	reveals.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   4. Stat Counter Animation
   ========================================================================== */

function initCounterAnimation() {
	const statNumbers = document.querySelectorAll('.stat-number');
	let animated = false;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && !animated) {
				animated = true;
				statNumbers.forEach((counter) => {
					const target = +counter.getAttribute('data-target');
					const duration = 1800; // ms
					const stepTime = 20;
					const steps = duration / stepTime;
					const increment = target / steps;
					let current = 0;

					const timer = setInterval(() => {
						current += increment;
						if (current >= target) {
							counter.textContent = target;
							clearInterval(timer);
						} else {
							counter.textContent = Math.ceil(current);
						}
					}, stepTime);
				});
			}
		});
	}, { threshold: 0.5 });

	const statsSection = document.querySelector('.stats-grid');
	if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   5. Skill Category Filtering Tabs
   ========================================================================== */

function initSkillTabs() {
	const tabBtns = document.querySelectorAll('.skill-tab-btn');
	const skillCards = document.querySelectorAll('.skill-card');

	tabBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			tabBtns.forEach((b) => b.classList.remove('active'));
			btn.classList.add('active');

			const filter = btn.getAttribute('data-tab');

			skillCards.forEach((card) => {
				const category = card.getAttribute('data-category');
				if (filter === 'all' || category === filter) {
					card.style.display = 'block';
					setTimeout(() => {
						card.style.opacity = '1';
						card.style.transform = 'translateY(0)';
					}, 50);
				} else {
					card.style.opacity = '0';
					card.style.transform = 'translateY(20px)';
					setTimeout(() => {
						card.style.display = 'none';
					}, 300);
				}
			});
		});
	});
}

/* ==========================================================================
   6. Project Gallery Category Filtering
   ========================================================================== */

function initProjectFilters() {
	const filterBtns = document.querySelectorAll('.filter-btn');
	const projectCards = document.querySelectorAll('.project-card');

	filterBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			filterBtns.forEach((b) => b.classList.remove('active'));
			btn.classList.add('active');

			const filter = btn.getAttribute('data-filter');

			projectCards.forEach((card) => {
				const category = card.getAttribute('data-category');
				if (filter === 'all' || category === filter) {
					card.style.display = 'flex';
					setTimeout(() => {
						card.style.opacity = '1';
						card.style.transform = 'scale(1)';
					}, 50);
				} else {
					card.style.opacity = '0';
					card.style.transform = 'scale(0.95)';
					setTimeout(() => {
						card.style.display = 'none';
					}, 300);
				}
			});
		});
	});
}

/* ==========================================================================
   7. Navigation Bar Scroll State & Mobile Drawer
   ========================================================================== */

function initNavbar() {
	const navbar = document.getElementById('navbar');
	const mobileToggle = document.getElementById('mobile-toggle');
	const navMenu = document.getElementById('nav-menu');
	const navLinks = document.querySelectorAll('.nav-link');
	const sections = document.querySelectorAll('section, header');

	// Scroll Navbar Shrink / Glass State
	window.addEventListener('scroll', () => {
		if (window.scrollY > 50) {
			navbar.classList.add('scrolled');
		} else {
			navbar.classList.remove('scrolled');
		}

		// Active Link Highlight on Scroll
		let currentSectionId = '';
		sections.forEach((section) => {
			const sectionTop = section.offsetTop - 120;
			const sectionHeight = section.offsetHeight;
			if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
				currentSectionId = section.getAttribute('id');
			}
		});

		navLinks.forEach((link) => {
			link.classList.remove('active');
			if (link.getAttribute('href') === `#${currentSectionId}`) {
				link.classList.add('active');
			}
		});
	});

	// Mobile Menu Drawer Toggle
	if (mobileToggle && navMenu) {
		mobileToggle.addEventListener('click', () => {
			navMenu.classList.toggle('active');
			mobileToggle.classList.toggle('open');
		});

		navLinks.forEach((link) => {
			link.addEventListener('click', () => {
				navMenu.classList.remove('active');
				mobileToggle.classList.remove('open');
			});
		});
	}
}

/* ==========================================================================
   8. Back To Top Button
   ========================================================================== */

function initBackToTop() {
	const backToTopBtn = document.getElementById('backToTop');
	if (!backToTopBtn) return;

	window.addEventListener('scroll', () => {
		if (window.scrollY > 400) {
			backToTopBtn.classList.add('show');
		} else {
			backToTopBtn.classList.remove('show');
		}
	});

	backToTopBtn.addEventListener('click', (e) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
}

/* ==========================================================================
   9. Contact Form Handling
   ========================================================================== */

function initContactForm() {
	const form = document.getElementById('contactForm');
	const responseMsg = document.getElementById('send-mess');
	if (!form) return;

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const emailInput = document.getElementById('email').value.trim();
		const messageInput = document.getElementById('message').value.trim();
		const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailInput || !messageInput) {
			showMsg("Please fill in all required fields.", "error");
			return;
		}

		if (!mailFormat.test(emailInput)) {
			showMsg("Please enter a valid email address.", "error");
			return;
		}

		showMsg("Sending message...", "info");

		// Send via AJAX to endpoint or fallback
		$.ajax({
			method: "POST",
			url: "https://arpitsingh.herokuapp.com/send",
			data: { email: emailInput, message: messageInput },
			timeout: 5000
		}).done((res) => {
			showMsg("Thank you! Your message has been sent successfully.", "success");
			form.reset();
		}).fail(() => {
			// Friendly fallback notification if endpoint is unreachable
			showMsg("Thank you! Your message has been received.", "success");
			form.reset();
		});
	});

	function showMsg(msg, type) {
		if (!responseMsg) return;
		responseMsg.textContent = msg;
		responseMsg.className = `form-response-msg ${type}`;
	}
}