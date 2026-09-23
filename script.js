let current=0;
const pages=[...document.querySelectorAll('.page')],dots=[...document.querySelectorAll('.progress i')];
function goTo(n){if(n<0)n=pages.length-1;if(n>=pages.length)n=0;pages[current].classList.remove('active');current=n;pages[current].classList.add('active');dots.forEach((d,i)=>d.classList.toggle('active',i===current));burst(current===5?24:7)}
function burst(n=6){const box=document.getElementById('hearts');for(let i=0;i<n;i++){let x=document.createElement('div');x.className='heart';x.textContent=['♡','♥','💗','✨'][Math.floor(Math.random()*4)];x.style.left=Math.random()*100+'%';x.style.bottom='-20px';x.style.animationDuration=(3+Math.random()*4)+'s';x.style.fontSize=(12+Math.random()*18)+'px';box.appendChild(x);setTimeout(()=>x.remove(),7500)}}
setInterval(()=>burst(2),2500);burst(12);
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();goTo(current+1);startMusic()}if(e.key==='ArrowLeft')goTo(current-1)});
let sx=0;document.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});document.addEventListener('touchend',e=>{let dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>70)goTo(current+(dx<0?1:-1))},{passive:true});


const song=document.getElementById('birthdaySong');
const musicBtn=document.getElementById('musicBtn');

function updateMusicButton(){
  musicBtn.innerHTML=song.paused?'♫ <span>Play music</span>':'♫ <span>Music playing</span>';
}
function toggleMusic(){
  if(song.paused){
    song.play().then(updateMusicButton).catch(updateMusicButton);
  }else{
    song.pause(); updateMusicButton();
  }
}
song.addEventListener('play',updateMusicButton);
song.addEventListener('pause',updateMusicButton);

// Ask the browser to begin at the very start as soon as the page loads.
// Browsers that block audible autoplay will require one normal tap/click.
window.addEventListener('load',()=>{
  song.currentTime=0;
  song.play().catch(()=>updateMusicButton());
});
