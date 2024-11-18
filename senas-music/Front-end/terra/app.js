let scene;
let camera;
let renderer;

function main() {
    const canvas = document.querySelector('#c');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.autoClear = false;
    renderer.setClearColor(0x00000, 0.0);

    // create earth geometry
    const earthgeometry = new THREE.SphereGeometry(0.6, 32, 32);

    const earthmaterial = new THREE.MeshPhongMaterial({
        roughness: 1,
        metalness: 0,
        map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('texture/earthbump.jpg'),
        bumpScale: 0.3,
    });

    const earthmesh = new THREE.Mesh(earthgeometry, earthmaterial);
    scene.add(earthmesh);

    // set ambient light
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientlight);

    // set point light
    const pointerlight = new THREE.PointLight(0xffffff, 0.9);
    pointerlight.position.set(5, 3, 5);
    scene.add(pointerlight);

    // cloud
    const cloudgeometry = new THREE.SphereGeometry(0.63, 32, 32);

    const cloudmaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
        transparent: true
    });

    const cloudmesh = new THREE.Mesh(cloudgeometry, cloudmaterial);
    scene.add(cloudmesh);

    // star
    const stargeometry = new THREE.SphereGeometry(80, 64, 64);

    const starmaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('texture/galaxy.png'),
        side: THREE.BackSide
    });

    const starmesh = new THREE.Mesh(stargeometry, starmaterial);
    scene.add(starmesh);

    const contentElement = document.createElement('div');
    contentElement.id = 'content';
    contentElement.style.position = 'absolute';
    contentElement.style.top = '10px';
    contentElement.style.left = '10px';
    contentElement.style.color = '#fff';
    contentElement.style.display = 'none';
    contentElement.innerHTML = `
        <img id="image" src="" style="max-width: 200px; display: block;" />
        <p id="song" style="margin: 10px 0 0;">Song Name</p>
    `;
    document.body.appendChild(contentElement);

    let contentShown = false;

    const animate = () => {
        requestAnimationFrame(animate);

        earthmesh.rotation.y -= 0.0020; // Velocidade de rotação da Terra
        cloudmesh.rotation.y += 0.0015;
        starmesh.rotation.y += 0.0005;

        const targetRotation = -Math.PI / 2; // Aproximadamente onde está Portugal no eixo Y
        if (!contentShown && Math.abs(earthmesh.rotation.y - targetRotation) < 0.01) {
            contentShown = true;
            displayContent();
        }

        render();
    };

    const render = () => {
        renderer.render(scene, camera);
    };

    const displayContent = () => {
        const content = document.getElementById('content');
        const image = document.getElementById('image');
        const song = document.getElementById('song');

        image.src = 'images/acdc.png'; // Substitua pelo caminho da imagem desejada
        song.textContent = 'Back in Black - AC/DC'; // Substitua pelo nome da música desejada

        content.style.display = 'block';
    };

    animate();
}

window.onload = main;
