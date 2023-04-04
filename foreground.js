
var styles = `
.button1 {
    background-color: white;
    color: black;
    border: 2px solid #e7e7e7;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 2px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
}
.button1:hover {
    background-color: #e7e7e7;   
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

.button2 {
    background-color: #56db6a;
    color: black;
    border: 2px solid #e7e7e7;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 2px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
}
`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

let btn = document.createElement("button");
btn.innerHTML = "Generate image";
// btn.style.display = 'block';
btn.className = 'button1';
btn.addEventListener("click", async () => {
    await genImage()
});

async function genImage() {
    let taskDescription = document.getElementsByClassName('review-head-summary-headline__headline')[0].innerText.split('/');
    let taskNumberReserve = taskDescription[taskDescription.length - 1]

    let taskData = document.getElementsByClassName('pr-info-tickets__ticket-name')
    let taskNumber = taskNumberReserve

    if (typeof taskData != "undefined" && taskData.length > 0) {
        console.log('Using task number from Tickets section')
        taskData[0].innerText;
    }
    
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
        ctx.font = "20px monospace";
        ctx.fillStyle = "black";
        ctx.textAlign = "right";           
        ctx.fillText("Review Request", hMiddle - 5, 20);
    
        ctx.font = "40px monospace";
        ctx.fillStyle = "green";
        ctx.fillText(added, hMiddle - 5, vMiddle + 15);
    
        ctx.textAlign = "left";
        ctx.font = "bold 20px monospace";
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

    btn.className = 'button2';
    await new Promise(r => setTimeout(r, 1000));
    btn.className = 'button1';

    document.body.removeChild(canvas);
}

// place_for_button = 'review-head-controls'
// place_for_button = 'pr-navigation__stats'
place_for_button = 'navigation__column'

async function start() {
    for (let step = 0; step < 20; step++) {
        let parent = document.getElementsByClassName(place_for_button)[0]

        if (typeof parent != "undefined") {
            parent.appendChild(btn);
            break
        }

        await new Promise(r => setTimeout(r, 1000));
    }
}

start();
