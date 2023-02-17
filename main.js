const imageWrapper = document.createElement("div");
const wrapper = document.createElement("div");
const form = document.createElement("form");
const image = document.createElement("img");
const input = document.createElement("input");
const select = document.createElement("select");

form.id = 'form'


wrapper.style.textAlign = "center";
imageWrapper.style.display = "flex";
imageWrapper.style.gap = "20px";
imageWrapper.style.flexWrap = "wrap";
imageWrapper.style.marginTop = "25px";
imageWrapper.style.justifyContent = 'center'
imageWrapper.style.visibility = 'hidden'
form.style.display = "flex";
form.style.maxWidth = "400px";
form.style.marginTop = "40px";
form.style.marginBottom = '100px'

select.setAttribute("name", "select");
select.setAttribute("form", "form");



[input, select].forEach((el) => {
	el.addEventListener("input", function (event) {
		event.preventDefault();
		fetchDogs(input.value);
		selectBreeds(select.value)
	})
})

render();
function fetchDogs(amount) {
	axios
		.get(`https://dog.ceo/api/breed/${select.value}/images/random/${amount}`)
		.then((response) => {
			imageWrapper.innerHTML = "";
			response.data.message.forEach((dog) => {
				let image = document.createElement("img");
				image.id = 'image'
				image.setAttribute("src", dog);
				image.style.width = "300px";
				image.style.height = "300px";
				image.style.margin = "0";
				imageWrapper.prepend(image);
			});
			const ab = document.getElementsByTagName('img')
			return ab
			
		})

		.then(ab => {
			const length = ab.length
			console.log(ab.length)
			function loaded(a) {
				console.log('loaded')
				
				let array = Array.prototype.slice.call(ab)
				if (array.length == length) {
					console.log("lastImage")
					imageWrapper.style.visibility = 'visible'
				} else {console.log('error')}

			}

			for (let a of ab) {
				if(a.complete) {
					loaded(a)
				} else {
					a.addEventListener('load', loaded)
					a.addEventListener('error', function () {
						alert('error')
					})
				}
			}
		})
		.catch((error) => console.error(error));
}

function selectBreeds() {
	axios
		.get('https://dog.ceo/api/breeds/list/all')
		.then((response) => {
			let breeds = response.data.message;
			breedsList = Object.keys(breeds);
			breedsList.forEach((breed) => {
				const option = document.createElement('option')
				option.setAttribute('value', breed)
				option.innerHTML = breed
				select.append(option)
			})

		})
		.catch((error) => console.error(error));
}
selectBreeds()

function render() {
	document.body.append(wrapper);
	wrapper.append(form);
	wrapper.append(imageWrapper);
	form.append(input);
	form.prepend(select)
}

