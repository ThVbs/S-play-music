function criarConta() {
    const videoContainer = document.getElementById('video-container');
    const formContainer = document.getElementById('container-box2');
    const video = document.getElementById('confirmacao-video');

    
    formContainer.classList.add('hidden');
    
    
    videoContainer.style.display = 'block';
    
    
    video.play();
    
    
    video.onended = function() {
        window.location.href = '../screens/index.html';  
    };
}
