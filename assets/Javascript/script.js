


class Testimonial {

    image = ""
    quotes = ""
    author = ""

    constructor (image, quotes, author) {
        this.image = image
        this.quotes = quotes
        this.author = author
    }

    html () {
        return `<div class="card">
        <div class="image">
            <img src="${this.image}">
        </div>
        <div class="quotes">
            <p>${this.quotes}</p>
        </div>
        <div class="author">
            <h4>${this.author}</h4>
        </div>
    </div>`
    }


}

const testimonial1 = new Testimonial("https://images.pexels.com/photos/1496647/pexels-photo-1496647.jpeg?auto=compress&cs=tinysrgb&w=600", "Kamu keren!", "- Albert")

const testimonial2 = new Testimonial("https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=600", "Sangat keren!", "- John")

const testimonial3 = new Testimonial("https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=600", "Sangat membantu!", "- Muhammad Irfan")

const testimonial4 = new Testimonial("https://images.pexels.com/photos/715546/pexels-photo-715546.jpeg?auto=compress&cs=tinysrgb&w=600", "Cepat selesai!", "- Husein")

const testimonial5 = new Testimonial("https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600", "Hasilnya sangat memuaskan", "- Abid")

const testimonial6 = new Testimonial("https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=600", "Keren kamu bro", "- Albert")

const testimonials = [testimonial1, testimonial2, testimonial3, testimonial4, testimonial5, testimonial6]

let testimonialHTML = ""

for(index = 0; index < testimonials.length; index++) {
    testimonialHTML += testimonials[index].html()
}

document.getElementById("myTestimonials").innerHTML = testimonialHTML

































// class Testimonial {

//     image = ""
//     quotes = ""
//     author = ""

//     constructor (image, quotes, author) {
//         this.image = image
//         this.quotes = quotes
//         this.author = author
//     }

    // methods
//     html () {
//         return `<div class="card">
//         <div class="image">
//             <img src="${this.image}">
//         </div>
//         <div class="quotes">
//             <p>${this.quotes}</p>
//         </div>
//         <div class="author">
//             <h4>${this.author}</h4>
//         </div>
//     </div>`
//     }

// }

// objek
// const testimonial1 = new Testimonial("https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=600", "Sangat membantu!", "- Muhammad Irfan")

// const testimonial2 = new Testimonial("https://images.pexels.com/photos/715546/pexels-photo-715546.jpeg?auto=compress&cs=tinysrgb&w=600", "Cepat selesai!", "- Husein")

// const testimonial3 = new Testimonial("https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600", "Hasilnya sangat memuaskan", "- Abid")

// const testimonial4 = new Testimonial("https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=600", "Keren kamu bro", "- Albert")

// const testimonials = [testimonial1, testimonial2, testimonial3, testimonial4]


// let testimonialHTML = ""

// looping  
// for (index = 0; index < testimonials.length; index++) {
//     testimonialHTML += testimonials[index].html()
// }

// document.getElementById("myTestimonials").innerHTML = testimonialHTML