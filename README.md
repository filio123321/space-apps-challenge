# Project Name
> MARS-O is a software/API that reads, analyzes and categorizes any documents, so that they can be easily and quickly found later. We also provide a mobile app for easy access to the API and , where you can enrich and use your space knowledge with our “Daily fact” & “Daily Quiz”.
> Live demo [_here_](https://youtu.be/XvnFkB8lX58).

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- MARS-O is an easy to use IOS and ANDROID app.
- NASA has a big repository of files which prove difficult to find specific documents to find. Here comes MARS-O.
- MARS-O scans and creates a short summary of every document in given repository, which then is used to compare to an input string and find a ratio. Documents are sorted by ratio (and for easy use displayed on our app).


## Technologies Used
- Flask - version 2.1.2
- nltk - version 3.7
- opencv_python - version 4.5.1.48
- pdf2image - version 1.16.0
- pdfminer - version 20191125
- spacy - version 3.4.1
- transformers - 4.22.2
- react-native - 0.70
- sqlite - version 3.34


## Features
List with the ready features here:
- API access to categorized documents;
- Mobile App for easy use;
- Random facts about space to enrichen your knowledge.


## Screenshots
![Homepage](./imgs/homepage.png)
![search](./imgs/search.png)
![empty search](./imgs/search_empty.png)
![fact](./imgs/fact.png)
![quiz](./imgs/quiz.png)
![quiz score](./imgs/quiz_score.png)



## Setup

Install python libaries `python -m pip install -r requirements.txt` and DONT'T forget to change all IP varibles in flask_app/app.py.


## Usage

Start the flask app first:
`python flask_app/app.py`

Then start the expo go mobile app inside `mobile_all`:
`cd mobile_app`
`npm start`

## Project Status
Project is: _in progress_


## Room for Improvement
Room for improvement:
- There are faster ways to scan, categorize and input inside db than what we're using.
- Progressive loading for photos in the search section in the mobile app.

To do:
- Finish Quiz page.
- Find API for quiz questions, so they change and don't remain the same.


## Acknowledgements
- This project was based on [this challenge]([https://www.example.com](https://2022.spaceappschallenge.org/challenges/2022-challenges/science-legacy/details)) from the [space apps challenges](https://2022.spaceappschallenge.org/challenges/).
- [Hrisi](https://github.com/karakonchul) - frontend & designs
- [Strato](https://github.com/filio123321) - backed & frontend
- [Chochi](https://github.com/Chochi44) - website


