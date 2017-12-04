# GoVolunteer
Connecting volunteers to volunteer organizations efficiently and effectively!

-----------------------------------------------------------------------------------------------------------------------------
New software features for this release
-----------------------------------------------------------------------------------------------------------------------------

-A user can register to create an account


-A user can log-in to access features (and log-out)


-A user can edit user’s bio


-A user can delete an account upon request


Organization user can:


-Post an event with event details (such as name, description, skill, interest and location)


-View events list with details included


-Edit related event details


-Delete event that is cancelled


-Contact related volunteers of specific event via email


Volunteer user can:


-View all possible events with details posted by organizations


-Filter down events list by location or keyword of the event and host organization


-Register to an event consented that this user is apt volunteer


-Unregister an event in his/her event list


-Contact related organization of specific event via email


-----------------------------------------------------------------------------------------------------------------------------
Known bugs and defects 
-----------------------------------------------------------------------------------------------------------------------------
Organization profile page, which is directed from the title link on registerEvent.html, is just hardcoded html page for now because we has not set up for organization’s profile on our database separately from volunteer side. 
Uploading image file for organization has been in process. So, the image file on events posted by organizations or on organization’s profile is empty for now. 
	Although those two functions are not our major functions as well as not mentioned in our iteration plan, it might be necessary for user’s convenience in future.  
	
	
-----------------------------------------------------------------------------------------------------------------------------
The Install Guide
-----------------------------------------------------------------------------------------------------------------------------
 Pre-requisites: what is the required configuration of software and hardware that the customer must have before they can begin the installation process?
A website hosting service, an instance of Dynamo DB from Amazon Web Services, an instance of Amazon Web Services S3 Bucket

-----------------------------------------------------------------------------------------------------------------------------
Dependent libraries that must be installed: 
-----------------------------------------------------------------------------------------------------------------------------
No Third party Libraries are necessary


-----------------------------------------------------------------------------------------------------------------------------
Download Instructions
-----------------------------------------------------------------------------------------------------------------------------
Customer

Navigate to https://github.com/dcromer3/GoVolunteer. Scroll to the green button on the right side of the page that says “Clone or Download”; click the button. You will be presented with the option to Open in Desktop or Download ZIP. Select “Download ZIP”. The repository will be downloaded to your computer in a .zip file format. Unzip the folder by right-clicking and opening with the appropriate program, which will depend on your OS. Once the folder has completed the unzipping process, navigate into the “GoVolunteer-master” directory newly created. It should appear next to the .zip file. Perform an FTP transfer of the files in the GoVolunteer-master directory to the server of your choice to host the website.

End User

The end user will have no need to download any software or application to access the project’s services. Once the website has been transferred to the customer’s server, the end user will access the product by navigating to the url at which the server is hosting the product. This url will need to be provided by the customer upon completion of the file transfer.

-----------------------------------------------------------------------------------------------------------------------------
Build instructions (if needed): 
-----------------------------------------------------------------------------------------------------------------------------
if you are providing the raw source code rather than a binary build, how will the customer and users create the required executable application? 

-----------------------------------------------------------------------------------------------------------------------------
Installation of actual application: 
-----------------------------------------------------------------------------------------------------------------------------
--After the software is downloaded from github, and the Amazon Web Services have been configured properly including the API, 

--the ajax requests must be changed in each of the javascript files to include the new AWS Links. 

--Then the software must be transferred via ftp to the server. 

--The domain must be setup to point to the web hosting server. 

--It is recommended you speak with your support group for the hosting service you use, as the instructions can vary wildly depending on the hosting service.

-----------------------------------------------------------------------------------------------------------------------------
Run Instructions
-----------------------------------------------------------------------------------------------------------------------------
Customer:

You will not need to run the application once it is being hosted on the your server as described above. 

End User:

Volunteer
Navigate to the URL provided by the customer. From there, you may create a volunteer account to access the platform and begin to search and register for volunteer events.

Organization
Navigate to the URL provided by the customer. From there, you may create an organization account to access the platform and post events in need of volunteers.
