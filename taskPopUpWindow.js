// Get all <article> elements with the class product-card
const productCards = document.querySelectorAll('article.product-card');

// Iterate over the found elements
productCards.forEach((productCard) => {
    // Access properties or perform operations with each product-card element
    // For example, print the href of the link inside each article
    const linkElement = productCard.querySelector('a.link-wrapper');

    // Check if the link element was found
    if (linkElement) {
        const href = linkElement.getAttribute('href');

        // Create a new div
        const bannerDiv = document.createElement('div');
        bannerDiv.className = 'simpleBanner';

        // Insert an attribute, inside of which is the designated href
        bannerDiv.setAttribute('data-product-href', href);

        // Create a button inside the new div
        const button = document.createElement('button');
        button.textContent = 'QUICK VIEW';
        button.style.marginTop = '16px';
        button.style.fontSize = '16px';
        button.style.fontWeight = 'bold';
        button.style.color = 'white';

        // Add click event to the button
        button.addEventListener('click', () => {
            const productHref = bannerDiv.getAttribute('data-product-href');
            bringData(productHref);
        });

        // Add the button to the new div
        bannerDiv.appendChild(button);

        // Insert the new div as the first child of the <article> element
        productCard.insertBefore(bannerDiv, productCard.firstChild);

        // Hide the banner by default
        bannerDiv.style.display = 'none';

        // Apply additional styles to prevent movement in other elements
        bannerDiv.style.position = 'absolute';
        bannerDiv.style.zIndex = '1000';
        bannerDiv.style.backgroundColor = '#007bff';
        bannerDiv.style.width = '100%';
        bannerDiv.style.height = '50px';
        bannerDiv.style.top = '220px';

        // Show the banner when hovering over the element
        productCard.addEventListener('mouseover', () => {
            bannerDiv.style.display = 'block';
        });

        // Hide the banner when removing hover over the element
        productCard.addEventListener('mouseout', () => {
            bannerDiv.style.display = 'none';
        });
    }
});

const bringData = async (url) => {
    try {
        // Make a request to get the content of the page associated with the URL
        const response = await fetch(url);

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`Error loading page: ${response.statusText}`);
        }

        // Get the HTML of the page
        const html = await response.text();

        // Create a temporary element to parse the HTML
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;

        // Find all <li> elements with the class "item" inside the temporary document
        const liElements = tempElement.querySelectorAll('li.item');

        // Filter only elements that have valid information
        const validLiElements = Array.from(liElements).filter((liElement) => {
            const dataGallery = liElement.getAttribute('data-gallery');
            const dataIndex = liElement.getAttribute('data-index');
            return dataGallery && dataIndex !== null;
        });

        const windowHeight = window.innerHeight;

        // Get only the first 5 images
        const firstFiveElements = validLiElements.slice(0, 4);

        // Display the content of the filtered elements in the console
        const imageContainer = document.createElement('div');
        imageContainer.style.background = 'white';
        imageContainer.style.width = '850px';
        imageContainer.style.height = '550px';
        imageContainer.style.position = 'fixed';
        imageContainer.style.top = '50%';
        imageContainer.style.left = '50%';
        imageContainer.style.transform = 'translate(-50%, -50%)';
        imageContainer.style.overflow = 'auto';
        imageContainer.style.zIndex = '1000';
        imageContainer.style.boxShadow = '0 0px 30px rgba(0, 0, 0, 0.3)';

        // Create two inner divs to horizontally divide the container
        const leftDiv = document.createElement('div');
        const rightDiv = document.createElement('div');

        // Set styles for the inner divs
        leftDiv.style.width = '60%';
        leftDiv.style.float = 'left';
        leftDiv.style.position = 'relative';
        rightDiv.style.width = '40%';
        rightDiv.style.float = 'left';

        // Create large image
        const largeImage = document.createElement('img');
        largeImage.src = firstFiveElements[0].getAttribute('data-gallery');
        largeImage.style.width = '480px';
        largeImage.style.height = '380px';
        largeImage.style.objectFit = 'cover';
        largeImage.style.margin = '15px 0 0 15px';

        // Add the large image to the left div
        leftDiv.appendChild(largeImage);

        // Create div for small images
        const smallImagesDiv = document.createElement('div');
        smallImagesDiv.style.position = 'absolute';
        smallImagesDiv.style.bottom = '30';
        smallImagesDiv.style.width = '100%';
        smallImagesDiv.style.display = 'flex';
        smallImagesDiv.style.justifyContent = 'space-evenly';
        smallImagesDiv.style.padding = '10px';

        // Display the content of the filtered elements in the left div
        firstFiveElements.forEach((liElement) => {
            const imageURL = liElement.getAttribute('data-gallery');
            const imageIndex = liElement.getAttribute('data-index');

            // Create a new small image
            const smallImgElement = document.createElement('img');
            smallImgElement.src = imageURL;
            smallImgElement.alt = `Image ${imageIndex}`;
            smallImgElement.style.width = '110px';
            smallImgElement.style.height = '110px';
            smallImgElement.style.margin = '5px';
            smallImgElement.style.objectFit = 'cover';

            // Add mouseover event to change the large image
            smallImgElement.addEventListener('mouseover', () => {
                largeImage.src = imageURL;
            });

            // Add the small image to the small images div
            smallImagesDiv.appendChild(smallImgElement);
        });

        // Create <h2> and <p> elements for the right div (you can adjust the data)
        const heading = document.createElement('h2');
        heading.textContent = 'Article Title';
        heading.style.fontSize = '34px';
        heading.style.fontWeight = 'bold';
        heading.style.color = 'black';
        heading.style.marginTop = '10px';

        const paragraph = document.createElement('p');
        paragraph.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi..';
        paragraph.style.fontSize = '20px';
        paragraph.style.marginTop = '30px';

        const price = document.createElement('p');
        price.textContent = '$299';
        price.style.fontSize = '30px';
        price.style.marginTop = '30px';
        price.style.fontWeight = 'bold';
        price.style.color = 'black';

        // Add <h2> and <p> to the right div
        rightDiv.appendChild(heading);
        rightDiv.appendChild(paragraph);
        rightDiv.appendChild(price);

        // Add left and right divs to the main container
        leftDiv.appendChild(smallImagesDiv);
        imageContainer.appendChild(leftDiv);
        imageContainer.appendChild(rightDiv);

        // Create the close button (X) in the right div
        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.fontSize = '20px';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(imageContainer);
        });

        // Add the close button to the right div
        rightDiv.appendChild(closeButton);

        // Display the image container in the document body
        document.body.appendChild(imageContainer);

        // Add a click event to the document to close the container if clicked outside of it
        const closeOnOutsideClick = (event) => {
            if (!imageContainer.contains(event.target)) {
                // The click occurred outside the container, so we close it
                document.body.removeChild(imageContainer);
                // Remove the event to avoid multiple closures
                document.removeEventListener('click', closeOnOutsideClick);
            }
        };

        // Add the click event to the document
        document.addEventListener('click', closeOnOutsideClick);

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};