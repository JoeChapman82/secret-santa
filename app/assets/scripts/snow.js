!function(){if(document.getElementsByTagName("main")&&document.getElementsByTagName("snowCanvas")){var t,i=document.getElementById("snowCanvas"),a=i.getContext("2d"),e=0;function n(){var a=i.getBoundingClientRect();t=[],i.width=a.width,i.height=a.height;for(var e=0;e<80;e++)t.push({x:Math.random()*i.width,y:Math.random()*i.height,radius:4*Math.random()+1,density:80*Math.random()})}n(),requestAnimationFrame((function n(){a.clearRect(0,0,i.width,i.height),a.fillStyle="rgba(255, 255, 255, 0.8)",a.beginPath(),t.forEach((function(t){a.moveTo(t.x,t.y),a.arc(t.x,t.y,t.radius,0,2*Math.PI,!0)})),a.fill(),e+=.01,t.forEach((function(a,n){a.y+=Math.cos(e+a.density)+1+a.radius/2,a.x+=2*Math.sin(e),(a.x>i.width+5||a.x<-5||a.y>i.height)&&(n%3>0?t[n]={x:Math.random()*i.width,y:-10,radius:a.radius,density:a.density}:Math.sin(e)>0?t[n]={x:-5,y:Math.random()*i.height,radius:a.radius,density:a.density}:t[n]={x:i.width+5,y:Math.random()*i.height,radius:a.radius,density:a.density})})),requestAnimationFrame(n)}))}window.addEventListener("resize",n)}();