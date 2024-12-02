// Selecionar elementos da interface
const profilePic = document.getElementById("profile-pic");
const uploadPic = document.getElementById("upload-pic");
const usernameInput = document.getElementById("username");
const musicPreference = document.getElementById("music-preference");
const saveButton = document.getElementById("save-profile");
const feedback = document.getElementById("user-feedback");

// Objeto para armazenar dados do usuário
let userProfile = {
    username: "Usuário Anônimo",
    profilePicture: "default-profile.png",
    musicPreference: ""
};

// Atualizar imagem de perfil
uploadPic.addEventListener("change", () => {
    const file = uploadPic.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profilePic.src = reader.result;
            userProfile.profilePicture = reader.result; // Salva a imagem no perfil do usuário
        };
        reader.readAsDataURL(file);
    }
});

// Salvar alterações no perfil
saveButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const genre = musicPreference.value;

    if (username) {
        userProfile.username = username;
    }

    if (genre) {
        userProfile.musicPreference = genre;
    }

    feedback.innerHTML = `
        <p><strong>Perfil Atualizado:</strong></p>
        <p>Nome: ${userProfile.username}</p>
        <p>Gênero Musical: ${userProfile.musicPreference || "Não especificado"}</p>
    `;
});
