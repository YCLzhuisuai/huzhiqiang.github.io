// AI粒子动画效果
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `rgba(46, 204, 113, ${Math.random() * 0.5 + 0.2})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 初始化粒子系统
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    document.getElementById('particles').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
}

// 技能进度条动画
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width') || '0%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        bar.setAttribute('data-width', width);
        observer.observe(bar);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initSkillBars();
}); 