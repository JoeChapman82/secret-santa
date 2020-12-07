(function() {

    if(document.getElementsByTagName('main') && document.getElementsByTagName('snowCanvas')) {
        var canvas = document.getElementById("snowCanvas");
        var ctx = canvas.getContext("2d");
        var angle = 0;
        var maxParticles = 80;
        var particles;

        function init() {
            var canvasGeometery = canvas.getBoundingClientRect();
            particles = [];
            canvas.width = canvasGeometery.width;
            canvas.height = canvasGeometery.height;
        
            for(var i = 0; i < maxParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 4 + 1,
                    density: Math.random() * maxParticles
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            particles.forEach(function(particle) {
                ctx.moveTo(particle.x, particle.y);
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI*2, true);
            });
            ctx.fill();
            update();
            requestAnimationFrame(draw);
        }
        
        function update() {
            angle += 0.01;
            particles.forEach(function(particle, index) {
                particle.y += Math.cos(angle + particle.density) + 1 + particle.radius / 2;
                particle.x += Math.sin(angle) * 2;
                if(particle.x > canvas.width + 5 || particle.x < -5 || particle.y > canvas.height) {
                    if(index % 3 > 0) {
                        particles[index] = {x: Math.random()*canvas.width, y: -10, radius: particle.radius, density: particle.density};
                    } else if(Math.sin(angle) > 0) {
                        particles[index] = {x: -5, y: Math.random()*canvas.height, radius: particle.radius, density: particle.density};
                    } else {
                        particles[index] = {x: canvas.width + 5, y: Math.random()*canvas.height, radius: particle.radius, density: particle.density};
                    }
                }
            });
        }
        
        init();
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', init);


})();

