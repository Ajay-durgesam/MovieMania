# MovieMania
A Movie Web Application built using HTML5, CSS3, and Vanilla JavaScript. The application allows users to browse a list of movies, watch trailers, and search for specific movies.


## Key Features:
1. **Movie List Page:** Displays a list of movies with relevant information such as title, release year, and poster image.
> (implemented in `./assets/js/index.js`)

![Screenshot 2024-03-18 223749](https://github.com/Ajay-durgesam/MovieMania/assets/114494331/b0615b36-ce6e-4f3b-b5bf-a1c24abcfe36)

2. **Trailer Video Component:** Shows a trailer video for each movie, located just beneath the banner containing movie cards.
> (implemented in `./assets/js/index.js`)

![Screenshot 2024-03-18 223900](https://github.com/Ajay-durgesam/MovieMania/assets/114494331/35b56b32-d08a-4d20-b60d-0a6af02e5e5b)
![Screenshot 2024-03-18 224556](https://github.com/Ajay-durgesam/MovieMania/assets/114494331/5042c659-db91-4f21-8e5b-d592765dc614)


3. **Search Functionality:** Users can search for movies using a search box. Additionally, users can quickly type into the search box using the Ctrl + K shortcut.
> (implemented in `./assets/js/search.js`)

![Screenshot 2024-03-18 224054](https://github.com/Ajay-durgesam/MovieMania/assets/114494331/02808277-46bc-49ab-baaf-37528ee231b4)
![Screenshot 2024-03-18 224109](https://github.com/Ajay-durgesam/MovieMania/assets/114494331/ab59e895-e5b2-4e80-989e-4f9f19b68490)


4. **API:** TMDB API used for fetching data and images for the movies.
> (implemented in `./assets/js/api.js`)

## Instructions for Running the Application:
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Open the `index.html` file in a web browser with live server to view the application.(also if you wish to use your own TMDB API key, you can generate from here[TMDB site]((https://www.themoviedb.org/)))
4. You can also use this link to open the website directly [[MovieMania](https://movie-mania-smoky.vercel.app/)].


## Repository Structure:
- `index.html`: Main HTML file containing the structure of the web application.
- `./assets/css/styles.css`: CSS file for styling the components and layout.
- `./assets/js`: All JavaScript files containing the logic for rendering movies, trailers, and implementing search functionality.
- `assets/images`: Directory containing images and other static assets used in the application.

## Development Process:
- Implemented the user interface using HTML5 and CSS3, ensuring responsiveness across different screen sizes.
- Wrote JavaScript code to fetch movie data from an open API and dynamically render movie cards.
- Integrated functionality to display trailers upon clicking on a movie card.
- Implemented search functionality to filter movies based on user input.
- Tested the application thoroughly to ensure proper functionality and responsiveness.
- Resolving the errors and fixing bugs.
- Finally deploying the project into hosting site.


## Hosting:
The application is hosted on **`Vercel`** at [[MovieMania](https://movie-mania-smoky.vercel.app/)]. Users can access the live version of the application by visiting the provided link.

## Additional Features Added:
### *Side Bar*: 
Consisting of categories of movies such as `Genres`, and `Langauges`, Users can click on particular genre or language and can view the movies of that particular category...
>(implemented in `./assets/js/sidebar.js`)

- by Genre(ex:Adventure)
![Screenshot 2024-03-18 223931](https://github.com/Ajay-durgesam/MovieMania/assets/114494331/b2d1ecf0-fe07-4e27-9ad3-eb2b3f846975)

-by Language(ex:Hindi)
![Screenshot 2024-03-18 223953](https://github.com/Ajay-durgesam/MovieMania/assets/114494331/5f22c66a-0a4b-4f40-8696-c7920085058d)


### *Details Page*: 
Detailed page consists of all details of that particular movie, it can be accessed by clicking on any of the movie- card, or also by clicking on the `watch now` button in the banner show in the home page.
>(implemented in `./assets/js/detail.js`)

![Screenshot 2024-03-18 224155](https://github.com/Ajay-durgesam/MovieMania/assets/114494331/9f28dea3-869e-487e-80c6-4410fb48c86d)


### *Local Storage*: 
Implemented local storage for storing the values of movie ids, for displaying the movie content in details page and also for displaying the movie list categorised by genres,etc.

>(implemented in `./assets/js/global.js`)

## Future Improvements:
- Implement user authentication and allow users to create accounts to save favorite movies like watchlist.
- Enhance the design and user experience with more interactive features.


Thank you for checking out this Movie List Web Application! If you have any questions or feedback, please don't hesitate to reach out.
