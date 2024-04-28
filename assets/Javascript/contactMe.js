function submitHandler () {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if(name == "") {
        return alert ("Please enter your name!")
    } else if (email == "") {
        return alert ("PLease enter your email!")
    } else if (phoneNumber == "") {
        return alert ("PLease enter your phone number!")
    } else if (subject == "") {
        return alert ("PLease enter your subject!")
    } else if (message == "") {
        return alert ("PLease enter your message!")
    }

    const myEmail = "muhammadirfan2823@gmail.com"

    let send = document.createElement("a")
    send.href = `https://mail.google.com/mail?view=cm&fs=1&to=${myEmail}&su=${subject}&body=
    Nama : ${name}
    Nomor HP :${phoneNumber}, 
    Paket yang dipilih ${subject}, 
    Pesan :${message} `
    send.click();
 
}