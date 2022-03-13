import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { DoubleSide, LoopOnce, SphereGeometry, TextureLoader } from 'three'
import CANNON, { Sphere } from 'cannon'
import $ from "./Jquery"
import gsap from "gsap";

// gsap.to(teaset.children[8].rotation,{duration:1,x:Math.PI*.25})
// gsap.to(teaset.children[8].position,{duration:1,z:1.5})
// gsap.to(teaset.children[8].position,{duration:1,y:.4})

const textureLoader = new THREE.TextureLoader()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//raycaster
const raycaster = new THREE.Raycaster()

//cannon

const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true
world.gravity.set(0, - 9.82, 0)

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 30,
        restitution: 0.1
    }
)

 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
})

const randomColors = [new THREE.Color("orange"), new THREE.Color("AFFF33"), new THREE.Color( "33BEFF"), new THREE.Color("3C21A9")]

const selectMaterial = new THREE.MeshStandardMaterial({color:'white'})
const ukraineMateriall = new THREE.HemisphereLight(new THREE.Color("blue"), new THREE.Color("yellow"),.5)
scene.add(ukraineMateriall)

const mouse = new THREE.Vector2()
mouse.x = null
mouse.y=null
mouse.y2 = null

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
    mouse.y2 =-(event.clientY / sizes.height)    
})

let mousePrev={
    x:0,
    y:0
}
const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)
let mixer
let flagTrigger="off";
let colorInside2
let colorOutside2
let colorInside3
let colorOutside3
let zelenskyPoints2
let zelenskyPoints
let zelenskyGeo
let zelenskyObject
let zelenskyObject2
let zelenskyStatue
let FlagPoints
let flagScene
let flagPoints
let flagGeo
let flagMesh
let zelensky1
let throttle="on"

const waveFlag = function(mouse){
    var tempMouse = mouse
    let count = flagMesh.geometry.attributes.position.count
    if(tempMouse.y>mousePrev.y&&throttle=="on"){
        throttle="off"
        for(let i=0; i<count; i++){
            setTimeout(() => {
            const pos = {
                x : zelenskyObject2.geometry.attributes.position.array[i],
                y : zelenskyObject2.geometry.attributes.position.array[i+1],
                z : zelenskyObject2.geometry.attributes.position.array[i+2]
            }
        gsap.to(pos,{
            x: pos.x,
            y: pos.y+4,
            z: pos.z,
            duration: .2,
            onUpdate: function () { 
                zelenskyObject2.geometry.attributes.position.array[i] = pos.x;
                zelenskyObject2.geometry.attributes.position.array[i+1]=pos.y;
                zelenskyObject2.geometry.attributes.position.array[i+2] = pos.z;  
                zelenskyObject2.geometry.attributes.position.needsUpdate = true  
            }.bind(this)
        })
}, i);
}
setTimeout(() => {
    throttle="on"
}, 10);
}
else if(tempMouse.y<mousePrev.y&&throttle=="on"){
    throttle="off"
    for(let i=0; i<count; i++){
        // setTimeout(() => {
        const pos = {
            x : zelenskyObject2.geometry.attributes.position.array[i],
            y : zelenskyObject2.geometry.attributes.position.array[i+1],
            z : zelenskyObject2.geometry.attributes.position.array[i+2]
        }
    gsap.to(pos,{
        x: pos.x,
        y: pos.y-4,
        z: pos.z,
        duration: .2,
        onUpdate: function () {
            zelenskyObject2.geometry.attributes.position.array[i] = pos.x;
            zelenskyObject2.geometry.attributes.position.array[i+1]=pos.y;
            zelenskyObject2.geometry.attributes.position.array[i+2] = pos.z;
            zelenskyObject2.geometry.attributes.position.needsUpdate = true
        }.bind(this)
})
}
setTimeout(() => {
    throttle="on"
}, 10);
}}

const movedots = function (){
    console.log(zelenskyObject2.geometry.attributes)
if(zelenskyObject2&&flagMesh){
    console.log("movedots")
let count = flagMesh.geometry.attributes.position.count
for(let i=0; i<count; i++){
    const pos = {
        x : zelenskyObject2.geometry.attributes.position.array[i],
        y : zelenskyObject2.geometry.attributes.position.array[i+1],
        z : zelenskyObject2.geometry.attributes.position.array[i+2]
    }
    gsap.to(pos,{
        x: flagPoints[i],
        y: flagPoints[i+1],
        z: flagPoints[i+2],
        duration: 3,
        onUpdate: function () {
            zelenskyObject2.geometry.attributes.position.array[i] = pos.x;
            zelenskyObject2.geometry.attributes.position.array[i+1] = pos.y;
            zelenskyObject2.geometry.attributes.position.array[i+2] = pos.z;
            zelenskyObject2.geometry.attributes.position.needsUpdate = true
        }.bind(this)
    })
 


}
setTimeout(() => {
    for(let i=0; i<count; i++){

        if(zelenskyObject2.geometry.attributes.position.getY(i)<0){
           zelenskyObject2.geometry.attributes.color.array[i*3]=1
           zelenskyObject2.geometry.attributes.color.array[i*3+1]=1
           zelenskyObject2.geometry.attributes.color.array[i*3+2]=0
       }
       else{
           zelenskyObject2.geometry.attributes.color.array[i*3]=0
           zelenskyObject2.geometry.attributes.color.array[i*3+1]=0
           zelenskyObject2.geometry.attributes.color.array[i*3+2]=1
       }
       }
       zelenskyObject2.geometry.attributes.color.needsUpdate = true
       setTimeout(() => {
        for(let i=0; i<count; i++){
    
            if(zelenskyObject2.geometry.attributes.position.getY(i)<0){
               zelenskyObject2.geometry.attributes.color.array[i*3]=1
               zelenskyObject2.geometry.attributes.color.array[i*3+1]=1
               zelenskyObject2.geometry.attributes.color.array[i*3+2]=0
           }
           else{
               zelenskyObject2.geometry.attributes.color.array[i*3]=0
               zelenskyObject2.geometry.attributes.color.array[i*3+1]=0
               zelenskyObject2.geometry.attributes.color.array[i*3+2]=2
           }
           }
           zelenskyObject2.geometry.attributes.color.needsUpdate = true
    }, 500);
    if(zelensky1&&zelenskyObject2){
        gsap.to(zelensky1.rotation,{duration:1, y:0})
        gsap.to(zelenskyObject2.rotation,{duration:1, y:0})
    
    }
        
    // zelenskyObject2.geometry.attributes.position.sort(() => parseFloat(zelenskyObject2.geometry.attributes.position.getY()) );
    flagTrigger="on"

}, 1500);
}}

const movedotsBack = function (){
    console.log(zelenskyObject2.geometry.attributes)
if(zelenskyObject2&&flagMesh&&zelensky1){
    console.log("movedotsback")
let count = flagMesh.geometry.attributes.position.count
for(let i=0; i<count; i++){
       const pos = {
        x : zelenskyObject2.geometry.attributes.position.array[i],
        y : zelenskyObject2.geometry.attributes.position.array[i+1],
        z : zelenskyObject2.geometry.attributes.position.array[i+2]
    }
    gsap.to(pos,{
        x: zelenskyPoints2[i],
        y: zelenskyPoints2[i+1],
        z: zelenskyPoints2[i+2],
        duration: 3,
        onUpdate: function () {
            zelenskyObject2.geometry.attributes.position.array[i] = pos.x;
            zelenskyObject2.geometry.attributes.position.array[i+1] = pos.y;
            zelenskyObject2.geometry.attributes.position.array[i+2] = pos.z;
            zelenskyObject2.geometry.attributes.position.needsUpdate = true
        }.bind(this)
    })
}
flagTrigger="off"
}
}

// gsap.to( teaset.children[11].position,{duration:.3,y:1})
$("canvas").click(()=>{
   
    if(flagTrigger=="off"){
        movedots()
        
        }else{
            movedotsBack()
           
            }
    })

let pixleMaterial = new THREE.PointsMaterial({
    color:"pink",
    size:.05,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})
let pixleMateriallarge = new THREE.PointsMaterial({
    color:"pink",
    size:.02,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})

gltfLoader.load(
    '/models/zelensky.glb',
    (gltf) =>
    {
        zelensky1=gltf.scene
        selectMaterial.side=DoubleSide;
        zelenskyPoints2 = zelensky1.children[0].geometry.attributes.position.array;     
        zelensky1.traverse((child) =>
        {
            child.material = selectMaterial
        })       
        zelensky1.scale.set(2,2,2)
        console.log("zelensky1", zelensky1)
        scene.add(zelensky1)
    }
)
gltfLoader.load(
    '/models/zelensky.glb',
    (gltf) =>
    {let zelensky2=gltf.scene
        zelenskyPoints = zelensky2.children[0].geometry.attributes.position.array;
        console.log(zelenskyPoints)
        const colorInside = new THREE.Color('blue')
        const colorOutside = new THREE.Color('yellow')
        colorInside2 = new THREE.Color('green')
        colorOutside2 = new THREE.Color('yellow')
        zelenskyGeo = new THREE.BufferGeometry;
        zelenskyGeo.setAttribute(
            'position',
            new THREE.BufferAttribute(zelenskyPoints,3)
        )
        let backupcolors=new Float32Array(zelenskyPoints.length * 3)
        for(let i = 0; i < zelenskyPoints.length; i++)
        {
            var i3 = i * 3
            var mixedColor=colorInside.clone()
            mixedColor.lerp(colorOutside2, zelensky2.children[0].geometry.attributes.position.array[i3+1]/2+.5)
            backupcolors[i3    ] = mixedColor.r
            backupcolors[i3 + 1] = mixedColor.g
            backupcolors[i3 + 2] = mixedColor.b
        }
        zelenskyGeo.setAttribute('color', new THREE.BufferAttribute(backupcolors,3))
        zelenskyObject2 = new THREE.Points(zelenskyGeo, pixleMaterial)        
        zelenskyObject2.scale.set(2,2,2)            
    let count = zelenskyPoints.length
    console.log(zelenskyObject2)

    for(let i=0; i<count; i++){

             if(zelenskyObject2.geometry.attributes.position.getX(i)<0){
                zelenskyObject2.geometry.attributes.color.array[i*3]=1
                zelenskyObject2.geometry.attributes.color.array[i*3+1]=1
                zelenskyObject2.geometry.attributes.color.array[i*3+2]=0
            }
            else{
                zelenskyObject2.geometry.attributes.color.array[i*3]=0
                zelenskyObject2.geometry.attributes.color.array[i*3+1]=0
                zelenskyObject2.geometry.attributes.color.array[i*3+2]=1

            }
            }
        
        scene.add(zelenskyObject2)
    }
)

$("canvas").mousemove(()=>{

waveFlag(mouse)
console.log('mouse',mouse)
})
gltfLoader.load(
    '/models/flag.glb',
    (gltf) =>
    {
        let flagScene=gltf.scene
        console.log(flagScene)
        flagPoints = flagScene.children[1].geometry.attributes.position.array;
        console.log(flagScene) 
        flagGeo = new THREE.BufferGeometry;
        
        flagGeo.setAttribute(
            'position',
            new THREE.BufferAttribute(flagPoints,3)
        )
        console.log(mixer)        
        flagMesh = new THREE.Points(flagGeo, pixleMaterial)
        console.log(flagMesh)

    }
)


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('orange', .1)
const directionalLight = new THREE.DirectionalLight('#F5F5DC', 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 5, 5, 3)
scene.add(directionalLight)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
if(sizes.width>860){
camera.position.set(0, 0, 20)
}
else{
    camera.position.set(0, 0,20)
}


scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setClearColor( 'black',.5);

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

raycaster.setFromCamera(mouse, camera)

    

/**
 * Animate
 */

let oldElapsedTime=null;

const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>{

    if(zelensky1&&flagTrigger=="off"){

        zelensky1.rotation.y+=.001

        zelenskyObject2.rotation.y+=.001


    }


    


    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    world.step(1 / 60, deltaTime, 3)
    
    if(zelenskyObject2&&flagMesh){
    
       
    let count = flagMesh.geometry.attributes.position.count
   
    if(flagTrigger=="on"){
    
      
        for(let i=0; i<count; i++){
            var random = Math.random()*2+1
        var x = zelenskyObject2.geometry.attributes.position.getX(i);
        var xsin = Math.sin(x + elapsedTime)
            zelenskyObject2.geometry.attributes.position.setZ(i, xsin)}
    }

zelenskyObject2.geometry.attributes.position.needsUpdate = true;

}
if(mixer)
{
    mixer.update(deltaTime)
}


controls.update()
   
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  

}
tick()