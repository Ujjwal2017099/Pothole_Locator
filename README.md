# Pothole Locator

The current state of road infrastructure monitoring lacks an efficient and timely method to detect and report potholes, leading to safety hazards and increased maintenance costs. In urban environments, potholes pose a significant risk to drivers and pedestrians alike. Traditional methods of manual inspection are time-consuming, prone to errors, and often result in delayed repairs. To address this issue, there is a need for an automated system that utilizes dash cam footage from vehicles to detect potholes, capture their images, and report the precise location coordinates for immediate action.

The project aims to develop a robust Pothole Detection System that can analyze video data from car dash cams in real-time, identify potholes accurately, and generate comprehensive reports containing images and geospatial coordinates of the detected potholes. This system will not only enhance road safety but also contribute to proactive road maintenance planning.

## Expected Outcomes:
- Increased road safety by providing timely information on potholes to drivers and authorities.
- Efficient allocation of resources for road maintenance through a prioritized list of identified potholes.
- Reduced vehicle damage and associated repair costs.
- Improved planning for road infrastructure maintenance and development.
- Integration of the Pothole Detection System into existing smart city initiatives for comprehensive urban planning and management.
  
## Getting Started
1. Make sure you have node.js installed on your system.
 >  If not then you can install it from here [node](https://nodejs.org/en/)
2. Clone the project repo on you system by either downloading the code or by using git clone
3. Run ```npm install``` in the terminal for both client and server directories it will install all the necessary dependencies in your system.
4. Run ```npm start``` and ```npm run start``` in client and server directories respectively.
5. Create a ```env``` file in server directory and write **ACCESS_KEY** and **REFRESH_KEY** for jwt token and **DATABASE_NAME** and **DATABASE_PASSWORD** for your mongodb atlas account
> If you are using mongodb on your local system then replace connection **URI** in `connection.js` inside connection directory in server


## How does it work

- In this project YOLO v7 is used to detect potholes in realtime whenever you take your car on a drive
> It will work on your car's dash cam
- If any potholes detected it will report that potholes with their image and geographical coordinates
- Each pothole can ony be reported once. However count of how many cars have encountered that potholes will be recorded to know how busy that road is
- Website will provide a graphical representaion of potholes reported along with various filter options
- It will also show locations where potholes are found
- It also has an admin page where an authorized organization can view the details of repoted potholes in their jurisdiction and can update the status of a pothole to filled

  ### *While making this project it has been make sured that there is no privacy concerns and no-body can track your car location*
