const filterContainer = document.querySelector('.filters');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const inputImg = document.querySelector('#input-image');
const placeholder = document.querySelector('.placeholder');
const resetbtn = document.querySelector('#reset-btn');
const downloadbtn = document.querySelector('#download-btn');
const presetContainer = document.querySelector('.preset');

let image = null;
let activeFilter = {};

const filters = {
    brightness:{ value:100, min:0, max:200, unit:"%" },
    contrast:{ value:100, min:0, max:200, unit:"%" },
    saturate:{ value:100, min:0, max:200, unit:"%" },
    "hue-rotate":{ value:0, min:-180, max:180, unit:"deg" },
    blur:{ value:0, min:0, max:20, unit:"px" },
    grayscale:{ value:0, min:0, max:100, unit:"%" },
    sepia:{ value:0, min:0, max:100, unit:"%" },
    opacity:{ value:100, min:0, max:100, unit:"%" },
    invert:{ value:0, min:0, max:100, unit:"%" }
};

function createFilter(name, config){
    const div = document.createElement('div');
    div.classList.add('filter');

    const label = document.createElement('p');
    label.innerText = name;

    const input = document.createElement('input');
    input.type = "range";
    input.min = config.min;
    input.max = config.max;
    input.value = config.value;
    input.name = name;

    input.addEventListener('input', e=>{
        activeFilter[name] = `${e.target.value}${config.unit}`;
        applyFilters();
    });

    div.append(label, input);
    return div;
}

Object.keys(filters).forEach(name=>{
    filterContainer.appendChild(createFilter(name, filters[name]));
});

inputImg.addEventListener('change', e=>{
    const file = e.target.files[0];
    if(!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = ()=>{
        URL.revokeObjectURL(img.src);
        image = img;
        placeholder.style.display = "none";
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0);
    };
});

function applyFilters(){
    if(!image) return;

    const filterString = Object.entries(activeFilter)
        .map(([key,val])=>`${key}(${val})`)
        .join(" ");

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.filter = filterString || "none";
    ctx.drawImage(image,0,0);
}

resetbtn.addEventListener('click', ()=>{
    if(!image) return;

    activeFilter = {};
    document.querySelectorAll('.filter input').forEach(input=>{
        input.value = filters[input.name].value;
    });

    ctx.filter = "none";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(image,0,0);
});

downloadbtn.addEventListener('click', ()=>{
    if(!image) return;

    const link = document.createElement('a');
    link.download = `cloudcanvas-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
});