let button = document.getElementById("screen_button");

button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    var updateProperties = { 'active': true };
    chrome.tabs.update(tab.id, updateProperties, (tab) => { });

    chrome.scripting.executeScript({
        // run script on active page
        target: { tabId: tab.id },
        // call function to find diff on page
        function: getDiff,
    });
});

function getDiff() {
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
