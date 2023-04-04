
let btn = document.createElement("button");
btn.innerHTML = "Generate image";
btn.style.display = 'block';
btn.addEventListener("click", async () => {
    genImage()
});

function genImage() {
    let taskNumber = document.getElementsByClassName('pr-info-tickets__ticket-name')[0].innerText;
    let added = document.getElementsByClassName("diff-stat__additions")[0].innerText;
    let removed = document.getElementsByClassName("diff-stat__deletions")[0].innerText;
    
    var canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 400;
    canvas.height = 200;
    canvas.style.display = 'none';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    function drawNumber() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        const hMiddle = canvas.width / 2;
        const vMiddle = canvas.height / 2;
        
        ctx.textAlign = "right";
        ctx.font = "10px monospace";
        ctx.fillStyle = "black";
        ctx.textAlign = "right";           
        ctx.fillText("Review Request", hMiddle - 5, 20);
    
        ctx.font = "40px monospace";
        ctx.fillStyle = "green";
        ctx.fillText(added, hMiddle - 5, vMiddle + 15);
    
        ctx.textAlign = "left";
        ctx.font = "bold 10px monospace";
        ctx.fillStyle = "#5282ff";
        ctx.fillText(taskNumber, hMiddle + 5, 20);
    
        ctx.font = "40px monospace";
        ctx.fillStyle = "red";
        ctx.fillText(removed, hMiddle + 5, vMiddle + 15);
    }

    drawNumber();

    async function copyToClipboard() {
        canvas.toBlob(function (blob) {
            var item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]);
            console.log('done')
        });
    }

    copyToClipboard();
    document.body.removeChild(canvas);
}


async function start() {
    for (let step = 0; step < 20; step++) {
        // let parent = document.getElementsByClassName("review-head-controls")[0]
        let parent = document.getElementsByClassName("pr-navigation__stats")[0]

        if (typeof parent != "undefined") {
            parent.appendChild(btn);
            break
        }

        await new Promise(r => setTimeout(r, 1000));
    }
}

start();
