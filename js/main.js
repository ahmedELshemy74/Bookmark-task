let siteName = document.getElementById('siteName')
let siteUrl = document.getElementById('siteUrl')

let allSites = []
if (localStorage.getItem('sites')) {
    allSites = JSON.parse(localStorage.getItem('sites'))
    displayData()
}

function addWebsite() {

    if (allValidation(siteName,'msgName')&&allValidation(siteUrl,'msgUrl')) {
        let website = {
            name: siteName.value,
            url: siteUrl.value,
        };
    
        allSites.push(website);
        localStorage.setItem('sites',JSON.stringify(allSites))
        displayData()
        clearData()
        Swal.fire({
            icon: "success",
            title: "Added successfully",
          });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You must fill the fields  ",
          });
    }

}

function displayData() {
    let box = ""
    for (let i = 1; i < allSites.length; i++) {
        box += `
        <tr>
        <td>${i}</td>
        <td>${allSites[i].name}</td>
        <td><button onclick="visitSite(${i})" class="btn btn-success pe-2 btn-sm"> <i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td> <button onclick="deleteSite(${i})" class="btn btn-danger pe-2 btn-sm"> <i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tableContent').innerHTML=box
}

function clearData() {
    siteName.value = ""
    siteUrl.value = ""

    siteName.classList.remove('is-valid')
    siteUrl.classList.remove('is-valid')
}

function deleteSite(index) {
    allSites.splice(index, 1)
    displayData()
    localStorage.setItem('sites',JSON.stringify(allSites))
}

function visitSite(index) {
    window.open(allSites[index].url,"_blank")
}

function allValidation(element,msgId) {
    let msg = document.getElementById(msgId);
    let regex = {
        siteName: /^[A-Z][a-z]{3,8}$/,
        siteUrl: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm,
    };

    if (regex[element.id].test(element.value) == true)  {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        msg.classList.add('d-none');
        return true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        msg.classList.remove('d-none');
        return false;
    }
}