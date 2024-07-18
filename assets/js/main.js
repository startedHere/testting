'use strict';

// ! Display Mobile Nav Menu ....
//////////////////////////////////////////////////////////
const navMenu = document.getElementById('nav-menu');
const menuToggle = document.getElementById('animated-toggle-button');
const menuCheckbox = document.getElementById('hamburger');

const navLink = document.querySelectorAll('.nav__link');

if (menuToggle) {
	menuToggle.addEventListener('click', () => {
		menuCheckbox.checked = !menuCheckbox.checked;
		navMenu.classList.toggle('show-menu');

		//!_Hide Mobile Nav Menu When You Click Any Nav-Links...
		navLink.forEach(n => {
			n.addEventListener('click', () => {
				menuCheckbox.checked = false;
				navMenu.classList.remove('show-menu');
			});
		});
	});
}

// ! Blur Header On-Scroll...
////////////////////////////////////////////////////////////////
const blurHeader = () => {
	const header = document.getElementById('header');

	//# When the scroll is greater than 50 vp(viewport) height, add the blur-header class to the header tag...
	window.scrollY >= 50 ? header.classList.add('blur-header') : header.classList.remove('blur-header');
};

window.addEventListener('scroll', blurHeader);

//! Mandal Effect For MY MIND Section
///////////////////////////////////////////////
//_ Using An IIFE....

(function () {
	// Get the element with ID 'mandala'
	const mandalaEffect = document.getElementById('mandala');

	// Function to handle visibility change
	function handleVisibilityChange() {
		if (!document.hidden) {
			// If the document is visible, add 'animated' class
			mandalaEffect.classList.add('animated');
		} else {
			// If the document is hidden, remove 'animated' class
			mandalaEffect.classList.remove('animated');
		}
	}

	// Check if the 'hidden' property is supported in the document
	if ('hidden' in document) {
		// Trigger the animation immediately on page load
		handleVisibilityChange();

		// Add event listener for visibility change
		document.addEventListener('visibilitychange', handleVisibilityChange, false);
	}
})();

// })(window.Mozilla);
// 	'undefined' != typeof document.hidden && (document.addEventListener('visibilitychange', i, !1), window.Mozilla.run(i));

//! GSAP Animation for Contact Form
//_ Form Animation(For Input Fields) Using GSAP
const containers = document.querySelectorAll('.input-container');
const form = document.querySelector('form');
const timeLine = gsap.timeline({ defaults: { duration: 1 } });

const rootStyles = getComputedStyle(document.documentElement);
const firstColor = rootStyles.getPropertyValue('--first-color');
const textColor = rootStyles.getPropertyValue('--text-color');

const start = 'M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512';
const end = 'M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512';

containers.forEach(container => {
	const input = container.querySelector('.input');
	const line = container.querySelector('.elastic-line');
	const placeholder = container.querySelector('.placeholder');

	input.addEventListener('click', () => {
		if (!input.value) {
			timeLine.fromTo(line, { attr: { d: start } }, { attr: { d: end }, ease: 'Power2.easeOut', duration: 0.75 });

			timeLine.to(
				line,
				{
					attr: { d: start },
					ease: 'elastic.out(3,0.5)',
				},
				'<20%'
			);

			timeLine.to(
				placeholder,
				{
					top: -15,
					left: 0,
					scale: 0.7,
					duration: 0.5,
					ease: 'Power2.easeOut',
				},
				'<5%'
			);
		}
	});

	//_ Move Placeholder Back To Start Position
	// Use 'focusout' event instead of 'click' on the form
	input.addEventListener('focusout', () => {
		if (!input.value) {
			gsap.to(placeholder, {
				top: 25,
				left: 0,
				scale: 1,
				duration: 0.5,
				ease: 'Power2.easeOut',
			});
			colorize(textColor, line, placeholder);
		}
	});

	//_ Input Validation...
	////////////////////////////////////////
	input.addEventListener('input', e => {
		if (e.target.type === 'text') {
			let inputText = e.target.value;
			if (inputText.length > 2) {
				colorize(firstColor, line, placeholder);
			} else {
				colorize('#FE8C99', line, placeholder);
			}
		}

		if (e.target.type === 'email') {
			let validEmail = validateEmail(e.target.value);
			if (validEmail) {
				colorize(firstColor, line, placeholder);
			} else {
				colorize('#FE8C99', line, placeholder);
			}
		}

		if (e.target.type === 'tel') {
			let validPhoneNumber = validatePhone(e.target.value);
			if (validPhoneNumber) {
				colorize(firstColor, line, placeholder);
			} else {
				colorize('#FE8C99', line, placeholder);
			}
		}
	});
});

//_ For Email (Client-Side Validation)
///////////////////////////////////////////////////
function validateEmail(email) {
	let re = /\S+@\S+\.\S+/;
	return re.test(email);
}

//_ For Phone Number(Client-Side Validation)
////////////////////////////////////////////////////////////
function validatePhone(phone) {
	let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	return re.test(phone);
}

function colorize(color, line, placeholder) {
	// gsap.to(line, { stroke: color, duration: 0.75 });
	gsap.to(line, { stroke: color, duration: 0 });

	// gsap.to(placeholder, { color: color, duration: 0.75 });
	gsap.to(placeholder, { color: color, duration: 0 });
}

//_ For Animating Form Checkbox
/////////////////////////////////////////////
const checkbox = document.querySelector('.checkbox');
const tl2 = gsap.timeline({
	defaults: { duration: 0.5, ease: 'Power2.easeOut' },
});
const tickMarkPath = document.querySelector('.tick-mark path');
const pathLength = tickMarkPath.getTotalLength();

gsap.set(tickMarkPath, {
	strokeDashoffset: pathLength,
	strokeDasharray: pathLength,
});

checkbox.addEventListener('click', () => {
	if (checkbox.checked) {
		tl2.to('.checkbox-fill', { top: '0%' });
		tl2.fromTo(tickMarkPath, { strokeDashoffset: pathLength }, { strokeDashoffset: 0 }, '<50%');

		// tl2.to('.checkbox-label', { color: '#6391e8' }, '<');
		tl2.to('.checkbox-label', { color: firstColor }, { duration: 0 }, '<');
	} else {
		tl2.to('.checkbox-fill', { top: '100%' });
		tl2.fromTo(tickMarkPath, { strokeDashoffset: 0 }, { strokeDashoffset: pathLength }, '<50%');

		// tl2.to('.checkbox-label', { color: '#c5c5c5' }, '<');
		// tl2.to('.checkbox-label', { color: '#777474' }, '<');
		tl2.to('.checkbox-label', { color: textColor }, { duration: 0 }, '<');
	}
});

//! Email js (For Form Submission)...
//////////////////////////////////////////////////////////////////
// Selecting elements from the HTML document using their IDs
const contactForm = document.getElementById('contactBeta-form');
const contactMessage = document.getElementById('contactBeta-message');

const submitButton = document.getElementById('submitButton');
const submitTextSpan = document.getElementById('submitText');
// const loadingTextSpan = document.getElementById('loadingText');
const loadingTextSpan = document.querySelector('.loading');

// submitButton.addEventListener('click', function (event) {
// 	event.preventDefault();
// 	// Programmatically trigger form submission when the div is clicked
// 	contactForm.dispatchEvent(new Event('submit'));
// });

//_ Add a loading state variable
let isLoading = false;

//_ Function to toggle loading state and update UI accordingly
const toggleLoadingState = () => {
	isLoading = !isLoading;

	// if (submitTextSpan) {
	// 	submitTextSpan.textContent = isLoading ? 'Loading' : 'Submit';
	// }

	//_ Function to show loading indicators or make UI adjustments when loading starts
	const showLoadingIndicators = () => {
		// Add classes to indicate loading start and progress
		submitButton.classList.add('loading-start', 'loading-progress');

		// Optionally, hide the 'submit' text span
		submitTextSpan.style.display = 'none';
	};

	//_ Function to hide loading indicators or make UI adjustments when loading ends
	const hideLoadingIndicators = () => {
		// Remove unnecessary classes
		submitButton.classList.remove('loading-start', 'loading-progress');

		// Add the 'loading-end' class to trigger the end animation
		submitButton.classList.add('loading-end');

		// Schedule the removal of the 'loading-end' class after a delay
		setTimeout(() => {
			submitButton.classList.remove('loading-end');

			// Optionally, show the 'submit' text span after the loading animation completes
			submitTextSpan.style.display = 'inline';
		}, 1500); // Delay before removing 'loading-end' class
	};

	//# Toggle loading animation or make UI adjustments here
	if (isLoading) {
		// submitButton.classList.add('loading-progress');

		// submitButton.classList.add('loading-start', 'loading-progress');
		//# Show loading indicators or disable form elements
		showLoadingIndicators();
	} else {
		// submitButton.classList.add('loading-end');
		// submitButton.classList.remove('loading-start', 'loading-progress', 'loading-end');

		// submitButton.classList.remove('loading-start', 'loading-progress'); // Remove unnecessary classes
		//# Hide loading indicators or enable form elements
		hideLoadingIndicators();

		// setTimeout(() => {
		// 	submitButton.classList.add('loading-end');
		// 	setTimeout(() => {
		// 		submitButton.classList.remove('loading-end');
		// 		// submitTextSpan.style.display = 'none';
		// 	}, 1500); // Delay before removing loading-end class
		// 	submitTextSpan.style.display = 'none';
		// }, 500); // Delay before adding loading-end class
	}
};

// Toggle the loading state
// const isLoading = !isLoading;

// Update the button text based on the loading state
// submitTextSpan.textContent = isLoading ? 'Loading' : 'Submit';

// Toggle loading animation or make UI adjustments here
/*
	if (isLoading) {
		// Add the CSS class to trigger the SVG animation

		// Indicate start
		submitButton.classList.add('loading-start');
		// submitButton.classList.add('loading-start', 'loading-progress');

		// Indicate in-progress after a delay
		setTimeout(() => {
			submitButton.classList.add('loading-progress');
		}, 500);
	} else {
		// Remove the CSS class to stop the SVG animation
		// submitButton.classList.remove('loading-start');

		// Indicate end after a delay
		setTimeout(() => {
			submitButton.classList.add('loading-end');

			// Reset classes after a longer delay
			setTimeout(() => {
				submitButton.classList.remove('loading-start', 'loading-progress', 'loading-end');
			}, 1500);
		}, 1500);
	} */
// };

function resetSpecificGSAPElements() {
	containers.forEach(container => {
		const line = container.querySelector('.elastic-line');
		const placeholder = container.querySelector('.placeholder');

		gsap.to(line, { attr: { d: start }, duration: 0 });
		gsap.to(placeholder, { top: 25, left: 0, scale: 1, duration: 0.5, ease: 'Power2.easeOut' });

		// colorize('#FE8C99', line, placeholder);
		colorize(textColor, line, placeholder);

		tl2.to('.checkbox-fill', { top: '100%' });

		// tl2.fromTo(tickMarkPath, { strokeDashoffset: 0 }, { strokeDashoffset: pathLength }, '<10%');
		tl2.fromTo(tickMarkPath, { strokeDashoffset: 0 }, { strokeDashoffset: pathLength }, { duration: 0 }, '<50%');

		// tl2.to('.checkbox-label', { color: '#c5c5c5' }, '<');
		// tl2.to('.checkbox-label', { color: '#777474' }, '<');
		tl2.to('.checkbox-label', { color: textColor }, { duration: 0 }, '<');
	});
}

/**
 * Sends an email using the EmailJS service.
 * @returns {Promise<boolean>} A Promise that resolves to true if the email is sent successfully, or false if there is an error.
 **/

//! Function to send email using Email.js
const sendEmail = async () => {
	try {
		//_ Using 'await' for asynchronous operation (sendForm returns a promise)
		// serviceID - templateID - #form - publicKey
		await emailjs.sendForm('service_c1336zx', 'template_voa9whe', '#contactBeta-form', 'BQukdiHZSqoSobLVR');
		return true; // Indicate success
	} catch (error) {
		console.error('Error sending email:', error);
		showMessage('Failed to send email. Please try again later.', true); // Display error message to user
		return false; // Indicate failure
	}
};

//_ Function to display a message and clear it after a specified time
// const showMessage = message => {
const showMessage = (message, isError = false) => {
	contactMessage.textContent = message;

	// Clear message after 5 seconds
	if (!isError) {
		setTimeout(() => {
			contactMessage.textContent = '';
		}, 5000);
	}
};

//_ Function to handle form submission
const handleFormSubmit = async event => {
	//#  ('e' or 'event' whichever one used in your function is mostly a Variable name)
	event.preventDefault();

	//Check if already loading, prevent multiple submissions
	if (isLoading) {
		return;
	}

	// Set loading state to true
	toggleLoadingState();

	try {
		// Attempt to send the email
		const isEmailSent = await sendEmail();

		if (isEmailSent) {
			// Show success message
			showMessage('Message Sent Successfully');

			// Clear input fields by resetting the form
			contactForm.reset();
			resetSpecificGSAPElements();
		} else {
			// Show error message (Without timeout)
			showMessage('Message Not Sent (Service Error)', true);
		}
	} catch (error) {
		console.error('Error handling form submission:', error);
		showMessage('An error occurred during form submission', true);
	} finally {
		// Revert back to 'Submit' text after email is sent or error occurs
		console.log(submitTextSpan);
		submitTextSpan.style.display = 'none'; // Show 'submit' text
		// submitTextSpan.style.display = 'none';
		loadingTextSpan.style.display = 'inline'; // Hide 'loading' text
		// submitTextSpan.style.display = 'inline';

		// Reset loading state after handling form submission
		toggleLoadingState();
	}
};
// Adding an event listener to the form for the 'submit' event
contactForm.addEventListener('submit', handleFormSubmit);

//! Show Scroll Up...
///////////////////////////////////////////////////////////////
const scrollUp = () => {
	const scrollUp = document.getElementById('scroll-up');
	// When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

/*
//! Scroll Sections Active Link...
/////////////////////////////////////////
const sections = document.querySelectorAll('section[id]');

// const header = document.querySelector('.header'); // Assuming the header has a class of 'header'
const header = document.querySelector('.nav'); // Assuming the header has a class of 'header'

const getHeaderHeight = () => (header ? header.offsetHeight : 0);

// Function to get the dynamic offset value
// const getOffset = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));

const scrollActive = () => {
	const scrollDown = window.scrollY;

	const headerHeight = getHeaderHeight(); // Get the current header height

	// const offset = getOffset();
	// Get the dynamic offset value

	sections.forEach(current => {
		const sectionHeight = current.offsetHeight,
			// sectionTop = current.offsetTop - 75,
			// sectionTop = current.offsetTop - offset, // Use the dynamic offset
			sectionTop = current.offsetTop - headerHeight, // Use the dynamic header height
			sectionId = current.getAttribute('id'),
			sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

		if (sectionsClass) {
			if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
				sectionsClass.classList.add('active-link');
			} else {
				sectionsClass.classList.remove('active-link');
			}
		}
	});
};

window.addEventListener('scroll', scrollActive);
*/

document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('section');
	const navLinks = document.querySelectorAll('.nav__link');

	// This function will handle the logic to determine the current section in view and update the active link in the navigation.
	function onScroll() {
		// Initialize a variable to keep track of the currently visible section
		let currentSection = '';
		// This variable will store the ID of the section currently in view.

		// Loop through each section
		sections.forEach(section => {
			// Get the vertical offset of the section from the top of the page
			const sectionTop = section.offsetTop;

			// Get the height of the section
			const sectionHeight = section.clientHeight;

			// Log the top position and height of each section for debugging purposes
			console.log(`Section ${section.id}: top = ${sectionTop}, height = ${sectionHeight}`);

			// Check if the current scroll position is within the section
			// This condition checks if the top of the section is within 1/3 of the section's height from the viewport
			if (window.scrollY >= sectionTop - sectionHeight / 4) {
				// If the condition is met, set currentSection to the ID of the section
				currentSection = section.getAttribute('id');
			}
		});

		// Log the ID of the current section in view for debugging purposes
		console.log('Current section:', currentSection);

		// Loop through each navigation link
		navLinks.forEach(link => {
			// Remove the 'active-link' class from the link to reset it
			link.classList.remove('active-link');

			// Check if the href attribute of the link contains the current section's ID
			if (link.getAttribute('href').includes(currentSection)) {
				// If it does, add the 'active-link' class to the link to highlight it
				link.classList.add('active-link');
			}
		});
	}

	// Adds the onScroll function as an event listener for the window's scroll event
	window.addEventListener('scroll', onScroll);
});

//! /////////////////////////////////////////////////////////////////////////////////

// const scrollActive = () => {
// 	const scrollY = window.pageYOffset;

// 	sections.forEach(current => {
// 		const sectionHeight = current.offsetHeight,
// 			sectionTop = current.offsetTop - 58,
// 			sectionId = current.getAttribute('id'),
// 			sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

// 		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
// 			sectionsClass.classList.add('active-link');
// 		} else {
// 			sectionsClass.classList.remove('active-link');
// 		}
// 	});
// };

// _Use lodash debounce to avoid frequent calls during scrolling
// const debounceScrollActive = _.debounce(scrollActive, 200);
//# Adjust the debounce time as needed

//_Add the event listener with the debounced function
// window.addEventListener('scroll', debounceScrollActive);

// window.addEventListener('scroll', scrollActive);

/*
//! //////////////////////////////////////////////////////////////////////////////////
// Wait for the DOM to be fully loaded before executing the JavaScript code
document.addEventListener('DOMContentLoaded', function () {
	// Variable to store the timeout ID for debouncing resize events
	let resizeTimeout;

	// Iterate through all elements with the class 'clickable-div'
	document.querySelectorAll('.clickable-div').forEach(function (div) {
		// Add a click event listener to each clickable div
		div.addEventListener('click', function () {
			// Check if the div has the 'loading-start' class
			if (div.classList.contains('loading-start')) {
				// Check if the div also has the 'loading-end' class
				if (div.classList.contains('loading-end')) {
					// If yes, remove all classes from the div
					div.removeAttribute('class');
				}
			} else {
				// If the div doesn't have 'loading-start' class, add classes with delays
				setTimeout(function () {
					div.classList.add('loading-start');
				}, 0);

				setTimeout(function () {
					div.classList.add('loading-progress');
				}, 500);

				setTimeout(function () {
					div.classList.add('loading-end');
				}, 1500);
			}
		});
	});

	// Function to handle resizing of the window
	const handleResize = function () {
		// Adjust the margin-top of the body based on the window height
		document.body.style.marginTop = ~~((window.innerHeight - 260) / 2) + 'px';
	};

	// Function to debounce the resize event to improve performance
	const debounceResize = function () {
		// Clear any existing timeout
		clearTimeout(resizeTimeout);
		// Set a new timeout for resizing after 250 milliseconds
		resizeTimeout = setTimeout(handleResize, 250);
	};

	// Add event listener for the window resize event with debouncing
	window.addEventListener('resize', debounceResize);

	// Initial call to handleResize to set the initial margin-top
	handleResize();
});

document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('.test__beta').forEach(function (div) {
		div.addEventListener('click', function () {
			if (div.classList.contains('loading-start')) {
				if (div.classList.contains('loading-end')) {
					div.removeAttribute('class');
				}
			} else {
				setTimeout(function () {
					div.classList.add('loading-start');
				}, 0);

				setTimeout(function () {
					div.classList.add('loading-progress');
				}, 500);

				setTimeout(function () {
					div.classList.add('loading-end');
				}, 1500);
			}
		});
	});
});

//! /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//_ ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
//! //////////////////////////////////////////////////////////////////////////////////
// Wait for the DOM to be fully loaded before executing the JavaScript code
document.addEventListener('DOMContentLoaded', function () {
	// Variable to store the timeout ID for debouncing resize events
	let resizeTimeout;

	// Iterate through all elements with the class 'clickable-div'
	document.querySelectorAll('.clickable-div').forEach(function (div) {
		// Add a click event listener to each clickable div
		div.addEventListener('click', function () {
			// Check if the div has the 'loading-start' class
			if (div.classList.contains('loading-start')) {
				// Check if the div also has the 'loading-end' class
				if (div.classList.contains('loading-end')) {
					// If yes, remove all classes from the div
					div.removeAttribute('class');
				}
			} else {
				// If the div doesn't have 'loading-start' class, add classes with delays
				setTimeout(function () {
					div.classList.add('loading-start');
				}, 0);

				setTimeout(function () {
					div.classList.add('loading-progress');
				}, 500);

				setTimeout(function () {
					div.classList.add('loading-end');
				}, 1500);
			}
		});
	});

	// Function to handle resizing of the window
	const handleResize = function () {
		// Adjust the margin-top of the body based on the window height
		document.body.style.marginTop = ~~((window.innerHeight - 260) / 2) + 'px';
	};

	// Function to debounce the resize event to improve performance
	const debounceResize = function () {
		// Clear any existing timeout
		clearTimeout(resizeTimeout);
		// Set a new timeout for resizing after 250 milliseconds
		resizeTimeout = setTimeout(handleResize, 250);
	};

	// Add event listener for the window resize event with debouncing
	window.addEventListener('resize', debounceResize);

	// Initial call to handleResize to set the initial margin-top
	handleResize();
});

document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('.test__beta').forEach(function (div) {
		div.addEventListener('click', function () {
			if (div.classList.contains('loading-start')) {
				if (div.classList.contains('loading-end')) {
					div.removeAttribute('class');
				}
			} else {
				setTimeout(function () {
					div.classList.add('loading-start');
				}, 0);

				setTimeout(function () {
					div.classList.add('loading-progress');
				}, 500);

				setTimeout(function () {
					div.classList.add('loading-end');
				}, 1500);
			}
		});
	});
});

//! /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
