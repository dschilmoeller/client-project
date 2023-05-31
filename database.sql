-- DB Name = thermasolutions
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT NOT NULL
);
CREATE TABLE "incident" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "hospital" JSON,
    "event" JSON,
    "device" JSON,
    "patient" JSON,
    "disposable" JSON,
    "component" JSON,
    "rep" JSON,
    "image_url" VARCHAR (120),
    "investigation" JSON,
    "risk_analysis" JSON,
    "actions_taken" JSON,
    "complaint_reportable" JSON,
    "prepared_by" JSON,
    "completed" BOOLEAN DEFAULT false
);
CREATE TABLE "incident_images" (
    "id" SERIAL PRIMARY KEY,
    "incident_id" INT REFERENCES "incident",
    "aws_image_key" INT
);

CREATE TABLE "feedback" (
    "id" SERIAL PRIMARY KEY,
    "date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "hospital_name" VARCHAR (120),
    "clinician_name" VARCHAR (120),
    "clinician_email" VARCHAR (120),
    "clinician_phone" VARCHAR (120),
    "comment" VARCHAR (5000)
);

-- with spaces in the name, the names MUST be in quotes - "column", 'data'
CREATE TABLE "device_data" (
    "id" SERIAL PRIMARY KEY,
	"SOS Account Name" VARCHAR (200),
	"Hospital" VARCHAR (200),
	"Street" VARCHAR (300),
	"City" VARCHAR (100),
	"State" VARCHAR (100),
	"Country" VARCHAR (100),
	"Zip" VARCHAR (100),
	"Component Tray" VARCHAR (100),
	"Serial Number" VARCHAR (100),
	"Crate Accessories" VARCHAR (100),
	"Group" VARCHAR (100),
	"Crate and Notes" VARCHAR (1000),
	"GMG Primary" VARCHAR (100),
	"Contact Information" VARCHAR (1000)
	);

-- replace my URL with your URL 
COPY device_data ("SOS Account Name", "Hospital", "Street", "City", "State", "Country", "Zip", "Component Tray", "Serial Number", "Crate Accessories", "Group", "Crate and Notes", "GMG Primary", "Contact Information")
FROM '/Users/user/ThermaSolutions/ThermaSolutions-Client-Project/mockData.csv'
DELIMITER ',' CSV HEADER;

select * from device_data
where "Serial Number" = 'B00H220003';