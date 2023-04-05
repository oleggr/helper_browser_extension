
var styles = `
.create-diff-image-btn {
    background-color: transparent;
    color: black;
    border: none;
    padding: 0px 4px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin-right: 5px;
    cursor: pointer;
}

.create-diff-image-btn:hover {
    background-color: #e7e7e7;   
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

let btn = document.createElement("button");
btn.innerHTML = "📷";
btn.title = 'Copy image to clipboard';
btn.className = 'create-diff-image-btn';

btn.addEventListener("click", async () => {
    await genImage()
    
    for (let i = 0; i < 3; i++) {
        await new Promise(r => setTimeout(r, 200));
        btn.innerHTML = '📸';
        await new Promise(r => setTimeout(r, 200));
        btn.innerHTML = '📷';
    }
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

    document.body.removeChild(canvas);
}

function waitForElement(selector) {
    return new Promise(
        (resolve) => {
            if (document.querySelector(selector)) {
                return resolve(element);
            }
            const observer = new MutationObserver(() => {
                const element = document.querySelector(selector);
                if (element) {
                    console.log('element found')
                    resolve(element); 
                    createButton(element);
                    // observer.disconnect();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true, });
        });
}

function createButton(element) {
    // if button already exists, do nothing
    if (document.getElementById('createDiffImageWrapper')) {
        return;
    }

    // get parent element
    let parent = element.parentElement;
    let newDiv = document.createElement('div');
    newDiv.className = 'navigation__column';
    newDiv.id = 'createDiffImageWrapper';
    newDiv.appendChild(btn);

    // insert new div before parent element
    parent.parentNode.insertBefore(newDiv, parent);
}

async function start() {
    console.log('start')

    waitForElement('.pr-navigation__stats').then((element) => {
        console.log('Element is ready');
    });
}

start();
