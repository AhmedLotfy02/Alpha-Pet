------------AlphaPet------------

------------Tables--------------

CREATE TABLE Degree
(
	DegreeYear int,
	College varchar(50),
	DegreeName varchar(500),
	VetID varchar(50) not null,
	primary key(DegreeYear, College, DegreeName, VetID),
	Foreign key (VetID) references Vet
	ON UPDATE CASCADE
	ON DELETE CASCADE,
)

CREATE TABLE Pharmacist
(
	ID varchar(50) not null,
	primary key(ID),
	FName varchar(50),
	LName varchar(50),
)

CREATE TABLE Appointment
(
	StartDate date,
	EndDate date,
	OwnerID varchar(50) not null,
	VetID varchar(50) not null,
	primary key(StartDate, OwnerID),
	Foreign key (VetID) references Vet
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	Foreign key (OwnerID) references Owner
	ON UPDATE CASCADE
	ON DELETE CASCADE,
)

CREATE TABLE Invoice
(
	Notes varchar(100),
	RequiredMedicines varchar(100),
	PharmacyID varchar(50) not null,
	VetID varchar(50) not null,
	Foreign key (VetID) references Vet
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	Foreign key (PharmacyID) references Pharmacy
	ON UPDATE CASCADE
	ON DELETE CASCADE,
)

----------INSERT-------------

