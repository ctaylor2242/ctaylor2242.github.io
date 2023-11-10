const min = 1;
const max = 99;
let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
const jsConfetti = new JSConfetti()
let guessMin = 0
let guessMax = 100

document.addEventListener("DOMContentLoaded", function() {
    var demo1 = new BVAmbient({
      selector: "#ambient",
      fps: 60,
      max_transition_speed: 12000, // speed will be randomized between max and min
      min_transition_speed: 8000,
      particle_number: 50,
      particle_maxwidth: 30,
      particle_minwidth: 10,
      particle_radius: 50,
      particle_opacity: true,
      particle_colision_change: true,
      particle_background: "#ADD8E6",
      refresh_onfocus: true,
      particle_image: {
        image: false,
        src: ""
      },
      responsive: [
          {
            breakpoint: 768,
            settings: {
              particle_number: "15"
            }
          },
          {
            breakpoint: 480,
            settings: {
              particle_number: "10"
            }
          }
      ]
    });
});

document.getElementById("submit").addEventListener("click", onButtonSubmit)
document.getElementById("reset").addEventListener("click", resetGame)

function onButtonSubmit() {
    let numInput = document.getElementById("num").value
    numInput = parseInt(numInput)
    if (!isNaN(numInput) && numInput > guessMin && numInput < guessMax) {
        // is int
        if (numInput === randNum) {
            // success
            jsConfetti.addConfetti()
        } else {
            gsap.to(".container", {
                x: 10,
                duration: 0.05,
                repeat: 5,
                yoyo: true,
                onComplete: () => {
                    if (numInput < randNum) {
                        guessMin = numInput
                    } else if (numInput > randNum) {
                        guessMax = numInput
                    }
                    
                    document.getElementById("label_num").innerHTML = `Guess a random number between ${guessMin} and ${guessMax}`
                    document.getElementById("num").value = ""
                }
            });
        }
    } else {
      showError("Please enter valid number")
    }


}

function resetGame() {
    guessMin = 0
    guessMax = 100
    document.getElementById("label_num").innerHTML = `Guess a random number between ${guessMin} and ${guessMax}`
    document.getElementById("num").value = ""
    randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    showReset("Game reset. New random number generated")
}

function showError(message) {
  const errorBanner = document.getElementById("errorBanner");
  errorBanner.textContent = message;
  errorBanner.style.display = "block";

  setTimeout(function() {
      errorBanner.style.display = "none";
  }, 3000);
}

function showReset(message) {
  const resetBanner = document.getElementById("resetBanner");
  resetBanner.textContent = message;
  resetBanner.style.display = "block";

  setTimeout(function() {
      resetBanner.style.display = "none";
  }, 3000);
}