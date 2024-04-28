const dataProject = [];

function addProject(event) {
    event.preventDefault();

    let projectName = document.getElementById("projectName").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let description = document.getElementById("description").value;
    let image = document.getElementById("image").files[0];
    let imageURL = URL.createObjectURL(image)
    

    if (projectName == "") {
        return alert ("Please enter your project name!")
    } else if (startDate == "") {
        return alert ("Please enter your Start Date!")
    } else if (endDate == "") {
        return alert ("Please enter your End Date!")
    } else if (description == "") {
        return alert ("Please enter your Description!")
    } else if (imageURL == "") {
        return alert ("Please upload your image!")
    } 

    if (endDate < startDate) {
        return alert ("End date cannot be less than start date!")
    }
    
    let startDatePart = startDate.split("/")
    let endDatePart = endDate.split("/")

    let formatStartDate = startDatePart[2] + "-" + startDatePart[1] + "-" + startDatePart[0] 
    let formatEndDate = endDatePart[2] + "-" + endDatePart[1] + "-" + endDatePart[0]   

    let newStartDate = new Date(formatStartDate)
    let newEndDate = new Date(formatEndDate)

    let timeDifference = newEndDate - newStartDate

    let differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) 
    let differenceInMonths = Math.floor(differenceInDays / 30.44) 
    let differenceInYears = Math.floor(differenceInMonths / 12) 

    let duration;

    if(differenceInYears > 0) {
        duration = `${differenceInYears} years`
    } else if (differenceInMonths > 0) {
        duration = `${differenceInMonths} months`
    } else if (differenceInDays > 0) {
        duration = `${differenceInDays} days`
    }



    
    dataProject.push(
        {
            projectName: projectName,
            startDate: startDate,
            endDate: endDate,
            description: description,
            image: imageURL,
            duration: duration

        }
    )

    
    console.log(dataProject)

    newData()

}

    function newData() {
        document.getElementById("containerListProject").innerHTML = ""

        for(let i = 0; i < dataProject.length; i++) {
            const projectSaya = dataProject[i]

            document.getElementById("containerListProject").innerHTML +=`
             
                <div id="listProject" class="project">
                    <div class="foto">
                        <img src="${projectSaya.image}" alt="ini foto project">
                    </div> 
    
                    <div class="judul">
                        <h5>${projectSaya.projectName}</h5>
                        <p>${projectSaya.startDate} - ${projectSaya.endDate}</p>
                        <br>
                        <p>Duration: ${projectSaya.duration}</p>
                    </div>
    
                    <div class="deskripsi">
                        <p>${projectSaya.description}</p>
                    </div>
    
                    <div class="icon">
                        <i class="fa-brands fa-google-play"></i>
                        <i class="fa-brands fa-android"></i>
                        <i class="fa-brands fa-java"></i>
                    </div>
    
                    <div class="button">
                        <button>edit</button>
                        <button>delete</button>
                    </div>
                </div>
            
        `
        }
    }

    function hamburgerButton () {
        const hamburger = document.querySelector(".hamburgerButton")

        hamburger.classList.toggle("hide")
    }


















