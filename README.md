# FORUMTEER

FORUMTEER is a comprehensive volunteer management platform designed to streamline the process of enrolling, managing activities, and handling administrative tasks for non-profits like BigAtHeart.

## Getting Started

Follow these instructions to get a copy of FORUMTEER up and running on your local machine for development and testing purposes.

### Prerequisites

- Git
- Node.js
- npm (comes with Node.js)

### Installation

1. Clone the repository

   ```
   git clone https://github.com/leroytan/bigatheart
   ```
   
3.  Navigate to the project directory
    
    ```
    cd bigatheart/bigatheart
    ```
    
5.  Install NPM packages
    
    ```
    npm install
    ``` 
    
7.  Create a ```.env``` file in the root directory of the project and add the following lines:

    ```
    VITE_DB_URL="https://qsbjygajkdarymyjyzat.supabase.co"
    VITE_DB_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzYmp5Z2Fqa2RhcnlteWp5emF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2MDg3ODksImV4cCI6MjAyMjE4NDc4OX0.44BfRkcLdeR-3Ux5ygIbTZFUVI0wurRqY3BviGmjEJw"
    ``` 
    
    This configures your environment to connect to the Supabase backend.
    
8.  Start the development server
    
    ```
    npm run dev
    ``` 
    
10.  Open your web browser and navigate to the URL provided in the console output, usually
    
    ```
    http://localhost:3000/
    ``` 
    

## Usage

Explore the features of FORUMTEER by registering as a new user, joining activities, and utilizing the admin panel to manage volunteer tasks and generate reports.

## Contributing

Feel free to fork this repo and contact us if you make any contributions

## Acknowledgments

-   BigAtHeart, for the problem statement and inspiration.
-   Developer Student Clubs @ NUS Computing, for the support during the Hack for Good.
-   All contributors who have invested time and effort into realizing FORUMTEER: **Leroy Tan, Nicholas Tok, Yashvan Alagirisamy and Bryan Chew**.
