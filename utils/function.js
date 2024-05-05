const dataProject = [];

function addProject (timePost) {
    
    let timeNow = new Date();

    let distance = timeNow - timePost;

// //     let projectName = document.getElementById("projectName").value;
// //     let image = document.getElementById("image").files[0];
// //     let imageURL = URL.createObjectURL(image)
    // let startDate = document.getElementById("startDate").value;
    // let endDate = document.getElementById("endDate").value;
// //     let description = document.getElementById("description").value;


    // let startDatePart = startDate.split("/")
    // let endDatePart = endDate.split("/")

    // let formatStartDate = startDatePart[2] + "-" + startDatePart[1] + "-" + startDatePart[0] 
    // let formatEndDate = endDatePart[2] + "-" + endDatePart[1] + "-" + endDatePart[0]   

    // let newStartDate = new Date(formatStartDate)
    // let newEndDate = new Date(formatEndDate)

    // let timeDifference = newEndDate - newStartDate

    const day = Math.floor(distance / (1000 * 60 * 60 * 24)) 
    const month = Math.floor(distance / 30.44) 
    const year = Math.floor(distance / 12) 


    if(day < 24) {
        return day + " day ago" 
    } else if (differenceInMonths > 0) {
        duration = `${differenceInMonths} months`
    } else if (differenceInDays > 0) {
        duration = `${differenceInDays} days`
    }



    
    dataProject.push(
        {
            // projectName: projectName,
            // startDate: startDate,
            // endDate: endDate,
            // description: description,
            // image: imageURL,
            duration: duration

        }
    )

    
// //     console.log(dataProject)

// //     newData()

}

// function newData() {
//     document.getElementById("containerListProject").innerHTML = ""

//     for(let i = 0; i < dataProject.length; i++) {
//         const projectSaya = dataProject[i]

//         document.getElementById("containerListProject").innerHTML +=`
//         <div class="card" style="width: 23rem; height: 580px;">
        
//             <img src="${projectSaya.image}" class="card-img-top" alt="...">

//             <div class="card-body mt-3">
//             <h5 class="card-title fw-bold" id="title">${projectSaya.projectName}</h5>
//             <p class="card-text">${projectSaya.startDate} - ${projectSaya.endDate}</p>
//             <p class="card-text">${projectSaya.duration}</p>

//             <div class="" style="height: 100px">
//                 <p class="card-text" style="text-align: justify;" id="text">${projectSaya.description}</p>
//             </div>
            
//             <div class="d-flex justify-content-between w-50 mt-3" >
//                 <i class="bi bi-google-play fs-2"></i>
//                 <i class="bi bi-android fs-2"></i>
//                 <i class="fa-brands fa-java fs-2"></i>
//             </div>

//             <div class=" mt-3 d-flex justify-content-around">
//                 <button type="submit" class="btn btn-dark" style="width: 140px;">Edit</button>
//                 <button type="submit" class="btn btn-dark" style="width: 140px;">Delete</button>
//             </div>
//             </div>
//         </div>`
//     }
// }